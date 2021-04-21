import {transactionStore} from "@/plugin/db";
import {WalletService} from "@/service/Wallet.service";

export const TransactionService = {
    async addNew(transaction) {
        //Refined Data
        await transactionStore.add({...transaction});
        //Update Wallet Value
        await WalletService.updateWalletAmount(
            transaction.value,
            transaction.category.type,
            transaction.wallet.id
        );
    },
    // async delete(w) {
    //     return new Promise((resolve, reject) => {
    //         if (!(new RegExp("overview", "gi").test(w.name))) {
    //             const uid = store.getters["userModule/user"].data.uid;
    //             const walletsRef = walletStore.where("uid", "==", uid).where("name", "==", w.name).limit(1);
    //             walletsRef.get().then(querySnapshot => {
    //                 querySnapshot.forEach(doc => {
    //                     doc.ref.delete();
    //                     this.changeBackToOverView().then(() => {
    //                         resolve();
    //                     });
    //                 });
    //             });
    //         } else {
    //             reject(new Error("Not permit"));
    //         }
    //     });
    // }
};