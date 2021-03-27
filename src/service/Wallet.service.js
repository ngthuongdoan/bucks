import {db, Timestamp} from "@/plugin/db";
import Wallet from "@/model/Wallet.model";

export default {
  initOverviewWallet(uid) {
    return new Wallet("Overview", 0, "VND", "#1b1c6d", uid)
  },
  async getAll() {
  },
  async addNew(w) {
    return await db.collection("wallets").add({createdDate: Timestamp.fromDate(new Date()), ...w})
  },
  async delete(w) {
  }
}