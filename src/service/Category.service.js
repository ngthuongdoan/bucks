import {categoryStore} from "@/plugin/db";

export const CategoryService = {
    async fetchAdjustBalance() {
        const snapshot = await categoryStore.where("name", "==", "Adjust Balance").get();
        return snapshot.docs[0].data();
    }
}