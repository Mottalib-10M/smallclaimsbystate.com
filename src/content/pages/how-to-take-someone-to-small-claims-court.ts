import { definePage } from '../../lib/page-types';
import { st, idx } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const CA = st('CA');
export default definePage({
  id: 'how-to-take-someone-to-small-claims-court', group: 'guides', order: 8, slug: 'how-to-take-someone-to-small-claims-court',
  nav: 'Putting a figure on your claim', card: 'Put a figure on your claim, gather proof and get ready for the hearing day.',
  title: 'Take Someone to Small Claims Court: How to Build the Claim',
  description: 'How to take someone to small claims court in 2026: add up what you are owed, check it against your state’s limit, gather the proof, prepare a short hearing.',
  h1: 'How to take someone to small claims court: build your claim first',
  intro: `<strong>How to take someone to small claims court</strong> starts with one figure: the amount you write on the claim, made of the sum owed, the other losses you can prove and, where the law allows, interest; it must fit your state’s limit, such as <strong>${usd(CA.cap)}</strong> for a person in California.`,
  resume: `Taking someone to small claims court is less about forms than about the claim you put in them. The judge can award only what you ask for and prove, so the figure on the claim form should be built line by line: the unpaid invoice, rent or deposit; the costs the dispute caused you, such as a repair or a replacement; and interest when a contract or your state’s law provides it. That total is then checked against the small claims limit of the state where you file. A claim above the line can be cut down, but the excess is lost for good, so it is worth knowing before you file. The next task is proof: each line of the claim needs a paper behind it, whether a contract, a receipt, a photo, an estimate or a message. A short timeline on one page holds the rest together for a hearing that often lasts only minutes. The calculator above adds the lines and compares them with the limit.`,
  tool: 'claimsum', toolTitle: 'The amount to put on your claim',
  body: (h) => `
<h2>How to take someone to small claims court, from figure to hearing</h2>
<h3>1. Put a number on each loss</h3>
<p>List what you lost, one line per item, with the document that proves it. A judge looks for a figure that can be checked: an invoice beats a guess, two repair estimates beat one. Losses you cannot show on paper, such as stress or inconvenience, rarely add anything in small claims.</p>
<h3>2. Compare the total with the limit</h3>
<p>The limit applies to the amount you claim. In California, a person may claim up to ${usd(CA.cap)} and a business ${usd(CA.capBiz!)}, and no one may file more than two claims above $2,500 in a calendar year. If your total is above the limit of your state, decide now whether to give up the excess or to go to the regular civil court.</p>
${h.mini('claimsum', { title: 'Try a deposit dispute in Texas', defaults: { st: idx('TX'), owed: 2100, other: 450 } })}
<h3>3. Ask for payment in writing</h3>
<p>A letter that gives the amount, the reason and a date settles many cases and shows the judge you tried. Use the ${h.a('small-claims-demand-letter', 'demand letter generator')}, keep a copy and keep the proof of sending.</p>
<h3>4. File, serve and wait for the date</h3>
<p>Fill in your state’s claim form, file it where the case belongs and pay the fee; the clerk gives the hearing date. The defendant must then be served in a way the court accepts. ${h.a('file-small-claims', 'Filing small claims')} covers the ways to file and ${h.a('small-claims-court-paperwork', 'the paperwork page')} what to print.</p>
<h3>5. Prepare the ten minutes that count</h3>
<p>Write a one-page timeline: what was agreed, what happened, what you asked for, what you received. Sort the papers in the same order, with a copy for the judge and one for each defendant. Speak to the judge, not to the other side, and end with the figure you ask for and how you reached it.</p>
<h2>What the other side can do</h2>
<p>The defendant can pay before the hearing, come and dispute the claim, file a claim of their own against you, or not show up. If they do not come and service was proved, ask for a judgment by default. If they file a counterclaim, bring the papers that answer it. After the ruling, a judgment still has to be paid: ${h.a('collecting-a-small-claims-judgment', 'collecting a judgment')} explains the tools.</p>`,
  faqs: [
    { q: 'Can I add interest to my small claims claim?', a: 'Often yes, when your contract sets a rate or your state’s law gives a legal rate on a debt. Many state limits leave interest out of the ceiling, but not all, so check the rule of your state on its page here. Enter the rate in the calculator, or leave it at zero if no rate applies to your case.', open: true },
    { q: 'Can I claim for my time and stress?', a: 'Rarely in small claims. Judges award proven losses: money owed, repairs, replacements, sometimes a penalty set by statute, as with some deposit laws. Your time spent on the case is usually not repaid, but the filing fee and the cost of service are usually added to the judgment when you win, if you ask.' },
    { q: 'How long does it take to take someone to small claims court?', a: 'From filing to the hearing, usually a few weeks to a few months, depending on the court’s calendar and how fast the defendant is served. The demand letter adds the deadline you give in it, often ten to fourteen days. Collection after the judgment can take longer than the case itself.' },
  ],
  related: ['how-to-sue-someone-in-small-claims-court', 'small-claims-demand-letter', 'small-claims-court-paperwork'],
  sources: [['California Courts: file your plaintiff’s claim', 'https://selfhelp.courts.ca.gov/small-claims/start-case/file'], [`Texas: ${st('TX').cite}`, st('TX').url]],
});
