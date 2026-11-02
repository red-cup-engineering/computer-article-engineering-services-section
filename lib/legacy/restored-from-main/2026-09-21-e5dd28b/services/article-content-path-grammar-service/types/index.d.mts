export interface ArticleContentPathGrammar {
  readonly articleRoot: string;
  readonly noteRoot: string;
  readonly noteName: { readonly pattern: RegExp };
}
export interface DatedNoteName {
  readonly date: string;
  readonly year: string;
  readonly month: string;
  readonly day: string;
  readonly token: string;
}
export interface DatedNotePath extends DatedNoteName { readonly path: string }
export declare const DEFAULT_ARTICLE_CONTENT_GRAMMAR: ArticleContentPathGrammar;
export declare function projectArticleRegion(region?: string, grammar?: ArticleContentPathGrammar): string;
export declare function projectNotePath(path: string, grammar?: ArticleContentPathGrammar): string;
export declare function parseDatedNoteName(name: string, grammar?: ArticleContentPathGrammar): DatedNoteName | null;
export declare function parseDatedNotePath(path: string, grammar?: ArticleContentPathGrammar): DatedNotePath | null;
