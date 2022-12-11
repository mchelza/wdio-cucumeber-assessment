Feature: Testcase for Weather Station API

    # Scenario Outline: Verify Weather Station is not registered when the API key is not used
    #     Given user makes a post call with <payload> to register weather station without API key
    #     Then verify the response body from the API with the <expected>
    #     Examples:
    #         | payload      | expected     |
    #         | DemoPayload1 | ExpectedVal1 |

    # Scenario Outline: Register weather station
    #     Given user makes a post call with <payload> to register weather station with API key
    #     Then verify the <statusCode> of the response
    #     Examples:
    #         | payload      | statusCode |
    #         | DemoPayload1 | 201        |
    #         | DemoPayload2 | 201        |

    # Scenario: verify the newly added weather station
    # Given user makes a get call to list the weather station
    # Then verify all the registered station are available
    #     | external_id  |
    #     | DEMO_TEST001 |
    #     | DEMO_TEST002 |

    Scenario: Delete the added weater Station
        Given user makes a api call to delete all the weather station
            | external_id  |
            | DEMO_TEST001 |
            | DEMO_TEST002 |