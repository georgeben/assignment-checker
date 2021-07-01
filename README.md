# Assignment Checker API
[![Continuous-Integration](https://github.com/georgeben/assignment-checker/actions/workflows/ci.yml/badge.svg)](https://github.com/georgeben/assignment-checker/actions/workflows/ci.yml)  
Compare assignment submissions for **lexical** similarity. 

## Getting started
Follow the instructions given below to get this project up and running on your local machine.

## Tools & Technologies
- Javascript
- Node.js
- Express.js 
- MongoDB
- Docker
- Github Actions
- Heroku

## Architecture
- Clean Architecture
- Domain Driven Design

## Code Style
- ES6+
- Dependency injection

### Prerequisites
Make sure you have the following installed:
- [Docker](https://docker.com)

### Installation
1. Clone this repository by running `git clone repo_url`
2. Change your directory to the project's directory by running `cd project_directory`
3. Create a .env file and fill in all the values specified in the `env.schema` file
4. Build the docker image `docker build -t assignment-checker -f Dockerfile .`.
5. Run the image `docker run --rm -it -p [PORT]:[PORT] --name assignment-checker --env-file .env assignment-checker`
5. Access the app by opening up http://localhost:[PORT]/ on your browser.

NOTE:
To use a local mongodb cluser run:
`docker run --rm -it --name assignment-checker -p 5432:5432 --env-file .env --env MONGO_HOST=host.docker.internal  assignment-checker`


## NPM Scripts
- test: Run both unit and integration tests
- build: Compile the source-code (/src) to generate code that can be deployed (/dist)
- start:dev: Run the app in development mode. The app is restarted on any file change, which makes development a bit faster.
- lint: Lint code using ESLint
- prestart: Runs before the app starts. Runs the build scripts
- start: Starts the app in production mode


## API Documentation
View the API Documentation [here](https://documenter.getpostman.com/view/5935573/Tzkzpydi)

## Author
George Benjamin
