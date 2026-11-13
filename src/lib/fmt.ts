/** Display formats (en-US): whole dollars on results, official fees as published. */
import { formatMoney, formatNumber, formatPercent, displayDate } from './format';
export const usd = (x: number) => formatMoney(Math.round(x), 0);
export const num = (x: number, d = 0) => formatNumber(x, d);
export const pct = (x: number, d = 1) => formatPercent(x, d);
export const day = (iso: string) => displayDate(iso, 'en-US');
