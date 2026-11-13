/** Calculators of the site (RECETTE §9.3), one entry per subject. MiniSim renders them all: the full calculator at the
 *  top of each page and the mini-simulators inside the text. State field: 1-based index in STATES (engine). */
import type { MiniSpec } from './mini-types';
import { STATES, byIdx, check, feeFor, limitFor, suitCost, simpleInterest, payPlan, monthsLeft, RETRIEVED } from './engine/claims';
import { usd, num, pct, day } from './fmt';

const stateOpts = STATES.map((s, i) => ({ value: String(i + 1), label: s.name }));
const stateIn = (def = 44) => ({ id: 'st', label: 'State where you sue', def, options: stateOpts });
const partyIn = { id: 'party', label: 'Who files the claim', def: 1, avance: true, options: [{ value: '1', label: 'A person' }, { value: '2', label: 'A business, landlord company or other entity' }] };
const whenIn = { id: 'when', label: 'When you file', def: 1, options: [{ value: '1', label: 'Before the scheduled change' }, { value: '2', label: 'On or after the scheduled change' }], showIf: (v: Record<string, number>) => byIdx(v.st).next !== null };
const feeText = (f: number | null) => (f === null ? 'Set by the county or court' : usd(f));
const readHow = { statute: 'statute read', court: 'court page read', index: 'official page read' } as const;

