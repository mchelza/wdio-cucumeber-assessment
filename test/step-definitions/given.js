const { Given } = require("@wdio/cucumber-framework");
const dotenv = require("dotenv").config();
const api = require("../../helper/apiHelper");
const fs = require("fs");
const chai = require("chai");
const calculatorPage = require("../pageobjects/calculatorPage");

//filePath for API Test
let resFilePath = `${process.cwd()}/apiResult/apiResult.json`;
let filePath = `${process.cwd()}/data/payload/payload.json`;

Given(
  /^user makes a post call with (.*) to register weather station (without|with) API key$/,
  async (payload, without) => {
    try {
      //Set flag to test Scenario with No and Valid API Key
      let flag;
      flag = without.trim() === "without" ? false : true;

      //create a payload data obj from json file
      let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

      //get the response by hitting the API
      let res = await api.registerStation(data[payload], flag);

      //wrtie the response to the json file by comparing the status code of the response
      if (res.statusCode === 401) {
        await fs.writeFileSync(
          resFilePath,
          JSON.stringify(res.body, undefined, 2)
        );
      } else {
        await fs.writeFileSync(resFilePath, JSON.stringify(res, undefined, 2));
      }
    } catch (error) {
      error.message = `Error when user makes a post call with payload to register weather station ${without} API key. ${error.message}`;
      throw error;
    }
  }
);

Given(/^user makes a get call to list the weather station$/, async () => {
  try {
    //User makes get call to get the list of stations and store it to a json
    let res = await api.getListOfStations();
    fs.writeFileSync(resFilePath, JSON.stringify(res.body, undefined, 2));
  } catch (error) {
    error.message = `Error when getting the list of Weather Station: ${error.message}`;
    throw error;
  }
});

Given(
  /^user makes a api call to delete all the weather station$/,
  async (datatable) => {
    try {
      //Get the data from datatable and json file
      let dt = datatable.hashes();
      let data = JSON.parse(
        fs.readFileSync(resFilePath, { encoding: "utf-8" })
      );

      // get the station id and use it to delte the station
      let id;
      for (let index = 0; index < dt.length; index++) {
        let flag = false;
        let val = dt[index].external_id;
        data.every((element) => {
          flag = val == element.external_id ? true : false;
          if (flag == true) {
            id = element.id;
            return false;
          }
          return true;
        });
        if (flag == true) {
          await api.deleteStation(id);
        }
      }

      //hit the get list of station api and update it to the result json file
      await fs.writeFileSync(
        resFilePath,
        JSON.stringify((await api.getListOfStations()).body, undefined, 2)
      );
    } catch (error) {
      error.message = `Error while trying to Delete the station using id: ${error.message}`;
      throw error;
    }
  }
);

Given(/^user opens browing calculator page$/, async () => {
  try {
    //Maximize the browser and wait for the page to load
    await browser.maximizeWindow();
    await browser.url(`/personal/home-loans/calculators-tools/much-borrow/`);
    await browser.waitUntil(
      async () =>
        await browser.execute(() => document.readyState === "complete"),
      {
        timeout: 10000,
        interval: 5000,
      }
    );
    //assert if the page title is matching
    await chai
      .expect(await browser.getTitle())
      .to.includes("Home loan borrowing power calculator");
  } catch (error) {
    error.message = `Error when opening the browser calculator page, ${error.message}`;
    throw error;
  }
});

Given(
  /^user inputs (.*), (.*) and (.*) under details section$/,
  async (applicationType, dependents, propertyFor) => {
    try {
      //Input the values under your details section
      await (await calculatorPage.applicationType(applicationType)).click();
      await (
        await calculatorPage.numberOfDependentsDropDown
      ).selectByVisibleText(dependents);
      await (await calculatorPage.propertyToBuy(propertyFor)).click();
    } catch (error) {
      error.message = `Error while trying input the details in Your details section, ${error.message}`;
      throw error;
    }
  }
);

Given(
  /^user inputs (.*) and (.*) under Your earnings section$/,
  async (annualIncome, otherIncome) => {
    try {
      //Input the details in the Your earning section
      await (await calculatorPage.yourAnnualIncome).setValue(annualIncome);
      await (await calculatorPage.yourAnnualOtherIncome).setValue(otherIncome);
    } catch (error) {
      error.message = `Error while trying input the details in Your earnings section, ${error.message}`;
      throw error;
    }
  }
);

Given(
  /^user inputs (.*), (.*), (.*), (.*) and (.*) under your expenses section$/,
  async (
    montlyExpense,
    homeLoanRepay,
    otherRepay,
    monthlyCommit,
    totalCreditLimit
  ) => {
    try {
      //Input the details in the Your expense section
      await (await calculatorPage.monthlyLivingExp).click();
      await (await calculatorPage.monthlyLivingExp).setValue(montlyExpense);
      await (
        await calculatorPage.homeLoanMonthlyRepayments
      ).setValue(homeLoanRepay);
      await (
        await calculatorPage.otherLoanMonthlyRepayments
      ).setValue(otherRepay);
      await (
        await calculatorPage.otherMonthlyCommitments
      ).setValue(monthlyCommit);
      await (
        await calculatorPage.totalCreditCardLimits
      ).setValue(totalCreditLimit);
    } catch (error) {
      error.message = `Error while trying input the details in Your expense section, ${error.message}`;
      throw error;
    }
  }
);
