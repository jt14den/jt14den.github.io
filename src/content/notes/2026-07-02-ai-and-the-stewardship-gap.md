---
title: "The stewardship gap: does AI reduce the case for a university OSPO, or make it?"
description: "The reflex is that if AI writes the code, institutions need less software support. The evidence points the other way: AI widens the gap between producing code and sustaining it, and that gap is exactly what an OSPO exists to close."
date: 2026-07-02
tags: [OSPO, open source, AI, research software, software sustainability, RSE]
status: draft
type: note
---

The argument I keep hearing is reflexive: AI writes the code now, so universities need less of the software support they were never quite funding anyway. If a model can generate the pipeline, why staff an OSPO or an RSE team to help with it? The evidence I've been collecting this month points the other way. AI increases how much code gets produced faster than it increases anything durable, and that widens the gap a stewardship function exists to close.

Start with the cleanest version of the claim. A new NBER working paper by Demirer, Musolff, and Yang is titled, almost too neatly, [Writing Code vs. Shipping Code](https://doi.org/10.3386/w35275). The title is the finding: across generations of AI coding tools, the amount of code written and the amount actually shipped diverge. Producing more is not the same as releasing, maintaining, or running more.

The same shape shows up in science. A [Nature study by Hao and colleagues](https://doi.org/10.1038/s41586-025-09922-y) of tens of millions of papers found AI tools expand an individual scientist's impact, more papers and more citations, while contracting science's collective focus. Individual gain, collective narrowing. It's observational, so it shows association rather than cause, but the direction is consistent with the code story: output rises, and the durable, shared substrate gets thinner.

Then the sustainability edge, which is the one I'd handle most carefully. A [preprint by Koren, Békés, Hinz, and Lohmann](https://doi.org/10.5281/zenodo.19374601) argues that AI makes open source easier to consume while weakening the feedback, attention, and revenue that maintainers actually run on. The paper carries a deliberately provocative title I won't repeat as if it were a result. The mechanism is the useful part: if AI lowers the cost of using open source but not the cost of maintaining it, the people holding up critical projects lose the signals that kept them supported.

There's a smaller piece of evidence I trust because I generated it. Looking back over a few hundred of my own AI coding sessions, the errors that needed correcting were mostly not about tone or style. They were about the agent acting on state it hadn't verified, producing output that then needed review. Agent code is not finished code. It's a draft that someone still has to check, license, document, and decide whether to keep.

The tell is that the tooling already assumes this. When HashiCorp shipped its [Terraform MCP server](https://www.hashicorp.com/en/blog/terraform-mcp-server-is-now-generally-available) for AI agents, it went out read-only by default, with applying-to-real-infrastructure gated behind an explicit flag. The safe pattern the vendors themselves ship is agent-plans, human-approves. That human in the loop is a steward. The industry building the automation is quietly conceding that the automation needs one.

So the framing I'd bring to the UC OSPO conversation is not "AI is bad for open source." It's that AI increases the volume of software-shaped output faster than any university increases its capacity to review, license, document, measure, preserve, and maintain that output. Naming that gap is the argument for the work. At UCLA the pieces that close it already exist and mostly sit in the Library's Data Science Center: research software support, DataSquad, Carpentries-style education, and software curation. The OSPO's job in an AI-heavy world looks less like writing more code and more like triage, deciding which software needs light-touch guidance, which needs real stewardship, and which needs preservation.

What I don't know yet, and what I'd want before leaning on this too hard: what evidence would show a research software project is institutionally important despite weak public signals like low stars or citations, and what metric reveals maintenance debt rather than just activity. A metric that rewards commits or output is now actively misleading. If AI inflates the activity numbers, the thing we measure has to be durability, not motion.

This connects back to where I started a few weeks ago with [bus factor of one](/notes/2026-06-12-bus-factor-of-one), and to the open question in [what would it take for a university OSPO to support its solo maintainers?](/notes/2026-06-12-ospo-solo-maintainers). The question then was who holds up the software the world runs on. The question now is whether AI makes that load lighter or just less visible. My working answer is less visible, which is worse.
