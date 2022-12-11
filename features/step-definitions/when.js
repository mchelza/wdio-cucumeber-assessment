const { When } = require("@wdio/cucumber-framework");
const chai = require("chai");
const calculatorPage = require("../pageobjects/calculatorPage");

When(/^the "(.*)" button is clicked$/, async (val) => {
  try {
    // swwitch between calculate and startover button
    switch (val) {
      case "calculate":
        //Move to calculate button and click it
        await (await calculatorPage.borrowCalculatorBtn).moveTo();
        await (await calculatorPage.borrowCalculatorBtn).click();
        await browser.pause(1000)

        //Verify if the calculation is performed or a error message is displayed
        let errorEle = await calculatorPage.calculatorError
        if (await errorEle.isDisplayed()) {
          throw Error(`Error in browser calculation, error in UI: ${await (
            await calculatorPage.calculatorError
          ).getText()}`)
        } else {
          await (
            await calculatorPage.computingEle
          ).waitForExist({
            timeout: 5000,
            interval: 1000,
          });
        }
        break;

      case "start over":
        //Click the startOver button
        await (await calculatorPage.startOverBtn).moveTo();
        await (await calculatorPage.startOverBtn).click();
        break;

      default:
        break;
    }
  } catch (error) {
    error.message = `Error when clicking the ${val} button: ${error.message}`
    throw error
  }
});
