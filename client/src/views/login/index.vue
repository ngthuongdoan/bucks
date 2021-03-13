<template>
  <div
    class="bg-light-grey w-screen h-screen min-w-full min-h-full flex flex-col justify-center items-center"
  >
    <div class="flex flex-col">
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
import AppLogin from "@/components/ui/AppLogin.vue";
import AppSignup from "@/components/ui/AppSignup.vue";
import LoginNav from "@/components/ui/LoginNav.vue";
export default {
  data() {
    return {
      currentTabComponent: "app-login",
    };
  },
  components: {
    IconContainer,
    AppLogin,
    AppSignup,
    LoginNav,
  },
};
</script>

<style></style>
