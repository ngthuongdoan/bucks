/**
 * @class
 * @classdesc Category for transactions.
 */
class Category {
	/**
     *
     * @param {string} name
     * @param {string} icon
     * @param {string|undefined} type - includes ["Income, Expense, Debt/Loan"]
     */
    constructor(name = "", icon = "", type = undefined) {
        this.name = {en: "", vi: ""};
      this.icon = icon;
        this.type = type;
    }
}

export default Category;