const SPECS: Record<string, (lang: string) => MiniSpec> = {
  limit: () => ({
    title: 'Can I sue for this amount in small claims?', cta: 'Your state’s page',
    inputs: [stateIn(), { id: 'amount', label: 'Amount you claim', def: 6000, unit: '$', max: 1_000_000 }, partyIn, whenIn],
    exemple: (v) => `Example for a ${usd(v.amount)} claim by ${v.party === 2 ? 'a business' : 'a person'} in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st);
      const filed = s.next && v.when === 2 ? s.next.from : RETRIEVED;
      const c = check(s, v.amount, v.party === 2 ? 'business' : 'person', filed);
      return {
        head: [`Small claims limit in ${s.name}`, usd(c.cap)],
        alert: c.fits ? undefined : `${usd(c.over)} over the limit: claim ${usd(c.cap)} and give up the rest, or file in the regular civil court.`,
        rows: [
          ['Your claim', usd(v.amount)],
          [c.fits ? 'Room left under the limit' : 'Over the limit by', usd(c.fits ? c.room : c.over)],
          ['Court', s.court],
          ['Filing fee for this amount', feeText(c.fee)],
          ['Law that sets the limit', s.cite],
        ],
        note: `${readHow[s.read]} on ${day(RETRIEVED)}.${s.next ? ` ${usd(s.next.cap)} from ${day(s.next.from)}.` : ''}`,
      };
    },
  }),
  fee: () => ({
    title: 'Filing fee for your claim', cta: 'All fees by state',
    inputs: [stateIn(5), { id: 'amount', label: 'Amount you claim', def: 3000, unit: '$', max: 1_000_000 }],
    exemple: (v) => `Example for a ${usd(v.amount)} claim in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st); const cap = limitFor(s); const f = feeFor(s, Math.min(v.amount, cap));
      return {
        head: [`Filing fee in ${s.name}`, feeText(f)],
        alert: v.amount > cap ? `Above the ${usd(cap)} limit: the fee shown is for a claim cut down to the limit.` : f === null ? 'No statewide schedule: the clerk of the county court gives the fee.' : undefined,
        rows: [['Your claim', usd(v.amount)], ['Small claims limit', usd(cap)], ['Fee as a share of the claim', f === null || v.amount <= 0 ? '–' : pct(f / Math.min(v.amount, cap))], ['Service on the defendant', 'Extra: sheriff, process server or certified mail']],
        note: s.feeNote || undefined,
      };
    },
  }),
  cost: () => ({
    title: 'What suing in small claims costs you', cta: 'Check the limit and fee of your state',
    inputs: [
      { id: 'claim', label: 'Amount you claim', def: 2500, unit: '$', max: 1_000_000 },
      { id: 'fee', label: 'Filing fee', def: 75, unit: '$', max: 10_000, help: 'Your state’s fee, or the clerk’s figure' },
      { id: 'service', label: 'Serving the defendant', def: 40, unit: '$', max: 10_000, help: 'Certified mail, sheriff or process server' },
      { id: 'hours', label: 'Hours away from work', def: 6, unit: 'h', max: 200, avance: true },
      { id: 'hourly', label: 'Your hourly pay', def: 25, unit: '$', max: 1000, avance: true },
      { id: 'other', label: 'Parking, copies, travel', def: 20, unit: '$', max: 10_000, avance: true },
    ],
    exemple: (v) => `Example for a ${usd(v.claim)} claim, a ${usd(v.fee)} fee and ${num(v.hours)} hours off work`,
    run: (v) => {
      const c = suitCost({ fee: v.fee, service: v.service, hours: v.hours, hourly: v.hourly, other: v.other });
      const share = v.claim > 0 ? c.total / v.claim : 0;
      return {
        head: ['Total cost of the suit', usd(c.total)],
        alert: share >= 0.5 ? 'The suit costs half the claim or more: a demand letter or mediation first is worth it.' : undefined,
        rows: [['Paid up front (fee and service)', usd(c.upfront)], ['Pay lost for the hearing', usd(c.lostPay)], ['Other costs', usd(v.other)], ['Cost as a share of the claim', pct(share)]],
        note: 'Ask the judge to add the filing and service fees to the judgment: pay lost for the hearing is not usually recoverable.',
      };
    },
  }),
  interest: () => ({
    title: 'Interest to add to your demand', cta: 'Check your state’s limit',
    inputs: [
      { id: 'amount', label: 'Sum owed', def: 3200, unit: '$', max: 1_000_000 },
      { id: 'rate', label: 'Annual interest rate', def: 6, unit: '%', max: 50, decimals: 2, help: 'The rate in your contract, or your state’s legal rate' },
      { id: 'months', label: 'Months since it was due', def: 8, unit: 'months', max: 240 },
    ],
    exemple: (v) => `Example for ${usd(v.amount)} owed for ${num(v.months)} months at ${num(v.rate, 2)}%`,
    run: (v) => {
      const r = simpleInterest(v.amount, v.rate, v.months);
      return {
        head: ['Amount to demand', usd(r.total)],
        rows: [['Sum owed', usd(v.amount)], ['Simple interest', usd(r.interest)], ['Rate and period', `${num(v.rate, 2)}% · ${num(v.months)} months`]],
        note: 'Most limits exclude interest: check the line of your state’s law before you cut a claim.',
      };
    },
  }),
  collect: () => ({
    title: 'How long a payment plan takes', cta: 'Back to the limits by state',
    inputs: [
      { id: 'judgment', label: 'Judgment still owed', def: 4500, unit: '$', max: 1_000_000 },
      { id: 'monthly', label: 'Monthly payment', def: 250, unit: '$', max: 100_000 },
      { id: 'rate', label: 'Post-judgment interest rate', def: 0, unit: '%', max: 50, decimals: 2, avance: true, help: 'The rate your state applies to judgments, if you know it' },
    ],
    exemple: (v) => `Example for a ${usd(v.judgment)} judgment paid ${usd(v.monthly)} a month`,
    run: (v) => {
      const p = payPlan(v.judgment, v.monthly, v.rate);
      const done = Number.isFinite(p.months);
      return {
        head: ['Months to be paid in full', done ? num(p.months) : 'Never'],
        alert: done ? undefined : 'The payment does not cover the interest: ask the court for a higher amount or another way to collect.',
        rows: [['Judgment', usd(v.judgment)], ['Monthly payment', usd(v.monthly)], ['Interest over the plan', usd(p.interest)]],
      };
    },
  }),
  deadline: () => ({
    title: 'Time left to file', cta: 'Back to how to sue',
    inputs: [
      { id: 'years', label: 'Deadline in your state’s law', def: 3, unit: 'years', max: 30, help: 'The limitation period for your kind of claim' },
      { id: 'ago', label: 'Months since the damage or the missed payment', def: 14, unit: 'months', max: 600 },
    ],
    exemple: (v) => `Example for a ${num(v.years)}-year deadline and an event ${num(v.ago)} months ago`,
    run: (v) => {
      const m = monthsLeft(v.years, v.ago);
      return {
        head: ['Months left to file', m > 0 ? num(m) : 'None'],
        alert: m <= 0 ? 'The deadline has passed if it runs from that date: a court will usually dismiss a late claim if the defendant raises it.' : m <= 3 ? 'Less than three months: file now, before the demand letter’s deadline runs out.' : undefined,
        rows: [['Deadline', `${num(v.years)} years (${num(v.years * 12)} months)`], ['Already gone', `${num(v.ago)} months`]],
      };
    },
  }),
};

export function getSpec(kind: string, lang: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-specs : aucun mini-simulateur « ${kind} » — à décrire dans src/lib/mini-specs.ts`);
  return f(lang);
}
export const KINDS = Object.keys(SPECS);
