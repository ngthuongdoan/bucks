import store from "@/store";

class Budget {
  /**
   *
   * @param total
   * @param beginDate
   * @param dueDate
   */
  constructor(total = 0, beginDate = "", dueDate = "") {
    this.total = total;
    this.currentValue = 0;
    this.uid = store.getters["userModule/user"].data.uid;
    this.beginDate = beginDate;
    this.dueDate = dueDate;

    this.category = {};
  }
}

export default Budget;
