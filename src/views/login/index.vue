<template>
  <div
      class="bg-light-grey w-screen h-screen min-w-full min-h-full flex flex-col justify-center items-center"
  >
    <div :class="['flex flex-col w-screen md:w-2/4 lg:pt-0', currentTabComponent === 'app-login'?'pt-0':'pt-40']">
      <login-nav
          :tab="currentTabComponent"
          @route="currentTabComponent = $event"
      ></login-nav>
      <keep-alive>
        <component :is="currentTabComponent"></component>
      </keep-alive>
    </div>

    <icon-container></icon-container>
  </div>
</template>

<script>
import IconContainer from "@/components/common/IconContainer.vue";
import AppLogin from "@/components/layout/AppLogin.vue";
import AppSignup from "@/components/layout/AppSignup.vue";
import LoginNav from "@/components/layout/LoginNav.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      currentTabComponent: "app-login"
    };
  },
  async beforeRouteEnter(to, from, next) {
    await firebase.auth().signOut();
    next();
  },
  components: {
    IconContainer,
    AppLogin,
    AppSignup,
    LoginNav
  }
};
</script>

<style></style>
