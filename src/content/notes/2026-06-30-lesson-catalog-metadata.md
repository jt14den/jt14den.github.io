---
title: "Giving our lesson catalog real metadata"
description: "A couple weeks ago I noticed our OSPO lesson catalog leaned hard toward one pathway. This week I went in and fixed the metadata underneath it. The cleanup taught me more than the result did."
date: 2026-06-30
tags: [open source, OSPO, education, metadata, taxonomy, schema.org]
status: published
type: note
---

A couple weeks ago, while [pulling together learn-by-doing resources](/notes/2026-06-13-learn-by-doing-open-source-resources), I noticed our OSPO lesson catalog leaned hard toward maintaining: 25 of 43 lessons sitting in one pathway. This week I went back and fixed the metadata underneath it, and the cleanup taught me more than the result did.

The catalog had drifted. 127 free-text keywords. An "audience" field that confused who a lesson is for with the role it trains you toward. And that one overloaded pathway tag. The filters ran fine. They just weren't helping anyone find anything.

A few decisions I'd make again.

We didn't adopt an outside vocabulary. I looked, and nothing maintained covers practical open source topics and research software topics at the level we needed. So we kept our own list of 13 topics and tied each one to an external authority where a good one exists: CHAOSS for project health, FAIR4RS for research software, OpenSSF for security, WCAG for accessibility, OSI for licensing. Our list, their standards underneath.

The same metadata had to serve two readers. People get a [multi-select filter with live counts](https://ucospo.net/education/lessons), so you can see what a topic gets you before you click it. Machines get the same 13 topics as a schema.org [DefinedTermSet](https://ucospo.net/education/lessons/topic), each with a stable URL and a crosswalk to its standard, plus a [JSON catalog API](https://ucospo.net/education/api/lessons.json) that announces itself with the usual discovery hooks.

The part that got me was how much the filters taught us about our own data. Once they started counting things, the bad data fell out on its own. That overloaded pathway tag wasn't a tagging slip. It was a whole pile of "how to build good software" lessons with nowhere else to live, so we gave them one. Most days the taxonomy work and the interface work turned out to be the same work.

What I still don't have settled is the type vocabulary. In the learn-by-doing note I started tagging things Tutorial, Lab, Game, Challenge, Course, Path, and I want us to standardize on a small set like that for the `learningResourceType` field. Topic is the section; type is the tag. Two separate axes, and the second one is still a list in my head. Leaving this here so I come back to it.
