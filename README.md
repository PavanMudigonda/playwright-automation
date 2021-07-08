
# PlayWright-Web-Framework

### Setup
Make sure node is installed
- Dowload [nodeJs](!https://nodejs.org/en/download/)  from here for your platform.
- Clone the repo
- Download all the dependencies by
  ```
  npm install
  ```

- To run the test
  ```
  Set USERNAME and PASSWORD as environemt variables in gitlab pipeline.
  To run in local Mac machine:
    1. Open Terminal
    2. Open ~/.bash_profile
    3. export USERNAME="gitlab user name"
    4. export PASSWORD="gitlab password"
    5. Save the .bash_profile file 
    6. Run source ~/.bash_profile

  npm test
  ```
### Tech stack
1. Playwright
2. Playwright-test
3. TypeScript

### Framework capabilities
1. Logging
2. Parallel execution
3. Cross browser web-testing
4. CI

### Scenarios covered
We are using [Gitlab](!https://www.gitlab.com/) to demonstrate PlayWright with TS.
We have created following flows
1. Add a new blank project and delete an existing project.
2. Add a new member to an existing project
3. Add and delete a variable to an existing project.
- Default reporting is also added which will give all the different aspects of tests execution

### Help
For the remaining queries, questions and doubts reached out sNishant or Suma on slack 😛 

### Contributions
Anybody can start contributing to the project. Clone the repo and raise the pull request.
