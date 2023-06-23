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
- [Getting Started](#getting-started) - Vlad
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage) - Rares
- [Development Process](#development-process) - Vlad
- [Supporting Documents](#supporing-documents) - Rares
    - Make sure to include scripts.
- [Running Tests](#running-tests) - Vlad
- [Deployment](#deployment) - Rares
- [Contributing](#contributing) - Vlad
- [License](#license) - Rares
- [Contact](#contact) - Vlad
- [Acknowledgements](#acknowledgements) - Vlad
- [Copyright](#copyright) - Rares

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

## Running Tests

[Explain how to run the automated tests for this system]

## Deployment

[Add additional notes about how to deploy this on a live system]

## Contributing

[If you are open to contributions, explain how external developers can help you. If not, this section can be removed.]

## License

[Include details of the license.]

## Contact

[Include contact details for the project team or for each of the team members.]

## Acknowledgements

[Here you can include the acknowledgements for projects (libraries, modules, etc.) you’ve used or for people who have inspired you.]

 + from Preface


