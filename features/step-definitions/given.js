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
    let flag;
    flag = without.trim() === "without" ? false : true;
    console.log(`>>flag value: ${flag}`);
    console.log(`>>api URL: ${process.env.API_URL}`);
    let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
    console.log(`>>payload from method: ${payload}`);
    console.log(`>>value from file: ${typeof data}`);
    console.log(`>>value of data: ${JSON.stringify(data)}`);
    console.log(`>>payload from data: ${JSON.stringify(data[payload])}`);
    let res = await api.registerStation(data[payload], flag);
    console.log(`>>res from api: ${JSON.stringify(res)}`);
    if (flag === false) {
      await fs.writeFileSync(
        resFilePath,
        JSON.stringify(res.body, undefined, 2)
      );
    } else {
      await fs.writeFileSync(resFilePath, JSON.stringify(res, undefined, 2));
    }
  }
);

Given(/^user makes a get call to list the weather station$/, async () => {
  let res = await api.getListOfStations();
  console.log(`>>Get API response: ${JSON.stringify(res)}`);
  fs.writeFileSync(resFilePath, JSON.stringify(res.body, undefined, 2));
});

Given(
  /^user makes a api call to delete all the weather station$/,
  async (datatable) => {
    let dt = datatable.hashes();
    let data = JSON.parse(fs.readFileSync(resFilePath, { encoding: "utf-8" }));
    console.log(`data length: ${dt.length}`);
    console.log(`data length val: ${JSON.stringify(dt)}`);
    console.log(`data iid val: ${JSON.stringify(dt[0])}`);
    let id;
    for (let index = 0; index < dt.length; index++) {
      let flag = false;
      let val = dt[index].external_id;
      console.log(`val inside for loop: ${val}`);
      console.log(`data val inside for loop: ${JSON.stringify(data)}`);
      data.every((element) => {
        console.log(`inside for each loop`);
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
    await fs.writeFileSync(
      resFilePath,
      JSON.stringify((await api.getListOfStations()).body, undefined, 2)
    );
  }
);

Given(/^user opens browing calculator page$/, async () => {
  console.log(`session ID : ${await browser.sessionId}`); 
  await browser.maximizeWindow();
  await browser.url(
    `https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/`
  );
  await browser.waitUntil(async ()=> await browser.execute(() => document.readyState === 'complete'),{
    timeout:10000,
    interval:5000
  })
  await chai
    .expect(await browser.getTitle())
    .to.includes("Home loan borrowing power calculator");
});

Given(
  /^user inputs (.*), (.*) and (.*) under details section$/,
  async (applicationType, dependents, propertyFor) => {
    await (await calculatorPage.applicationType(applicationType)).click();
    await (
      await calculatorPage.numberOfDependentsDropDown
    ).selectByVisibleText(dependents);
    await (await calculatorPage.propertyToBuy(propertyFor)).click();
  }
);

Given(
  /^user inputs (.*) and (.*) under Your earnings section$/,
  async (annualIncome, otherIncome) => {
    await (await calculatorPage.yourAnnualIncome).setValue(annualIncome);
    await (await calculatorPage.yourAnnualOtherIncome).setValue(otherIncome);
  }
);

Given(
  /^user inputs (.*), (.*), (.*), (.*) and (.*) under your expenses section$/,
  async (montlyExpense,homeLoanRepay,otherRepay,monthlyCommit,totalCreditLimit) => {
    await (await calculatorPage.monthlyLivingExp).click();
    await (await calculatorPage.monthlyLivingExp).setValue(montlyExpense);
    await (await calculatorPage.homeLoanMonthlyRepayments).setValue(homeLoanRepay);
    await (await calculatorPage.otherLoanMonthlyRepayments).setValue(otherRepay);
    await (await calculatorPage.otherMonthlyCommitments).setValue(monthlyCommit);
    await (await calculatorPage.totalCreditCardLimits).setValue(totalCreditLimit);
  }
);
