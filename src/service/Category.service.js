import {categoryStore} from "@/plugin/db";

export const CategoryService = {
    async fetchCategory(category) {
        const snapshot = await categoryStore.where("name.en", "==", category).get();
        return {id: snapshot.docs[0].id, ...snapshot.docs[0].data()}
    }
}