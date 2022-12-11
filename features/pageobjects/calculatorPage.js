class CalculatorPage{

    
    async applicationType(val){
        return await $(`#application_type_${val.toLowerCase()}`)
    }

     get numberOfDependentsDropDown(){return $("//select[@title = 'Number of dependants']")}

    async propertyToBuy(val){
        if(val.toLowerCase() === "home to live in") return await $(`#borrow_type_home`)
        if(val.toLowerCase() === "residential investment") return await $(`#borrow_type_investment`)
    }

    get yourAnnualIncome(){return $("//input[@aria-labelledby='q2q1']")}

    get yourAnnualOtherIncome(){return $("//input[@aria-labelledby='q2q2']")}

    get monthlyLivingExp(){return $("//input[@aria-labelledby='q3q1']")}

    get homeLoanMonthlyRepayments(){ return $("//input[@aria-labelledby='q3q2']")}

    get otherLoanMonthlyRepayments(){ return $("//input[@aria-labelledby='q3q3']")}

    get otherMonthlyCommitments(){ return $("//input[@aria-labelledby='q3q4']")}

    get totalCreditCardLimits(){ return $("//input[@aria-labelledby='q3q5']")}

    get borrowCalculatorBtn() {return $("#btnBorrowCalculater")}

    get borrowAmt() {return $("#borrowResultTextAmount")}

    get startOverBtn(){ return $("(//button[@class='start-over'])[1]")}

    get calculatorError(){ return $("//div[@class='borrow__error__text'][@aria-live='assertive']")}

    get computingEle() {return $("//span[@aria-live='assertive']")}

    get application() {return $("//label[@for='application_type_single']")}

    get property() {return $("//label[@for='borrow_type_home']")}
}

module.exports = new CalculatorPage()