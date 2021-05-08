<template>
  <div class="bg-white  w-full h-1/2 pt-5">
    <div class="ml-10 flex gap-2 justify-start items-start">
      <div class="flex flex-col">
        <label class="text-sm text-gray-400">Months</label>
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
        :legends="['Income', 'Expense']"
        :x-axis="{name:'Day', data: dayOfMonth}"
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
    let expense = [];
    let income = [];

    const months = Array.from({length: 12}, (item, i) => {
      income.push((Math.random() * 2).toFixed(2));
      expense.push(-Math.random().toFixed(2));
      return new Date(0, i).toLocaleString('en-US', {month: 'long'})
    });

    return {
      transactions: [],
      range: dayjs().month(),
      months,
      walletId: "",
      wallets: []
    }
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    dayOfMonth() {
      const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (dayjs().isLeapYear()) days[1] = 29;
      return Array.from({length: days[this.range]}, (_, i) => i + 1)
    },
    above() {
      const start = dayjs().month(this.range).startOf('month').toDate();
      const end = dayjs().month(this.range).endOf('month').toDate();
      let data = []
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const sum = this.transactions
            .filter(trans =>
                (trans.category.type === "income")
                &&
                (dayjs(trans.time.toDate())
                        .isSame(dayjs(d), "day")
                )
            )
            .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        data.push(sum);
      }
      return {
        name: 'Income',
        data: data
      }
    },
    below() {
      const start = dayjs().month(this.range).startOf('month').toDate();
      const end = dayjs().month(this.range).endOf('month').toDate();
      let data = []
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const sum = this.transactions
            .filter(trans =>
                (trans.category.type === "expense")
                &&
                (dayjs(trans.time.toDate())
                        .isSame(dayjs(d), "day")
                )
            )
            .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        data.push(sum);
      }
      return {
        name: 'Expense',
        data: data
      }
    }
  },
  watch: {
    range: {
      immediate: true,
      handler: function () {
        this.fetchTransaction()
      }
    },
    walletId() {
      this.fetchTransaction()
    }
  },
  methods: {
    fetchTransaction() {
      this.$bind(
          "transactions",
          transactionStore
              .where("uid", "==", this.user.data.uid)
              .where("wallet", "==", this.walletId)
              .where("time", "<=", dayjs().month(this.range).endOf('month').toDate())
              .where("time", ">=", dayjs().month(this.range).startOf('month').toDate())
      );
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

