---
title: "The prompt that makes a model disagree with me"
description: "A standing prompt template whose only job is to stop a second model from agreeing with my own diagnosis. Tested it on my own project-management setup and it found the weak joint in an argument I was ready to act on."
date: 2026-07-25
tags: [AI, LLM, workflow, verification, decision-making]
status: published
type: note
---

I keep a prompt template whose only job is to stop a second model from agreeing with me. Most recently I pointed it at my own project-management setup, and it found the weak joint in a diagnosis I was about thirty minutes from acting on.

Here's what I'd concluded. I'd independently built something close to Andrej Karpathy's "LLM-WIKI.md" architecture: raw sources in one layer, rules in a CLAUDE.md, and an LLM-maintained wiki of dated, cross-referenced articles in a third. Karpathy's thesis is that personal knowledge systems fail at maintenance, not capture, so handing maintenance to a model that doesn't get bored fixes the rot. My wiki layer looked healthy against that standard. But the vault also runs a second, separate job Karpathy's design says nothing about: task lists, a project registry, a work log, all human-curated and mutable. That layer had 25-plus overdue tasks, one flagship project with no commits in about 205 days, six others stalled. My diagnosis: the human-curated layer was rotting exactly the way Karpathy says human-curated systems rot, so the fix was to extend the same LLM-maintenance principle to project state.

That's a tidy story. Tidy stories are exactly what I don't trust from a model, and I don't see why I should trust them from myself either.

So instead of building the fix, I wrote a validation prompt and handed the whole diagnosis to a second model with explicit instructions not to be nice about it: stress-test the diagnosis, don't praise it, assume the author is biased toward believing his own setup is sound, find the holes. Then five specific pressure points, not a generic "any thoughts": is the central analogy a real mechanism or a rhetorical match, since tasks also slip for reasons no automation touches; would the proposed fix change behavior or just generate a second backlog to ignore; is treating "recency of wiki edits" as a health signal actually measuring correctness, or just measuring activity; and, bluntly, what would a sharper critic say I'm avoiding by concluding I'm already 80% done.

The format is the point. "Is this right?" invites agreement. Naming the exact places an argument could break, and asking the model to rank them by whether they'd survive contact with reality, doesn't.

This is the same habit behind ground-truthing every claim an LLM hands me, aimed the other direction. The reference-desk discipline was never really about distrusting models specifically. It's about not letting a fluent, well-formed conclusion pass unchecked just because it sounds like mine.
