<template>
  <nav class="w-full">
    <ul class="inline-flex bg-white w-full content-center justify-center">
      <li
          :class="[
          'login-navigation',
          tab === 'app-login'
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('route', 'app-login')"
      >
        LOGIN
      </li>
      <li
          :class="[
          'login-navigation',
          tab === 'app-signup'
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('route', 'app-signup')"
      >
        SIGN UP
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      required: true,
      validate(value) {
        const legal = [ "app-login", "app-signup" ];
        return legal.includes(value);
      }
    }
  }
};
</script>

<style>
</style>