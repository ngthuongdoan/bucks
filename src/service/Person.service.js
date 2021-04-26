import {personStore} from "@/plugin/db";

export const PersonService = {
    async updatePersonTotal(personId, total) {
        await personStore.doc(personId).update({total})
    }
}