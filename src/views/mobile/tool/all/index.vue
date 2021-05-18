<template>
  <div>
    <ul class="lg:inline-flex lg:flex-wrap lg:gap-5 lg:items-center">
      <router-link
          v-for="feat in features"
          :key="feat.path"
          :to="'/tool/' + feat.path"
          class="card" tag="li">
        <img
            :src="feat.icon"
            alt=""
            class="w-5 object-cover mr-2 lg:w-full lg:mb-4"
        />
        <h1>{{ feat.name }}</h1>
      </router-link>
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
  }
}
</script>