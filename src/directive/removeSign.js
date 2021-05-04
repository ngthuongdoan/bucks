import Vue from "vue";

Vue.directive('unsigned', {
  update(el) {
    el.innerText = Math.abs(Number.parseFloat(el.innerText));
  }
})