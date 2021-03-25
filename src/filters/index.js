import Vue from "vue";

Vue.filter('separateValue', (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})