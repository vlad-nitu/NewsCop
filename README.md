# NewsCop - news articles overlapping detection system 



**NewsCop** is a full-stack application developed by Team 8C as part of the Software Project course at the Technical University of Delft. The backend is built with Django, and the frontend is developed using React.js.

## Team Members - Rares


1. [Name 1]
2. [Name 2]
3. [Name 3]
4. [Name 4]
5. [Name 5]

## Table of Contents


- [Project Overview](#project-overview)
- [Features](#features) - Rares 
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
- [License](#license) - Rares
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

[List the main features of your application]


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

[Include a section on how to use the application, possibly with images or screen captures]

## Development process

The team opperated by following Agile methodologies, such as running weekly sprints and conducting sprint retrospectives to discuss about how each team member is progressing in solving the issues he / she was assigned to. Moreover, two additional weekly meetings occured: one with our TA, and the other one with the cient. The entire progress was recorded and sustained using TUDelft Self-Managed GitLab
service, allowing the team to coordinate, stay on track and organise better. Moreover, it
served as an effective means for the supervisors to track the project’s progress.

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

[Add additional notes about how to deploy this on a live system]

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

[Include details of the license.]

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



