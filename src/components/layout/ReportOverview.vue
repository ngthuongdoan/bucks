<template>
  <div class="bg-white  w-full h-1/2 pt-5">
    <div class="ml-10 flex gap-2 justify-start items-start">
      <div class="flex flex-col">
        <label class="text-sm text-gray-400 capitalize">{{ "Month" }}</label>
        <select v-model="range">
          <option
              v-for="(m, index) in months"
              :key="m"
              :value="index"
          >{{ m }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-400" for="">Wallets</label>
        <select v-model="walletId">
          <option
              v-for="wallet in wallets"
              :key="wallet.id"
              :value="wallet.id"
          >{{ wallet.name }}
          </option>
        </select>
      </div>
    </div>

    <bar-chart
        :above="above"
        :below="below"
        :legends="['income', 'expense']"
        :x-axis="xAxis"
        title="Monthly Income-Expense"
    ></bar-chart>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {transactionStore, walletStore} from "@/plugin/db";
import BarChart from "@/components/chart/BarChart";
import store from "@/store"
import * as dayjs from "dayjs";
import * as isLeapYear from 'dayjs/plugin/isLeapYear';

dayjs.extend(isLeapYear)

export default {
  components: {
    BarChart
  },
  data() {
    const months = Array.from({length: 12}, (item, i) => {
      return new Date(0, i).toLocaleString('en-US', {month: 'long'})
    });

    return {
      transactions: [],
      months,
      walletId: "",
      wallets: [],
      range: dayjs().month(),
    }
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    startRange() {
      return dayjs().set("month", this.range).startOf("month").toDate();
    },
    endRange() {
      return dayjs().set("month", this.range).endOf("month").toDate();
    },
    above() {
      return this.createData("income")
    },
    below() {
      return this.createData("expense")
    },
    xAxis() {
      let data = [];
      const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (dayjs().isLeapYear()) days[1] = 29;
      data = Array.from({length: days[this.range]}, (_, i) => i + 1)
      // switch (this.activeOverview) {
      //   case "week": {
      //     const today = new Date();
      //     const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      //     const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      //     const len = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      //     data = Array.from({length: len}, (_, i) => i + 1)
      //     break;
      //   }
      //   case "month": {
      //     const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      //     if (dayjs().isLeapYear()) days[1] = 29;
      //     data = Array.from({length: days[this.range]}, (_, i) => i + 1)
      //     break;
      //   }
      //   case "year": {
      //     const min = 2000, max = dayjs().year();
      //     for (let i = min; i <= max; i++) {
      //       data.push(i)
      //     }
      //     break;
      //   }
      // }
      return {name: "month", data}
    }
  },
  watch: {
    walletId() {
      this.fetchTransaction()
    }
  },
  methods: {
    async fetchTransaction() {
      await this.$bind(
          "transactions",
          transactionStore
              .where("uid", "==", this.user.data.uid)
              .where("wallet", "==", this.walletId)
              .where("time", "<=", this.endRange)
              .where("time", ">=", this.startRange)
      );
    },
    createData(type) {
      let data = []
      const start = dayjs().set("month", this.range).startOf("month").toDate();
      const end = dayjs().set("month", this.range).endOf("month").toDate()
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const sum = this.transactions
            .filter(trans =>
                (trans.category.type === type)
                &&
                (dayjs(trans.time.toDate())
                        .isSame(dayjs(d), "day")
                )
            )
            .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        data.push(sum);
      }
      return {
        name: type,
        data: data
      }
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
    }
  }
};
</script>

