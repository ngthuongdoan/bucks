import Vue from "vue";

export const CONSTANTS = {
    DEBT_LOAN_DICT: ["debt", "loan", "debt-collection", "repayment"],
    DEBT_DICT: ["debt", "repayment"],
    LOAN_DICT: ["loan", "debt-collection"],
    INCREASE_DICT: ["income", "debt", "debt-collection"],
    DECREASE_DICT: ["expense", "loan", "repayment"]
}
let obj = {}; // As suggested by the comments.

obj.install = function (Vue, options) {
    Vue.prototype.$getConst = (key) => {
        return CONSTANTS[key]
    }
}

Vue.use(obj);
