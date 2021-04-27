<template>
  <div>
    <div
        class="border-0 relative flex flex-col w-full bg-white outline-none focus:outline-none">
      <div class="relative p-2 flex-auto">
        <app-navigation
            :routes="routes"
            :tab="currentCategory"
            @route="currentCategory = $event"
        ></app-navigation>
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
import {categoryStore} from "@/plugin/db";
import {directive as onClickAway} from "vue-clickaway";
import AppNavigation from "@/components/layout/AppNavigation";
import {routes} from "@/config/routes";

export default {
  data() {
    return {
      categories: [],
      isFetching: true,
      routes: [...routes.CATEGORY],
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
    changeCategory(category) {
      this.$emit("change-category", category);
    }
  },
  firestore: {
    categories: categoryStore
  },
  components: {
    AppNavigation
  }
};
</script>