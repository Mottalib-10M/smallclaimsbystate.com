import { definePage } from '../../lib/page-types';
import { st, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('NC');
export default definePage({
  id: 'north-carolina-small-claims-court', group: 'states', order: 21, slug: 'north-carolina-small-claims-court',
  nav: 'North Carolina', card: `Magistrates hear up to ${usd(S.cap)} by statute; each county picks $5,000 to $10,000.`,
  title: 'North Carolina Small Claims Court 2026: $5,000 to $10,000',
  description: 'North Carolina small claims court in 2026: magistrates hear up to $10,000 under G.S. 7A-210, but each county sets its own figure from $5,000. Check yours first.',
  h1: `North Carolina small claims court: up to ${usd(S.cap)}, county by county`,
  intro: `<strong>North Carolina small claims court</strong> is a magistrate of the District Court; the statute allows claims up to <strong>${usd(S.cap)}</strong>, but each county sets its own ceiling between <strong>$5,000</strong> and <strong>${usd(S.cap)}</strong>.`,
  resume: `North Carolina is the clearest case of a state where the headline limit is not the one that applies to you. G.S. § 7A-210 lets the chief district judge of each district assign cases of up to ${usd(S.cap)} to a magistrate, but the actual figure is set county by county, anywhere from $5,000 to ${usd(S.cap)}. A claim of $8,000 can be a small claim in one county and too large in the next. Above the county figure, the case goes to the District Court itself, which hears civil cases up to $25,000. That is why we rank North Carolina at the statutory ${usd(S.cap)} (${rankOf('NC')} of 51) but tell you to check the county. The filing fee is fixed by statute for the whole state; we could not read it from our network, so it is not shown.`,
  ...lockedState('NC'), toolTitle: 'Does your claim fit the North Carolina limit?',
  body: (h) => `
<h2>North Carolina small claims court: finding your county’s limit</h2>
<p>Call or visit the clerk of superior court in the county where the defendant lives, or look at the district’s local rules: they state the amount assigned to magistrates. If your claim is above the county figure but below ${usd(S.cap)}, you can either cut it down to fit or file in District Court, where the forms are longer but the limit is no problem.</p>
${factsTable(h, 'NC')}
${h.mini('deadline', { title: 'How long you have left to sue', defaults: { years: 3, ago: 20 } })}
<p>The deadline calculator works on the period you enter; North Carolina’s limitation periods vary by kind of claim, and we have not read them for you.</p>
<h2>North Carolina and its neighbors</h2>
${neighborsTable(h, 'NC')}
<p>See ${h.a('georgia-small-claims-court', 'Georgia’s Magistrate Court')} and ${h.a('how-to-sue-someone-in-small-claims-court', 'the steps of a case')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in North Carolina?', a: 'Up to $10,000 under G.S. § 7A-210, but each county sets its own figure between $5,000 and $10,000. Ask the clerk of the county where you file. The difference matters for claims between $5,000 and $10,000, which fit in some counties and not in others. The district’s local rules state the figure for each county.', open: true },
    { q: 'Who hears small claims in North Carolina?', a: 'A magistrate of the District Court. An appeal goes to the District Court judge. Magistrates hear many small claims in a single session, so cases move quickly and the hearing is short. A party who loses can appeal for a new hearing before a district judge.' },
    { q: 'What if my claim is above the county small claims figure?', a: 'File in District Court, which hears civil claims up to $25,000, or reduce the claim and give up the difference. District Court uses the ordinary civil procedure, with formal pleadings and more time between steps. A lawyer is not required there, but the rules are harder to follow alone.' },
  ],
  related: ['small-claims-court-limits', 'georgia-small-claims-court', 'how-to-sue-someone-in-small-claims-court'],
  sources: [...stateSources('NC')],
});
