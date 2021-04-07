<template>
  <div>
    <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex ">
      <div
          v-on-click-away="away"
          class="relative w-auto h-1/2 my-6 mx-auto min-w-full max-w-sm ">
        <!--content-->
        <div
            class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--body-->
          <div class="relative p-2 flex-auto">
            <category-navigation
                :tab="currentCategory"
                @change-category="currentCategory = $event"
            ></category-navigation>
            <ul>
              <li v-for="(item, i) in filterCategory" :key="i"
                  class="w-full px-5 py-2 rounded-2xl my-2 cursor-pointer flex"
                  @click="changeCategory(item)">
                <img :src="item.icon" alt="" class="object-contain max-h-4 h-4"/>
                <h1 class="capitalize">{{ item.name }}</h1>
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
import CategoryNavigation from "@/components/common/CategoryNavigation";
import { categoryStore } from "@/plugin/db";
import { directive as onClickAway } from "vue-clickaway";

export default {
  data() {
    return {
      categories: [],
      isFetching: true,
      currentCategory: 'income'
    };
  },
  directives: {
    onClickAway
  },
  watch: {
    categories() {
      this.isFetching = false;
    }
  },
  computed: {
    filterCategory() {
      return this.categories.filter(category => category.type === this.currentCategory);
    }
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
  },
  components: {
    CategoryNavigation
  }
};
</script>