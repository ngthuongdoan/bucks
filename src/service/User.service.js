import {userStore} from "@/plugin/db";

export const UserService = {

	async getAll() {
	},
	async addNew(user) {
		const {uid, ...data} = user;
		return await userStore.doc(uid).set({...data});
	},
	async delete(w) {
	}
};