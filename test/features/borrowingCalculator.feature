Feature: Borrowing Calculator

    Scenario Outline: <TestID>:Verify generated borrowing amount for the given parameters
        Given user opens browing calculator page
        And user inputs <Application Type>, <Number of Dependents> and <PropertyToBuyOrInvest> under details section
        And user inputs <Annual Income> and <Other Income> under Your earnings section
        And user inputs <Monthly Expenses>, <Home Loan Repay>, <Other Loan Repay>, <montly commitments> and <total credit limits> under your expenses section
        When the "calculate" button is clicked
        Then verify the calculated <borrowing amount>
        Examples:
            | TestID   | Application Type | Number of Dependents | PropertyToBuyOrInvest  | Annual Income | Other Income | Monthly Expenses | Home Loan Repay | Other Loan Repay | montly commitments | total credit limits | borrowing amount |
            | CALC_001 | single           | 0                    | Home to Live in        | 80000         | 10000        | 500              | 0               | 100              | 0                  | 10000               | $447,000         |
            | CALC_002 | single           | 2                    | Residential investment | 100000        | 0            | 1000             | 0               | 500              | 500                | 20000               | $176,000         |

    Scenario Outline: <TestID>: Verify start over button resets the calculator with default values
        Given user opens browing calculator page
        And user inputs <Application Type>, <Number of Dependents> and <PropertyToBuyOrInvest> under details section
        And user inputs <Annual Income> and <Other Income> under Your earnings section
        And user inputs <Monthly Expenses>, <Home Loan Repay>, <Other Loan Repay>, <montly commitments> and <total credit limits> under your expenses section
        When the "start over" button is clicked
        Then verify the default values are displayed in the calculator
        Examples:
            | TestID   | Application Type | Number of Dependents | PropertyToBuyOrInvest  | Annual Income | Other Income | Monthly Expenses | Home Loan Repay | Other Loan Repay | montly commitments | total credit limits |
            | CALC_003 | joint            | 3                    | Residential investment | 80000         | 10000        | 500              | 500             | 100              | 200                | 10000               |
