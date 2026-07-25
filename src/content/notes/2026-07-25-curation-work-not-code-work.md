---
title: "Curation work, not code work"
description: "Rebuilding a Carpentries lesson on software citation taught me that the reframe that mattered wasn't a new standard. It was retargeting the whole lesson from researchers publishing their own code to librarians advising other people's."
date: 2026-07-25
tags: [open source, OSPO, Carpentries, lesson design, library instruction, research software]
status: draft
type: note
---

I spent most of July rebuilding a Carpentries lesson on making research software citable and discoverable, and the change that mattered most wasn't a new standard or a better exercise. It was one sentence I ended up writing into the lesson's own wrap-up: making software citable and discoverable is curation work, and curation work is what this audience already does for a living.

The lesson started in December as a straightforward workshop: here's how you license your code, add a `CITATION.cff`, mint a DOI, clean up your metadata. Aimed at researchers publishing their own repos. It worked, but it wasn't right for who actually teaches Library Carpentry material, so in July I retargeted it end to end for library, OSPO, and research-support staff who advise researchers rather than publish their own code.

That's not a cosmetic change. It touches every exercise. I built six learner profiles to keep the redesign honest instead of designing for an abstraction: Priya, a scholarly comm librarian who can explain a dataset DOI but changes the subject when someone asks about code; Marcus, a research data services librarian who's rigorous about data management advice but has been winging it on the software questions now arriving through the same door; Dana, a subject liaison who's never opened a terminal and isn't going to start; Alex, an OSPO consultant fluent in licensing and GitHub who has no idea who owns deposit or how DataCite metadata works; James, a digital scholarship librarian who evaluates teachability, not content; and Sofia, a postdoc who's the most technically fluent person in the room and the least fluent in scholarly communication. A seventh profile, Noah, got cut because he didn't add a perspective the other six didn't already cover.

Dana is the one who forced the real design decisions. If the lesson opens with a terminal, she's out in ten minutes. So the whole thing moved to a GitHub-native fork-and-browser model: no local install, no command line, work happens in your own fork with reference branches (`after-license`, `after-citation`, `after-release`, `after-metadata`) to check against. Every episode carries a "Supporting others" thread, and every persona gets an explicit referral list: Tech Transfer for ownership questions, the institutional repository team for deposit policy, research computing for anything that's actually packaging or code quality. Success for Dana isn't a repo of her own. It's hearing "the journal wants a citable code deposit" and knowing that's a license, a citation file, and a Zenodo DOI, and knowing which two of those she can walk someone through herself.

External review caught what I couldn't see from inside the redesign: a deep-research pass recommended teaching `CITATION.cff` as the hands-on core with CodeMeta as a conversion layer rather than a second hand-authored file, rewriting the Zenodo episode around the version-DOI-versus-concept-DOI distinction, and demoting the environment setup episode from central to optional. A separate external review of the finished draft found about 20 more issues: license filename conventions, DOI sequencing, places the Zenodo instructions had drifted from its current docs.

None of that shows up if you measure the lesson by "did the DOI get minted." It shows up if you ask whether a liaison librarian with zero coding background left the room able to triage a request instead of forwarding the email and hoping.
