<template>
  <div class="h-screen overflow-auto w-screen">
    <div
        class="bg-gray-600 text-white flex justify-around items-center w-full py-5"
    >
      <img
          alt="" class="w-7" src="~@/assets/back.png" @click="to"/>
      <h1 class="text-lg capitalize">{{ title }}</h1>
      <button class="font-bold text-lg" @click="save">Save</button>
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
    },
  },
  methods: {
    save() {
      this.$emit("save");
    },
    to() {
      this.$router.push("/dashboard")
    }
  }
}
</script>