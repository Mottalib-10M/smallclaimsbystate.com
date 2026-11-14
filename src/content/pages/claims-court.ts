import { definePage } from '../../lib/page-types';
import { st, idx, median, OTHER_COURTS, OTHER_READ, LITTLE_TUCKER_CAP, N_STATES } from '../../lib/engine/claims';
import { usd, day } from '../../lib/fmt';
const F = OTHER_COURTS.federal;
export default definePage({
  id: 'claims-court', group: 'guides', order: 7, slug: 'claims-court',
  nav: 'Which claims court?', card: 'Small claims, a state court of claims or the U.S. Court of Federal Claims: who hears what.',
  title: 'Claims Court: Small Claims, State or Federal Claims 2026',
  description: 'Claims court in 2026: small claims for people and businesses, a court of claims against a state, the U.S. Court of Federal Claims for federal money. Free check.',
  h1: 'Claims court: which court hears your claim?',
  intro: `“<strong>Claims court</strong>” covers three different courts: small claims court for a person or a business (a median limit of <strong>${usd(median())}</strong> across ${N_STATES} jurisdictions), a court of claims for suits against a state, and the <strong>U.S. Court of Federal Claims</strong> for money claims against the United States.`,
  resume: `Most people who type “claims court” want small claims court: the simplified court where a tenant, a customer or a contractor asks a person or a business for a sum of money, without a lawyer. Each state sets its own ceiling and names the court in its own way, from the Justice Court in Texas to the Magistrate Court in Georgia. Two other courts carry the word “claims” and work very differently. A state cannot always be sued in its ordinary courts: New York, for one, sends money claims against the state to its Court of Claims under § 9 of the Court of Claims Act, with short notice periods. And money claims against the federal government go to the U.S. Court of Federal Claims in Washington under the Tucker Act, while injury or damage caused by a federal employee starts with a written claim to the agency. The checker above sorts your case into one of these routes before you pay any fee.`,
  tool: 'court', toolTitle: 'Which claims court hears your case?',
  body: (h) => `
<h2>Claims court for a person or a business: small claims</h2>
<p>If you are owed money by a person, a landlord, a shop or a contractor, the claims court you need is your state’s small claims court, as long as the amount fits its limit. Above the limit, the case goes to the regular civil court of the state, or you give up the excess. The limit is set by statute or court rule, and it changed recently in several states.</p>
${h.table(['State', 'Small claims limit', 'Court that hears it'], ['CA', 'TX', 'NY', 'FL', 'GA', 'IL'].map((c) => [st(c).name, usd(st(c).cap), st(c).court]), 'Small claims, the claims court of everyday disputes (six large states)', ['l', 'r', 'l'])}
<p>Every state is on ${h.a('small-claims-court-limits', 'the table of small claims limits')}, and the ${h.a('how-to-sue-someone-in-small-claims-court', 'step-by-step guide')} explains the procedure.</p>
<h2>A court of claims for suits against a state</h2>
<p>A state agency, a state university or a state hospital is not sued like a neighbour. In New York, the Court of Claims hears claims against the state for breach of contract and for the torts of its officers and employees, and the Court of Claims Act sets deadlines for filing a claim or a notice of intention that are much shorter than the usual limitation periods. Other states use their own body or their ordinary courts, each under its own law. Before anything else, ask the clerk or the attorney general’s office which body hears your claim and by when.</p>
${h.mini('court', { title: 'Try a claim against a New York agency', defaults: { target: 2, st: idx('NY'), amount: 6000 } })}
<h2>The U.S. Court of Federal Claims</h2>
<p>The Court of Federal Claims sits in the ${h.ext('https://www.uscfc.uscourts.gov/court-location-hours', 'National Courts Building, 717 Madison Place NW, Washington, D.C.')} and hears money claims against the United States founded on the Constitution, a federal statute or regulation, or a contract with the government, under ${h.ext(F.tucker.url, F.tucker.cite)}. For claims up to ${usd(LITTLE_TUCKER_CAP)}, the federal district courts share that power under ${h.ext(F.littleTucker.url, F.littleTucker.cite)}, so a small claim can be brought closer to home. The time limit is six years under ${h.ext(F.cfcDeadline.url, F.cfcDeadline.cite)}.</p>
<h2>Injury or damage caused by a federal employee</h2>
<p>A car accident with a postal truck or damage caused by a federal worker on duty does not go to a claims court first. Under the Federal Tort Claims Act, you must present a written claim to the agency involved, within two years under ${h.ext(F.ftcaDeadline.url, F.ftcaDeadline.cite)}, and you can sue in the federal district court only after the agency denies it in writing or lets six months pass without a final answer, as ${h.ext(F.ftcaFirst.url, F.ftcaFirst.cite)} provides.</p>
${h.mini('court', { title: 'Try damage caused by a federal vehicle', defaults: { target: 3, kind: 2, amount: 4200 } })}
<p>Laws read on ${day(OTHER_READ)} on the official sites (govinfo.gov for the U.S. Code, the New York Senate for state law). This page is general information: it does not tell you how your own case will be decided.</p>`,
  faqs: [
    { q: 'Is claims court the same as small claims court?', a: 'In everyday speech, usually yes: people say claims court for the small claims court of their county. Legally, a court of claims is a court that hears suits against a government, such as the New York Court of Claims or the U.S. Court of Federal Claims. Use the checker above to see which one fits your case before you file anything.', open: true },
    { q: 'Can I sue the federal government in small claims court?', a: 'No. State small claims courts cannot hear money claims against the United States. Contract and other money claims go to the U.S. Court of Federal Claims, or to a federal district court up to $10,000. Injury and damage claims start with a written claim to the agency under the Federal Tort Claims Act, within two years.' },
    { q: 'Can I sue a state agency in small claims?', a: 'It depends on the state, and often not. New York sends money claims against the state to its Court of Claims, with short notice periods. Elsewhere the route and the deadline are set by each state’s own law. The clerk of your local court or the state attorney general’s office tells you where such a claim is filed.' },
  ],
  related: ['how-to-sue-someone', 'small-claims-court-limits', 'how-to-sue-someone-in-small-claims-court'],
  sources: [[`${F.tucker.cite} (govinfo.gov)`, F.tucker.url], [`${F.littleTucker.cite} (govinfo.gov)`, F.littleTucker.url], [`${F.ftcaFirst.cite} (govinfo.gov)`, F.ftcaFirst.url], [OTHER_COURTS.nyCourtOfClaims.cite, OTHER_COURTS.nyCourtOfClaims.url], ['U.S. Court of Federal Claims: location', 'https://www.uscfc.uscourts.gov/court-location-hours']],
});
