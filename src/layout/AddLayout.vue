<template>
  <div class="h-screen overflow-auto w-screen pb-20">
    <div
        class="bg-gray-600 text-white flex justify-around items-center w-full py-5"
    >
      <img
          alt="" class="w-7" src="~@/assets/back.png" @click="to"/>
      <h1 class="text-lg capitalize">{{ title }}</h1>
      <input class="font-bold text-lg bg-transparent cursor-pointer" form="addForm" type="submit" value="Save"/>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "Add"
    }
  },
  methods: {
    to() {
      this.$router.push("/dashboard");
    }
  }
};
</script>