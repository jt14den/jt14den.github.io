---
title: "The single underscore that broke my task system"
description: "A CLI task manager that worked fine in my terminal silently failed inside Claude Code sessions. The cause wasn't a bug in the tool, it was a shell-snapshot mechanism that quietly drops single-underscore function names before the agent ever sees them."
date: 2026-07-25
tags: [AI, Claude Code, workflow, shell, debugging, tooling]
status: draft
type: note
---

I replaced my hand-edited Obsidian task checkboxes with a real CLI this month: `projctx task add/list/done/reopen`, a cross-project dashboard, and a registry-backed inbox for anything that doesn't belong to a project yet. Before writing a line of it, I checked whether the official Obsidian CLI already solved the problem. It mostly does. It's not TUI-only the way I'd assumed, and it needs no REST plugin. But it doesn't write the Tasks plugin's completion-date stamp when it marks something done, and that date is what my weekly review and dashboard queries actually run on. So I kept direct file I/O as the mutation layer instead of adopting a tool that was ninety percent there.

Then the thing I built started failing in a way that took a while to place. `projctx`, `projgo`, and `projbundlecopy` worked perfectly in my regular terminal and silently did nothing inside Claude Code sessions specifically. No error. The commands just weren't there.

The cause wasn't in my code. Claude Code sessions load your shell environment through a snapshot mechanism, and that mechanism drops any function whose name starts with a single underscore before the session ever sees it. My wrapper functions were `_project_context_run` and `_clipboard_copy`, named that way out of habit, the usual convention for "this is a private helper, don't call it directly." Nobody documents that this specific loading path silently strips that pattern. It doesn't throw. It doesn't warn. The function is just gone, and every command built on top of it looks like a missing PATH entry or a typo instead of what it actually is.

The fix was a rename, `pc_run` and `pc_clipboard_copy`, and it took five minutes once I found it. Finding it took longer, because the failure mode gave no signal that it was an environment-loading problem at all. That's the part worth keeping: a function that behaves correctly in your interactive shell can vanish completely in an automated or agent context, and it won't look like a bug when it does. It'll look like the tool never existed. If you're building anything that a shell snapshot or automation layer has to load on your behalf, it's worth testing it under that actual runtime, not just the terminal you wrote it in.
