---
title: "How I run three LLMs without getting burned"
description: "Claude, ChatGPT, and NotebookLM each do different work in my writing. The thing that keeps them useful is not the model. It's a verification habit borrowed from the reference desk: every claim gets ground-truthed before it ships."
date: 2026-07-02
tags: [AI, LLM, workflow, verification, librarianship, provenance]
status: published
type: note
---

I run three LLMs on most writing projects, and the reason they don't sink me is not the models. It's a habit from the reference desk.

The roles are split. Claude works as a research associate, or really an evidence librarian: it reads the actual repo, the GitHub issues, the work log, and tells me what's there. ChatGPT is the editor and architect, good at structure and second drafts. NotebookLM is the source pack, a bounded corpus I can question without it wandering off into its training data. Different tools, different jobs.

The failure mode is the same across all three, and it's not the one people warn you about. It isn't hallucinated tone or an em dash problem. It's confident overreach: a clean, plausible, well-formed claim that happens to be wrong, delivered with exactly the same fluency as a right one. You can't catch it by reading for style. You catch it by checking it against the primary source.

So that's the discipline. Every factual claim an LLM hands me gets ground-truthed before it goes anywhere. Not most claims. Every one that carries a number, a name, a date, or a "first." Here is what that caught in the last few weeks alone:

- A "43% of maintainers report burnout" stat, attributed to Tidelift, that I could not confirm in any Tidelift source. Retired it.
- A researcher's figure I'd carried as 67% that the actual Hettrick survey put at 69%. Corrected.
- A confident "Johns Hopkins ran the first academic OSPO in 2019" claim with no source behind it. Cut.
- A resume-style bullet describing me as co-lead on an RDS effort that wasn't true. Refused it, even though it flattered me.
- During some OSPO taxonomy work, one model insisted a change "breaks schema.org standards." A second agent checked the spec and found the claim was invented. It didn't break anything.

None of those were caught by a better prompt. They were caught by looking. The primary source is the check, and the model's confidence tells you nothing about whether you'll need it.

This is why I think librarians have an edge with these tools, not a handicap. Provenance is the native lens. Where did this come from, who said it, can I see the original: that's the reference interview, and it's exactly the question an LLM can't answer for itself. The models are genuinely good at producing a draft. They are bad at knowing whether the draft is true. That last part is still the human's job, and it's the part I was trained for.

Three models, one rule: nothing ships until it's been ground-truthed. The rule is doing more work than any of the models.
