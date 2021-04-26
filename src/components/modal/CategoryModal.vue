<template>
  <div>
    <div
        class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      <div class="relative p-2 flex-auto">
        <category-navigation
            :tab="currentCategory"
            @change-category="currentCategory = $event"
        ></category-navigation>
        <input v-model="searchCriteria" class="px-5 py-2" placeholder="search..." type="search">
        <ul class="max-h-96 overflow-y-scroll">
          <li v-for="(item, i) in filterCategory" :key="i"
              class="w-full px-5 py-2 rounded-2xl my-2 cursor-pointer flex"
              @click="changeCategory(item)">
            <img :src="item.icon" alt="" class="object-contain max-h-6 h-6 mr-4"/>
            <h1 class="capitalize">{{ item.name }}</h1>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryNavigation from "@/components/common/CategoryNavigation";
import {categoryStore} from "@/plugin/db";
import {directive as onClickAway} from "vue-clickaway";

export default {
  data() {
    return {
      categories: [],
      isFetching: true,
      currentCategory: ['income'],
      searchCriteria: ""
    };
  },
  directives: {
    onClickAway
  },
  watch: {
    categories() {
      this.isFetching = false;
    },
  },
  computed: {
    filterCategory() {
      if (this.searchCriteria === "") {
        return this.categories
            .filter(category => this.currentCategory.includes(category.type))
            .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      } else {
        return this.categories
            .filter(category =>
                this.currentCategory.includes(category.type)
                && (this.searchCriteria.toLowerCase().split('').every(v => category.name.toLowerCase().includes(v)))
            )
            .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }

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