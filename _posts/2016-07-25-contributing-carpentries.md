---
layout: post
title: "Contributing to carpentry lessons with GitHub"
description: "Tutorial on how to contribute to the Carpentries."
excerpt_separator: <!--more-->
categories: SWC
---
### tl;dr
#### Set up your remote upstream and merge updates from there
1. Fork the repo you want to work on.
2. Clone that repo down, e.g., `git clone https://github.com/USERNAME/library-shell/`
3. So you can fetch changes from the originating repo, add remote reference there: `git remote add upstream https://github.com/data-lessons/library-shell/` (you can see your remotes by `git remote -v`)
4. Get changes from `upstream`: `git fetch upstream`
5. Merge those changes locally: `git merge upstream/gh-pages`
6. Repeat Number 4 & 5 above before you begin a new unit of work below to insure you have the latest base version of the lesson

#### Do work in a local branch and submit changes to the lesson repo
1. Start with the latest version of the upstream lesson (see above)
2. Create a branch for your improvements: `git checkout -b new-lesson-improvement`
2. [Install Jekyll](https://swcarpentry.github.io/lesson-example/setup/#optional-jekyll-setup-for-lesson-development) if you want to preview your changes locally
3. Run `make serve` to preview locally, typically at <http://127.0.0.1:4000/>
4. Once done with your work as you see fit, run `git add`, `git commit`, and then `git push origin new-lesson-improvement` up to your forked repository.
5. [Make a pull request]((https://help.github.com/articles/creating-a-pull-request/)) from your repo in GitHub (this tells the upstream maintainers: hey, pull my improvement into the upstream repo)

## Getting set up to improve lessons

After we taught [Library Carpentry](https://ucsdlib.github.io/2016-07-18-UCSD/) here at UCSD, we sat down and worked through the workflow for contributing to Carpentry lessons. Matt Critchlow, our IT Dev Manager, walked us through the [CONTRIBUTING.md](https://github.com/data-lessons/library-shell/blob/gh-pages/CONTRIBUTING.md) document and I worked up the steps below from our meeting.

One of the confusing aspects on translating the common fork/pull-request development workflows is that most of the documentation found on the web is spelled out for `master` branches. This is because, by convention, the default branch when you initialize a repository in GitHub (or locally) is named `master`. However, with the Software/Data/Library Carpentry lessons the default branch is set to `gh-pages`. This is mainly for ease, because the web version of the lessons live in this branch and this is where Software Carpentry wants the work to go for contributions. Also, on GitHub, commits to this branch will be processed by Jekyll, a static site generator, making the nice lesson webpages we use in class. The main thing to know is that in Software Carpentry lesson land, when you see `master` in Git help or online documentation, you can mentally substitute it with `gh-pages`. Hopefully, this will help folks new to git contribute more to the lessons.

Update 2016-08-28: Corrected the **Getting changes from the upstream default branch `gh-pages`** section to remove using `git status` to check changes in the upstream remote as this won't work! `git fetch upstream` is the right command to pull down any changes that may have been made.

### Setup your fork and local clone

1. [Fork a lesson](http://help.github.com/fork-a-repo/) you want to contribute to, for instance, [data-lessons/library-shell](https://github.com/data-lessons/library-shell/). Forking will create a linked copy of the repository in your own GitHub account.

2. Clone the **library-shell** project to your local machine (**USERNAME** - your GitHub user account name). Having a local copy allows us to edit locally using our favorite tool, create branches for discrete work and keep the local repository in synch with `data-lessons/library-shell`:

    >```
    >$ git clone https://github.com/USERNAME/library-shell/
    >```

    `clone` grabs the repository and makes a local copy. It will create the directory (named for the repository name by default) and sets up the linkages between your clone and the remote repository (called `origin`). Let's confirm this by running `git remote -v`.

    >```bash
    >$ cd library-shell
    >$ git remote -v
    > ```
    >
    >```output
    >origin  https://github.com/ucsdlib/library-shell.git (fetch)
    >origin  https://github.com/ucsdlib/library-shell.git (push)
    >```

<!--more-->
3. Now configure the upstream remote. We are doing this because we want to be able to periodically grab -- especially before we start our lesson improvements --  new changes from the upstream repository's (`data-lessons/library-shell`) gh-pages branch and merge those with our local gh-pages branch. To set an upstream remote let's us do this:

    >```
    >$ cd library-shell
    >$ git remote add upstream https://github.com/data-lessons/library-shell/
    >```

4. Now, take a look at the remotes again and confirm you have an upstream fetch and push pair in addition to your `origin` ones:

    >```
    >$ git remote -v
    >origin  https://github.com/ucsdlib/library-shell.git (fetch)
    >origin  https://github.com/ucsdlib/library-shell.git (push)
    >upstream    https://github.com/data-lessons/library-shell.git (fetch)
    >upstream    https://github.com/data-lessons/library-shell.git (push)
    >```

### Getting changes from the upstream default branch `gh-pages`

 Before you begin your work on contributing to a lesson, you should always fetch and merge changes from the upstream repository. Why? Think about how many contributors are involved in working on some of the Carpentry lessons (hundreds). Imagine this: after you forked and cloned the `data-lessons/library-shell` repository, you take a break and go out for a coffee and sandwich. While you were away a contributor made a pull request and the lesson maintainer merged it into the lesson. Now you return from your break, make your lesson changes, commit, push and then find in GitHub your work conflicts with the upstream repository. Argh! You don't want to deal with that after a nice coffee and sandwich. So, if you begin work **without incorporating** the latest approved version of the lesson there will be a greater chance for conflicts when you are ready to make the pull request. Further, maybe the change made while you were away fixes the same issue you had with the lesson. To avoid working on an outdated base document, always run `get fetch` and update you local repository before you start work.

4.  Let's fetch the changes down. We do this by fetching changes from our upstream repository.

    >```
    >$ git fetch upstream
    >remote: Counting objects: 11, done.
    >remote: Compressing objects: 100% (11/11), done.
    >remote: Total 11 (delta 2), reused 0 (delta 0), pack-reused 0
    >Unpacking objects: 100% (11/11), done.
    >From https://github.com/data-lessons/library-shell
    >   67d2478..db5039b  gh-pages   -> upstream/gh-pages
    >```

5. Merge those changes into your gh-pages branch. Note, you are currently in your `gh-pages` branch and the following command will merge the fetched changes from `upstream/gh-pages` 'here'.

    >```
    >$ git merge upstream/gh-pages
    >Updating 67d2478..db5039b
    >Fast-forward
    > _episodes/01-intro-shell.md | 22 +++++++++++-----------
    > _includes/navbar.html       |  1 +
    > contribute.md               | 10 ++++++++++
    > 3 files changed, 22 insertions(+), 11 deletions(-)
    > create mode 100644 contribute.md
    >```

6. Now your `git status` should look like the below. Yay! We are now ready to work on the lesson.

    >```
    >$ git status
    >
    >On branch gh-pages
    >Your branch is up-to-date with 'upstream/gh-pages'.
    >nothing to commit, working directory clean
    >```

### Contributing to the lessons

Your are ready to make improvements to the lessons! To do this, we need to create a branch in which to add our changes. Think of branches as a unit of work that hangs together. So, if you are going to add an exercise in the loop episode in the shell lesson, this should hang together as a named `branch`, such as `shell-loop-exercise-7`.

4. Create a branch for changes to the lesson:

    >```
    >$ git checkout -b new-lesson-improvement
    >```

   `git` will create the `new-lesson-improvement` branch and switch you into it.

5. Now, develop (work) on `new-lesson-improvement` and make the improvement or addition to the lesson. How do I know it looks ok? I mean this is webcontent and I want to see what it looks like. To do this we need to have Jekyll -- the static site generator that GitHub uses to prepare and render our lessons -- installed locally. Follow these [instructions](https://swcarpentry.github.io/lesson-example/setup/#optional-jekyll-setup-for-lesson-development) to install Jekyll. (You can safely skip step 4 "R Packages" most likely).

6. Now, we can kick the tires and see what our work looks like locally, by going back to our terminal and running:

    >```
    >$ make serve
    >```

    If it runs successfully, the output will contain a line that tells you where your server is running:

    >```
    >  Server address: http://127.0.0.1:4000/
    > ```

    Navigate to that url in your browser and you should see the lesson you are working on and your changes.  You can continue to work on your changes and refresh to see the changes in the browser.

    But wait, why didn't I use `jekyll serve` instead?  That's what the Jekyll documentation says. You could run `jekyll serve` and it would do the same thing.  The template developers for Software Carpentry have created a make file that supports a number of command in addition to running a wrapper for `jekyll serve`. Go ahead and `ctr-c` to kill your server and type `make` by itself on the command line and you'll see this:

    >```
    > make
    > ```

   The make command contains a number of helpful commands for working with your lesson including `lesson-check` to validate markdown and `clean-rmd` to clean intermedicate R files.

6. Once done with your work as you see fit, run `git add`, `git commit`, and then `git push origin new-lesson-improvement` up to your forked repository:

    >```
    >$ git add .
    >$ git commit -m "adding loop challenge"
    >$ git push origin new-lesson-improvement
    >```

7. Now, you can perform the *Pull Request* on GitHub from your account's forked repository of library-shell. Follow these [steps](https://help.github.com/articles/creating-a-pull-request/).
8. The maintainer of the lesson will review the changes (be patient!) and merge them into the upstream repository. They might also have questions for you and in this case, will comment on your request before the changes can be merged.
9. Begin beautiful contributor-maintainer iteration here.

Credits:

1. Matt Critchlow @mcritchlow led us through the development workflow. Juliane Schneider @pitviper6, as a maintainer for the Open Refine lesson, also was a great resource for figuring out the carpentry workflow.
1. [Development workflow with Git: Fork, Branching, Commits, and Pull Request](https://github.com/sevntu-checkstyle/sevntu.checkstyle/wiki/Development-workflow-with-Git:-Fork,-Branching,-Commits,-and-Pull-Request)
2. [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
3. [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
