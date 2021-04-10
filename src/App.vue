<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$log.info('Info!');
    this.$log.warn('Warn!');
    this.$log.error('Error!');
  }
}
</script>

<style lang="scss"></style>
