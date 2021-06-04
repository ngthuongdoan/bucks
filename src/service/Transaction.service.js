import {budgetStore, transactionStore} from "@/plugin/db";
import {WalletService} from "@/service/Wallet.service";
import {PersonService} from "@/service/Person.service";

export const TransactionService = {
  async addNew(transaction) {
    //Refined Data
    await transactionStore.add({...transaction});
    if (Object.keys(transaction.person).length !== 0) {
      await PersonService.updatePersonTotal(transaction.person.id, transaction.person)
    }
    //Update Wallet Value
    await WalletService.updateWalletAmount(
      transaction.value,
      transaction.category.type,
      transaction.wallet
    );

    //Update budget
    const budgetRef = budgetStore
      .where("uid", "==", transaction.uid)
      .where("category.id", "==", transaction.category.id)

    const budgetSnapshot = await budgetRef.get();

    if (budgetSnapshot.docs.length !== 0) {
      const currentValue = budgetSnapshot.docs[0].data().currentValue + Math.abs(transaction.value);
      await budgetStore.doc(budgetSnapshot.docs[0].id).update({currentValue})
    }
  },
  async delete(transaction) {
    await transactionStore.doc(transaction.id).delete();
    await WalletService.updateWalletAmount(
      -transaction.value,
      transaction.category.type,
      transaction.wallet
    );
  }
};