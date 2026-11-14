/** Calculators of the site (RECETTE §9.3), one entry per subject. MiniSim renders them all: the full calculator at the
 *  top of each page and the mini-simulators inside the text. State field: 1-based index in STATES (engine). */
import type { MiniSpec } from './mini-types';
import { STATES, byIdx, check, feeFor, feeLabel, limitFor, suitCost, simpleInterest, payPlan, monthsLeft, RETRIEVED, routeFor, claimTotal, copiesNeeded, upfrontFees, DEFAMATION, OTHER_READ, st } from './engine/claims';
import { usd, num, pct, day } from './fmt';

const stateOpts = STATES.map((s, i) => ({ value: String(i + 1), label: s.name }));
const stateIn = (def = 5) => ({ id: 'st', label: 'State where you sue', def, options: stateOpts });
const partyIn = { id: 'party', label: 'Who files the claim', def: 1, avance: true, options: [{ value: '1', label: 'A person' }, { value: '2', label: 'A business, landlord company or other entity' }] };
const whenIn = { id: 'when', label: 'When you file', def: 1, options: [{ value: '1', label: 'Before the scheduled change' }, { value: '2', label: 'On or after the scheduled change' }], showIf: (v: Record<string, number>) => byIdx(v.st).next !== null };
const readHow = { statute: 'the statute text', court: 'the court’s own page', index: 'the official court page' } as const;
/** Where the figure comes from, under the result: the law goes in this note, never in the answer (RECETTE §15.8). */
const sourceNote = (s: ReturnType<typeof byIdx>) => `Checked on ${day(RETRIEVED)} against ${readHow[s.read]}. Source: ${s.cite}.`;

