<template>
  <div>
    <ul class="flex flex-wrap gap-5 items-center">
      <router-link v-for="feat in features" :key="feat.path" :to="'/tool/' + feat.path" class="card h-full text-center"
                   tag="li">
        <img
            :src="feat.icon"
            alt=""
            class=" object-cover m-auto w-10 mb-4"
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