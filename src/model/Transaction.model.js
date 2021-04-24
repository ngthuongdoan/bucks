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
		this.images = [];
		this.wallet = {};
		this.category = {};
	}

	/**
	 *
	 * @param wallet
	 */
	addWallet(wallet) {
		this.wallet = Object.assign({ id: wallet.id }, wallet);
	}

	/**
	 *
	 * @param images
	 */
	addImage(images) {
		this.images = [ ...images ];
	}

	/**
	 *
	 * @param category
	 */
	addCategory(category) {
		this.category = Object.assign({ id: category.id }, category);
	}
}

export default Transaction;
