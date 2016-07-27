---
layout: blog
title: "Contributing to carpentry lessons with Git: Fork, Branching, Commits & Pull Requests"
description: "Tutorial on how to contribute to the Carpentries."
category: "swc"
permalink: value/
---

Credit: 
Development workflow with Git: Fork, Branching, Commits, and Pull Request

1. [Fork a lesson](http://help.github.com/fork-a-repo/) you want to contribute to, for instance, [data-lessons/library-shell](https://github.com/data-lessons/library-shell/). 

2. Clone the **library-shell** project to your local machine (**USERNAME** - your GitHub user account name): 

```bash
$ git clone https://github.com/USERNAME/library-shell/
```

3. Configure upstream remote: 

```bash
$ cd library-shell
$ git remote add upstream https://github.com/data-lessons/library-shell/
```

4. Look at the remotes now and confirm you have an upstream: 

```bash
git remote -v 
```

```bash
origin	https://github.com/ucsdlib/library-shell.git (fetch)
origin	https://github.com/ucsdlib/library-shell.git (push)
upstream	https://github.com/data-lessons/library-shell.git (fetch)
upstream	https://github.com/data-lessons/library-shell.git (push)
```

4. Fetch upstream changes to the local branch

```bash
git fetch upstream 
```

5. Merge those changes into your repo.

```bash
git merge upstream/gh-pages
```

4. Create a branch for changes to the lesson: 

```bash
git checkout -b new-lesson-improvement
```

5. Develop on **new-lesson-improvement**, but Do not merge my-new-check branch to the your master (as it should stay equal to upstream master)!!

6. git add, commit, and then push your branch: 

```bash
git push origin gh-pages 
```

7. Perform the pull request from your fork. 