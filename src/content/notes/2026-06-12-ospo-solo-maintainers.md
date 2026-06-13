---
title: "What would it take for a university OSPO to support its solo maintainers?"
description: "A working note: if critical open source rests on a few unpaid people, and some of them are inside the UC system, what could a university open source program office actually do about it?"
date: 2026-06-12
tags: [OSPO, open source, software sustainability, UC, infrastructure]
status: draft
type: note
---

<!-- WORKING NOTE / STUB — thinking in progress, not finished. Grew out of "Bus factor of one." -->

This started as a question at the end of [Bus factor of one](/notes/2026-06-12-bus-factor-of-one): if so much of the software running the world rests on one or two unpaid people, how many of them are inside the UC system — and is supporting them exactly the job a university OSPO should own?

I don't have answers yet. Parking what I know so far.

## The vehicle already exists

UCLA isn't starting from zero. It [joined a multi-campus UC OSPO network](https://www.library.ucla.edu/about/news/ucla-joins-multi-uc-campus-effort-to-build-network-of-open-source-program-offices/) — a [Sloan-funded effort led by UC Santa Cruz](https://news.ucsc.edu/2024/04/uc-ospo-network/) (building on the [first UC OSPO at UCSC](https://ucsc-ospo.github.io/)), with Berkeley, Davis, Santa Barbara, and San Diego. So the question isn't whether there's a structure — it's what that structure should actually do for maintainers.

## Who are the UC maintainers? (mostly an open question)

- **Paul Eggert (UCLA)** — the IANA time zone database. Confirmed.
- **Fernando Pérez (UC Berkeley)** — Jupyter/IPython, via BIDS, 2i2c, NumFOCUS. Founder-dependent, but a useful example of doing sustainability *on purpose* — paid staff, a foundation, succession.
- **Historical:** sendmail (Eric Allman) and BSD came out of UC Berkeley.
- **Everyone else?** Unknown. Nobody seems to have the inventory. *Building that inventory may be the first real deliverable.*

## Levers an OSPO might pull (rough, by leverage)

1. **Inventory + bus-factor mapping** — which dependencies UC relies on, who maintains them, where the bus factor is one. Treat maintainer sustainability as a supply-chain risk metric.
2. **Buy time** — RSE positions, course buyouts, library/IT-funded maintenance hours. The "employ them" answer.
3. **Make maintenance count academically** — the lever only a university has: recognize maintenance as scholarship in merit/tenure review, so recognition carries resources, not just a plaque.
4. **Build succession** — student contributors → maintainers (the DataSquad model pointed at maintainership). Addresses the "no successor" problem and the worry that AI review tools demotivate the juniors who'd grow into the role.
5. **Contribute upstream, not just consume — and pool across the network** — a shared RSE/funding effort across the six campuses.

## Open questions to chase

- Is there any existing inventory of UC-affiliated maintainers / critical dependencies?
- What's the lightest-weight version of bus-factor mapping that's actually useful?
- Which lever is realistic *first* — and who owns it across the network?
- How does the AI-slop problem (curl's "DDoS on maintainers") change what support looks like?
