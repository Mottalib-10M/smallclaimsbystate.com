/**
 * Small claims engine: limits and filing fees of the 50 states and DC (src/data/states.json, read on 2026-11-13),
 * the cost of a suit, interest on a demand and the pace of a payment plan. Pure functions, no network.
 */
import DATA from '../../data/states.json';
import OTHER from '../../data/other-courts.json';

export interface StateRow {
  code: string; name: string; slug: string; cap: number; capBiz: number | null;
  next: { cap: number; from: string } | null;
  court: string; cite: string; url: string; read: 'statute' | 'court' | 'index'; note: string;
  fee: number[][] | null; feeUrl: string | null; feeNote: string;
  /** County figures quoted in the same readings ([where, fee]): Maricopa in Arizona, Wabash in Indiana. */
  feeLocal: Array<[string, number]> | null;
}
const usd0 = (x: number) => `$${Math.round(x).toLocaleString('en-US')}`;
export const STATES: StateRow[] = (DATA as unknown as { states: StateRow[] }).states;
export const RETRIEVED = (DATA as { retrieved_at: string }).retrieved_at;
export const N_STATES = STATES.length;

export function st(code: string): StateRow {
  const s = STATES.find((x) => x.code === code);
  if (!s) throw new Error(`Unknown state ${code}`);
  return s;
}
/** Index (1-based) of a state in STATES: the numeric value used by the calculators' state field. */
export const idx = (code: string) => STATES.findIndex((x) => x.code === code) + 1;
export const byIdx = (i: number) => STATES[Math.min(Math.max(Math.round(i), 1), STATES.length) - 1];

export type Party = 'person' | 'business';
/** The limit that applies: a lower limit for businesses where the law sets one; a scheduled change once the filing
 *  date reaches it (Georgia from January 1, 2027, Utah from January 1, 2030). `filed` = ISO date of filing. */
export function limitFor(s: StateRow, party: Party = 'person', filed = RETRIEVED): number {
  let cap = s.next && filed >= s.next.from ? s.next.cap : s.cap;
  if (party === 'business' && s.capBiz !== null) cap = Math.min(cap, s.capBiz);
  return cap;
}
/** Official filing fee for a claim of `amount`, or null where fees are set by each county or court. */
export function feeFor(s: StateRow, amount: number): number | null {
  if (!s.fee) return null;
  for (const [upTo, fee] of s.fee) if (amount <= upTo) return fee;
  return s.fee[s.fee.length - 1][1];
}
/** The one wording of the filing fee, used by every checker, calculator and table of the site (testeurs naifs du
 *  2026-11-14 : « $30 » en tete de page et 58 $ dans le calculateur, « ask the clerk » puis 75 $ preremplis).
 *  Statewide schedule first, then the county figures read with it; never a figure that is not in states.json. */
export function feeLabel(s: StateRow, amount: number): string {
  const f = feeFor(s, amount);
  const local = (s.feeLocal ?? []).map(([where, fee]) => `${usd0(fee)} in ${where}`).join('; ');
  if (f !== null) return local ? `${usd0(f)} statewide; ${local}` : usd0(f);
  return local ? `Varies by county, e.g. ${local}: ask your clerk` : 'Ask the court clerk: no statewide figure on this site';
}
export interface Check { cap: number; fits: boolean; over: number; room: number; fee: number | null; feeShare: number | null }
export function check(s: StateRow, amount: number, party: Party = 'person', filed = RETRIEVED): Check {
  const cap = limitFor(s, party, filed);
  const fits = amount <= cap;
  const fee = feeFor(s, Math.min(amount, cap));
  return { cap, fits, over: fits ? 0 : amount - cap, room: fits ? cap - amount : 0, fee, feeShare: fee !== null && amount > 0 ? fee / amount : null };
}
/** Ranking of the limits, highest first (ties keep alphabetical order). */
export const ranking = () => [...STATES].sort((a, b) => b.cap - a.cap || a.name.localeCompare(b.name));
export const rankOf = (code: string) => ranking().findIndex((x) => x.code === code) + 1;
export const median = () => { const c = STATES.map((x) => x.cap).sort((a, b) => a - b); return c[(c.length - 1) / 2]; };
export const countAtLeast = (x: number) => STATES.filter((s) => s.cap >= x).length;

