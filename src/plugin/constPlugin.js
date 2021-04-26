import Vue from "vue";

const CONSTANTS = {
    DEBT_LOAN_DICT: ["debt", "loan", "debt-collection", "repayment"],
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
