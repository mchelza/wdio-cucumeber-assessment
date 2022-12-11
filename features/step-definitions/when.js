const { When } = require("@wdio/cucumber-framework");
const chai = require("chai");
const calculatorPage = require("../pageobjects/calculatorPage");

When(/^the "(.*)" button is clicked$/, async (val) => {
  switch (val) {
    case "calculate":
      await (await calculatorPage.borrowCalculatorBtn).moveTo();
      await (await calculatorPage.borrowCalculatorBtn).click();
      await browser.pause(1000)
      let errorEle = await $("//div[@class='borrow__error__text'][@aria-live='assertive']")
      console.log(`is the error message displayed: ${await errorEle.isDisplayed()}`);
      if(await errorEle.isDisplayed()){
        throw Error(`Error in browser calculation, error in UI: ${await (
            await $("//div[@class='borrow__error__text'][@aria-live='assertive']")
          ).getText()}`)
      }else {
        await (
          await $("//span[@aria-live='assertive']")
        ).waitForExist({
          timeout: 5000,
          interval: 1000,
        });
      }
      break;

    case "start over":
        await (await calculatorPage.startOverBtn).moveTo();
        await (await calculatorPage.startOverBtn).click();

    default:
      break;
  }
});
