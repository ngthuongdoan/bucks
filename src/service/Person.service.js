import {personStore} from "@/plugin/db";

export const PersonService = {
    async updatePersonTotal(personId, person) {
        await personStore.doc(personId).update({
            totalDebt: person.totalDebt,
            totalLoan: person.totalLoan,
        })
    }
}