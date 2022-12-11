const { Then } = require("@wdio/cucumber-framework");
const dotenv = require("dotenv").config();
const chai = require("chai");
const api = require("../../helper/apiHelper");
const fs = require("fs");
const calculatorPage = require("../pageobjects/calculatorPage");

let actualFilePath = `${process.cwd()}/apiResult/apiResult.json`;
let resFilePath = `${process.cwd()}/apiResult/apiResult.json`;

Then(
  /^verify the response body from the API with the (.*)$/,
  async (expected) => {
    let expectedData = JSON.parse(
      fs.readFileSync(`${process.cwd()}/data/expected/expectedResult.json`, {
        encoding: "utf-8",
      })
    );
    let actualData = JSON.parse(
      fs.readFileSync(actualFilePath, { encoding: "utf-8" })
    );
    chai
      .expect(JSON.stringify(actualData))
      .to.eql(JSON.stringify(expectedData[expected]));
  }
);

Then(/^verify the (.*) of the response$/, async (statusCode) => {
  let actualData = JSON.parse(
    fs.readFileSync(actualFilePath, { encoding: "utf-8" })
  );
  console.log(`status code: ${actualData.status}`);
  chai.expect(actualData.status).to.equal(parseInt(statusCode));
});

Then(/^verify all the registered station are available$/, async (datatable) => {
  let dt = await datatable.hashes();
  console.log(`datatable value: ${JSON.stringify(dt.length)}`);
  console.log(`datatable val: ${dt[0].external_id}`);
  let actualData = await JSON.parse(
    fs.readFileSync(resFilePath, { encoding: "utf-8" })
  );
  for (let index = 0; index < dt.length; index++) {
    let val = dt[index].external_id;
    let count = 0;
    actualData.forEach((element) => {
      if (val === element.external_id) {
        console.log(
          `match found breaking the statment: ${element.external_id}`
        );
        return;
      }
      count = count + 1;
      if (count === dt.length) {
        throw Error(`${val} is not available in the get API response`);
      }
    });
  }
});

Then(/^verify the calculated (.*)$/, async (amount) => {
    let actVal = await (await calculatorPage.borrowAmt).getText()
    console.log(`actual value: ${actVal}`);
    chai.expect(actVal).to.eql(amount)
});

Then(/^verify the default values are displayed in the calculator$/, async ()=>{
  chai.expect(await (await (await $("//label[@for='application_type_single']")).getText()).trim()).to.eql("Single")
  chai.expect(await (await calculatorPage.numberOfDependentsDropDown).getValue()).to.eql("0")
  chai.expect(await (await (await $("//label[@for='borrow_type_home']")).getText()).trim()).to.eql("Home to live in")
  chai.expect(await (await calculatorPage.yourAnnualIncome).getValue()).to.eql("0")
  chai.expect(await (await calculatorPage.yourAnnualOtherIncome).getValue()).to.eql("0")

  chai.expect(await (await calculatorPage.monthlyLivingExp).getValue()).to.eql("0")
  chai.expect(await (await calculatorPage.homeLoanMonthlyRepayments).getValue()).to.eql("0")
  chai.expect(await (await calculatorPage.otherLoanMonthlyRepayments).getValue()).to.eql("0")
  chai.expect(await (await calculatorPage.otherMonthlyCommitments).getValue()).to.eql("0")
  chai.expect(await (await calculatorPage.totalCreditCardLimits).getValue()).to.eql("0")
}) 
