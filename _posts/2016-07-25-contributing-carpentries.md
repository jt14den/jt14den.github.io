---
layout: post
title: "Contributing to carpentry lessons with GitHub"
description: "Tutorial on how to contribute to the Carpentries."
excerpt_separator: <!--more-->
---
After we taught [Library Carpentry](https://ucsdlib.github.io/2016-07-18-UCSD/) here at UCSD, we sat down and worked through the workflow for contributing to Caprentry lessons. Matt Critchlow, our IT Dev Manager, walked us through the [CONTRIBUTING.md](https://github.com/data-lessons/library-shell/blob/gh-pages/CONTRIBUTING.md) document and I worked up the steps below from our meeting. One of the confusing aspects on traslating the stated development workflows is that most of the documentation is spelled out for master branches. In Software carpentry land, master in that context can be replace with `gh-pages`. Hopefully, this will help folks new to git contribute more to the lessons. 

### Setup your fork and local clone

1. [Fork a lesson](http://help.github.com/fork-a-repo/) you want to contribute to, for instance, [data-lessons/library-shell](https://github.com/data-lessons/library-shell/). 

2. Clone the **library-shell** project to your local machine (**USERNAME** - your GitHub user account name): 

    >```
    >$ git clone https://github.com/USERNAME/library-shell/
    >```
<!--more-->
3. Configure upstream remote: 

    >```
    >$ cd library-shell
    >$ git remote add upstream https://github.com/data-lessons/library-shell/  
    >```

4. Look at the remotes now and confirm you have an upstream: 

    >```
    >$ git remote -v  
    >origin  https://github.com/ucsdlib/library-shell.git (fetch)  
    >origin  https://github.com/ucsdlib/library-shell.git (push)  
    >upstream    https://github.com/data-lessons/library-shell.git (fetch)  
    >upstream    https://github.com/data-lessons/library-shell.git (push)  
    >```

### Getting changes from the upstream default branch `gh-pages`

Typically, the default branch in git and GitHub is set to `master`, however, with the Software/Data/Library Carpentry lessons the default branch is  `gh-pages`. This is for convience, so changes to this branch will trigger a jekyll build of the lesson making the nice lesson webpages.  Our scenario here is that your `gh-pages` have fallen behind the upstream master by one or multiple commits. 

4. You can tell where you are in relation the upstream repository by running a `git status`. 
    
    >```
    >$ git status  
    >
    >On branch gh-pages
    >Your branch is behind 'upstream/gh-pages' by 8 commits, and can be fast-forwarded.
    >(use "git pull" to update your local branch)

4. Fetch upstream changes to the local gh-pages

    >```
    >$ git fetch upstream
    >remote: Counting objects: 11, done.  
    >remote: Compressing objects: 100% (11/11), done.  
    >remote: Total 11 (delta 2), reused 0 (delta 0), pack-reused 0  
    >Unpacking objects: 100% (11/11), done.  
    >From https://github.com/data-lessons/library-shell  
    >   67d2478..db5039b  gh-pages   -> upstream/gh-pages  
    >```

5. Merge those changes into your gh-pages branch.

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

6. Now your `git status` should look like the below: 

    >```
    >$ git statusYou can tell this through running a `git status`. 
    >On branch gh-pages
    >Your branch is up-to-date with 'upstream/gh-pages'.
    >nothing to commit, working directory clean
    >```

### Contributing to the lessons

Your are ready to make improvements to the lessons! We need to create a branch in which to add our changes. 

4. Create a branch for changes to the lesson: 

    >```
    >$ git checkout -b new-lesson-improvement
    >```

5. `git` will create the **new-lesson-improvement** branch and switch you into it. Now, develop on **new-lesson-improvement**, but **do not** merge **new-lesson-improvement** branch to the your `gh-pages` branch (as it should stay equal to upstream gh-pages)!!

6. git add, commit, and then push your branch: 

    >```
    >$ git push origin new-lesson-improvement
    >```

7. Perform the Pull Request from your fork. Follow these [steps]()https://help.github.com/articles/creating-a-pull-request/.
8. The maintainer of the lesson will review the changes and merge them into the upstream repository. They might also have questions for you and will comment on your request before the changes can be merged. 

Credits:  

1. Matt Critchlow @mcritchlow led us through the development workflow. Juliane Schneider @pitviper6, as a maintainer for the Open Refine lesson, also was a great resource for figuring out the carpentry workflow.  
1. [Development workflow with Git: Fork, Branching, Commits, and Pull Request](https://github.com/sevntu-checkstyle/sevntu.checkstyle/wiki/Development-workflow-with-Git:-Fork,-Branching,-Commits,-and-Pull-Request)  
2. [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)   
3. [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
