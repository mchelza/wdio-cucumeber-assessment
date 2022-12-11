const { Then } = require("@wdio/cucumber-framework");
const dotenv = require("dotenv").config();
const chai = require("chai");
const api = require("../../helper/apiHelper");
const fs = require("fs");
const calculatorPage = require("../pageobjects/calculatorPage");

let actualFilePath = `${process.cwd()}/apiResult/apiResult.json`;
let resFilePath = `${process.cwd()}/apiResult/apiResult.json`;
let expFilePath = `${process.cwd()}/data/expected/expectedResult.json`;

Then(
  /^verify the response body from the API with the (.*)$/,
  async (expected) => {
    try {
      //Read data from expected and actual json file
      let expectedData = JSON.parse(
        fs.readFileSync(expFilePath, {
          encoding: "utf-8",
        })
      );
      let actualData = JSON.parse(
        fs.readFileSync(actualFilePath, { encoding: "utf-8" })
      );

      //Verify the data by making an assertion
      chai
        .expect(JSON.stringify(actualData))
        .to.eql(JSON.stringify(expectedData[expected]));
    } catch (error) {
      error.message = `Failed to verify the response body, ${error.message}`;
      throw error;
    }
  }
);

Then(/^verify the status code (.*) for the response$/, async (statusCode) => {
  try {
    //Get the actual date from the stored json file
    let actualData = JSON.parse(
      fs.readFileSync(actualFilePath, { encoding: "utf-8" })
    );
    //Verify it with the expected status code
    chai.expect(actualData.status).to.equal(parseInt(statusCode));
  } catch (error) {
    error.message = `Error while verifying the status code, ${error.message}`;
    throw error;
  }
});

Then(/^verify all the registered station are available$/, async (datatable) => {
  try {
    //get the actual data and datatable values
    let dt = await datatable.hashes();
    let actualData = await JSON.parse(
      fs.readFileSync(resFilePath, { encoding: "utf-8" })
    );

    //With the datatable values search through the actual data and see if the expected value is displayed
    for (let index = 0; index < dt.length; index++) {
      let val = dt[index].external_id;
      let count = 0;
      actualData.every((element) => {
        if (val === element.external_id) {
          return false;
        }
        count = count + 1;
        if (count === dt.length) {
          throw Error(`${val} is not available in the get API response`);
        }
        return true;
      });
    }
  } catch (error) {
    error.message = `Error while verifying list of registered station. ${error.message}`;
    throw error;
  }
});

Then(/^verify the calculated (.*)$/, async (amount) => {
  let actVal = await (await calculatorPage.borrowAmt).getText();
  console.log(`actual value: ${actVal}`);
  chai.expect(actVal).to.eql(amount);
});

Then(
  /^verify the default values are displayed in the calculator$/,
  async () => {
    chai
      .expect(
        await (
          await (await $("//label[@for='application_type_single']")).getText()
        ).trim()
      )
      .to.eql("Single");
    chai
      .expect(
        await (await calculatorPage.numberOfDependentsDropDown).getValue()
      )
      .to.eql("0");
    chai
      .expect(
        await (
          await (await $("//label[@for='borrow_type_home']")).getText()
        ).trim()
      )
      .to.eql("Home to live in");
    chai
      .expect(await (await calculatorPage.yourAnnualIncome).getValue())
      .to.eql("0");
    chai
      .expect(await (await calculatorPage.yourAnnualOtherIncome).getValue())
      .to.eql("0");

    chai
      .expect(await (await calculatorPage.monthlyLivingExp).getValue())
      .to.eql("0");
    chai
      .expect(await (await calculatorPage.homeLoanMonthlyRepayments).getValue())
      .to.eql("0");
    chai
      .expect(
        await (await calculatorPage.otherLoanMonthlyRepayments).getValue()
      )
      .to.eql("0");
    chai
      .expect(await (await calculatorPage.otherMonthlyCommitments).getValue())
      .to.eql("0");
    chai
      .expect(await (await calculatorPage.totalCreditCardLimits).getValue())
      .to.eql("0");
  }
);
