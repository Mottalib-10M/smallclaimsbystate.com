import { definePage } from '../../lib/page-types';
import { st, feeFor } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('CA');
export default definePage({
  id: 'california-small-claims-court', group: 'states', order: 11, slug: 'california-small-claims-court',
  nav: 'California', card: `${usd(S.cap)} for a person, ${usd(S.capBiz!)} for a business, fees from ${usd(S.fee![0][1])}.`,
  title: 'California Small Claims Court 2026: $12,500 Limit and Fees',
  description: 'California small claims court in 2026: $12,500 for individuals, $6,250 for businesses, a $30 to $75 filing fee, the two-claims rule, and a check of your claim.',
  h1: `California small claims court: ${usd(S.cap)} for people, ${usd(S.capBiz!)} for businesses`,
  intro: `<strong>California small claims court</strong> lets a person claim up to <strong>${usd(S.cap)}</strong> and a business or other entity up to <strong>${usd(S.capBiz!)}</strong>, for a filing fee of ${usd(S.fee![0][1])} to ${usd(S.fee![2][1])}.`,
  resume: `California splits its small claims limit by who files. A natural person, including a sole proprietor, may ask for up to ${usd(S.cap)} under Code of Civil Procedure section 116.221; a corporation, partnership, LLC or public entity is held to ${usd(S.capBiz!)} under section 116.220. A second rule catches repeat filers: no one may bring more than two claims above $2,500 anywhere in the state in a calendar year. The fee follows the amount: ${usd(feeFor(S, 1500)!)} up to $1,500, ${usd(feeFor(S, 5000)!)} up to $5,000 and ${usd(feeFor(S, 12500)!)} above, and $100 for anyone who filed more than twelve small claims in the past twelve months. Lawyers cannot represent either side at the hearing, which the court sets about one to two months after filing according to the state’s self-help center.`,
  ...lockedState('CA'), toolTitle: 'Does your claim fit the California limit?',
  body: (h) => `
<h2>California small claims court limits for people and for businesses</h2>
<p>The person who signs the claim decides which ceiling applies. A landlord who owns a duplex in her own name sues as a person; the same landlord holding it through an LLC is a business and stops at ${usd(S.capBiz!)}. Set “Who files the claim” in the calculator to see the difference. Some county court pages still print ${usd(10000)}, the figure before the 2024 increase; the statewide self-help center gives ${usd(S.cap)}.</p>
${factsTable(h, 'CA')}
<h2>The two-claims rule and the fee for frequent filers</h2>
<p>A plaintiff who already filed two claims over $2,500 this calendar year must take a third one to the limited civil court, even if it is below ${usd(S.cap)}. Smaller claims are not counted. The fee rises to $100 for anyone with more than twelve small claims in the past twelve months, which mostly affects landlords and small businesses that collect their own debts.</p>
${h.mini('fee', { title: 'California filing fee for your amount', defaults: { st: 5, amount: 4000 }, locked: ['st'] })}
<h2>California compared with its neighbours</h2>
${neighboursTable(h, 'CA')}
<p>Next: ${h.a('small-claims-demand-letter', 'a free demand letter')} to send before you file, and ${h.a('how-to-sue-someone-in-small-claims-court', 'the steps of a case')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in California for a business?', a: '$6,250 under Code of Civil Procedure section 116.220. A sole proprietor suing in his own name counts as a person and can claim up to $12,500. The difference matters for a limited liability company or a corporation: it must cut a larger claim down to $6,250 or file in the limited civil division of the superior court.', open: true },
    { q: 'How many small claims can I file in California?', a: 'As many as you like up to $2,500, but no more than two above $2,500 in a calendar year anywhere in the state. A plaintiff who has filed more than 12 small claims in the past 12 months pays a higher fee of $100 per claim. Count your own filings before you go to the clerk.' },
    { q: 'Can I bring a lawyer to California small claims court?', a: 'No, parties appear for themselves, although they may consult a lawyer before the hearing. Each county court offers a free small claims advisor. The small claims advisor can explain forms, service and how to prepare evidence, at no cost. A lawyer may appear only in limited cases, such as when the lawyer is the party.' },
  ],
  related: ['small-claims-demand-letter', 'small-claims-court-filing-fee', 'arizona-small-claims-court'],
  sources: [...stateSources('CA'), ['California Code of Civil Procedure § 116.220', 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=116.220']],
});
