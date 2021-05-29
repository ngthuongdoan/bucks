<template>
  <div
      class="bg-light-grey w-screen min-w-full min-h-full flex flex-col justify-center items-center lg:h-screen pb-20"
  >
    <app-modal
        v-if="isOpen"
        class="z-50 absolute "
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component :is="modal"></component>
    </app-modal>
    <div class="flex flex-col w-screen md:w-2/4 lg:pt-0">
      <app-navigation
          :routes="routes"
          :tab="currentTabComponent"
          @route="currentTabComponent = $event"
      ></app-navigation>
      <keep-alive>
        <component :is="currentTabComponent[0]"></component>
      </keep-alive>
    </div>
    <icon-container></icon-container>
  </div>
</template>

<script>
import IconContainer from "@/components/common/IconContainer.vue";
import Login from "@/components/layout/AppLogin.vue";
import Signup from "@/components/layout/AppSignup.vue";
import AppNavigation from "@/components/layout/AppNavigation";
import AppModal from "@/components/modal/AppModal"
import ForgotModal from "@/components/modal/ForgotModal"
import {routes} from "@/config/routes";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      routes: [...routes.LOGIN],
      currentTabComponent: ["login"]
    };
  },
  computed: {
    ...mapGetters({
      modal: "modalModule/modal",
      isOpen: "modalModule/isOpen"
    }),
  },
  components: {
    IconContainer,
    Login,
    Signup,
    AppNavigation,
    AppModal,
    ForgotModal
  }
};
</script>

<style></style>
