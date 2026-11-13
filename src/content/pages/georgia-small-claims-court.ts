import { definePage } from '../../lib/page-types';
import { st, rankOf } from '../../lib/engine/claims';
import { usd, day } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('GA');
export default definePage({
  id: 'georgia-small-claims-court', group: 'states', order: 13, slug: 'georgia-small-claims-court',
  nav: 'Georgia', card: `Magistrate court: ${usd(S.cap)} now, ${usd(S.next!.cap)} for cases filed from January 1, 2027.`,
  title: 'Georgia Small Claims Court 2026: $15,000, Then $25,000',
  description: 'Georgia small claims court in 2026: magistrate court hears claims up to $15,000, and HB 999 raises it to $25,000 for cases filed from January 1, 2027. Check it.',
  h1: `Georgia small claims court: ${usd(S.cap)} until ${usd(S.next!.cap)} arrives in 2027`,
  intro: `<strong>Georgia small claims court</strong> is the magistrate court of each county, which hears civil claims up to <strong>${usd(S.cap)}</strong> today and up to <strong>${usd(S.next!.cap)}</strong> for cases filed on or after ${day(S.next!.from)}.`,
  resume: `Georgia’s magistrate courts are its small claims courts: a plaintiff files a statement of claim, the clerk serves it, and a magistrate hears the case without a jury. The ceiling is in section 15-10-2 of the Official Code of Georgia, and the General Assembly changed it in 2026. House Bill 999, signed by the Governor, replaces ${usd(S.cap)} with ${usd(S.next!.cap)}; section 4 of the act makes that change effective on ${day(S.next!.from)} and applies it to actions filed on or after that date. A claim of $20,000 filed in December 2026 therefore belongs in state or superior court, or must be cut to ${usd(S.cap)}, while the same claim filed in January 2027 fits. Dispossessory cases, the eviction actions landlords bring, are not held to the dollar limit. Fees are set by each county’s magistrate court clerk.`,
  ...lockedState('GA'), toolTitle: 'Does your claim fit the Georgia limit, now or in 2027?', toolDefaults: { st: 11, amount: 20000 },
  body: (h) => `
<h2>Georgia small claims court before and after January 1, 2027</h2>
<p>The date that counts is the filing date, not the date of the debt or the damage. Someone with a claim between ${usd(S.cap)} and ${usd(S.next!.cap)} who files after the new year no longer has to choose between giving up part of it and paying for a case in state court. Set “When you file” in the calculator to see both answers.</p>
${factsTable(h, 'GA')}
<p>With ${usd(S.next!.cap)}, Georgia will share the highest ceiling in the country with Delaware and Tennessee; today it ranks ${rankOf('GA')} of 51.</p>
<h2>Fees and service in Georgia’s magistrate courts</h2>
<p>There is no statewide fee for a statement of claim: each county’s magistrate court publishes its own schedule, and the sheriff charges to serve each defendant. A plaintiff who cannot pay can file a pauper’s affidavit. The same act, HB 999, also revises how magistrate courts collect fees, so check the clerk’s current figures before you file in 2027.</p>
${h.mini('deadline', { title: 'Time left to file your Georgia claim' })}
<h2>Georgia and its neighbours</h2>
${neighboursTable(h, 'GA')}
<p>Steps of a case: ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue someone in small claims court')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in Georgia in 2026?', a: '$15,000 in magistrate court for cases filed through December 31, 2026, under O.C.G.A. § 15-10-2(5). Magistrate court is the Georgia court for small civil cases, with simplified procedure and no jury. A claim above the limit goes to state or superior court, where formal rules apply.', open: true },
    { q: 'When does Georgia’s $25,000 limit start?', a: 'For actions filed on or after January 1, 2027. Section 4(b) of House Bill 999 sets that date for the change to § 15-10-2. A claim filed on December 31, 2026 still meets the $15,000 limit, so someone owed between the two figures may gain by waiting a few days, as long as no deadline expires in the meantime.' },
    { q: 'Does the limit apply to evictions in Georgia?', a: 'No. Magistrate courts hear dispossessory actions whatever the rent owed; the dollar limit applies to other civil claims. A landlord can also ask for the unpaid rent in the same dispossessory case. If the rent owed is above the dollar limit, the money part may have to be brought in another court.' },
  ],
  related: ['florida-small-claims-court', 'small-claims-court-limits', 'how-to-sue-someone-in-small-claims-court'],
  sources: [...stateSources('GA')],
});
