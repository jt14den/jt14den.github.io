---
layout: post
title: "Contributing to carpentry lessons with GitHub"
description: "Tutorial on how to contribute to the Carpentries."
---

### Setup your fork and local clone

1. [Fork a lesson](http://help.github.com/fork-a-repo/) you want to contribute to, for instance, [data-lessons/library-shell](https://github.com/data-lessons/library-shell/). 

2. Clone the **library-shell** project to your local machine (**USERNAME** - your GitHub user account name): 

    >```
    >$ git clone https://github.com/USERNAME/library-shell/
    >```

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

### Updating changes from the upstream master

Scenario is your gh-pages is behind the upstream master by one or multiple commits.

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
    >$ git status
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

5. `git` will create the **new-lesson-improvement** branch and switch you into it. Now, develop on **new-lesson-improvement**, but **do not** merge **new-lesson-improvement** branch to the your gh-pages (as it should stay equal to upstream gh-pages)!!

6. git add, commit, and then push your branch: 

    >```
    >$ git push origin new-lesson-improvement
    >```

7. Perform the Pull Request from your fork. 

Credits:  
1. [Development workflow with Git: Fork, Branching, Commits, and Pull Request](https://github.com/sevntu-checkstyle/sevntu.checkstyle/wiki/Development-workflow-with-Git:-Fork,-Branching,-Commits,-and-Pull-Request)  
2. [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)   
3. [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
