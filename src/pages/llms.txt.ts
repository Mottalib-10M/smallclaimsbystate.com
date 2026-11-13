/** llms.txt (RECETTE §21), generated from the page registry. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { N_STATES, RETRIEVED } from '../lib/engine/claims';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> The small claims court limit of the ${N_STATES} US jurisdictions (50 states and DC), each read in the statute, court rule or court page on ${RETRIEVED}, with the court that hears the case, scheduled changes (Georgia 2027, Utah 2030), the business limits of California and Washington, and the statewide filing fees that courts publish. Free calculators: limit check, filing fee, cost of suing, interest, collection plan, deadline, and a demand letter generator. Independent site published by Radif Partners, not a law firm or a court; no legal advice. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...PAGES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## About', `- [How we read the laws](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
