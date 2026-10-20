---
title: "Every number on our site is a claim, so we keep a register"
description: "How a library data service keeps headline numbers honest: a claim register, a one-row-per-metric CSV, and a Quarto site that reads from it instead of from whatever someone typed."
date: 2026-10-20
tags: [Quarto, reproducibility, data services, provenance, reporting]
status: draft
type: essay
---

A service website is a pile of numbers with sentences wrapped around them. "17,466 workshop attendee-events." "About 1,850 consultations." Each one is easy to write and easy to get wrong, and the wrong ones don't look wrong. They look like a number.

Our stats site at the UCLA Library Data Science Center had that problem. We have a [public Quarto site](https://ucla-data-science-center.github.io/dsc-stats-reports/) and several documents that reuse its figures: a retrospective, a brief for campus leadership, a faculty page. The same counts showed up in several places, typed by hand each time, and the copies drifted. What fixed it wasn't a better chart. It was treating each headline number as a claim and keeping three small files for it.

## Layer 1: the claim register

`claim-register.md` is a plain markdown file in the repo. Every public headline claim gets an entry before it ships. Here is one, trimmed:

```markdown
## 8. Workshop attendee-events, verified window

- Approved wording: "17,466 workshop attendee-events from May 2017
  through April 2024."
- Not approved: "17,466 people trained." An attendee-event is one
  registration for one workshop, not a person.
- Unit of observation: one participant registration for one session.
- Missingness/coverage: 2022's +425 may include a small amount of
  same-session double counting; disclosed, not resolved.
- Source: data/processed/canonical/headline_aggregates.csv
- Deduplicated: yes, exact-duplicate rows checked against named sources.
- Last verified: 2026-09-24.
```

The "not approved" line does most of the work. People compress. A sentence that says "17,466 attendee-events" in a report turns into "we trained 17,466 people" in a slide, and nobody meant to mislead anyone. Writing the forbidden version down, next to the allowed one, gives whoever is summarizing something to check against.

The register came out of an outside review. I asked a second model to attack our redesign plan, and it found that two of our case studies were technically correct but easy to inflate. One documented a single processing task that ran about 159 times faster. The safe sentence is "for one documented task, an approximately 159-fold runtime reduction was observed under the reported conditions." The unsafe one is "we made processing 159 times faster." The register records both, plus which verbs are allowed ("supported," "contributed to") and which aren't ("won," "caused").

The "last verified" date matters as much as the wording. If the source data has changed since that date, the claim is stale and shouldn't be reused until someone rechecks it.

## Layer 2: one row per metric

The numbers themselves live in `data/processed/canonical/headline_aggregates.csv`. One row per metric, and the columns carry the context:

```
metric_id,value,display,period_start,period_end,unit,basis,caveat,source
instruction_attendee_events_verified,17466,"17,466",2017-05-04,2024-04-19,
  attendee-event,fully duplication-checked,"One registration for one workshop,
  not a headcount...",dsc-stats-integration DEFENSIBLE-NUMBERS-2026-09-05.md
```

`value` is for computing, `display` is how it prints ("about 18,700", not 18,712), and `unit`, `basis`, `caveat` and `source` travel with the number so they can't be separated from it. A figure like 18,712 that has only been partly checked says so in its own row.

## Layer 3: the pages read the CSV

The Quarto pages don't contain the numbers. They contain a lookup:

```r
headline <- read_if("data/processed/canonical/headline_aggregates.csv")
hl <- function(key) {
  x <- headline |> filter(metric_id == key) |> pull(display)
  if (length(x) == 0) "-" else x[[1]]   # ours prints a dash for a missing key
}
```

Then inline R in the prose, like `` `r hl("instruction_attendee_events_verified")` ``, pulls the display string. Change the CSV, re-render, and every page that uses the figure updates. There's no step where someone remembers to fix the copy in the faculty page.

A few other pieces help. Reusable sections live in `_partials/` and get included with `{{< include >}}`, so a paragraph about DataSquad is written once. A test, `tests/test_instruction_aggregate.R`, builds a small fixture and asserts the exact counts the aggregation should produce (nine aggregate rows, 937 attendance, 939 with the individual records). It's a short file, and it's why I trust the crosswalk that maps departments to schools.

## What isn't solved

This is partial, and I'd rather say so. The repo still has an older `_variables.yml` with hand-typed strings that some partials read through `{{< var >}}`. One line in it says a value was "superseded 2026-09-24; kept for older docs." So we have two sources of truth for a while, and the register is what tells us which one wins. The `hl()` helper also fails soft: a missing key prints a dash instead of stopping the render. That's kind to a reader and unkind to an author who wants to know. A stricter build would stop.

I also can't make the register enforce itself. A sentence written next to the register can still ignore it. What the register changes is the cost of checking, which went from "ask whoever built the number" to "read nine lines."

## If you want to copy it

You don't need our repo. Start with the register, because it's just a file:

1. Pick the five numbers that appear most often in your reports.
2. For each, write the approved sentence, the sentence people will be tempted to write instead, the unit, and what's excluded.
3. Put the number and its caveat in one CSV row, with a source path.
4. Make your Quarto pages read the CSV.
5. Add "last verified" and mean it.

Libraries already do this for catalog records and finding aids. A website's numbers deserve the same treatment, and Quarto makes it cheap enough that there isn't a good reason not to.
