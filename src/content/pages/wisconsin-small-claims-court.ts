import { definePage } from '../../lib/page-types';
import { st, idx, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('WI');
export default definePage({
  id: 'wisconsin-small-claims-court', group: 'states', order: 23, slug: 'wisconsin-small-claims-court',
  nav: 'Wisconsin', card: `Circuit Court small claims up to ${usd(S.cap)}; $5,000 for injury and other tort claims.`,
  title: 'Wisconsin Small Claims Court 2026: $10,000 and $5,000 Limits',
  description: 'Wisconsin small claims court in 2026: $10,000 for debts and contracts, $5,000 for injury and other tort claims under Wis. Stat. 799.01, and a 2027 change.',
  h1: `Wisconsin small claims court: ${usd(S.cap)}, or $5,000 for injuries`,
  intro: `<strong>Wisconsin small claims court</strong> is a branch of the Circuit Court procedure under chapter 799: claims for money owed can go up to <strong>${usd(S.cap)}</strong>, but tort and personal injury claims stop at <strong>$5,000</strong>.`,
  resume: `Wisconsin is one of the states with two limits. Section 799.01 of the statutes allows the small claims procedure for contract and debt claims up to ${usd(S.cap)}, and for tort claims, including personal injury, only up to $5,000. A dented car or a dog bite is a tort; an unpaid invoice, a deposit or a loan is a contract or debt claim. The general ceiling ranks ${rankOf('WI')} of 51, level with Illinois and above Iowa’s ${usd(st('IA').cap)}. The general ceiling is about to move: 2025 Wisconsin Act 105, signed on March 20, 2026, raises it to ${usd(S.next!.cap)} for debt, contract and replevin cases commenced on or after January 1, 2027, while tort claims stay at $5,000. Small claims are filed with the clerk of circuit court in the county; the fee is set by the state and county and is not shown here.`,
  ...lockedState('WI'), toolTitle: 'Does your claim fit the Wisconsin limit?',
  body: (h) => `
<h2>Which Wisconsin small claims court limit applies to you</h2>
<p>Ask what the claim is about rather than how large it is. Money promised under an agreement, rent, a deposit or a loan uses the ${usd(S.cap)} ceiling. Damage caused by someone’s carelessness, such as a car accident, a fall or harm to property, is a tort and uses the $5,000 ceiling. The calculator above checks the general figure; for a tort, compare your amount with $5,000.</p>
<p>The date of filing decides which general ceiling applies. Act 105 rewrites section 799.01(1)(c) and (d) so that a case commenced on or after January 1, 2027 can claim up to ${usd(S.next!.cap)}, against ${usd(S.cap)} for a case filed on December 31, 2026. The same act lifts the Wisconsin Consumer Act thresholds of section 421.202(6) from $25,000 to $50,000. The tort ceiling of $5,000 is untouched, so a car accident claim of $8,000 still belongs on the regular docket in 2027.</p>
${factsTable(h, 'WI')}
${h.mini('cost', { title: 'What a Wisconsin small claim costs you', defaults: { st: idx('WI'), claim: 4000 }, locked: ['st'] })}
<h2>Wisconsin and its neighbors</h2>
${neighborsTable(h, 'WI')}
<p>See ${h.a('michigan-small-claims-court', 'Michigan across the lake')} or ${h.a('small-claims-court-limits', 'every state’s limit')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in Wisconsin?', a: '$10,000 for contract and debt claims and $5,000 for tort claims, including personal injury, under Wis. Stat. § 799.01. Evictions also use the small claims procedure in Wisconsin. Above the limits, the case goes to the circuit court’s regular civil docket, with formal pleadings.', open: true },
    { q: 'Is the Wisconsin small claims limit changing in 2027?', a: 'Yes. 2025 Wisconsin Act 105, signed by the Governor on March 20, 2026, raises the ceiling for debt, contract and other civil money claims, and for replevin, from $10,000 to $15,000. It applies to actions commenced on or after January 1, 2027. The $5,000 ceiling for tort and personal injury claims is not amended.' },
    { q: 'Can I sue for a car accident in Wisconsin small claims?', a: 'Yes, if the damages are $5,000 or less, because a car accident claim is a tort. Above $5,000 a car accident claim goes to the regular circuit court docket. Bring the police report, repair estimates and photos to the hearing.' },
  ],
  related: ['michigan-small-claims-court', 'small-claims-court-limits', 'how-much-does-it-cost-to-sue-someone'],
  sources: [...stateSources('WI'), ['2025 Wisconsin Act 105 (Senate Bill 787), as signed', 'https://content.govdelivery.com/attachments/WIGOV/2026/03/20/file_attachments/3590473/sb787.pdf'], ['Office of the Governor: action on 27 bills, March 20, 2026', 'https://content.govdelivery.com/accounts/WIGOV/bulletins/40f385d']],
});
