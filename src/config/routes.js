import {CONSTANTS} from "@/plugin/constPlugin";

export const routes = {
    LOGIN: [
        {
            name: "login",
            dictionary: ["login"]
        },
        {
            name: "signup",
            dictionary: ["signup"]
        }
    ],
    CATEGORY: [
        {
            name: "income",
            dictionary: ["income"]
        },
        {
            name: "expense",
            dictionary: ["expense"]
        },
        {
            name: "debtloan",
            dictionary: CONSTANTS.DEBT_LOAN_DICT
        }
    ],
    DEBT_LOAN: [
        {
            name: "debt",
            dictionary: ["debt"]
        },
        {
            name: "loan",
            dictionary: ["loan"]
        },
    ]
}