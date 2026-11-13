import { definePage } from '../../lib/page-types';
import { st, rankOf, countAtLeast } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('CT');
export default definePage({
  id: 'connecticut-small-claims-court', group: 'states', order: 18, slug: 'connecticut-small-claims-court',
  nav: 'Connecticut', card: `Superior Court small claims session up to ${usd(S.cap)}; libel and slander excluded.`,
  title: 'Connecticut Small Claims Court 2026: $5,000 Limit Explained',
  description: 'Connecticut small claims court in 2026: the $5,000 limit of C.G.S. 51-15(d), the claims it leaves out, and how it compares with New York and Massachusetts.',
  h1: `Connecticut small claims court: a ${usd(S.cap)} session of the Superior Court`,
  intro: `<strong>Connecticut small claims court</strong> is a session of the Superior Court that hears money claims up to <strong>${usd(S.cap)}</strong>, under C.G.S. § 51-15(d); claims for libel and slander cannot use it.`,
  resume: `Connecticut runs a single trial court, the Superior Court, and small claims is one of its sessions rather than a separate court. Section 51-15(d) of the General Statutes, which we read in full, lets the judges make rules for a small claims procedure for money claims up to ${usd(S.cap)}, and expressly leaves out actions for libel or slander. That ceiling ranks ${rankOf('CT')} of 51: ${countAtLeast(S.cap + 1)} jurisdictions allow more. New York City allows ${usd(st('NY').cap)} and Massachusetts ${usd(st('MA').cap)}, so a dispute with someone across the state line can be worth bringing in the neighbour’s court when that court has jurisdiction over the defendant. The filing fee is set by the Judicial Branch and is not in the statute; we did not reach the official fee page, so this page does not give a figure. The clerk of the small claims session will tell you.`,
  ...lockedState('CT'), toolTitle: 'Does your claim fit the Connecticut limit?',
  body: (h) => `
<h2>What Connecticut small claims court will not hear</h2>
<p>Besides the ${usd(S.cap)} ceiling, the statute bars two kinds of claim: libel and slander. Someone defamed in a review or a letter has to go to the regular civil docket even if the damages claimed are small. Claims for money owed, property damage, deposits, unpaid wages and defective work all fit, as long as the amount does.</p>
${factsTable(h, 'CT')}
<h2>Above ${usd(S.cap)}</h2>
<p>A larger claim goes to the regular civil docket of the Superior Court, with formal pleadings and, often, a lawyer. Cutting a claim down to ${usd(S.cap)} is allowed, but the rest is lost: you cannot sue a second time for the remainder of the same debt.</p>
${h.mini('cost', { title: 'What a Connecticut small claim costs you', defaults: { claim: 2500 } })}
<h2>Connecticut and its neighbours</h2>
${neighboursTable(h, 'CT')}
<p>See ${h.a('new-york-small-claims-court', 'New York’s three limits')}, and ${h.a('small-claims-demand-letter', 'write a demand letter')} before you file.</p>`,
  faqs: [
    { q: 'What is the limit for small claims in Connecticut?', a: '$5,000, set by C.G.S. § 51-15(d). The small claims session belongs to the Superior Court, Connecticut’s single trial court. A larger claim goes to its regular civil docket, with formal pleadings. Cutting a claim down to fit is allowed, but the rest is then lost.', open: true },
    { q: 'Can I sue for defamation in Connecticut small claims?', a: 'No. The statute excludes actions for libel or slander from the small claims procedure. A claim for libel or slander must go through the regular civil docket of the Superior Court, even when the damages are small. Other claims for money fit as long as the amount does.' },
    { q: 'Where is the Connecticut small claims fee published?', a: 'By the Judicial Branch, not in the statute. Ask the clerk of the small claims session for the current figure. The Judicial Branch sets the fee and the forms, which are available from the clerk of the small claims session. Ask also about the cost of serving the defendant.' },
  ],
  related: ['new-york-small-claims-court', 'small-claims-court-limits', 'how-to-sue-someone-in-small-claims-court'],
  sources: [...stateSources('CT')],
});
