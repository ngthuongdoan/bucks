<template>
  <div>
    <input
        v-model="input"
        class="w-full p-2 mb-2"
        placeholder="Type here"
        type="search"
    />
    <div>
      <app-faq v-for="faq in searchItems" :key="faq.id" :faq="faq"></app-faq>
    </div>
  </div>
</template>

<script>
import AppFaq from "@/components/ui/AppFaq";
import faqs from "@/config/faqs.json"

export default {
  data() {
    return {
      input: "",
      searchItems: [],
    };
  },
  /**
   * Lầy FAQ từ trong store
   */
  async created() {
    this.faqs = faqs;
    this.searchItems = this.faqs;
  },
  watch: {
    /**
     * Hiện FAQ mỗi khi user nhập
     */
    input() {
      this.searchItems = this.faqs.filter((faq) =>
          faq.question[this.$i18n.locale].toLowerCase().includes(this.input.toLowerCase())
      );
    },
  },
  components: {
    AppFaq,
  },
};
</script>

<style lang="scss">

</style>