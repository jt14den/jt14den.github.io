---
layout: post
title: "Contributing to carpentry lessons with GitHub"
description: "Tutorial on how to contribute to the Carpentries."
excerpt_separator: <!--more-->
---
After we taught [Library Carpentry](https://ucsdlib.github.io/2016-07-18-UCSD/) here at UCSD, we sat down and worked through the workflow for contributing to Caprentry lessons. Matt Critchlow, our IT Dev Manager, walked us through the [CONTRIBUTING.md](https://github.com/data-lessons/library-shell/blob/gh-pages/CONTRIBUTING.md) document and I worked up the steps below from our meeting. 

One of the confusing aspects on translating the common fork/pull-request development workflows is that most of the documentation found on the web is spelled out for `master` branches. This is because, by convention, the default branch when you initialize a repository in GitHub (or locally) is named `master`. However, with the Software/Data/Library Carpentry lessons the default branch is set to `gh-pages`. This is mainly for ease, because the web version of the lessons live in this branch and this is where Software Carpentry wants the work to go for contributions. Also, on GitHub, commits to this branch will be processed by Jekyll, a static site generator, making the nice lesson webpages we use in class. The main thing to know is that in Software Carpentry lesson land, when you see `master` in Git help or online documentation, you can mentally subsitute it with `gh-pages`. Hopefully, this will help folks new to git contribute more to the lessons. 

Update 2016-08-28: Corrected the **Getting changes from the upstream default branch `gh-pages`** section to remove using `git status` to check changes in the upstream remote as this won't work! `git fetch upstream` is the right command to pull down any changes that may have been made. 

### Setup your fork and local clone

1. [Fork a lesson](http://help.github.com/fork-a-repo/) you want to contribute to, for instance, [data-lessons/library-shell](https://github.com/data-lessons/library-shell/). Forking will create a linked copy of the repository in your own GitHub account.

2. Clone the **library-shell** project to your local machine (**USERNAME** - your GitHub user account name). Having a local copy allows us to edit locally using our favorite tool, create branches for discrete work and keep the local repository in synch with our `data-lessons/library-shell`: 

    >```
    >$ git clone https://github.com/USERNAME/library-shell/
    >```
<!--more-->
    `clone` grabs the repository and makes a local copy. It will create the directory (named for the repository name) and sets up the linkages between your clone and the remote repository (called `origin`). Let's confirm this by running `git remote -v`.

    >```bash
    >$ cd library-shell  
    >$ git remote -v   
    > ```
    > 
    >```output
    >origin  https://github.com/ucsdlib/library-shell.git (fetch)  
    >origin  https://github.com/ucsdlib/library-shell.git (push) 
    >``` 

3. Now configure the upstream remote. We are doing this because we want to be able to periodically grab -- especially before we start our lesson improvements --  new changes from our upstream repository's (`data-lessons/library-shell`) gh-pages branch and merge those with our local gh-pages branch. Setting an upstream remote let's us do this. 

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

 Before you begin your work on contributing to a lesson, you should always fetch and merge changes from the upstream repository. Why? Think about how many contributors are involved in working on some of the Carpentry lessons (hundreds). Imagine this: after you forked and cloned the `data-lessons/library-shell` repository, you take a break and go out for a coffee and sandwich. While you were away a contributor made a pull request and the lesson maintainer merged it into the lesson. Now you return from your break, make your lesson changes, commit, push and then find in GitHub your work conflicts with the upstream repository. Argh! You don't want to deal with that after a nice coffee and sandwich. So, if you begin work **without incorporating** the latest approved version of the lesson there will be a greater chance for conflicts when you are ready to make the pull request. Further, maybe the change made while you were away fixes the same issue you had with the lesson. To avoid working on an outdated base document, always run `get fetch` and update you local repository them before you start work. 

4.  Let's fetch the changes down. 

    >```
    >$ git fetch upstream
    >remote: Counting objects: 11, done.  
    >remote: Compressing objects: 100% (11/11), done.  
    >remote: Total 11 (delta 2), reused 0 (delta 0), pack-reused 0  
    >Unpacking objects: 100% (11/11), done.  
    >From https://github.com/data-lessons/library-shell  
    >   67d2478..db5039b  gh-pages   -> upstream/gh-pages  
    >```

5. Merge those changes into your gh-pages branch. Note, you are currently in your `gh-pages` branch and saying merge the fetched changes from `upstream/gh-pages` 'here'.

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

6. Now your `git status` should look like the below. Yay! Let's work.  

    >```
    >$ git status  
    >
    >On branch gh-pages
    >Your branch is up-to-date with 'upstream/gh-pages'.
    >nothing to commit, working directory clean
    >```

### Contributing to the lessons

Your are ready to make improvements to the lessons! We need to create a branch in which to add our changes. Think of branches as a unit of work that hangs together. So, if you are going to work on the loop episode in the shell lesson, this should hang together as a named  `branch`. 

4. Create a branch for changes to the lesson: 

    >```
    >$ git checkout -b new-lesson-improvement
    >```

5. `git` will create the `new-lesson-improvement` branch and switch you into it. Now, develop (work) on `new-lesson-improvement`, but **do not** merge `new-lesson-improvement` branch to the your `gh-pages` branch (as `gh-pages` should stay equal to upstream gh-pages)!!

6. Once done with your work as you see fit, run git add, commit, and then push your branch: 

    >```
    >$ git add .  
    >$ git commit -m "adding loop challenge"  
    >$ git push origin new-lesson-improvement
    >```

7. Perform the Pull Request on GitHub from your fork. Follow these [steps](https://help.github.com/articles/creating-a-pull-request/).
8. The maintainer of the lesson will review the changes (be patient!) and merge them into the upstream repository. They might also have questions for you and in this case, will comment on your request before the changes can be merged.
9. Begin beautiful contributor-maintainer interation here. 

Credits:  

1. Matt Critchlow @mcritchlow led us through the development workflow. Juliane Schneider @pitviper6, as a maintainer for the Open Refine lesson, also was a great resource for figuring out the carpentry workflow.  
1. [Development workflow with Git: Fork, Branching, Commits, and Pull Request](https://github.com/sevntu-checkstyle/sevntu.checkstyle/wiki/Development-workflow-with-Git:-Fork,-Branching,-Commits,-and-Pull-Request)  
2. [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)   
3. [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
