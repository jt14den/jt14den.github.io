---
title: "Teaching bibliometrics with OpenAlex, and finding out my OpenAlex record isn't mine"
description: "Building an optional Library Carpentry episode on the OpenAlex API turned into a real lesson in author disambiguation when my own ORCID pointed at someone else's decades of research."
date: 2026-09-21
status: published
type: essay
tags: [library carpentry, open science, bibliometrics, data science, R, teaching]
---

I wrote a [new episode](https://www.tim-dennis.com/lc-r/06-bibliometrics-with-openalex.html) for `lc-r`, Library Carpentry's Introduction to R lesson: the same import-clean-visualize-report workflow the lesson already teaches, applied to OpenAlex, a free, CC0-licensed catalog of scholarly publications, instead of the usual library circulation dataset.

The frame is a reference-desk scenario. A patron asks how an organization's research output has changed over time. The real teaching point isn't the R code, it's that answering well starts with a reference-interview question: does OpenAlex even represent the thing being asked about as a distinct record? Sometimes yes, an author, once you've confirmed you have the right person. Sometimes yes, an organization with its own entry. Sometimes no, a department, one of the most common asks, with no clean answer short of a real roster-based project.

For the worked example I landed on the Public Knowledge Project, which builds the open-source publishing software behind a lot of library-run journals, after rejecting two other options: ICPSR (paid membership, a bad fit for an example meant to feel accessible to anyone in the room) and the Internet Archive (open to everyone, but "publication output" there means scholarly output by people affiliated with it, not what the Archive actually holds, and that confusion wasn't worth the risk).

The part I didn't expect: building the lesson's second case, a person instead of an organization, I used my own real OpenAlex and ORCID record, to demonstrate disambiguation, not to show off a citation count. My ORCID checks out cleanly against my actual employment history: Director, Data Science Center, UCLA Library since 2017, Data Librarian at UC San Diego before that, Data Specialist at UC Berkeley before that. But the OpenAlex author record tied to that ORCID is conflated with a different researcher entirely, someone doing image processing and computer vision work from the 1980s through the 2000s. Only one paper in the whole record is mine: "Top 10 FAIR Data & Software Things," from 2019.

I could have picked a cleaner example. I built this one into the lesson instead. A verified ORCID doesn't guarantee a clean underlying record, and sometimes the honest answer to "how many works does this person have" is: not a number this record can give you cleanly. That's a better lesson than a tidy one.
