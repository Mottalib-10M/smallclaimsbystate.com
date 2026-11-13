/** Writing tools passed to the body of every page. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers, MiniOpts } from './page-types';
import { formatNumber } from './format';
import { attributsTableau, etiquettes } from './tableaux';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
const attr = (s: string) => s.replace(/<[^>]*>/g, '').replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/"/g, '&quot;').trim();
/** Content table; from 3 columns it becomes cards under 768 px (lib/tableaux.ts). */
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = []) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  const { classe } = attributsTableau('auto', headers.length);
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm${classe ? ` ${classe}` : ''}">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => { const lab = etiquettes(headers, r.length); return `<tr>${r.map((c, i) => `<td data-label="${attr(lab[i])}" class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url.replace(/&/g, '&amp;')}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export function link(id: string, text: string) {
  if (!ROUTES.some((r) => r.id === id)) throw new Error(`Unknown page id in link: ${id}`);
  return `<a href="${route(id, 'en')}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, o?: MiniOpts) => `<!--mini:${kind}${o === undefined ? '' : `|${Buffer.from(JSON.stringify(o)).toString('base64')}`}-->`;
export const helpers = (): Helpers => ({ a: link, table, ext, box, mini });
