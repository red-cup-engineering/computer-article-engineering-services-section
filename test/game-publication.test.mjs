import assert from "node:assert/strict";
import test from "node:test";
import { articleContract, articlePublicationReport } from "@red-cup-engineering/computer-article-engineering-services-section/article";
import { pageContract } from "@red-cup-engineering/computer-article-engineering-services-section/page";
import { publicationDateReadout } from "@red-cup-engineering/computer-article-engineering-services-section/publication-date";

const article = { title: "Flight", slug: "flight", author: "Pilot", date: "2024-02-29", draft: true,
  body: "We landed.\n\n## Trade\n\nUnloaded cargo.", seoTerm: "route" };

test("article and page schemas preserve Markdown and their published identifiers", () => {
  assert.equal(articleContract.id, "metroplat/article");
  assert.deepEqual(articleContract.assert(article), article);
  assert.throws(() => articleContract.assert({ ...article, draft: "yes" }));
  const page = { title: article.title, slug: article.slug, path: "flight.md", body: article.body, frontMatter: { region: "Vega" } };
  assert.equal(pageContract.id, "metroplat/page");
  assert.deepEqual(pageContract.assert(page), page);
  assert.throws(() => pageContract.assert({ ...page, body: 8 }));
});

test("the report describes the SEO checks actually applied to the article", () => {
  for (const first of [false, true]) for (const heading of [false, true]) {
    const report = articlePublicationReport([article], { requireSeoTermInFirstParagraph: first, requireSeoTermInH2: heading });
    const codes = report.candidates[0].findingCodes;
    assert.equal(codes.includes("seo-term-missing-first-paragraph"), first);
    assert.equal(codes.includes("seo-term-missing-h2"), heading);
    assert.equal(report.policy[1].includes("first paragraph"), first);
    assert.equal(report.policy[1].includes("H2"), heading);
    assert.match(report.policy[1], /SEO term/);
  }
});

test("date evidence distinguishes missing, agreed, invalid and conflicting observations", () => {
  const observe = (...values) => publicationDateReadout(values.map((value, source) => ({ source, value })));
  assert.equal(observe(" ").reading, "absurd");
  const timestamp = "2024-02-29T12:34:00Z";
  const agreement = observe(timestamp, timestamp);
  assert.equal(agreement.reading, "potential");
  assert.equal(agreement.date, timestamp);
  for (const date of ["2025-02-29", "2024-04-31", "2026-00-10"]) {
    const result = observe(date);
    assert.equal(result.reading, "active");
    assert.ok(!("date" in result));
    assert.deepEqual(result.evidence, [`0:invalid:${date}`]);
  }
  assert.equal(observe("2024-02-29", "2024-03-01").reading, "stable");
  assert.deepEqual(observe(timestamp, "2024-02-30").evidence, [`0:date:${timestamp}`, "1:invalid:2024-02-30"]);
});
