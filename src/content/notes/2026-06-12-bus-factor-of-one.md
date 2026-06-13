---
title: "Bus factor of one"
description: "Three pieces I bookmarked this year that keep pointing at the same thing: a lot of the software running the world rests on one or two people, and almost no one funds them."
date: 2026-06-12
tags: [software sustainability, open source, infrastructure, maintenance, AI]
status: published
type: note
---

Parking these here so I can come back to them. Three things I read recently that seem to rhyme.

[Ten billion devices run curl](https://canartuc.medium.com/10-billion-devices-run-his-code-he-maintains-it-alone-now-ai-is-attacking-him-45fff2d62cf4), maintained largely by one person — Daniel Stenberg — since the late '90s. It's inside Windows, Android, every game console, 47 car brands. Apple, Microsoft, Google, and Amazon all depend on it; none of them employ him. Sweden named him Developer of the Year in 2025, and he spent the same year writing about burnout. The newer wrinkle: people use ChatGPT and Claude to generate fake curl vulnerabilities and file them as CVEs, and he has to disprove each one. He calls it "a DDoS attack on maintainers."

[Linux's memory-management code](https://canartuc.medium.com/linux-memory-had-one-maintainer-for-26-years-he-just-quit-now-what-0f6591b89611) — behind every Android phone and cloud server — had a single reviewer, Andrew Morton, for 26 years. In April he said he was stepping back, and the thread went mostly quiet. When the kernel developers met to find a successor, they couldn't really name one — not for lack of skill, but because what he did was hold the line and answer every email for 26 years. One detail stuck with me: they worry that AI review tools, by catching bugs first, might discourage the junior reviewers who'd grow into the next Morton.

[Closer to home](https://samueli.ucla.edu/time-zone-king-how-one-ucla-computer-scientist-keeps-digital-clocks-ticking/), Paul Eggert at UCLA keeps the world's time zone database running — largely unpaid, on top of teaching. The hard part, he says, isn't the code; it's the politics of governments changing their clocks with no notice. He frames the database's future as an institutional question, not a technical one.

The pattern is the part that gets me. Three different corners of the infrastructure we all run on, and the same shape each time: enormous dependence resting on one or two people, recognition standing in for funding, and now AI pressing on both sides at once — more noise coming in, fewer humans coming up behind. It rhymes with what I think about in research data infrastructure, where the hard part was never building something but keeping it alive after the attention moves on. Heartbleed showed us a version of this in 2014; we panicked, formed a foundation, then mostly went back to business as usual.

What I don't have is the answer to the obvious next question: who maintains the things I depend on, and what would it actually take to support them? Eggert is at UCLA, which makes me wonder how many others across the UC system are quietly in the same spot — and whether finding them, and doing something about it, is exactly the work a university OSPO should own. UCLA just joined a [UC-wide network of open source program offices](https://www.library.ucla.edu/about/news/ucla-joins-multi-uc-campus-effort-to-build-network-of-open-source-program-offices/), so maybe that's where I start looking. Leaving this here so I keep asking.
