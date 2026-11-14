import { definePage } from '../../lib/page-types';
import { st, idx, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('MI');
export default definePage({
  id: 'michigan-small-claims-court', group: 'states', order: 20, slug: 'michigan-small-claims-court',
  nav: 'Michigan', card: `District Court small claims division up to ${usd(S.cap)}; $25, $45 or $65 to file.`,
  title: 'Michigan Small Claims Court 2026: $7,000 Limit, $25 to $65',
  description: 'Michigan small claims court in 2026: the $7,000 limit in force since 2024, the earlier steps, the $25, $45 and $65 District Court filing fees, and a check.',
  h1: `Michigan small claims court: ${usd(S.cap)} since January 2024`,
  intro: `<strong>Michigan small claims court</strong> is the small claims division of the District Court; it hears claims up to <strong>${usd(S.cap)}</strong>, and the filing fee is <strong>$25</strong>, <strong>$45</strong> or <strong>$65</strong> depending on the amount.`,
  resume: `Michigan raises its small claims ceiling in steps written into the statute, MCL 600.8401. The limit was $5,000 from 2012, $5,500 from 2015, then $6,000 and $6,500, and it reached ${usd(S.cap)} on January 1, 2024. Pages that still give $6,000 or $6,500 were written before that date. The filing fee depends on the amount claimed, under MCL 600.8420 and the District Court fee table of April 2025: $25 up to $600, $45 from $600.01 to $1,750, and $65 above that up to the limit. Courts that use electronic filing add an e-filing fee. With ${usd(S.cap)} the state ranks ${rankOf('MI')} of 51, above Ohio’s ${usd(st('OH').cap)} but below Indiana’s ${usd(st('IN').cap)} and Wisconsin’s ${usd(st('WI').cap)}. The case is filed in the District Court for the area where the defendant lives or where the dispute arose; the clerk can confirm the right court before you pay.`,
  ...lockedState('MI'), toolTitle: 'Does your claim fit the Michigan limit?',
  body: (h) => `
<h2>Three filing fees in Michigan small claims court</h2>
<p>The fee steps are narrow at the bottom. A claim of $600 costs $25; a claim of $601 costs $45; anything over $1,750 costs $65. If you are right at a threshold, a few dollars of interest or costs added to the claim can push you into the next fee band, so total the claim before you choose the form.</p>
${factsTable(h, 'MI')}
${h.mini('fee', { title: 'The Michigan fee for your amount', defaults: { st: idx('MI'), amount: 1800 }, locked: ['st'] })}
<h2>How the limit grew</h2>
<p>The steps from $5,000 to ${usd(S.cap)} took about twelve years. A case is measured by the limit in force on the day it is filed, so a claim of $6,800 filed in 2023 was too large and the same claim filed in 2024 fits.</p>
<h2>Michigan and its neighbors</h2>
${neighborsTable(h, 'MI')}
<p>See ${h.a('small-claims-court-filing-fee', 'filing fees in other states')} or ${h.a('wisconsin-small-claims-court', 'Wisconsin’s two limits')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in Michigan in 2026?', a: '$7,000, in force since January 1, 2024, under MCL 600.8401. The figure rose in steps since 2012. A claim above it goes to the District Court’s general civil docket, where formal rules apply and lawyers may appear. Pages that still show $6,000 or $6,500 are out of date.', open: true },
    { q: 'How much does it cost to file small claims in Michigan?', a: '$25 up to $600, $45 up to $1,750 and $65 above, plus an e-filing fee where the court uses e-filing. The fee depends on the amount claimed, so total the claim before choosing the form. Service on the defendant is a separate cost, and the judge can add both to the judgment.' },
    { q: 'Was the Michigan limit $6,500 before?', a: 'Yes, before the step to $7,000 on January 1, 2024. Earlier steps were $5,000, $5,500 and $6,000. The steps were written into MCL 600.8401 in advance, so the limit rose without new legislation each time. A case is measured by the limit in force on the day it is filed.' },
  ],
  related: ['small-claims-court-filing-fee', 'wisconsin-small-claims-court', 'indiana-small-claims-court'],
  sources: [...stateSources('MI')],
});
