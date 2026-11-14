import { definePage } from '../../lib/page-types';
import { st, feeFor, OTHER_COURTS, OTHER_READ } from '../../lib/engine/claims';
import { usd, day } from '../../lib/fmt';
import { lockedState } from '../../lib/state-page';
const S = st('CA');
const LA = OTHER_COURTS.losAngeles.url;
const CAF = OTHER_COURTS.california;
export default definePage({
  id: 'los-angeles-small-claims-court', group: 'states', order: 3, slug: 'los-angeles-small-claims-court',
  nav: 'Los Angeles (LA)', card: `The Superior Court of Los Angeles County hears claims up to ${usd(S.cap)}.`,
  title: 'LA Small Claims Court 2026: $12,500 Limit in Los Angeles',
  description: 'LA small claims court in 2026: claims up to $12,500 for a person and $6,250 for a business at the Los Angeles Superior Court, fees from $30 and e-filing.',
  h1: `LA small claims court: up to ${usd(S.cap)} at the Los Angeles Superior Court`,
  intro: `<strong>LA small claims court</strong> is the small claims division of the Superior Court of California, County of Los Angeles: it hears claims up to <strong>${usd(S.cap)}</strong> filed by a person and <strong>${usd(S.capBiz!)}</strong> filed by a business, with no lawyers and no jury.`,
  resume: `Los Angeles follows California’s small claims law, so the limits and the filing fees are the state’s: ${usd(S.cap)} for a natural person, ${usd(S.capBiz!)} for a business or other entity, and no more than two claims above $2,500 by the same plaintiff in a calendar year. The filing fee is ${usd(feeFor(S, 1500)!)} up to $1,500, ${usd(feeFor(S, 5000)!)} up to $5,000 and ${usd(feeFor(S, S.cap)!)} above, or $100 for anyone who has filed more than 12 small claims in the past 12 months. What the Los Angeles court adds is its own organisation. It asks every small claims party to register for its Online Dispute Resolution before the scheduled hearing, it offers small claims e-filing, a digital evidence system and interpreter requests through its website, and its filing court locator tells you which of its courthouses takes your case. Lawyers cannot represent the parties at the hearing, the rules are simplified, and you do not need to be a United States citizen to file or to defend a case.`,
  ...lockedState('CA'), toolTitle: 'Does your claim fit the LA small claims limit?',
  body: (h) => `
<h2>LA small claims court at a glance</h2>
${h.table(['', 'Los Angeles'], [
    ['Limit for a person', usd(S.cap)],
    ['Limit for a business', usd(S.capBiz!)],
    ['Filing fee', `${usd(feeFor(S, 1500)!)} up to $1,500 · ${usd(feeFor(S, 5000)!)} up to $5,000 · ${usd(feeFor(S, S.cap)!)} above · $100 after 12 claims in 12 months`],
    ['Claim form', h.ext(CAF.formUrl, 'SC-100, Plaintiff’s Claim')],
    ['Before the hearing', 'Register for the court’s Online Dispute Resolution'],
    ['Filing', 'At a courthouse, by mail or through small claims e-filing'],
    ['Read on', `${day(OTHER_READ)}, on the court’s and California Courts’ own pages`],
  ], 'Los Angeles small claims at a glance')}
<h2>Which LA courthouse takes your case</h2>
<p>Los Angeles County has many courthouses. The court’s ${h.ext(LA, 'small claims page')} links to its filing court locator, which assigns the courthouse from the address that decides the venue, usually where the defendant lives or does business, or where the deal or the damage took place. ${h.a('small-claims-court-near-me', 'Finding the right court')} explains the usual venue rules.</p>
<h2>The steps the Los Angeles court adds</h2>
<ul>
<li><strong>Online Dispute Resolution</strong>: every small claims party must register before the hearing; it gives both sides a chance to settle without a trial.</li>
<li><strong>Evidence</strong>: the court has a digital evidence system and a standing order on the exchange of evidence; read it before the hearing.</li>
<li><strong>Interpreters</strong>: request one through the court’s web portal, in time for the hearing.</li>
<li><strong>Meeting before trial</strong>: the court has a standing order on meeting and conferring in small claims cases.</li>
</ul>
${h.mini('fees', { title: 'Your fees in an LA small claim', defaults: { st: 5, amount: 4000, defs: 1 } })}
<p>For the state rules behind these figures, read ${h.a('california-small-claims-court', 'California small claims court')}; to prepare the case, ${h.a('how-to-take-someone-to-small-claims-court', 'taking someone to small claims court')}.</p>`,
  faqs: [
    { q: 'How much can I sue for in LA small claims court?', a: `Up to ${usd(S.cap)} if you file as a person and ${usd(S.capBiz!)} if you file for a business, the California limits that the Los Angeles court applies. No one may file more than two claims above $2,500 in a calendar year. Above those amounts, the case goes to the civil division of the court.`, open: true },
    { q: 'Can I file my LA small claims case online?', a: 'Yes: the Los Angeles Superior Court offers small claims e-filing on its website, alongside filing at a courthouse and by mail. Before the hearing, every party must also register for the court’s Online Dispute Resolution. The court’s small claims page links to both services and to its courthouse locator.' },
    { q: 'Can a lawyer represent me in LA small claims court?', a: 'No. The court states that there are no lawyers, no rules of evidence and no juries in small claims, so each side presents its own case. You can still consult a lawyer before the hearing. You do not need to be a United States citizen to file or to defend a case.' },
  ],
  related: ['california-small-claims-court', 'small-claims-court-near-me', 'file-small-claims'],
  sources: [['Superior Court of California, County of Los Angeles: Small Claims', LA], ['California Courts: file your plaintiff’s claim (fees)', CAF.fileUrl], ['California Courts: form SC-100', CAF.formUrl]],
});
