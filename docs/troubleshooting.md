# What can you find here
- This document serves as troubleshooting errors that we encountered several times. Each error reported should adhere to the following template:
    - Error description: << copy the log of the error >> 
    - How can it be reproduced / How you encountered the error: << description >>
    - Solution / How did you manage to fix the error: << solution >>
    - Resources used to find the solution: << links >>

## Errors

1.  
    - Error description: "note: This error originates from a subprocess, and is likely not a problem with pip. ERROR: Failed building wheel for numpy Failed to build numpy ERROR: Could not build wheels for numpy, which is required to install pyproject.toml-based projects [end of output]"
    -  How can it be reproduced / How you encountered the error: ?
    - Solution / How did you manage to fix the error: Searched error on Google.
    - Resources used to find the solution: https://stackoverflow.com/questions/71009659/message-note-this-error-originates-from-a-subprocess-and-is-likely-not-a-prob

2. 
    - Pipenv installing problems (different C errors)
    - How can it be reproduced / How you encountered the error: We think that the problem occured due to using the Python:3-11:Alpine docker image; after we replaced it with an ubuntu:20.04 image (and also migrating from `pipenv` to `virtualenv`, it worked fine, so one of these two (or maybe both (?) were the root cause).
    - Solution / How did you manage to fix the error: 
        - Migrate `pipenv` to `virtualenv` by removing `pipenv` and following [virtualenv UserGuide](https://virtualenv.pypa.io/en/latest/user_guide.html)
        - Migrate from `Python3:11:Alpine` image to `ubuntu:20.04`, as even though the ubuntu image is larger in size, it contains more built-in functions (and I assume python3:11 image was lacking an important one, leading to lots of C errors when installing dependencies with `pipenv install`). 
    - Resources used to find the solution: [virtualenv UserGuide](https://virtualenv.pypa.io/en/latest/user_guide.html),  [Ubuntu 20.04 image docs](https://releases.ubuntu.com/focal/)
3. 
    - Error description: Not being able to connect to localhost on MongoDB Atlas server
    - How can it be reproduced / How you encountered the error: Do not have your IP linked on MongoDB Atlas cluser
    - - Solution / How did you manage to fix the error: Add your IP to MonogDB Atlas cluster at: Secuirty / Network Access
    - Resources used to find the solution: ?

    

## Useful tips
- If you commited lots of times and want to combine all your last N commits into a single one, use `squash` GIT feature: [SO Thread](https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together)
-

