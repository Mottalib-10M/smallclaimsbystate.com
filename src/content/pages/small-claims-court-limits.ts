import { definePage } from '../../lib/page-types';
import { STATES, st, ranking, median, countAtLeast, feeFor, feeLabel, limitFor, N_STATES, RETRIEVED } from '../../lib/engine/claims';
import { usd, day } from '../../lib/fmt';
const top = ranking()[0], low = ranking()[N_STATES - 1];
const changed = STATES.filter((s) => s.next || ['ID', 'NE', 'MN', 'UT', 'MI'].includes(s.code));
export default definePage({
  id: 'small-claims-court-limits', group: 'guides', order: 1, slug: 'small-claims-court-limits',
  nav: 'Limits of the 50 states and DC', card: `From ${usd(low.cap)} in ${low.name} to ${usd(top.cap)}: every limit with its law.`,
  title: 'Small Claims Court Limits 2026: Maximum Amount by State',
  description: 'Small claims court limits for 2026 in all 50 states and DC, read in each statute or court rule, with the court, the filing fee and the changes of 2026 and 2027.',
  h1: 'Small claims court limits by state in 2026',
  intro: `<strong>Small claims court limits</strong> run from <strong>${usd(low.cap)}</strong> in ${low.name} to <strong>${usd(top.cap)}</strong> in ${STATES.filter((s) => s.cap === top.cap).map((s) => s.name).join(' and ')}; half the jurisdictions sit at ${usd(median())} or less.`,
  resume: `We read the limit of each of the ${N_STATES} jurisdictions in the law that sets it, not in another website’s table, on ${day(RETRIEVED)}. The exercise was worth it: three of the six pages that lead search results for this question give Arizona a ceiling of $2,500 or $3,500 when section 22-503 of the Arizona statutes says ${usd(st('AZ').cap)}, and four give Kansas $4,000 when K.S.A. 61-2703 now says ${usd(st('KS').cap)}. Limits also move more often than those tables admit: Idaho tripled its ceiling on July 1, 2026, Georgia’s magistrate courts go to ${usd(25000)} for cases filed from January 1, 2027, and Utah, Minnesota, Michigan and Nebraska changed theirs since 2024. Each row below names the law, the court, how we read it and the official filing fee where one exists statewide.`,
  tool: 'limit', toolTitle: 'Check your amount against any state’s limit',
  body: (h) => `
<h2>Small claims court limits of the 50 states and DC</h2>
<p>The limit is the most a plaintiff can ask the court to award in a small claims case, usually not counting interest and court costs. In ${countAtLeast(10000)} jurisdictions it reaches ${usd(10000)} or more; in ${STATES.filter((s) => s.cap <= 5000).length} it is ${usd(5000)} or less. Where a state has no separate small claims court, the row gives the limit of the court that plays that role, such as the Justice of the Peace Court in Delaware or General Sessions in Tennessee.</p>
${h.table(['State', 'Limit', 'Court', 'Fee at the limit', 'Law'], STATES.map((s) => { const f = feeFor(s, limitFor(s)); return [s.name, usd(s.cap) + (s.capBiz ? `<br><span class="text-xs">${usd(s.capBiz)} businesses</span>` : '') + (s.next ? `<br><span class="text-xs">${usd(s.next.cap)} from ${day(s.next.from)}</span>` : ''), s.court, f === null ? 'by county' : feeLabel(s, limitFor(s)), h.ext(s.url, s.cite)]; }), `Small claims limits read on ${day(RETRIEVED)}`, ['l', 'r', 'l', 'r', 'l'])}
<h2>Limits that changed recently</h2>
<p>A limit read in an old guide is the most common reason a claim is filed in the wrong court. These are the jurisdictions whose figure moved since 2024 or will move on a date already written into law.</p>
<ul>${changed.map((s) => `<li><strong>${s.name}</strong>: ${s.note || `${usd(s.cap)} today`}</li>`).join('')}</ul>
<h2>What the limit does and does not include</h2>
<p>Most statutes measure the claim “exclusive of interest and costs”, so the judgment can exceed the limit by the filing fee and the interest the law adds. Attorney fees are treated differently: Texas and Utah count them inside the limit, while Maryland and South Dakota leave them out when a contract or a statute allows them. A plaintiff whose loss is larger than the limit can usually waive the excess and stay in small claims, but cannot split one loss into two cases to get around the ceiling.</p>
${h.mini('fee', { title: 'Filing fee in the state you picked' })}
<p>How each figure was read is on the ${h.a('method', 'method page')}. For the steps of a case, read ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue someone in small claims court')}.</p>`,
  faqs: [
    { q: 'Which state has the highest small claims limit?', a: `Delaware and Tennessee, at $25,000, but neither has a separate small claims court: the limit is that of the Justice of the Peace Court and General Sessions Court. Georgia joins them for cases filed from January 1, 2027. Minnesota, Texas, Utah and West Virginia follow at $20,000. A high ceiling helps a contractor or a landlord with a large unpaid bill, but the hearing stays short, so the evidence must be ready.`, open: true },
    { q: 'Which state has the lowest small claims limit?', a: `Kentucky, at $2,500 under KRS 24A.230, followed by Mississippi’s justice courts at $3,500. A Kentucky claimant with more at stake has to file in the regular district court docket or give up the part above $2,500. The calculator above shows how far over the line an amount is.` },
    { q: 'Why do other websites give different limits?', a: 'Many copy older tables. We found Arizona listed at $2,500 or $3,500 and Kansas at $4,000 on pages updated in 2026, while the statutes read $5,000 and $10,000. Each row on this site keeps the law, the address we read and the date. If a page you trust shows another figure, open the statute linked in our table and compare the two.' },
  ],
  related: ['how-to-sue-someone-in-small-claims-court', 'small-claims-court-filing-fee', 'georgia-small-claims-court'],
  sources: [['Arizona Revised Statutes § 22-503', st('AZ').url], ['Kansas Statutes § 61-2703', st('KS').url], ['Georgia HB 999 (2026)', st('GA').url], ['Idaho Code § 1-2301', st('ID').url]],
});
