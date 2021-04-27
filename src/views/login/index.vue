<template>
  <div
      class="bg-light-grey w-screen h-screen min-w-full min-h-full flex flex-col justify-center items-center"
  >
    <div :class="['flex flex-col w-screen md:w-2/4 lg:pt-0', currentTabComponent === 'app-login'?'pt-0':'pt-40']">
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
import {routes} from "@/config/routes";

export default {
  data() {
    return {
      routes: [...routes.LOGIN],
      currentTabComponent: ["login"]
    };
  },
  components: {
    IconContainer,
    Login,
    Signup,
    AppNavigation
  }
};
</script>

<style></style>
