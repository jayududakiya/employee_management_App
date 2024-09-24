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