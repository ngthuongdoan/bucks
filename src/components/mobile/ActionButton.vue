<template>
  <div>
    <circle-menu
        :colors="[
        '#539753',
        '#ffff66',
        '#FFE26F',
        '#F3825F',
        '#F19584',
      ]"
        :number="4"
        :type="isMobile?'middle-around':'right'"
        ref="circle"
        circle
    >
      <button
          slot="item_btn"
          class="w-10 h-10 rounded-full bg-control sonar transform translate-y-1"
      ></button>
      <router-link
          slot="item_1"
          class="fa"
          tag="a"
          to="/transaction/add"
          @click.native="toggleCircle"
      ></router-link>
      <router-link
          slot="item_4"
          class="fab fa-cc-visa"
          tag="a"
          to="/wallet/add"
          @click.native="toggleCircle"
      ></router-link>
      <router-link
          slot="item_3"
          class="fa "
          tag="a"
          to="/transaction/add"
          @click.native="toggleCircle"
      ></router-link>
      <router-link
          slot="item_2"
          class="fa fa-plus "
          tag="a"
          to="/transaction/add"
          @click.native="toggleCircle"
      ></router-link>
    </circle-menu>
  </div>
</template>

<script>
import CircleMenu from "vue-circle-menu";
import {isMobile} from 'mobile-device-detect';

export default {
  data() {
    return {
      isMobile
    }
  },
  methods: {
    toggleCircle() {
      this.$refs.circle.open = false;
    }
  },
  components: {
    CircleMenu
  }
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