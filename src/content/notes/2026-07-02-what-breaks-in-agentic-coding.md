---
title: "What actually breaks in agentic coding"
description: "After a few hundred AI coding sessions, the corrections that mattered were not about tone or style. They were about the agent acting on state it never checked. Verification beats more rules."
date: 2026-07-02
tags: [AI, agentic coding, Claude Code, workflow, developer tools]
status: draft
type: note
---

<!-- WORKING NOTE / STUB: thinking in progress, not finished. Backed by reference/wiki/agentic-research/claude-code-correction-patterns and reference/notes/ai-and-the-stewardship-gap. Skeleton only; flesh out before publishing. -->

Premise: I went back over a few hundred of my own AI coding sessions and clustered every correction I'd made. The result cut against the usual complaint. The visible annoyances, tone and filler and em dashes, were the smallest category. The expensive failures were the agent operating from assumptions instead of reading the actual state.

The argument, in the order I'd write it:

1. **The headline number.** Roughly: scope and process errors ~44%, factual-state errors ~37%, voice and prose ~19%. The most *visible* corrections were the least *costly* ones.
2. **The core failure mode.** The agent acts on inferred state, a date, a file location, a build process, a person, instead of reading the live source. Most of the factual errors trace back to a skipped read.
3. **Misreading the *form* of the output.** Saving a file when an answer was wanted. Producing a full reference card when "just the commands" was wanted. Right content, wrong shape.
4. **Declaring done when not done.** Calling it complete while items raised earlier are still open, so the human has to re-surface dropped work.
5. **The design implication.** Most of these were not knowledge gaps. The rules to prevent them already existed in my config. They were verification gaps: the read step or the confirm step got skipped under speed. So enforced pre-action verification, read the file, name the person, confirm the output shape, buys more reliability than adding more prose rules.

Honest limit: this is one person's sample, self-selected by what I bothered to correct. It over-represents what I'm vocal about and misses the silent failures I never flagged. The percentages are indicative, not a benchmark.

The one line I'd want a reader to keep: for coding agents, verification beats instruction. A rule the agent doesn't check against live state is a rule it will confidently violate.

Connects to [the stewardship gap](/notes/2026-07-02-ai-and-the-stewardship-gap): agent output is a draft someone still has to check. This note is what "check" concretely means.
