import { definePage } from '../../lib/page-types';
import { STATES, st, idx, limitFor, N_STATES, RETRIEVED } from '../../lib/engine/claims';
import { usd, day } from '../../lib/fmt';

/* Limits in force on January 1, 2027: the 2026 figure, or the scheduled one of states.json (`next`) once its date is reached. */
const D27 = '2027-01-01';
const cap27 = (code: string) => limitFor(st(code), 'person', D27);
const moving = STATES.filter((s) => s.next && s.next.from.startsWith('2027'));
const later = STATES.filter((s) => s.next && s.next.from > '2027-12-31');
const ga = st('GA'), wi = st('WI'), ut = st('UT');
const top27 = Math.max(...STATES.map((s) => cap27(s.code)));
const atTop27 = STATES.filter((s) => cap27(s.code) === top27).map((s) => s.name);

export default definePage({
  id: 'small-claims-limits-2027', group: 'guides', order: 14, slug: 'small-claims-court-limits-2027',
  nav: 'Limits in 2027', card: `${moving.length} states raise their limit on January 1, 2027: Georgia to ${usd(ga.next!.cap)}, Wisconsin to ${usd(wi.next!.cap)}.`,
  title: 'Small Claims Court Limits 2027: What Changes by State',
  description: 'Small claims court limits in 2027 for all 50 states and DC: Georgia rises to $25,000 and Wisconsin to $15,000 on January 1, 2027, read in each enacted law.',
  h1: 'Small claims court limits in 2027, state by state',
  intro: `<strong>Small claims court limits in 2027</strong> change in ${moving.length} states on January 1: <strong>Georgia</strong> goes from ${usd(ga.cap)} to <strong>${usd(ga.next!.cap)}</strong> and <strong>Wisconsin</strong> from ${usd(wi.cap)} to <strong>${usd(wi.next!.cap)}</strong>; the other ${N_STATES - moving.length} keep their 2026 figure.`,
  resume: `Only laws already signed count for 2027, and we found two that move a small claims ceiling on January 1, 2027. In Georgia, House Bill 999 lifts the Magistrate Court limit from ${usd(ga.cap)} to ${usd(ga.next!.cap)} for actions filed from that day, which puts the state level with Delaware and Tennessee at the top of the country. In Wisconsin, 2025 Wisconsin Act 105, signed on March 20, 2026, raises the ceiling for debt, contract and replevin cases from ${usd(wi.cap)} to ${usd(wi.next!.cap)}, but leaves tort and personal injury claims at $5,000. Every other jurisdiction keeps the limit it has in 2026, as far as the statutes and court pages we read on ${day(RETRIEVED)} show. Utah has also written ${usd(ut.next!.cap)} into law, but only from ${day(ut.next!.from)}. What decides the limit is the date the case is filed, not the date of the debt or the accident, so a claim between the two figures can sometimes wait a few days.`,
  tool: 'limit', toolTitle: 'Check your amount against the 2027 limit', toolDefaults: { st: idx('GA'), amount: 20000, when: 2 },
  body: (h) => `
<h2>Every small claims limit for 2027</h2>
<p>The table gives the ceiling a person can claim in each jurisdiction for a case filed on ${day(D27)} or later, next to the figure in force in 2026. Where a state sets a lower figure for businesses, the row says so; Wisconsin’s separate $5,000 ceiling for tort claims is explained below. Fees and courts are on the ${h.a('small-claims-court-limits', '2026 limits page')}, which keeps the law behind each row.</p>
${h.table(['State', '2026', '2027', 'What changes'], STATES.map((s) => {
  const c27 = cap27(s.code);
  const what = c27 !== s.cap ? `Raised from ${day(s.next!.from)}` : s.next ? `No change; ${usd(s.next.cap)} from ${day(s.next.from)}` : 'No change';
  return [s.name, usd(s.cap), usd(c27) + (s.capBiz ? `<br><span class="text-xs">${usd(s.capBiz)} businesses</span>` : ''), what];
}), `Small claims limits for cases filed in 2026 and from ${day(D27)}`, ['l', 'r', 'r', 'l'])}
<h2>Georgia: ${usd(ga.next!.cap)} in Magistrate Court</h2>
<p>House Bill 999 rewrites section 15-10-2 of the Official Code of Georgia. Section 4(b) of the act applies the new ceiling to actions filed on or after ${day(ga.next!.from)}. With ${usd(ga.next!.cap)}, Georgia joins ${atTop27.filter((n) => n !== 'Georgia').join(' and ')} at the highest small claims figure in the United States. A landlord owed ${usd(20000)} in back rent and repairs, who today must give up ${usd(20000 - ga.cap)} or go to State Court, can file the full amount in January. Magistrate courts still set their own fees county by county, so the clerk gives the cost. The ${h.a('georgia-small-claims-court', 'Georgia page')} covers the court and how a case runs.</p>
<h2>Wisconsin: ${usd(wi.next!.cap)} for debts, $5,000 for torts</h2>
<p>2025 Wisconsin Act 105 amends section 799.01(1)(c) and (d) of the statutes. From ${day(wi.next!.from)}, replevin of property worth up to ${usd(wi.next!.cap)} and other civil money claims up to ${usd(wi.next!.cap)} use the small claims procedure; the act first applies to actions commenced or claims made on that date. The separate $5,000 ceiling for tort and personal injury claims is not touched, so a dog bite worth $7,000 still goes to the regular circuit court docket in 2027, while an unpaid invoice of $14,000 can stay in small claims. The ${h.a('wisconsin-small-claims-court', 'Wisconsin page')} explains which claims count as torts.</p>
${h.mini('limit', { title: 'Wisconsin from January 1, 2027', defaults: { st: idx('WI'), amount: 14000, when: 2 } })}
<h2>Filing just before or just after January 1</h2>
<p>A claim of ${usd(18000)} in Georgia does not fit the ${usd(ga.cap)} limit on December 31, 2026, but fits on ${day(D27)}. Waiting a few days can save the cost of a regular civil case, as long as no statute of limitations runs out in between. The reverse never helps: the higher ceiling does not reach back to a case already filed, and a plaintiff who split one loss into two claims to stay under the old limit cannot merge them later. Check the deadline in the ${h.a('how-to-sue-someone-in-small-claims-court', 'steps of a small claims case')} before you decide to wait.</p>
<h2>Changes written into law for later years</h2>
<p>${later.length ? later.map((s) => `${s.name} moves from ${usd(s.cap)} to ${usd(s.next!.cap)} on ${day(s.next!.from)}.`).join(' ') : ''} Nothing changes there in 2027. Bills to raise the ceiling were introduced in several other legislatures in 2026; until one is signed, this page keeps the figure of the statute in force and the table above will change only when a law is enacted.</p>
<h2>How the 2027 figures were read</h2>
<p>Each 2027 figure comes from an enacted law: the Georgia act signed by the Governor and published on the Governor’s site, and the Wisconsin act with the Governor’s release of March 20, 2026. For the ${N_STATES - moving.length} other jurisdictions, the 2027 column repeats the limit read on ${day(RETRIEVED)} in the statute or court page named on the ${h.a('method', 'method page')}. If a state passes a change before January, it will be added here with its source.</p>`,
  faqs: [
    { q: 'Which states raise their small claims limit in 2027?', a: `Georgia and Wisconsin, both on January 1, 2027. Georgia’s Magistrate Court goes from ${usd(ga.cap)} to ${usd(ga.next!.cap)} under House Bill 999. Wisconsin goes from ${usd(wi.cap)} to ${usd(wi.next!.cap)} for debt, contract and replevin cases under 2025 Wisconsin Act 105, with tort claims still capped at $5,000. We found no other enacted change for 2027.`, open: true },
    { q: 'What will be the highest small claims limit in 2027?', a: `${usd(top27)}, in ${atTop27.join(', ').replace(/, ([^,]*)$/, ' and $1')}. Delaware and Tennessee reach it through the Justice of the Peace Court and General Sessions Court rather than a separate small claims court, and Georgia joins them on January 1, 2027. Minnesota, Texas, Utah and West Virginia stay at ${usd(20000)}.` },
    { q: 'Does the 2027 limit apply to a debt from 2026?', a: 'Yes. The ceiling that counts is the one in force on the day the case is filed. An invoice unpaid since 2025 can be claimed up to the new figure if the claim is filed on or after January 1, 2027, provided the deadline to sue has not passed. A case filed in December 2026 stays under the old limit.' },
    { q: 'Do small claims filing fees change in 2027?', a: 'Not through the two acts above. Fees are set by court rules, state fee schedules or each county, and the statewide figures shown on this site are those published by the courts on the date read. Georgia magistrate courts publish their own schedules county by county, so the clerk of the court where you file gives the figure for 2027.' },
  ],
  related: ['small-claims-court-limits', 'georgia-small-claims-court', 'wisconsin-small-claims-court', 'small-claims-court-filing-fee'],
  sources: [['Georgia HB 999 (2026), signed', ga.url], ['2025 Wisconsin Act 105 (Senate Bill 787)', 'https://content.govdelivery.com/attachments/WIGOV/2026/03/20/file_attachments/3590473/sb787.pdf'], ['Wisconsin Governor: action on 27 bills, March 20, 2026', 'https://content.govdelivery.com/accounts/WIGOV/bulletins/40f385d'], ['Utah Code § 78A-8-102', ut.url]],
});
