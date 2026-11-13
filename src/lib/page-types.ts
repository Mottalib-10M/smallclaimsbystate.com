/** One page = one content file in src/content/pages/<id>.ts. Routes, menus, sitemap and llms.txt read these files. */
export interface FAQ { q: string; a: string; open?: boolean }
export interface MiniOpts { title?: string; defaults?: Record<string, number>; locked?: string[] }
export interface Helpers {
  /** Internal link by page id. */
  a: (id: string, text: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulator in the text: a kind of lib/mini-specs.ts. */
  mini: (kind: string, opts?: MiniOpts) => string;
}
export type Group = 'states' | 'guides';
export interface PageDef {
  id: string; group: Group; order: number; slug: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first. */
  title: string;
  /** 150 to 160 characters. */
  description: string;
  h1: string;
  /** First paragraph: holds the key term of the title and the figure. */
  intro: string;
  /** One paragraph of 120 words or more, the direct answer (RECETTE §21), folded to two sentences. */
  resume: string;
  /** Calculator at the top. */
  tool: string; toolTitle?: string; toolDefaults?: Record<string, number>; toolLocked?: string[];
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
  /** URLs of the official documents behind the page: [label, url]. */
  sources: Array<[string, string]>;
}
export const definePage = (p: PageDef): PageDef => p;
