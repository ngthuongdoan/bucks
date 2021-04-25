import store from "@/store";

class Transaction {
	/**
	 *
	 * @param value
	 * @param time
	 * @param detail
	 */
	constructor(value = 0, time = "", detail = "") {
		this.value = value;
		this.uid = store.getters["userModule/user"].data.uid;
		this.time = time;
		this.detail = detail;
		this.image = "";
		this.wallet = {};
		this.category = {};
		this.person = {}
	}
}

export default Transaction;
