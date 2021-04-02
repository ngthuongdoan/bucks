/**
 * @class
 * @classdesc Wallet is a container of transactions.
 */
import Currency from "@/model/Currency.model";

class Wallet {
	/**
	 * Create new Wallet
	 * @param  {string} name
	 * @param  {number} amount
	 * @param  {string} color - "#xxxxxx"
	 * @param {string} uid - Owner
	 * @param  {string} bank=""
	 * @param type
	 * @param  {string} serial="" - If bank exists
	 * @param  {Currency} currency - Currency API
	 */
	constructor(name = "", amount = 0, currency = new Currency("VND", "Vietnam Dong"), color = "#000", uid = "", bank = "", type = "", serial = "") {
		this.name = name;
		this.amount = amount;
		this.color = color;
		this.currency = Object.assign({}, currency);
		this.uid = uid;
		if (bank) {
			this.serial = serial;
			this.bank = bank;
			this.type = type;
		}
	}
}

export default Wallet;
