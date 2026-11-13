import { definePage } from '../../lib/page-types';
import { st } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('NJ');
export default definePage({
  id: 'new-jersey-small-claims-court', group: 'states', order: 15, slug: 'new-jersey-small-claims-court',
  nav: 'New Jersey', card: `Small claims section up to ${usd(S.cap)}, Special Civil Part up to $20,000; ${usd(S.fee![0][1])} to file.`,
  title: 'New Jersey Small Claims Court 2026: $5,000 Limit, $35 Fee',
  description: 'New Jersey small claims court in 2026: the $5,000 small claims section, the $20,000 Special Civil Part above it, the $35 filing fee and $10 mail service.',
  h1: `New Jersey small claims court: ${usd(S.cap)}, then the Special Civil Part`,
  intro: `<strong>New Jersey small claims court</strong> is a section of the Special Civil Part of the Superior Court that hears claims up to <strong>${usd(S.cap)}</strong> for a fee of <strong>${usd(S.fee![0][1])}</strong>; claims up to $20,000 go to the Special Civil Part itself.`,
  resume: `New Jersey handles small money disputes inside the Superior Court rather than in a court of its own. The small claims section of the Special Civil Part takes claims of ${usd(S.cap)} or less, with short forms that a person without a lawyer can fill in at the clerk’s window or online. Above that, and up to $20,000, the case stays in the Special Civil Part but follows its ordinary track, with longer pleadings and more time for the other side to answer. The Judiciary’s published fee schedule charges ${usd(S.fee![0][1])} to file a small claims complaint against one defendant and $5 for each additional defendant, plus $10 per defendant when the court serves the papers by mail. With a ${usd(S.cap)} ceiling, New Jersey sits well below New York City’s ${usd(st('NY').cap)} and Pennsylvania’s ${usd(st('PA').cap)}, which matters when the person you are suing lives across the river.`,
  ...lockedState('NJ'), toolTitle: 'Does your claim fit the New Jersey limit?',
  body: (h) => `
<h2>New Jersey small claims court or the Special Civil Part?</h2>
<p>Between ${usd(S.cap)} and $20,000 you have no small claims option: the claim goes to the regular track of the Special Civil Part. Under ${usd(S.cap)} the small claims section is the simpler route, with a single short complaint form and a hearing before a judge, usually without lawyers on either side.</p>
${factsTable(h, 'NJ')}
${h.mini('cost', { title: 'The cost of a New Jersey small claim', defaults: { claim: 2000, fee: 35, service: 10 } })}
<h2>Counting the fee when there are several defendants</h2>
<p>Suing a contractor and the company he works for, or two former roommates, means two defendants. Each one adds $5 to the filing fee and $10 to the mail service, so a claim against two people costs ${usd(S.fee![0][1] + 5 + 20)} before any other expense. If the court cannot deliver the papers by mail, a court officer or a private server has to do it, at a further charge that the clerk will tell you. Ask for these costs in the complaint: when you win, the judge can add them to what the other side owes.</p>
<h2>New Jersey and its neighbours</h2>
${neighboursTable(h, 'NJ')}
<p>See ${h.a('new-york-small-claims-court', 'New York’s three limits')} and ${h.a('how-to-sue-someone-in-small-claims-court', 'the steps of a case')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in New Jersey?', a: '$5,000 in the small claims section of the Special Civil Part. Claims up to $20,000 go to the Special Civil Part itself. Security deposit cases between landlord and tenant can also be heard in small claims within the same limit. A claim above $20,000 goes to the Law Division of the Superior Court.', open: true },
    { q: 'How much does it cost to file small claims in New Jersey?', a: '$35 for one defendant and $5 for each additional one, plus $10 per defendant for service by mail, according to the Judiciary’s court fee schedule. If mail service fails, a court officer may have to serve the papers in person, at an extra cost. Keep every receipt, because the judge can add filing and service costs to the judgment.' },
    { q: 'What if my New Jersey claim is $8,000?', a: 'It is too large for the small claims section. You can file it in the Special Civil Part, which hears claims up to $20,000, or cut the claim to $5,000 and give up the rest for good. The Special Civil Part uses longer forms and gives the defendant more time to answer, so plan for a slower case. Reducing the claim is final: the remaining $3,000 cannot be sued for later.' },
  ],
  related: ['new-york-small-claims-court', 'small-claims-court-filing-fee', 'small-claims-court-limits'],
  sources: [...stateSources('NJ')],
});
