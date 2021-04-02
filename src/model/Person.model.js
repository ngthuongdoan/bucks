/**
 * @class
 * @classdesc Person who will be assigned to Debt/Loan
 */
class Person {
	/**
	 *
	 * @param {string} name
	 * @param {string} phone - ten numbers with region code
	 * @param {number} total - total debt/loan
	 */
	constructor(name, phone, total) {
		this.name = name;
		this.phone = phone;
		this.total = total;
	}
}

export default Person;
