# Scripts that we will often have to run during the project

## Backend

### Booting up

* We first have to take care of dependency management, for which we have the `requirements.txt` file. There are two ways to go about this, the first one being locally with `pip`. Each time you pull from remote, make sure you do `pip3 install -r requirements.txt`, while being in the `backend` folder. This should take care of all dependencies. However, if you had installed other packages locally, things might break. To make sure you have the same dependencies install, you can run `diff <(pip freeze) requirements.txt`, from within the `backend` folder. If nothing shows, it means that you are good to go. Otherwise, there are differences, and the quick solution is to clear everything you have installed locally by running `pip3 freeze | xargs pip uninstall -y` (this can also be done from the `backend` folder). You can then run `pip3 install -r requirements.txt` as before, and now everything should be set. 
* If you would like to add a dependency to the `requirements.txt` file, you can just install that locally, and then you can do `pip3 freeze > requirements.txt`, from the `backend` folder.
* The other option, if for instance, you do not want to modify your local environment, is to set up a virtual environment. In the backend folder, run the following command: `virtualenv venv`, `source venv/bin/activate`, `pip3 install --upgrade pip`,  `pip3 install -r requirements.txt`. To go back to your local environment, you can run `deactivate`. 
* To start the server, you can do so by simply running `python3 manage.py runserver`, **from within the backend folder**.
* If you make changes to the code, you might need to run the following commands in sequence, before running the previous command to start the server:`python3 manage.py makemigrations` and `python3 manage.py migrate`.
* To inspect the project for potential problems, you can run `python3 manage.py check`, again, **from the backend folder**. 

### Testing

* After you have done the previous steps, you can run codestyle for the Python part of the project, **by being in the backend folder**, you can run the following command `pycodestyle app/`

* To run all the tests, you can run the following command by being in the `backend` folder `python3 manage.py test`. To run your tests with coverage, you can run `coverage run --omit="app/tests/*" manage.py test app/tests`, also while being in the `backend` folder. To see a coverage report run `coverage report`. If you want the report to be in another format, you can just run `coverage html` for instance.


## Frontend

### Booting up

* Our dependencies are stored in the `package.json` and `package-lock.json`.
* To start up our website, two commands have to be run, **while within the `frontend` directory**. These commands are, in order: `npm install` and `npm start`. 
* In case `npm install` throws errors, please delete your local `node_modules`, and try to run `npm install` again. 
* Generally, running ` npm audit fix --force` might cause problems with dependencies, so be careful with running it.

### Testing

* To see if you have codestyle errors, run `npx standard --global test --global expect . ` , **while having `frontend` as your working directory**.
* If you have codestyle issues, you can quickly fix them by running `npx standard --fix .`, again, **while having `frontend` as your working directory**.
* To run all `frontend` tests, you can run `npm run test`, **from within the `frontend` folder**. You wil then be prompted with some options, pressing `a` will entail a run of all tests.