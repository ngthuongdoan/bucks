<template>
  <div
    class="absolute flex items-center justify-center top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-control"
  >
    <div class="w-9 h-9 rounded-full bg-control-light sonar"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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