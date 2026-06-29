---
title: "A working list of learn-by-doing open source resources"
description: "Gathering the interactive, guided, and gamified resources for learning open source and DevOps skills — the kind that teach by doing, like swirl did for R. A starting list to bring to the UC OSPO education group."
date: 2026-06-13
tags: [open source, OSPO, education, self-study, DevOps, research software]
status: published
type: roundup
---

The thing that stuck with me about learning R years ago was [swirl](https://swirlstats.com/) — it taught you R *inside* R, one nudge at a time. Learn-by-doing, not learn-by-reading. I keep thinking that's the bar for the self-study resources we point people to in the OSPO: not just docs, but something you can practice in.

This started when I came across [a roundup of sites every DevOps engineer should bookmark](https://medium.com/@keshrianjani20/the-websites-every-devops-engineer-should-bookmark-right-now-5bd67310688e). A lot of it crosses straight over to what we teach — git, the command line, containers, sustainability practice — so I started pulling out the *interactive* ones. We already list some of these; consider this the additive pass.

Worth saying what "already list" means. The OSPO education site has a real inventory now: 43 lessons, a [public JSON API](https://ucospo.net/education/api/lessons.json), sorted into pathways and tagged by role, level, and provider. It is strong on formal material, and it leans hard toward maintaining. 25 of the 43 sit in that one pathway: packaging, testing, CI/CD, containers, reproducibility. That is the gravity these practice resources push against. The getting-started and contributing end, where you learn by making an actual pull request or fixing a broken server, is exactly where the formal collection is thinnest.

Each is tagged with a **learning-resource type** — the small vocabulary I'd like us to standardize on for the Bioschemas `learningResourceType` field: *Tutorial · Lab · Game · Challenge · Course · Path · Reference · Guide*. (Topic = the section; type = the tag. Two separate axes.)

**Git & the command line**
- [Oh My Git!](https://ohmygit.org/) — a literal game for git · **Game**
- [Learn Git Branching](https://learngitbranching.js.org/) — visual, guided git challenges · **Tutorial** *(via the article)*
- [OverTheWire: Bandit](https://overthewire.org/wargames/bandit/) — learn the shell through a wargame · **Game**
- [SadServers](https://sadservers.com/) — "LeetCode for Linux": fix real broken servers · **Challenge**
- [explainshell](https://explainshell.com/), [regex101](https://regex101.com/) · **Reference** *(via the article)*

**Contributing to open source**
- [First Contributions](https://firstcontributions.github.io/) — make an actual first pull request · **Tutorial**
- [GitHub Skills](https://skills.github.com/) — interactive courses inside real repos · **Course**
- [Open Source Guides](https://opensource.guide/) — contributing, maintaining, community · **Guide**

**Research software & sustainability** (our "why")
- INTERSECT ([intersect-training.org](https://intersect-training.org/)) — modular RSE training for self-guided learners · **Course** *(already in our inventory)*
- [The Carpentries](https://carpentries.org/lessons/) — episodic, hands-on; already our delivery world · **Tutorial**
- [Exercism](https://exercism.org/) — guided exercises with mentorship · **Challenge**
- swirl ([swirlstats.com](https://swirlstats.com/)) — the R-in-R original · **Tutorial**

**DevOps, containers, cloud**
- [roadmap.sh DevOps](https://roadmap.sh/devops) — interactive learning path · **Path** *(via the article)*
- [KillerCoda](https://killercoda.com/) — browser-based scenarios (Katacoda's successor) · **Lab**
- [KodeKloud](https://kodekloud.com/) — 800+ DevOps labs and playgrounds · **Lab**
- [TryHackMe](https://tryhackme.com/), [picoCTF](https://picoctf.org/) — gamified security, good for students · **Game**

**For the OSPO itself** (strategy, not self-study)
- [LF: Open Source Management & Strategy](https://training.linuxfoundation.org/training/open-source-management-and-strategy/) · **Course**
- [CHAOSS](https://chaoss.community/) — community-health metrics · **Guide**
- [Class Central — Open Source](https://www.classcentral.com/subject/open-source) — a catalog of many of the above · *(catalog / meta)*

I don't think this is the list yet — it's the start of one. The open question I want to take to the group: which of these actually serve *researchers and librarians*, versus engineers who already speak the language? My plan is to keep a running scan of what's new each month and fold the good ones in before they reach our formal inventory — tagged with the same `learningResourceType` vocabulary so everything stays consistent.
