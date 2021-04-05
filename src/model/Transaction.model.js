import Category from "@/model/Category.model";
import Wallet from "@/model/Wallet.model";

class Transaction {
	/**
	 *
	 * @param value
	 * @param time
	 * @param detail
	 */
	constructor(value = 0, time = new Date(), detail = "") {
		this.value = value;
		this.time = time;
		this.detail = detail;
		this.images = [];
		this.wallet = new Wallet();
		this.category = new Category();
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
