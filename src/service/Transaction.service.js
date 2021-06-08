import {transactionStore} from "@/plugin/db";
import {WalletService} from "@/service/Wallet.service";
import {PersonService} from "@/service/Person.service";
import {BudgetService} from "@/service/Budget.service";

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
    await BudgetService.updateBudget(transaction, "add");
  },
  async delete(transaction) {
    await BudgetService.updateBudget(transaction, "delete");

    await transactionStore.doc(transaction.id).delete();
    await WalletService.updateWalletAmount(
      -transaction.value,
      transaction.category.type,
      transaction.wallet
    );
  }
};