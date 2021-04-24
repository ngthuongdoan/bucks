<template>
  <div id="rightsidebar"
       class="fixed right-0  min-h-screen rounded-tl-3xl rounded-bl-3xl shadow-3xl border-0">
    <section class="flex flex-col items-center justify-center gap-6 rounded-tl-3xl bg-control p-10">
      <img :src="user.photoURL" alt="" class="rounded-full w-28">
      <h1 class="font-semibold">{{ user.displayName }}</h1>
    </section>
  </div>
</template>

<script>
export default {
  name: "AppRightSidebar",
  computed: {
    user() {
      return this.$store.getters["userModule/user"].data;
    }
  },
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