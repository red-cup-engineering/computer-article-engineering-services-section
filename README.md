# Article and page records

Use this package to validate a document before publishing it. Triplet uses
the same article and page schemas when it produces Schema.org JSON-LD.

| Import path | Purpose |
| --- | --- |
| `/article` | Validate an article with `articleContract.assert(record)`. Use `articlePublicationReport(articles, options)` to list editorial findings and the next action for each article. |
| `/page` | Validate a Markdown page or vault note with `pageContract.assert(record)`. Its front matter and body are preserved. |
| `/publication-date` | Compare publication date observations supplied as `{source, value}`. The result gives the original date when the sources agree and the evidence behind the decision. |
| `/article-content-path-grammar` | Build article and note paths and parse dated note filenames. |

The publication date check validates the calendar day in the leading
`YYYY-MM-DD`. Sources with distinct date strings remain distinct, including
their time information. The returned `reading` uses Metrologic's vocabulary:
`absurd` means no date was supplied, `potential` means the dates agree,
`active` means all supplied dates were invalid, and `stable` means the
evidence conflicts.

Run `npm test` to check the public contracts and publication policies.

The nested specification engineering service owns Specification records. It
generates those records from journaled rulings and rows in the semantic record journal.
