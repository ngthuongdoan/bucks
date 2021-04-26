<template>
  <nav class="w-full">
    <ul class="inline-flex bg-white w-full content-center justify-center">
      <li
          :class="[
          'login-navigation',
          tab.includes('income')
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', ['income'])"
      >
        INCOME
      </li>
      <li
          :class="[
          'login-navigation',
          tab.includes('expense')
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', ['expense'])"
      >
        EXPENSE
      </li>
      <li
          :class="[
          'login-navigation',
          tab.includes('debt')
            ? 'text-black bg-white'
            : 'text-gray-500 bg-gray-200',
        ]"
          @click="$emit('change-category', $getConst('DEBT_LOAN_DICT'))"
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
      type: Array,
      required: true,
    }
  }
};
</script>

<style>
</style>