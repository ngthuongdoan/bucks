/**
 * @class
 * @classdesc Category for transactions.
 */
class Category {
	/**
	 *
	 * @param {string} name
	 * @param {Image} icon
	 * @param {string} type - includes ["Income, Expense, Debt/Loan"]
	 */
	constructor(name, icon, type) {
		this.name = name;
		this.icon = icon;
		this.type = type;
	}
}

export default Category;
