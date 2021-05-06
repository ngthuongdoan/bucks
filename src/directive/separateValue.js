import Vue from "vue";

Vue.directive('separate', {
  update(el) {
    el.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})