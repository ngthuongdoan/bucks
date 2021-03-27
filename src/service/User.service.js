import {db} from "@/plugin/db";

export default {

  async getAll() {
  },
  async addNew(user) {
    const {uid, ...data} = user
    return await db.collection("users").doc(uid).set({...data})
  },
  async delete(w) {
  }
}