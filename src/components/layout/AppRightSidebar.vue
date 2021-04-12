<template>
  <div id="rightsidebar"
       class="fixed right-0  min-h-screen w-60 rounded-tl-3xl rounded-bl-3xl shadow-3xl border-0"></div>
</template>

<script>
export default {
  name: "AppRightSidebar"
}
</script>

<style scoped>
#rightsidebar {
  background-image: url(~@/assets/img/card-container.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>