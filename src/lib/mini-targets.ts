/** Where the link under a mini-simulator leads: the page that carries the full calculator of that kind. */
import { ROUTES, route } from '../i18n/routes';
const HOME_OF: Record<string, string> = {
  limit: 'small-claims-court-limits', fee: 'small-claims-court-filing-fee', cost: 'how-much-does-it-cost-to-sue-someone',
  interest: 'small-claims-demand-letter', collect: 'collecting-a-small-claims-judgment', deadline: 'how-to-sue-someone-in-small-claims-court',
};
export function miniHref(kind: string, here: string): string {
  const id = HOME_OF[kind];
  const target = id && ROUTES.some((r) => r.id === id) ? route(id, 'en') : route('home', 'en');
  return target === here ? '#calculator' : target;
}
