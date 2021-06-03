<template>
    <textarea
        v-model="note"
        class="w-full px-5 h-40"
    ></textarea>
</template>

<script>
export default {
  props: {
    detail: {
      type: String,
      required: true,
    },
  },
  computed: {
    note: {
      get() {
        return this.detail
      },
      set(value) {
        this.$emit('change-detail', value)
      },
    },
  },
}
</script>

<style scoped>

</style>