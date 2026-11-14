import { definePage } from '../../lib/page-types';
import { STATES, st, idx, OTHER_COURTS } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const CA = st('CA');
const LA = OTHER_COURTS.losAngeles.url;
export default definePage({
  id: 'file-small-claims', group: 'guides', order: 10, slug: 'file-small-claims',
  nav: 'Filing a claim', card: 'In person, by mail or online: how a small claim is filed and what the clerk needs.',
  title: 'File Small Claims in 2026: In Person, by Mail or Online',
  description: 'File small claims in 2026: the court that takes your claim in each state, filing in person, by mail or online, the copies the clerk needs and the fee to bring.',
  h1: 'File small claims: where, how and with what',
  intro: `To <strong>file small claims</strong>, you hand or send the claim form to the clerk of the right court with the fee; the court is named differently in each state, from the <strong>${st('TX').court}</strong> in Texas to the <strong>${st('GA').court}</strong> in Georgia.`,
  resume: `Filing is the moment a dispute becomes a case. You give the clerk a completed claim form, signed, with copies, and pay the filing fee or a fee waiver request; the clerk gives back a case number and, in many courts, the date of the hearing. Three things must be right at that moment. The court must be the one that hears small claims in your state and in the right county or precinct. The amount must fit the limit. And the defendant must be named the way the law knows them, the full name of a person or the registered name of a business. How you file depends on the court: at the counter in every state, by mail in many, and online where the court runs an e-filing system. California, for example, accepts filing by mail with the original, two copies, the fee and a self-addressed stamped envelope, and the Los Angeles court offers small claims e-filing. The checker above names the court of your state and checks your amount.`,
  tool: 'file', toolTitle: 'Where you file and for how much',
  body: (h) => `
<h2>Three ways to file small claims</h2>
<h3>At the clerk’s counter</h3>
<p>Every court takes claims in person. In California, the clerk keeps the original, stamps the copies, gives you a case number and a court date, and returns one copy for you and one for each person or business you sue, as the ${h.ext(CA.url, 'California Courts self-help guide')} explains.</p>
<h3>By mail</h3>
<p>Many courts accept a claim by mail. California asks for the original and two copies, the filing fee and a self-addressed stamped envelope so the clerk can mail your copies back.</p>
<h3>Online</h3>
<p>Courts with an e-filing system take the claim through a web portal, with payment by card. The ${h.ext(LA, 'Los Angeles Superior Court')} offers small claims e-filing; other courts list it on their small claims pages. Paper copies are then not needed at filing, but bring printed evidence to the hearing.</p>
${h.mini('file', { title: 'Check a $7,500 claim in Washington', defaults: { st: idx('WA'), amount: 7500 } })}
<h2>What to check before you file small claims</h2>
<ul>
<li><strong>The amount</strong> fits the limit of the state, and of your category if you file as a business.</li>
<li><strong>The defendant’s name</strong> is complete; for a company, the name on the Secretary of State’s record.</li>
<li><strong>The court</strong> is in the county or precinct where the case belongs; ${h.a('small-claims-court-near-me', 'finding the right court')} explains the usual rules.</li>
<li><strong>The fee</strong> is ready, or the fee waiver form is filled in. ${h.a('small-claims-court-fees', 'The fees')} add up what you pay before the hearing.</li>
</ul>
<h2>The court that takes small claims in each state</h2>
${h.table(['State', 'Court', 'Limit'], STATES.map((s) => [s.name, s.court, usd(s.cap)]), 'Where small claims are filed, read on 13 November 2026', ['l', 'l', 'r'])}`,
  faqs: [
    { q: 'Can I file small claims online?', a: 'In courts that run an e-filing system, yes: the Los Angeles Superior Court, for example, offers small claims e-filing. Elsewhere you file at the counter or by mail. The small claims page of your county court says which methods it accepts and how it takes payment, so check it before you travel to the courthouse.', open: true },
    { q: 'What do I need to file a small claim?', a: 'The claim form of your state, filled in and signed, copies for each defendant and for yourself, and the filing fee or a fee waiver request. Bring the defendant’s full legal name and address. Evidence is not filed with the claim in most courts: you bring it to the hearing, sorted and copied.' },
    { q: 'Where do I file small claims?', a: 'In the court that hears small claims in your state, in the county or precinct where the defendant lives or does business, or where the deal or the damage took place, depending on the state’s venue rules. The clerk of that court confirms whether the case belongs there before you pay the filing fee.' },
  ],
  related: ['small-claims-court-paperwork', 'small-claims-court-near-me', 'how-to-sue-someone-in-small-claims-court'],
  sources: [['California Courts: file your plaintiff’s claim', CA.url], ['Los Angeles Superior Court: Small Claims', LA], [`Washington: ${st('WA').cite}`, st('WA').url]],
});
