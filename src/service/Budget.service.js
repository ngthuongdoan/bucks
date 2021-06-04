import {budgetStore, transactionStore} from "@/plugin/db";

export const BudgetService = {
  async addNew(budget) {
    //Refined Data
    const snapshot = await transactionStore
      .where("uid", "==", budget.uid)
      .where("time", ">=", budget.beginDate)
      .where("time", "<=", budget.dueDate)
      .where("category.id", "==", budget.category.id)
      .get();
    budget.currentValue = snapshot.docs.reduce(
      (accumulator, current) => accumulator + Math.abs(+current.data().value)
      , 0
    );
    await budgetStore.add({...budget});
  },
  async delete(budget) {
    await budgetStore.doc(budget.id).delete();
  }
};