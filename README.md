# wdio-cucumeber-assessment
This automation framework was created the executed the test in UI and API.

## Prerequisite 
Make sure Node.js and Visual Studio Code editing tool or any other tool is installed on the Machine

## Steps to Install
1. clone the project for the GitHuB
```bash
git clone https://github.com/mchelza/wdio-cucumeber-assessment.git
```
2. Create a new local branch and checkout it
```bash
git branch <branchName>
git checkout <branchName>
```
3. From the Terminal of the Root of the Project Directory, run this command in Terminal. This will install all the dependencies for the test to work in the local env
```bash
npm install
```

## To execute the Tests
1. To run both the UI and API test, use this command in the Terminal.
```bash
npm run wdio
```
2. To run the API test, use this command in the Terminal.
```bash
npm run apiTest
```
1. To run the UI test, use this command in the Terminal.
```bash
npm run uiTest
```

## Allure Report:
1. Once the test is executed allure report will be generated and will be under **"allure_report"** folder in the Root Directory
2. To open the allure report use this command in the Terminal.
```bash
allure open
```

### Note:
Tests were executed in Windows and were verified
