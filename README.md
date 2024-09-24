# How to Stop Tracking `package-lock.json` in a Git Repository

1. Remove package-lock.json from Git tracking: Run the following command to remove package-lock.json from Git’s tracking, but keep the file in your local working directory.
``` bash 
git rm --cached package-lock.json
```
This removes the file from Git's index (staging area), but doesn't delete it from your local system.

2. Add package-lock.json to your .gitignore (if not already done): Ensure the following line is added to your .gitignore file:

``` bash
package-lock.json
```

# Git Commands Guide

This guide provides a quick reference to commonly used Git commands for pulling, pushing, creating, switching branches, fetching, and more.

## Table of Contents
- [Pull Changes](#pull-changes)
- [Push Changes](#push-changes)
- [Create or Switch Branch](#create-or-switch-branch)
- [Fetch All Branches](#fetch-all-branches)
- [Add Changes](#add-changes)
- [Commit Changes](#commit-changes)
- [Common Workflows](#common-workflows)

---

### Pull Changes

To fetch and merge changes from the remote repository to your local branch:

```bash
git pull
``` 
- You can also specify the remote and branch name:

```bash
git pull origin <branch-name>
``` 
### Push Changes
After committing your changes, push them to the remote repository:

```bash
git push
``` 
- If you are pushing to a specific remote and branch:
```bash
git push origin <branch-name>
``` 
### Create or Switch Branch
- Create a new branch:
```bash
git checkout -b <new-branch-name>
```
This command creates and switches to the new branch.

- Switch to an existing branch:

```bash
git checkout <branch-name>
```
### Fetch All Branches

- To fetch all branches from the remote without merging them:
```bash
git fetch --all
```

### Add Changes

- To stage all changed files at once:
```bash
git add .
```
### Commit Changes

- After staging files, commit them with a message:
```bash
git commit -m "your commit message"
```

### Common Workflows

1. Pull before you work:
```bash
git pull origin <branch-name>
```
2. After making changes:
```bash
git add .
git commit -m "message describing the changes"
```
3. After making changes:
```bash
git push origin <branch-name>
```
4.Create and push a new branch
```bash
git checkout -b <new-branch-name>
git push --set-upstream origin <new-branch-name>
```











