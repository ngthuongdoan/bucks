<template>
  <div>
    <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div
          v-on-click-away="away"
          class="relative w-auto my-6 mx-auto min-w-full max-w-sm">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--body-->
          <div class="relative p-2 flex-auto">
            <ul>
              <li v-for="(item, i) in categories" :key="i"
                  class="shadow-xl w-full px-5 py-2 rounded-2xl my-2 cursor-pointer capitalize"
                  @click="changeCategory(item)">
                <h1 class="font-bold">{{ item.name }}</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { categoryStore } from "@/plugin/db";
import { directive as onClickAway } from "vue-clickaway";

export default {
  data() {
    return {
      categories: []
    };
  },
  directives: {
    onClickAway
  },
  methods: {
    away() {
      this.$emit('away');
    },
    changeCategory(category) {
      this.$emit("change-category", category);
      this.away();
    }
  },
  firestore: {
    categories: categoryStore
  }
};
</script>