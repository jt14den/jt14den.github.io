---
title: "What I don't let an AI agent decide"
description: "A tool for building Carpentries workshop websites with any AI coding agent. The interesting design choice wasn't the automation. It was where the agent's judgment stops and a hard rule takes over."
date: 2026-08-16
tags: [AI, agentic coding, Claude Code, carpentries, library instruction]
status: published
type: note
---

I built a tool for setting up Carpentries workshop websites with an AI coding agent instead of hand-editing a Jekyll template every time. It's called [workshop-website-agent](https://github.com/jt14den/workshop-website-agent), and it's had two real workshops go through it now: the May 2026 UC Library Carpentry workshop, and [this Fall's UC Carpentries series](/blog/2026-08-16-fall-2026-uc-carpentries-workshop/).

The part worth writing about isn't the automation. It's where I drew the line on what the agent gets to decide.

Every workshop site starts as a `workshop-facts.yaml` file: dates, instructors, curriculum, repo name. A script reads that file and does the mechanical part, no AI involved. It creates the GitHub repo from the official template, never forked, always `gh repo create --template`, because forking drags along extra branches and breaks the structure the site expects. It fills in `_config.yml` and `index.md`. It blanks the map coordinates for online events. That part is deterministic on purpose. There's nothing here for a model to be creative about.

The agent's job starts after that: draft the schedule HTML, review the rendered site, apply whatever fixes that workshop's specific quirks need. That's real judgment, and it's where an agent is actually useful.

The rule that matters sits between those two halves. If `workshop-facts.yaml` says TBD, the site says TBD. Not a plausible guess, not a placeholder that reads like a real answer. TBD. I wrote that into the agent instructions as a non-negotiable, the same tier as "never commit to main" and "never fork the template," because the failure mode I was actually worried about wasn't the agent getting something wrong. It was the agent getting something confidently wrong in a way nobody would think to check: an instructor's name, a date, a room, on a page that goes out to actual registrants.

The bug that actually happened, on the other hand, was mundane. Every tracked file in the repo had committed CRLF line endings, which broke every script the moment anyone cloned it fresh. No amount of agent judgment would have caught that, because it isn't a judgment problem. It's a "did anyone test a clean clone" problem. Fixed with a `.gitattributes` file and moved on.

That's the pattern I keep running into with this kind of tooling. The interesting risk isn't the agent being wrong in an obviously agent-shaped way. It's a workshop site quietly showing a confident, wrong date to fifty registrants because nobody drew a hard line around what's allowed to be a guess.
