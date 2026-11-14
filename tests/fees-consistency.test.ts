/**
 * One source per state (testeurs naïfs du 2026-11-14) : Géorgie $25,000 dans un checker et $15,000 dans la liste,
 * Arizona « $30 » en tête et 58 $ préremplis, Connecticut « ask the clerk » puis 75 $ préremplis.
 * For every state, the list, the tables, the checkers and the cost calculator must say the same thing, and no page
 * may type a fee figure into a calculator: the fee comes from states.json only.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { STATES, idx, feeFor, feeLabel, limitFor, RETRIEVED, suitCost } from '../src/lib/engine/claims';
import { getSpec, costFee } from '../src/lib/mini-specs';
import { usd } from '../src/lib/fmt';
import { factsTable, neighborsTable } from '../src/lib/state-page';
import { helpers } from '../src/lib/helpers';

const row = (rows: Array<[string, string]>, label: string) => rows.find(([l]) => l === label)?.[1];
const defaults = (kind: string) => Object.fromEntries(getSpec(kind, 'en').inputs.map((i) => [i.id, i.def]));

describe('fees: one wording per state, everywhere', () => {
  for (const s of STATES) {
    const i = idx(s.code);
    const cap = limitFor(s);
    it(`${s.code}: checker, cost calculator and tables agree`, () => {
      const label = feeLabel(s, cap);
      // the checker at the limit
      const lim = getSpec('limit', 'en').run({ ...defaults('limit'), st: i, amount: cap });
      expect(row(lim.rows, 'Filing fee for this amount')).toBe(label);
      expect(lim.head[1]).toBe(usd(cap));
      // the cost calculator with nothing typed: the published fee, or nothing counted and the clerk named
      const v = { ...defaults('cost'), st: i, claim: cap };
      const cost = getSpec('cost', 'en').run(v);
      const f = feeFor(s, cap);
      expect(costFee(v)).toBe(f);
      expect(cost.head[1]).toBe(usd(suitCost({ fee: f ?? 0, service: v.service, hours: v.hours, hourly: v.hourly, other: v.other }).total));
      if (f === null) {
        expect(row(cost.rows, 'Filing fee')).toBe('Not counted yet');
        expect(cost.alert).toMatch(/ask the clerk/);
        for (const [, fee] of s.feeLocal ?? []) expect(cost.alert).toContain(usd(fee));
      } else {
        expect(row(cost.rows, 'Filing fee')).toBe(label);
      }
      // the state's tables
      const facts = factsTable(helpers(), s.code);
      if (f === null) expect(facts).toContain(label);
      for (const [, fee] of s.feeLocal ?? []) expect(facts).toContain(usd(fee));
      // a figure the reader types wins, and is shown as theirs
      const typed = getSpec('cost', 'en').run({ ...v, clerk: 123, own: 123 });
      expect(row(typed.rows, 'Filing fee')).toBe('$123 (your figure)');
    });
    it(`${s.code}: the home list and the checker give the same limit for the same filing date`, () => {
      const today = getSpec('limit', 'en').run({ ...defaults('limit'), st: i, amount: 1000, when: 1 });
      expect(today.head[1]).toBe(usd(s.cap));
      if (s.next) {
        const later = getSpec('limit', 'en').run({ ...defaults('limit'), st: i, amount: 1000, when: 2 });
        expect(later.head[1]).toBe(usd(s.next.cap));
        expect(later.head[0]).toMatch(/from /); // the later figure always says from when
        const home = readFileSync(join(__dirname, '../src/components/HomePage.astro'), 'utf8');
        expect(home).toMatch(/s\.next && <span[^>]*>\{usd\(s\.next\.cap\)\} from/); // the list shows the change too
      }
    });
  }
  it('the neighbor tables use the same wording', () => {
    expect(neighborsTable(helpers(), 'CA')).toContain(feeLabel(STATES[idx('AZ') - 1], limitFor(STATES[idx('AZ') - 1])));
  });
  it('the home example is a state whose fee is published', () => {
    const d = defaults('limit');
    expect(feeFor(STATES[d.st - 1], d.amount)).not.toBeNull();
    expect(RETRIEVED).toBe('2026-11-13');
  });
});

describe('no fee figure typed into a page', () => {
  const dir = join(__dirname, '../src/content/pages');
  const files = [...readdirSync(dir).map((f) => join(dir, f)), join(__dirname, '../src/content/home.ts')];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    const calls = src.match(/mini\('(cost|fees|fee)'[^\n]*/g) ?? [];
    for (const c of calls) {
      it(`${f.split('/').pop()}: ${c.slice(0, 60)}`, () => {
        expect(c).not.toMatch(/\bfee:\s*\d/);
        const code = /st\('([A-Z]{2})'\)/.exec(src)?.[1];
        // on a state page, the calculator is locked on that state
        if (/-small-claims-court\.ts$/.test(f) && code && /mini\('cost'/.test(c)) expect(c).toContain(`st: idx('${code}')`);
      });
    }
  }
});
