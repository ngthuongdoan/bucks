import Currency from "@/model/Currency.model";
import Wallet from "@/model/Wallet.model";
import {Timestamp, userStore, walletStore} from "@/plugin/db";
import store from "@/store";


export const WalletService = {
  /**
   * Update wallet whenever add new Transaction, Adjust Balance
   * @param {string|number} value
   * @param {('income'|'expense'| undefined)} type
   * @param walletId
   * @returns {Promise<void>}
   */
  async updateWalletAmount(value, type, walletId) {
    const walletRef = await walletStore.doc(walletId).get();
    const wallet = await walletRef.data();
    wallet.amount += Number.parseFloat(value);
    await walletStore.doc(walletId).update({amount: wallet.amount})
    // Update selected wallet
    await store.dispatch("userModule/changeSelected", walletId)
  },
  async initOverviewWallet(uid) {
    const overview = new Wallet("Overview", 0, new Currency("VND", "Vietnam Dong"), "#1b1c6d", uid);
    return await this.addNew(overview);
  },
  async addNew(w) {
    return await walletStore.add({createdDate: Timestamp.fromDate(new Date()), ...w});
  },
  async updateWallet(w) {
    const uid = store.getters["userModule/user"].data.uid;

    await walletStore.doc(w.id).set(w);
    await userStore.doc(uid).update({selectedWallet: w.id})
    await store.dispatch("userModule/changeSelected", w.id)
  },
  async fetchWallet(wallet) {
    const uid = store.getters["userModule/user"].data.uid;

    const snapshot = await walletStore.where("uid", "==", uid).where("name", "==", wallet).get();
    return {id: snapshot.docs[0].id, ...snapshot.docs[0].data()}
  },
  async changeBackToOverView() {
    //Find Overview
    try {
      const uid = store.getters["userModule/user"].data.uid;

      const wallet = await this.fetchWallet("Overview");
      await userStore.doc(uid).update({selectedWallet: wallet.id})
      await store.dispatch("userModule/changeSelected", wallet.id)
    } catch (e) {
      console.log(e);
    }
  },
  async delete(w) {
    if (!(new RegExp("overview", "gi").test(w.name))) {
      await walletStore
        .doc(w.id)
        .delete()
      await this.changeBackToOverView();
    } else {
      return new Error("Not permit")
    }
  }
};