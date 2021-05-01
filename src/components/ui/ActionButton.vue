<template>
  <div v-on-click-away="toggleCircle">
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
      <button
          slot="item_1"
          class="fa fa-plus"
          @click.native="toggleCircle"
      ></button>
      <button
          slot="item_4"
          class="fab fa-cc-visa"
          @click.native="handle(`/wallet/add`, 'wallet')"
      ></button>
      <button
          slot="item_3"
          class="fa "
          @click.native="toggleCircle"
      ></button>
      <button
          slot="item_2"
          class="fa"
          @click.native="toggleCircle"
      ></button>
    </circle-menu>
  </div>
</template>

<script>
import CircleMenu from "vue-circle-menu";
import {isMobile} from 'mobile-device-detect';
import {directive as onClickAway} from "vue-clickaway";
import {toggleMixin} from "@/mixin/toggleMixin";

export default {
  mixins: [toggleMixin],
  data() {
    return {
      isMobile
    }
  },
  directives: {
    onClickAway
  },
  methods: {
    toggleCircle() {
      this.$refs.circle.open = false;
    },
    handle(path, modal) {
      this.toggleCircle();
      if (this.isMobile) {
        this.$router.push(path);
      } else {
        this.toggleModal(modal)
      }
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