/** What a suit costs you: fees paid up front plus the pay you lose for the hours away from work. */
export function suitCost(o: { fee: number; service: number; hours: number; hourly: number; other: number }) {
  const upfront = o.fee + o.service;
  const lostPay = o.hours * o.hourly;
  return { upfront, lostPay, total: upfront + lostPay + o.other };
}
/** Simple interest on a sum owed: amount × annual rate × months / 12. */
export function simpleInterest(amount: number, ratePct: number, months: number) {
  const interest = amount * (ratePct / 100) * (months / 12);
  return { interest, total: amount + interest };
}
/** A judgment paid in monthly installments: number of payments, the last one, and the interest that accrues meanwhile. */
export function payPlan(balance: number, monthly: number, ratePct = 0) {
  if (monthly <= 0 || balance <= 0) return { months: Infinity, interest: 0 };
  let b = balance, m = 0, interest = 0;
  const r = ratePct / 100 / 12;
  while (b > 0.005 && m < 600) { const i = b * r; interest += i; b = b + i - monthly; m += 1; if (i >= monthly) return { months: Infinity, interest }; }
  return { months: m, interest };
}
/** Months left before a deadline of `years` counted from an event `monthsAgo` months back. */
export function monthsLeft(years: number, monthsAgo: number) { return years * 12 - monthsAgo; }

/* Courts other than small claims, read on 2026-11-14 (src/data/other-courts.json): defamation deadlines of eight
 * states, the federal routes for money claims against the United States, New York's Court of Claims. */
export const OTHER_COURTS = OTHER;
export const OTHER_READ = OTHER.retrieved_at;
export interface DefamationRow { code: string; years: number; cite: string; url: string }
export const DEFAMATION: DefamationRow[] = OTHER.defamation;
export const LITTLE_TUCKER_CAP = OTHER.federal.littleTucker.cap;
export type Target = 'private' | 'state' | 'federal';
export type Kind = 'money' | 'tort';
export interface Route { court: string; first: string | null; law: string; deadline: string; small: boolean }
/** Which court usually hears a money claim: small claims for a person or business sued for an amount under the
 *  state's limit, the state's ordinary civil court above it; for the United States, the Court of Federal Claims
 *  (contract and other money claims, also the district courts up to $10,000), or a written claim to the agency and
 *  then the district court for injury or damage (Federal Tort Claims Act). Claims against a state follow that
 *  state's own route (New York: the Court of Claims). */
export function routeFor(s: StateRow, target: Target, kind: Kind, amount: number, party: Party = 'person'): Route {
  const f = OTHER.federal;
  if (target === 'federal') {
    if (kind === 'tort') return { court: 'U.S. District Court, after a written claim to the agency', first: 'A written claim to the federal agency involved, then its answer or six months of silence', law: `${f.ftcaFirst.cite} and § 1346(b)(1)`, deadline: `${f.ftcaDeadline.years} years to present the claim (${f.ftcaDeadline.cite})`, small: false };
    const both = amount <= LITTLE_TUCKER_CAP;
    return { court: both ? 'U.S. Court of Federal Claims or U.S. District Court' : 'U.S. Court of Federal Claims', first: null, law: both ? `${f.tucker.cite} and ${f.littleTucker.cite}` : f.tucker.cite, deadline: `${f.cfcDeadline.years} years in the Court of Federal Claims (${f.cfcDeadline.cite})`, small: false };
  }
  if (target === 'state') {
    if (s.code === 'NY') return { court: 'New York Court of Claims', first: null, law: OTHER.nyCourtOfClaims.cite, deadline: 'Short: the notice period is in Court of Claims Act § 10; ask the clerk at once', small: false };
    return { court: `${s.name}’s own route for claims against the state`, first: 'Ask the clerk or the attorney general’s office which body hears claims against the state', law: `${s.name} law on claims against the state`, deadline: 'Often shorter than for a private claim: ask first', small: false };
  }
  const cap = limitFor(s, party);
  return amount <= cap
    ? { court: `${s.court}`, first: 'A demand letter, then the claim form at the clerk', law: s.cite, deadline: 'Depends on the kind of claim and is not given here: ask the clerk before you wait', small: true }
    : { court: `${s.name} regular civil court`, first: `Or cut the claim to the ${usd0(cap)} limit and give up the rest`, law: s.cite, deadline: 'Depends on the kind of claim and is not given here: ask the clerk before you wait', small: false };
}
/** What to write on the claim: the sum owed, other losses and simple interest, against the state's limit. */
export function claimTotal(s: StateRow, o: { owed: number; other: number; ratePct: number; months: number; party?: Party }) {
  const interest = o.owed * (o.ratePct / 100) * (o.months / 12);
  const total = o.owed + o.other + interest;
  const cap = limitFor(s, o.party ?? 'person');
  return { interest, total, cap, fits: total <= cap, over: Math.max(0, total - cap) };
}
/** Copies to bring: each document once for the judge, once per defendant and once for yourself. */
export function copiesNeeded(docs: number, defendants: number) { return { sets: 2 + defendants, sheets: docs * (2 + defendants) }; }
/** Fees paid up front: the state's filing fee (null where the county sets it) plus service on each defendant. */
export function upfrontFees(s: StateRow, amount: number, defendants: number, servicePer: number) {
  const filing = feeFor(s, Math.min(amount, limitFor(s)));
  const service = defendants * servicePer;
  return { filing, service, total: filing === null ? null : filing + service };
}
