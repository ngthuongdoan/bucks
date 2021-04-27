<template>
  <nav class="w-full">
    <ul class="inline-flex bg-white w-full content-center justify-center">
      <li
          v-for="route in routes"
          :key="route.name"
          :class="[
          'login-navigation',
          tab.includes(route.name)
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('route', route.dictionary)"
      >
        {{ route.name.toUpperCase() }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: true,
    },
    tab: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style>
</style>