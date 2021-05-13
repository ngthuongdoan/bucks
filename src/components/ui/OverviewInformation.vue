<template>
  <div>
    <change-view :active-overview="activeOverview"/>
    <div class="grid grid-cols-2 grid-rows-2 gap-2 w-max mt-3">
      <h1 class="font-bold text-lg">INCOME </h1><span
        class="ml-3 font-bold text-lg text-green-400">{{ 3000000 | separateValue }}</span>
      <h1 class="font-bold text-lg">EXPENSE </h1><span
        class="ml-3 font-bold text-lg text-red-400">{{ 4500000 | separateValue }}</span>
      <h1 class="font-bold text-lg">NET </h1><span
        :class="['ml-3 font-bold text-lg',(-1500000>0)?'text-green-400':'text-red-400']">{{
        -1500000 | separateValue
      }}</span>
    </div>
  </div>
</template>

<script>
import ChangeView from "@/components/ui/ChangeView";

export default {
  name: "OverviewInformation",
  components: {ChangeView},
  data() {
    return {
      activeOverview: "week"
    }
  }
}
</script>

