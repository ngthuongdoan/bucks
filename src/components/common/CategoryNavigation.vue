<template>
  <nav class="w-full">
    <ul class="inline-flex bg-white w-full content-center justify-center">
      <li
          :class="[
          'login-navigation',
          tab === 'category-income'
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', 'income')"
      >
        INCOME
      </li>
      <li
          :class="[
          'login-navigation',
          tab === 'category-expense'
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', 'expense')"
      >
        EXPENSE
      </li>
      <li
          :class="[
          'login-navigation',
          tab === 'category-debt-loan'
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', 'debt-loan')"
      >
        DEBT/LOAN
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
        const legal = [ "income", "expense", "debt-loan" ];
        return legal.includes(value);
      }
    }
  }
};
</script>

<style>
</style>