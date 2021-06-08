<template>
  <div>
    <ul class="lg:inline-flex lg:flex-wrap lg:gap-5 lg:items-center">
      <li
          v-for="feat in features"
          :key="feat.path"
          class="card"
          @click="handleRoute(feat.path)">
        <img
            :src="feat.icon"
            alt=""
            class="w-5 object-cover mr-2 lg:w-full lg:mb-4"
        />
        <h1>{{ $t(`tool.${feat.name}`) }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import features from "@/config/features.json";

export default {
  data() {
    return {
      features
    }
  },
  methods: {
    handleRoute(route) {
      if (route === "budget") {
        this.$router.push(route)

      } else {
        this.$router.push("tool/" + route)
      }
    }
  }
}
</script>