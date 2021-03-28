import {db, Timestamp} from "@/plugin/db";
import Wallet from "@/model/Wallet.model";

export const WalletService = {
  async initOverviewWallet(uid) {
    const overview = new Wallet("Overview", 0, "VND", "#1b1c6d", uid)
    return await this.addNew(overview);
  },
  async addNew(w) {
    return await db.collection("wallets").add({createdDate: Timestamp.fromDate(new Date()), ...w})
  },
  async delete(w) {
    return new Promise((resolve, reject) => {
      if (!(new RegExp("overview", "gi").test(w.name))) {
        db.collection("wallets").doc(w.id).delete().then(() => {
            resolve();
          }
        )
      } else {
        reject(new Error("Not permit"));
      }
    })

  }
}