/**
 * Small claims engine: limits and filing fees of the 50 states and DC (src/data/states.json, read on 2026-11-13),
 * the cost of a suit, interest on a demand and the pace of a payment plan. Pure functions, no network.
 */
import DATA from '../../data/states.json';

export interface StateRow {
  code: string; name: string; slug: string; cap: number; capBiz: number | null;
  next: { cap: number; from: string } | null;
  court: string; cite: string; url: string; read: 'statute' | 'court' | 'index'; note: string;
  fee: number[][] | null; feeUrl: string | null; feeNote: string;
}
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
/** A judgment paid in monthly instalments: number of payments, the last one, and the interest that accrues meanwhile. */
export function payPlan(balance: number, monthly: number, ratePct = 0) {
  if (monthly <= 0 || balance <= 0) return { months: Infinity, interest: 0 };
  let b = balance, m = 0, interest = 0;
  const r = ratePct / 100 / 12;
  while (b > 0.005 && m < 600) { const i = b * r; interest += i; b = b + i - monthly; m += 1; if (i >= monthly) return { months: Infinity, interest }; }
  return { months: m, interest };
}
/** Months left before a deadline of `years` counted from an event `monthsAgo` months back. */
export function monthsLeft(years: number, monthsAgo: number) { return years * 12 - monthsAgo; }
