Feature: Testcase for Weather Station API

    Scenario Outline:<TestID>: Verify Weather Station is not registered when the API key is not used
        Given user makes a post call with <payload> to register weather station without API key
        Then verify the response body from the API with the <expected>
        Examples:
            | TestID   | payload  | expected                   |
            | WSTA_001 | Payload1 | ExpectedInvalidKeyResponse |

    Scenario Outline:<TestID>: Register weather station
        Given user makes a post call with <payload> to register weather station with API key
        Then verify the status code <code> for the response
        Examples:
            | TestID   | payload  | code |
            | WSTA_002 | Payload1 | 201  |
            | WSTA_003 | Payload2 | 201  |

    Scenario:WSTA_004: verify the newly added weather station
        Given user makes a get call to list the weather station
        Then verify all the registered station are available
            | external_id  |
            | DEMO_TEST001 |
            | DEMO_TEST002 |

    Scenario:WSTA_005: Delete the added weater Station
        Given user makes a api call to delete all the weather station
            | external_id  |
            | DEMO_TEST001 |
            | DEMO_TEST002 |