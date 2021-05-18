<template>
  <div>
    <h3 class="p-3 w-full bg-gray-200 cursor-pointer relative" @click="showAnswer">
      {{ faq.question[$i18n.locale] }}
    </h3>
    <p v-show="isShown" class="p-3 w-full border bg-white">{{ faq.answer[$i18n.locale] }}</p>
    <hr/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  props: {
    faq: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showAnswer() {
      this.isShown = !this.isShown;
    },
  },
};
</script>
<style lang="scss">
</style>
