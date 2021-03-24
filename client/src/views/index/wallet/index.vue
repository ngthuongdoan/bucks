<template>
  <div class="wallet-container w-screen min-h-screen h-full flex flex-col items-center">
    <wallet-card v-for="i in 10" :key="i"
                 :style="{zIndex:i, transform: `rotateY(10deg) translateY(${(i-1)*150}px) !important`,
                  boxShadow:'1px 1px 70px black !important'}"
                 class="wallet w-2/3 absolute transform"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";

export default {
  components: {
    WalletCard
  }
};
</script>

<style lang="scss">
.wallet-container {
  background-image: url(~@/assets/img/wallet-container.svg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.wallet {
  transform: rotateY(20deg);
}
</style>