const SPECS: Record<string, (lang: string) => MiniSpec> = {
  limit: () => ({
    title: 'Can I sue for this amount in small claims?', cta: 'Compare every state’s limit',
    inputs: [stateIn(), { id: 'amount', label: 'Amount you claim', def: 6000, unit: '$', max: 1_000_000 }, partyIn, whenIn],
    exemple: (v) => `Example for a ${usd(v.amount)} claim by ${v.party === 2 ? 'a business' : 'a person'} in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st);
      const later = s.next !== null && v.when === 2;
      const filed = later ? s.next!.from : RETRIEVED;
      const c = check(s, v.amount, v.party === 2 ? 'business' : 'person', filed);
      return {
        head: [later ? `Small claims limit in ${s.name} from ${day(s.next!.from)}` : `Small claims limit in ${s.name}`, usd(c.cap)],
        alert: c.fits ? undefined : `${usd(c.over)} over the limit: claim ${usd(c.cap)} and give up the rest, or file in the regular civil court.`,
        rows: [
          ['Can you use small claims?', c.fits ? 'Yes' : 'Not for the full amount'],
          ['Your claim', usd(v.amount)],
          [c.fits ? 'Room left under the limit' : 'Over the limit by', usd(c.fits ? c.room : c.over)],
          ['Court', s.court],
          ['Filing fee for this amount', feeLabel(s, Math.min(v.amount, c.cap))],
        ],
        note: `${sourceNote(s)}${s.next ? ` The limit is ${usd(s.cap)} today and ${usd(s.next.cap)} for cases filed from ${day(s.next.from)}.` : ''}`,
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
        head: [`Filing fee in ${s.name}`, f === null ? 'Set by county' : usd(f)],
        alert: v.amount > cap ? `Above the ${usd(cap)} limit: the fee shown is for a claim cut down to the limit.` : f === null ? feeLabel(s, cap) + '.' : s.feeLocal ? `${feeLabel(s, Math.min(v.amount, cap))}.` : undefined,
        rows: [['Your claim', usd(v.amount)], ['Small claims limit', usd(cap)], ['Fee as a share of the claim', f === null || v.amount <= 0 ? '–' : pct(f / Math.min(v.amount, cap))], ['Service on the defendant', 'Extra: sheriff, process server or certified mail']],
        note: s.feeNote || undefined,
      };
    },
  }),
  cost: () => ({
    title: 'What suing in small claims costs you', cta: 'Every cost of a small claim, explained',
    inputs: [stateIn(),
      { id: 'claim', label: 'Amount you claim', def: 2500, unit: '$', max: 1_000_000 },
      // One source per state (testeurs naïfs du 2026-11-14): the fee comes from states.json, never from a figure
      // typed into a page. No statewide fee: the field is empty and the result says “ask the clerk”.
      { id: 'clerk', label: 'Filing fee the clerk gave you', def: 0, unit: '$', max: 10_000, help: 'No statewide figure on this site: ask the clerk, then type it here', showIf: (v: Record<string, number>) => byIdx(v.st).fee === null },
      { id: 'own', label: 'A different filing fee', def: 0, unit: '$', max: 10_000, avance: true, help: 'Leave empty to use the state’s published fee', showIf: (v: Record<string, number>) => byIdx(v.st).fee !== null },
      { id: 'service', label: 'Serving the defendant', def: 40, unit: '$', max: 10_000, help: 'Certified mail, sheriff or process server' },
      { id: 'hours', label: 'Hours away from work', def: 6, unit: 'h', max: 200, avance: true },
      { id: 'hourly', label: 'Your hourly pay', def: 25, unit: '$', max: 1000, avance: true },
      { id: 'other', label: 'Parking, copies, travel', def: 20, unit: '$', max: 10_000, avance: true },
    ],
    exemple: (v) => `Example for a ${usd(v.claim)} claim in ${byIdx(v.st).name} and ${num(v.hours)} hours off work`,
    run: (v) => {
      const s = byIdx(v.st);
      const fee = costFee(v);
      const c = suitCost({ fee: fee ?? 0, service: v.service, hours: v.hours, hourly: v.hourly, other: v.other });
      const share = v.claim > 0 ? c.total / v.claim : 0;
      const yours = (s.fee === null ? v.clerk : v.own) > 0;
      return {
        head: ['Total cost of the suit', usd(c.total)],
        alert: fee === null ? `Filing fee not counted yet: this site gives no statewide figure for ${s.name}${s.feeLocal ? ` (it varies by county, ${feeLabel(s, limitFor(s)).replace(/^Varies by county, |: ask your clerk$/g, '')})` : ''}, so ask the clerk and type it above.` : share >= 0.5 ? 'The suit costs half the claim or more: a demand letter or mediation first is worth it.' : undefined,
        rows: [['Filing fee', fee === null ? 'Not counted yet' : yours ? `${usd(fee)} (your figure)` : feeLabel(s, Math.min(v.claim, limitFor(s)))], ['Serving the defendant', usd(v.service)], ['Pay lost for the hearing', usd(c.lostPay)], ['Other costs', usd(v.other)], ['Cost as a share of the claim', pct(share)]],
        note: 'Ask the judge to add the filing and service fees to the judgment: pay lost for the hearing is not usually recoverable.',
      };
    },
  }),
  interest: () => ({
    title: 'Interest to add to your demand', cta: 'Check your state’s limit',
    inputs: [
      { id: 'amount', label: 'Sum owed', def: 3200, unit: '$', max: 1_000_000 },
      { id: 'rate', label: 'Annual interest rate', def: 6, unit: '%', max: 50, decimals: 2, help: 'Example rate: use the one in your contract, or ask the clerk for your state’s legal rate' },
      { id: 'months', label: 'Months since it was due', def: 8, unit: 'months', max: 240 },
    ],
    exemple: (v) => `Example for ${usd(v.amount)} owed for ${num(v.months)} months at ${num(v.rate, 2)}%`,
    run: (v) => {
      const r = simpleInterest(v.amount, v.rate, v.months);
      return {
        head: ['Amount to demand', usd(r.total)],
        rows: [['Sum owed', usd(v.amount)], ['Simple interest', usd(r.interest)], ['Rate and period', `${num(v.rate, 2)}% · ${num(v.months)} months`]],
        note: 'Simple interest, counted month by month. The rate is an example: use the one in your contract, or ask the clerk for your state’s legal rate.',
      };
    },
  }),
  collect: () => ({
    title: 'How long a payment plan takes', cta: 'Small claims limits, state by state',
    inputs: [
      { id: 'judgment', label: 'Judgment still owed', def: 4500, unit: '$', max: 1_000_000 },
      { id: 'monthly', label: 'Monthly payment', def: 250, unit: '$', max: 100_000 },
      { id: 'rate', label: 'Interest rate on the judgment', def: 6, unit: '%', max: 50, decimals: 2, avance: true, help: 'Example rate: the clerk gives your state’s rate for judgments' },
    ],
    exemple: (v) => `Example for a ${usd(v.judgment)} judgment paid ${usd(v.monthly)} a month, at ${num(v.rate, 2)}% a year`,
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
  court: () => ({
    title: 'Which claims court hears your case?', cta: 'Small claims, courts of claims and federal claims compared',
    inputs: [
      { id: 'target', label: 'Who you are suing', def: 1, options: [{ value: '1', label: 'A person or a business' }, { value: '2', label: 'A state or a state agency' }, { value: '3', label: 'The United States or a federal agency' }] },
      { id: 'kind', label: 'What the claim is about', def: 1, options: [{ value: '1', label: 'Money owed, a contract, a refund' }, { value: '2', label: 'Injury or damage caused by someone' }] },
      { id: 'amount', label: 'Amount you claim', def: 8000, unit: '$', max: 10_000_000 },
      { ...stateIn(), showIf: (v: Record<string, number>) => v.target !== 3 },
    ],
    exemple: (v) => `Example for a ${usd(v.amount)} claim against ${v.target === 3 ? 'a federal agency' : v.target === 2 ? `a ${byIdx(v.st).name} agency` : `a person in ${byIdx(v.st).name}`}`,
    run: (v) => {
      const s = byIdx(v.st);
      const r = routeFor(s, v.target === 3 ? 'federal' : v.target === 2 ? 'state' : 'private', v.kind === 2 ? 'tort' : 'money', v.amount);
      return {
        head: ['Court that usually hears it', r.court],
        alert: r.first ?? undefined,
        rows: [['Small claims?', r.small ? `Yes, under the ${usd(limitFor(s))} limit` : 'No'], ['Deadline', r.deadline]],
        note: `Source: ${r.law}, read on ${day(OTHER_READ)}. General information, not legal advice.`,
      };
    },
  }),
  claimsum: () => ({
    title: 'The amount to write on your claim', cta: 'Check the limit of your state',
    inputs: [stateIn(),
      { id: 'owed', label: 'Sum the other side owes you', def: 2800, unit: '$', max: 1_000_000 },
      { id: 'other', label: 'Other losses you can prove', def: 300, unit: '$', max: 1_000_000, help: 'Repairs, replacement, costs caused by the dispute' },
      { id: 'rate', label: 'Annual interest rate', def: 0, unit: '%', max: 50, decimals: 2, avance: true, help: 'The rate in your contract or your state’s legal rate; 0 if none' },
      { id: 'months', label: 'Months since it was due', def: 6, unit: 'months', max: 240, avance: true }, partyIn],
    exemple: (v) => `Example for ${usd(v.owed)} owed and ${usd(v.other)} of other losses in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st); const c = claimTotal(s, { owed: v.owed, other: v.other, ratePct: v.rate, months: v.months, party: v.party === 2 ? 'business' : 'person' });
      return {
        head: ['Amount to claim', usd(c.total)],
        alert: c.fits ? undefined : `${usd(c.over)} above the ${usd(c.cap)} limit of ${s.name}: claim the limit and give up the rest, or file in the regular civil court.`,
        rows: [['Sum owed', usd(v.owed)], ['Other losses', usd(v.other)], ['Simple interest', usd(c.interest)], [`Limit in ${s.name}`, usd(c.cap)], ['Filing fee for this amount', feeLabel(s, Math.min(c.total, c.cap))]],
      };
    },
  }),
  fees: () => ({
    title: 'Small claims court fees you pay up front', cta: 'Every filing fee schedule',
    inputs: [stateIn(5),
      { id: 'amount', label: 'Amount you claim', def: 3000, unit: '$', max: 1_000_000 },
      { id: 'defs', label: 'Number of defendants', def: 1, max: 10 },
      { id: 'serve', label: 'Service, per defendant', def: 40, unit: '$', max: 1000, help: 'Certified mail, sheriff or process server: ask the clerk' }],
    exemple: (v) => `Example for a ${usd(v.amount)} claim against ${num(v.defs)} defendant${v.defs > 1 ? 's' : ''} in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st); const f = upfrontFees(s, v.amount, v.defs, v.serve);
      return {
        head: ['Fees paid up front', f.total === null ? `${usd(f.service)} + county fee` : usd(f.total)],
        alert: f.filing === null ? `${feeLabel(s, limitFor(s))}.` : undefined,
        rows: [['Filing fee', feeLabel(s, Math.min(v.amount, limitFor(s)))], ['Service on the defendants', usd(f.service)], ['Usually added to the judgment if you win', 'Filing and service']],
      };
    },
  }),
  file: () => ({
    title: 'Where and for how much you can file', cta: 'The steps to file',
    inputs: [stateIn(), { id: 'amount', label: 'Amount you claim', def: 4000, unit: '$', max: 1_000_000 }, partyIn],
    exemple: (v) => `Example for a ${usd(v.amount)} claim in ${byIdx(v.st).name}`,
    run: (v) => {
      const s = byIdx(v.st); const c = check(s, v.amount, v.party === 2 ? 'business' : 'person');
      return {
        head: [`File small claims in ${s.name} at`, s.court],
        alert: c.fits ? undefined : `Over the ${usd(c.cap)} limit by ${usd(c.over)}: cut the claim or file in the regular civil court.`,
        rows: [['Limit', usd(c.cap)], ['Filing fee for this amount', feeLabel(s, Math.min(v.amount, c.cap))], ['What you file', 'The claim form, a copy for each defendant and one for you']],
        go: ['Official page for this state →', s.url],
      };
    },
  }),
  venue: () => ({
    title: 'Which county’s small claims court?', cta: 'Back to finding a court',
    inputs: [stateIn(),
      { id: 'lives', label: 'Where the person or business you sue is', def: 2, options: [{ value: '1', label: 'In my county' }, { value: '2', label: 'In another county of my state' }, { value: '3', label: 'In another state' }] },
      { id: 'where', label: 'Where the deal or the damage happened', def: 1, options: [{ value: '1', label: 'In my county' }, { value: '2', label: 'Where the other side is' }] }],
    exemple: (v) => `Example in ${byIdx(v.st).name}, other side in ${v.lives === 3 ? 'another state' : v.lives === 2 ? 'another county' : 'your county'}`,
    run: (v) => {
      const s = byIdx(v.st);
      const head = v.lives === 1 ? 'Your own county' : v.lives === 3 ? (v.where === 1 ? 'Your county, if the court can reach them' : 'The other side’s county, in their state') : (v.where === 1 ? 'Your county or theirs' : 'The other side’s county');
      return {
        head: ['Where you can usually file', head],
        alert: v.lives === 3 ? 'Out of state: the limit and the fee of the state where you file are the ones that apply.' : undefined,
        rows: [['Court', v.lives === 3 && v.where === 2 ? 'The small claims court of their state' : s.court], ['Who confirms it', 'The clerk of that court'], [`Limit in ${s.name}`, usd(limitFor(s))]],
        note: 'Venue rules are set by each state; this is the usual pattern, not a ruling on your case.',
      };
    },
  }),
  papers: () => ({
    title: 'Your small claims paperwork, counted', cta: 'Back to the paperwork',
    inputs: [
      { id: 'docs', label: 'Pages of evidence', def: 8, max: 500, help: 'Contract, receipts, photos, texts, estimates' },
      { id: 'defs', label: 'Number of defendants', def: 1, max: 10 },
      { id: 'wit', label: 'Witnesses you bring', def: 0, max: 20, avance: true }],
    exemple: (v) => `Example for ${num(v.docs)} pages of evidence and ${num(v.defs)} defendant${v.defs > 1 ? 's' : ''}`,
    run: (v) => {
      const c = copiesNeeded(v.docs, v.defs);
      return {
        head: ['Sheets to print for the hearing', num(c.sheets)],
        rows: [['Sets of evidence', `${num(c.sets)} (judge, each defendant, you)`], ['Claim form copies at filing', `${num(1 + v.defs + 1)} (original, each defendant, you)`], ['Witness statements or subpoenas', num(v.wit)]],
        note: 'Some courts ask for evidence ahead of the hearing or online: the notice from the clerk says so.',
      };
    },
  }),
  defame: () => ({
    title: 'Time left to sue for defamation', cta: 'Back to defamation',
    inputs: [
      { id: 'st', label: 'State', def: 9, options: [...DEFAMATION.map((d, i) => ({ value: String(i + 1), label: `${st(d.code).name} (${d.years} year${d.years > 1 ? 's' : ''})` })), { value: '9', label: 'Another state: enter its period' }] },
      { id: 'years', label: 'Deadline in your state’s law', def: 1, unit: 'years', max: 10, showIf: (v: Record<string, number>) => v.st === 9 },
      { id: 'ago', label: 'Months since the statement was published', def: 5, unit: 'months', max: 240 }],
    exemple: (v) => `Example for a statement published ${num(v.ago)} months ago`,
    run: (v) => {
      const d = v.st >= 1 && v.st <= DEFAMATION.length ? DEFAMATION[v.st - 1] : null;
      const years = d ? d.years : v.years;
      const m = monthsLeft(years, v.ago);
      return {
        head: ['Months left to file', m > 0 ? num(m) : 'None'],
        alert: m <= 0 ? 'The period has run out if it started on that date: a late suit is usually dismissed when the defendant raises it.' : m <= 3 ? 'Less than three months left.' : undefined,
        rows: [['Deadline', `${num(years)} year${years > 1 ? 's' : ''}`], ['Law', d ? d.cite : 'The one you entered']],
        note: `Read on ${day(OTHER_READ)}. When the period starts can differ (republication, discovery): ask a lawyer licensed in your state.`,
      };
    },
  }),
};

/** Filing fee counted by the cost calculator: the reader's figure if typed, else the state's published fee for the
 *  amount, else null (no statewide fee: not counted, and the result says so). Exported for the consistency test. */
export function costFee(v: Record<string, number>): number | null {
  const s = byIdx(v.st);
  if (s.fee === null) return v.clerk > 0 ? v.clerk : null;
  return v.own > 0 ? v.own : feeFor(s, Math.min(v.claim, limitFor(s)));
}

export function getSpec(kind: string, lang: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-specs : aucun mini-simulateur « ${kind} » — à décrire dans src/lib/mini-specs.ts`);
  return f(lang);
}
export const KINDS = Object.keys(SPECS);
