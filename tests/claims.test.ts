import { describe, expect, it } from 'vitest';
import { STATES, N_STATES, st, idx, byIdx, limitFor, feeFor, check, rankOf, median, countAtLeast, suitCost, simpleInterest, payPlan, monthsLeft } from '../src/lib/engine/claims';
import { getSpec, KINDS } from '../src/lib/mini-specs';

describe('data', () => {
  it('has 51 jurisdictions, each with a source and a reading mark', () => {
    expect(N_STATES).toBe(51);
    for (const s of STATES) { expect(s.url).toMatch(/^https:\/\//); expect(['statute', 'court', 'index']).toContain(s.read); expect(s.cap).toBeGreaterThan(0); }
  });
  it('keeps the limits read on 2026-11-13', () => {
    expect(st('TX').cap).toBe(20000); expect(st('CA').cap).toBe(12500); expect(st('CA').capBiz).toBe(6250);
    expect(st('ID').cap).toBe(15000); expect(st('KY').cap).toBe(2500); expect(st('GA').next).toEqual({ cap: 25000, from: '2027-01-01' });
  });
});
describe('engine', () => {
  it('indexes states from 1', () => { expect(byIdx(idx('MI')).code).toBe('MI'); expect(idx('AL')).toBe(1); });
  it('applies business limits and scheduled changes', () => {
    expect(limitFor(st('CA'), 'business')).toBe(6250);
    expect(limitFor(st('GA'), 'person', '2027-01-01')).toBe(25000);
    expect(limitFor(st('GA'), 'person', '2026-12-31')).toBe(15000);
  });
  it('reads fee steps', () => {
    expect(feeFor(st('CA'), 1500)).toBe(30); expect(feeFor(st('CA'), 1500.01)).toBe(50); expect(feeFor(st('MI'), 7000)).toBe(65);
    expect(feeFor(st('TX'), 1000)).toBeNull();
  });
  it('checks an amount', () => {
    const c = check(st('NJ'), 6000);
    expect(c.fits).toBe(false); expect(c.over).toBe(1000); expect(c.fee).toBe(35);
  });
  it('ranks and counts', () => {
    expect(rankOf('DE')).toBe(1); expect(median()).toBe(10000); expect(countAtLeast(20000)).toBe(6);
  });
  it('does the arithmetic of the side calculators', () => {
    expect(suitCost({ fee: 75, service: 40, hours: 8, hourly: 25, other: 0 }).total).toBe(315);
    expect(simpleInterest(1200, 10, 12).interest).toBeCloseTo(120, 6);
    expect(monthsLeft(3, 20)).toBe(16);
    expect(payPlan(1000, 100, 0).months).toBe(10);
  });
});
describe('mini specs', () => {
  it('every kind runs on its defaults', () => {
    for (const k of KINDS) {
      const spec = getSpec(k, 'en');
      const v = Object.fromEntries(spec.inputs.map((i: { id: string; def: number }) => [i.id, i.def]));
      const r = spec.run(v as Record<string, number>);
      expect(r.head.length).toBe(2);
    }
  });
});
