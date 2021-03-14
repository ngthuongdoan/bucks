<template>
  <div
    class="absolute flex items-center justify-center top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-control"
  >
    <circle-menu
      type="middle-around"
      :number="4"
      circle
      class="outline-none focus:outline-none"
      :colors="[
        '#FFEAB7',
        'rgb(255, 255, 102)',
        '#FFE26F',
        '#F3825F',
        '#F19584',
      ]"
    >
      <button
        class="w-10 h-10 rounded-full bg-control-light sonar transform translate-y-1"
        slot="item_btn"
      ></button>
      <a slot="item_1" class="fa fa-plus text-white"></a>
      <a slot="item_2" class="fa fa-plus text-white"></a>
      <a slot="item_3" class="fa fa-plus text-white"></a>
      <a slot="item_4" class="fa fa-plus text-white"></a>
    </circle-menu>
  </div>
</template>

<script>
import CircleMenu from "vue-circle-menu";

export default {
  components: {
    CircleMenu,
  },
};
</script>
<style lang="scss">
.oy-menu-btn {
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }
}
.sonar {
  animation: sonar-effect 1s ease-in-out 0.1s infinite;
}

@keyframes sonar-effect {
  0% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.5;
    box-shadow: 0 0 0 5px #fff, 0 0 10px 10px #fff, 0 0 0 10px #fff;
  }
  100% {
    box-shadow: 0 0 0 5px #fff, 0 0 10px 10px #fff, 0 0 0 10px #fff;
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>