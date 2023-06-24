# NewsCop - news articles overlapping detection system 



**NewsCop** is a full-stack application developed by Team 8C as part of the Software Project course at the Technical University of Delft. The backend is built with Django, and the frontend is developed using React.js.

## Team Members

Our team consists of five dedicated and passionate computer science students who are highly motivated and committed to delivering an excellent product. Each team member brings a strong background in software development and has gained valuable experience through internships and other practical engagements such as personal projects. An overview of all us, with a small picture is shown below:

|    | Team Member    | Photo                                                                                    | Email                         |
|----|----------------|------------------------------------------------------------------------------------------|-------------------------------| 
| 1. | Cristian Ciacu | ![](https://gitlab.ewi.tudelft.nl/uploads/-/system/user/avatar/4903/avatar.png?width=10) | D.C.Ciacu@student.tudelft.nl  | 
| 2. | Diana Micloiu  | ![](https://gitlab.ewi.tudelft.nl/uploads/-/system/user/avatar/4678/avatar.png?width=10) | D.Micloiu@student.tudelft.nl  | 
| 3. | Matei Mirica   | ![](https://gitlab.ewi.tudelft.nl/uploads/-/system/user/avatar/4878/avatar.png?width=10) | M.M.Mirica@student.tudelft.nl |
| 4. | Rares Toader   | ![](https://gitlab.ewi.tudelft.nl/uploads/-/system/user/avatar/4772/avatar.png?width=10) | R.A.Toader@student.tudelft.nl |
| 5. | Vlad Nitu      | ![](https://gitlab.ewi.tudelft.nl/uploads/-/system/user/avatar/4592/avatar.png?width=10) | V.P.Nitu@student.tudelft.nl   |

## Table of Contents


- [Project Overview](#project-overview)
- [Features](#features) 
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage) - Rares
- [Development Process](#development-process)
- [Supporting Documents](#supporing-documents) - Rares
    - Make sure to include scripts.
- [Running Tests](#running-tests)
- [Deployment](#deployment) - Rares
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [Copyright](#copyright)


## Project Overview


Our Software Project team built a news article overlap detection platform, a project proposed by [Sourcer](https://getsourcer.com/about). The goal of this project was to create a unique approach to fight the
problem of finding the overlap in news articles. To solve this problem, we have implemented a user-accessible website interface for inputting text or news article links for analysis, and a backend server capable of
analysing and storing articles for future use.

The issue of identifying overlapping news articles became a course for concern in
the media sector, as journalists frequently encounter time constraints and the demand
to create unique and captivating content. The lack of such a tool at Sourcer and their
core values, including: "Contributing to a more informed society", led the client to challenge us towards developing such a system.


## Features

Our application offers a range of features designed to provide a seamless and comprehensive experience for our users:

### Services

#### Service 1: CheckURL

- **Description**: You can submit the URL of a news article, and you will be given an overlap analysis against the news articles we have stored in our database.
- **Key Features**:
  - Feature 1: A visualisation shows how similar the input article is to that specific output article.
  - Feature 2: We show up to the ten most similar articles in our database.
  - Feature 3: You can choose what articles to see with the help of a slider that resembles the threshold for similarity. This means only articles that have a similarity above this threshold with the input article are shown.
- **Usage**: To use this service properly, you need to enter the URL of a news article that is in English and contains less than ~ 10000 characters.

#### Service 2: CheckText

- **Description**: Similar to `Service 1`, here you can submit the text of a news article, and you will be given the news articles that best resemble that text that have the highest similarity. The output is very similar to the one from the first service.
- **Key Features**:
  - Feature 1: The text box is expandable so that if you want to enter a large piece of text, you can expand it to see more of it.
  - Feature 2: A visualisation shows how similar the input article is to that specific output article.
  - Feature 3: We show up to the ten most similar articles in our database against the input text.
- **Usage**: Enter the text of the news article in the text box, then press the `Submit` button.

#### Service 3: CheckTwoTexts

- **Description**: You can enter text in two boxes and get an overlap analysis of the two texts.
- **Key Features**:
  - Feature 1: The common words are highlighted automatically in both text boxes.
  - Feature 2: The similarity level is shown together with visualisation.
  - Feature 3: The text boxes are expandable if you want to enter large bodies of text.
- **Usage**: You enter text in the first and second text boxes and click `Submit`. Afterwards, you will be given the similarity level between the two texts, along with a highlight of common words in both text boxes.

#### Service 4: CheckTwoURLs

- **Description**: You can enter two URLs of two news articles in the two input areas and get an overlap analysis of the two URLs.
- **Key Features**:
  - Feature 1: The similarity level between the two news articles will be given alongside a visualisation.
  - Feature 2: The two URLs can be compared directly by seeing a side-by-side render of them.
  - Feature 3 Based on the publishing date, an estimate of who is likely to own the content is given.
- **Usage**: You are expected to enter a news article's URL in the first input area and another news article's URL in the second input area and then click `Submit`.

#### FAQs Page

Our FAQs page provides answers to commonly asked questions about our application and services. The FAQs page is continually updated with new information to assist our users.

- **Accessing the FAQs**: To access the FAQs page, select "FAQs" in the navbar of footer, or follow this link: https://frontend-news-cop-6e44f5245bf9.herokuapp.com/help.
- **Submitting Questions**: If you have a question that is not addressed in the FAQs, you can submit it by contacting us, and we will do our best to provide an answer.

---
Visit our website for more information and to explore all the features in detail: https://frontend-news-cop-6e44f5245bf9.herokuapp.com/.


## Getting Started



This section aims to let future users know about the prerequisites (such as tools, libraries) of this project, as well as how to conduct installation process.

Our application has its backend, frontend and database deployed on the cloud. The backend and frontend are hosted on [Heroku webservers](https://www.heroku.com/what#:~:text=Summary-,Heroku%20is%20a%20cloud%20platform%20that%20lets%20companies%20build%2C%20deliver,are%20critical%20to%20app%20success.), while the database lives on [AWS RDS](https://aws.amazon.com/rds/). For the ultimate experience in overlapping detection, check out [our website](https://frontend-news-cop-6e44f5245bf9.herokuapp.com/).

The following two subsections: [Prerequisites](#prerequisites) and [Installation](#installation) are addressed for developers that want to run the servers locally. 


### Prerequisites

- **Django backend server**: `python3` and `pip` installed. All the dependencies needed by our system can be found in `backend/requirements.txt`. To install all the required dependencies on the `backend` server, run:

```
cd backend && pip install -r requirements.txt
```

- **React.js frontend server**: `npm` and `node` installed. To install all the required dependencies on the `frontend` server, run: 

```
cd frontend && npm install
``` 


### Installation

- To setup the local development environment for `backend`, run: 
```
cd backend && python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver 
```

This should start the backend server on `localhost:8000`, so on port `8000`.

- To setup the local development environment for `frontend`, run: 

```
cd frontend && npm start
```

This should start the frontend server on `localhost:3000`, so on port `3000`.


## Usage

To see a detailed use of our application, we provided a short demo below:




## Development process

The team opperated by following Agile methodologies, such as running weekly sprints and conducting sprint retrospectives to discuss about how each team member is progressing in solving the issues he / she was assigned to. Moreover, two additional weekly meetings occured: one with our TA, and the other one with the cient. The entire progress was recorded and sustained using TUDelft Self-Managed GitLab
service, allowing the team to coordinate, stay on track and organise better. Moreover, it
served as an effective means for the supervisors to track the project’s progress.

## Supporting documents





## Running Tests

- We have followed an early-testing strategy while developing our software. Our test suite contains different types of automated tests, such as: unit tests, integration (for the frontend part) and E2E tests using [cypress](...). Moreover, the server was rigurously manually checked during peer reviews to ensure the code quality matches our standards. 
- **Unit tests** are autoamitcally run on our GitLab CI/CD server for each created merge request, in order to not stress the server during each commit (as there are ~ 100 unit tests on the backend part, and ~ 75 unit tests on fronted). If you want to run these locally, use the following commands:

    - `frontend`:
    ```
    cd frontend && npm test
    ```

    - `backend`:
    ```
    cd backend && python3 manage.py test app/tests
    ```

- **Integration tests** can only be manually run via: `npx cypress open`, after having all the [prerequisites](#prerequisites) installed. A Chrome web browser should open, and you should go on the `E2E testing` feature, and afterwards click on each service's integration test suite and press the run button. Now, you should see how `cypress` simulates the interaction with both our UI, and also the E2E incorporation with the backend server. 

## Deployment

This section provides a guide on how to deploy the backend and frontend of our application separately on Heroku.

### Prerequisites

- Make sure you have a [Heroku](https://www.heroku.com/) account. If you don't, sign up for a free account.
- Install [Git](https://git-scm.com/downloads) if it's not already installed on your machine.
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and log in using your Heroku account credentials.

### Backend Deployment

1. Navigate to the backend directory: `cd path/to/backend-directory`
2. Initialize a Git repository if it's not already a repository: `git init`
3. Log in to Heroku: `heroku login`
4. Create a new Heroku app: `heroku create your-backend-app-name`
5. Add your changes to the Git repository: `git add .` and `git commit -m "Your commit message"`
6. Push the backend code to Heroku: `git push heroku master`
7. If needed, run migrations or setup tasks: `heroku run python3 manage.py migrate`
8. Open your backend app in the browser: `heroku open`

### Frontend Deployment

1. Navigate to the frontend directory: `cd path/to/frontend-directory`
2. Repeat steps 2 to 8 from the Backend Deployment section, but make sure to use a different app name for the frontend: 
  `heroku create your-frontend-app-name
   ...
   git push heroku master
   ...
   heroku open`

### Deploying New Changes

Whenever you make changes to the frontend or backend code that you want to deploy, follow these steps:

1. Navigate to the directory (frontend or backend) where you made changes.
2. Add and commit your changes: `git add .` and `git commit -m "Your commit message describing the changes"`
3. Push the changes to Heroku: `git push heroku master`
4. If needed, run any additional commands for your specific project (e.g., database migrations for backend).
5. Check the live application to make sure the changes are reflected.

Note: Make sure you have the proper environment variables and configurations set up on Heroku for both the frontend and backend modules.

---

Happy deploying! If you encounter issues, check the Heroku logs for clues: `heroku logs --tail`
Or refer to the [Heroku documentation](https://devcenter.heroku.com/) for help.


## Contributing

We welcome contributions from everyone. Whether you're looking to fix bugs, add new features, or simply help with documentation and issues, we appreciate all the help we can get.

Here are the steps to make a contribution:

1. **Look for existing issues**: Before creating a new issue, please do a quick search to see if the issue has already been posted. If an issue already exists, you can use that thread to discuss the problem or to add a 👍 reaction to an existing comment to indicate you also find the issue important.

2. **Open a new issue**: If what you're looking to report or improve is not yet reported or suggested, open a new issue. Please make sure to include a clear title and description in your issue report. If you're suggesting a feature, explain why you think it'd be useful to most of our users.

3. **Create a merge request**: Once an issue has been created, you can then create a merge request. Make sure your MR is connected to the issue. If your MR resolves the issue, include Closes #issue-number in your MR description.

4. **Use labels**: When creating an issue or merge request, please make use of the existing labels to categorize the issue/MR. This helps us and others understand the status, priority, or type of issue/MR at a glance.

5. **Review process**: Once a MR has been created, it will go through a review process. This is where the team gets the opportunity to give feedback and ask for any necessary changes. Once the MR has been reviewed and approved by the team, it will be merged into the project.

Thank you for considering to contribute! 

## License

Copyright (c) [2023] Sourcer.

All rights reserved.

This code and the accompanying materials are made available under the terms of the "No Sharing License" defined in this section. 

- You MAY NOT redistribute this code or any subset of it.
- You MAY NOT use this code as your own or in any project, either source or binary form.
- You MAY NOT modify, merge, publish, or distribute the code.
- You MAY NOT sublicense or sell copies of this code.

This software is provided "as is" without warranties or conditions of any kind, either express or implied, including, without limitation, any warranties or conditions of title, non-infringement, merchantability, or fitness for a particular purpose.

For any questions, please contact Sourcer, as they are the rightful owners of the IP.

## Contact
- For the **e-mail addresses of the team members**, please refer to the [Team Members](#team-members) subsection.
- For contacting the **Software Project staff**, you can send an e-mail to [this address](mailto:sp-cs-ewi@tudelft.nl).
- For contacting **our client, Sourcer**, you can refer to [their personal website](https://getsourcer.com/about). More contact information can be found at the bottom of the main page, in the footer section.


## Acknowledgements

Finally, we express our sincere gratitude to all those who have contributed to the success
of this project. First and foremost, we extend our heartfelt thanks to the team at Sourcer
for their invaluable support and involvement throughout the development process.
Their expertise was essential in shaping the project’s direction. Additionally, we would
like to express our appreciation to our technical writing lecturer, Edwin van Lacum, for
his guidance and for the continuous feedback that he provided, guiding us to writting a succesfuly academic report about our journey. Furthermore,
we thank Codrin Socol, our dedicated Teaching Assistant, for providing valuable insights
and suggestions. Lastly, we thank Megha Kohsla, our coach, for keeping us motivated
throughout the process. The unwavering support of everyone has been instrumental in
our expedition towards achieving excellence within the Software Project course.



## Copyright
2023 © Sourcer B.V. | KVK nummer: 87950030

2023 © Delft University of Technology (TU Delft)

2023 © NewsCop



