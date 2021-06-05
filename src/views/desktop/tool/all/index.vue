<template>
  <div>
    <ul class="flex flex-wrap gap-5 items-center">
      <li v-for="feat in features" :key="feat.path" class="card h-full text-center" @click="handleTool(feat)">
        <img
            :src="feat.icon"
            alt=""
            class=" object-cover m-auto w-10 mb-4"
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
    async handleTool(tool) {
      if (["debt-loan", "faq"].includes(tool.path)) {
        await this.$router.push(`/tool/${tool.path}`);
        return;
      }
      await this.$store.dispatch("modalModule/changeModal", {modal: tool.path})
    }
  }
}
</script>