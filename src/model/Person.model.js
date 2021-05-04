/**
 * @class
 * @classdesc Person who will be assigned to Debt/Loan
 */
class Person {
	/**
	 *
	 * @param {string} name
	 * @param {number} total - total debt/loan
	 * @param {string} uid - to user
	 */
	constructor(name, total, uid) {
		this.name = name;
		this.total = total;
		this.uid = uid;
	}
}

export default Person;
