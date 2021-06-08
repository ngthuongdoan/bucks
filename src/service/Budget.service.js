import {budgetStore, transactionStore} from "@/plugin/db";
import store from "@/store";
import * as dayjs from "dayjs";


export const BudgetService = {
  async addNew(budget) {
    const budgetSnapshot = await budgetStore
      .where("uid", "==", budget.uid)
      .where("category.id", "==", budget.category.id)
      .where("status", "==", "active")
      .get();

    if (budgetSnapshot.docs.length > 0) throw new Error("Already exist")

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
  async changeStatus() {
    const uid = store.getters["userModule/user"].data.uid
    const budgetSnapshot = await budgetStore
      .where("uid", "==", uid)
      .where("status", "==", "active")
      .get();

    budgetSnapshot.docs.forEach(snapshot => {
      const budget = snapshot.data();
      if (dayjs().isSame(dayjs(budget.dueDate.toDate()), "day")) {
        budgetStore.doc(snapshot.id).update({status: "inactive"}).then();
      }
    })
  },
  async updateBudget(transaction, state) {
    const budgetRef = budgetStore
      .where("uid", "==", transaction.uid)
      .where("category.id", "==", transaction.category.id)

    const budgetSnapshot = await budgetRef.get();
    const refinedValue = Math.abs(transaction.value) * ((state === "add") ? 1 : -1);
    if (budgetSnapshot.docs.length !== 0) {
      const currentValue = budgetSnapshot.docs[0].data().currentValue + refinedValue;
      await budgetStore.doc(budgetSnapshot.docs[0].id).update({currentValue})
    }
  },
  async delete(budget) {
    await budgetStore.doc(budget).delete();
  }
};