<template>
  <div class="ml-10 flex gap-2 justify-start items-start">
    <div class="flex flex-col">
      <label class="text-sm text-gray-400 capitalize">{{ activeOverview }}</label>
      <select @change="setRange($event)">
        <option
            v-for="opt in option"
            :key="opt.value"
            :value="opt.value"
        >{{ opt.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-gray-400" for="">Wallets</label>
      <select @change="setWallet($event)">
        <option
            v-for="wallet in wallets"
            :key="wallet.id"
            :value="wallet.id"
        >{{ wallet.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {walletStore} from "@/plugin/db";
import * as dayjs from "dayjs";

export default {
  name: "ChartCriteria",
  props: {
    activeOverview: {
      type: String
    }
  },
  data() {
    return {
      wallets: [],
    }
  },
  computed: {
    option() {
      let data = [];
      switch (this.activeOverview) {
        case "week": {
          const today = new Date();
          const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
          const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
          const len = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
          data = Array.from({length: len}, (_, i) => {
            return {
              name: `Week ${i + 1}`,
              value: i
            }
          })
          break;
        }
        case "month": {
          data = Array.from({length: 12}, (item, i) => {
            return {
              name: new Date(0, i).toLocaleString('en-US', {month: 'long'}),
              value: i,
            }
          });
          break;
        }
        case "year": {
          const min = 2000, max = dayjs().year();
          for (let i = min; i <= max; i++) {
            data.push({
              name: i,
              value: i
            })
          }
          break;
        }
      }
      return data;
    }
  },
  methods: {
    setWallet(e) {
      this.$emit("change-wallet", e.target.value)
    },
    setRange(e) {
      this.$emit("change-range", Number.parseInt(e.target.value))
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
    }
  }
}
</script>

<style scoped>

</style>