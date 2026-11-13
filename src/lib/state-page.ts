/** Shared pieces of a state page: the facts table, the neighbours, the sources. All figures from the engine. */
import { st, idx, rankOf, feeFor, limitFor, N_STATES, RETRIEVED, type StateRow } from './engine/claims';
import { usd, day } from './fmt';
import type { Helpers } from './page-types';

export const NEIGHBOURS: Record<string, string[]> = {
  AZ: ['CA', 'NV', 'UT', 'NM'], CA: ['OR', 'NV', 'AZ'], CO: ['UT', 'NM', 'KS', 'NE', 'WY'], CT: ['NY', 'MA', 'RI'],
  FL: ['GA', 'AL'], GA: ['FL', 'AL', 'TN', 'NC', 'SC'], ID: ['WA', 'OR', 'NV', 'UT', 'WY', 'MT'], IN: ['IL', 'OH', 'MI', 'KY'],
  MD: ['VA', 'PA', 'DE', 'WV', 'DC'], MI: ['OH', 'IN', 'WI'], NJ: ['NY', 'PA', 'DE'], NY: ['NJ', 'CT', 'PA', 'MA', 'VT'],
  NC: ['VA', 'SC', 'GA', 'TN'], TX: ['NM', 'OK', 'AR', 'LA'], UT: ['ID', 'NV', 'AZ', 'CO', 'WY'], WI: ['MN', 'IA', 'IL', 'MI'],
};
const READ = { statute: 'statute text read', court: 'court page read', index: 'official page read' } as const;
export const readHow = (s: StateRow) => READ[s.read];
export function factsTable(h: Helpers, code: string) {
  const s = st(code);
  const fees = s.fee ? s.fee.map(([upTo, f], i) => `${usd(f)} up to ${usd(Math.min(upTo, s.cap))}${i === s.fee!.length - 1 ? '' : ''}`).join('; ') : 'Set by each county or court: ask the clerk';
  const rows: Array<[string, string]> = [
    ['Small claims limit', usd(s.cap) + (s.capBiz ? ` (${usd(s.capBiz)} for businesses and other entities)` : '')],
    ...(s.next ? [['Scheduled change', `${usd(s.next.cap)} for cases filed from ${day(s.next.from)}`] as [string, string]] : []),
    ['Court', s.court], ['Law', h.ext(s.url, s.cite)], ['Filing fee', fees],
    ['Rank of the limit', `${rankOf(code)} of ${N_STATES} (1 = highest)`], ['Read on', `${day(RETRIEVED)} (${READ[s.read]})`],
  ];
  return h.table(['', `${s.name}`], rows, `${s.name} small claims at a glance`);
}
export function neighboursTable(h: Helpers, code: string) {
  const list = [code, ...(NEIGHBOURS[code] ?? [])].map(st);
  return h.table(['State', 'Limit', 'Filing fee at the limit', 'Court'], list.map((s) => [s.code === code ? `<strong>${s.name}</strong>` : s.name, usd(s.cap), (() => { const f = feeFor(s, limitFor(s)); return f === null ? 'by county' : usd(f); })(), s.court]), `${st(code).name} and its neighbours`, ['l', 'r', 'r', 'l']);
}
export function stateSources(code: string): Array<[string, string]> {
  const s = st(code);
  const out: Array<[string, string]> = [[`${s.name}: ${s.cite}`, s.url]];
  if (s.feeUrl && s.feeUrl !== s.url) out.push([`${s.name}: filing fees`, s.feeUrl]);
  return out;
}
export const lockedState = (code: string) => ({ tool: 'limit', toolDefaults: { st: idx(code) }, toolLocked: ['st'] });
