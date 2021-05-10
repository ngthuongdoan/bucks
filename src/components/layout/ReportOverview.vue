<template>
  <div class="bg-white  w-full h-1/2 pt-5">
    <change-view :active-overview="activeOverview" @change-view="changeView($event)"></change-view>
    <div class="ml-10 flex gap-2 justify-start items-start">
      <div class="flex flex-col">
        <label class="text-sm text-gray-400 capitalize">{{ activeOverview }}</label>
        <select v-model="range">
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
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import ChangeView from "@/components/ui/ChangeView";

dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)

export default {
  components: {
    BarChart,
    ChangeView
  },
  data() {
    return {
      transactions: [],
      walletId: "",
      wallets: [],
      range: dayjs().month(),
      activeOverview: "month",
      above: {
        name: "income"
      },
      below: {
        name: "expense"
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    startRange() {
      if (this.activeOverview === "week") return dayjs().week(this.range + 1).startOf("week").toDate()
      return dayjs().set(this.activeOverview, this.range).startOf(this.activeOverview).toDate();
    },
    endRange() {
      if (this.activeOverview === "week") return dayjs().week(this.range + 1).endOf("week").toDate()
      return dayjs().set(this.activeOverview, this.range).endOf(this.activeOverview).toDate();
    },
    xAxis() {
      let data = [];
      switch (this.activeOverview) {
        case "week": {
          data = Array.from(
              {length: 7},
              (_, i) => new Date(0, 0, i).toLocaleString('en-US', {weekday: 'long'})
          )
          break;
        }
        case "month": {
          const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (dayjs().isLeapYear()) days[1] = 29;
          data = Array.from({length: days[this.range]}, (_, i) => i + 1)
          break;
        }
        case "year": {
          data = Array.from(
              {length: 12},
              (_, i) => new Date(0, i).toLocaleString('en-US', {month: 'long'})
          )
          break;
        }
      }
      return {name: this.activeOverview, data}
    },
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
  watch: {
    range() {
      this.fetchTransaction()
    },
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
      this.above = this.createData("income");
      this.below = this.createData("expense");
    },
    createData(type) {
      let data = []
      const start =
          this.activeOverview === "week" ?
              dayjs().week(this.range + 1).startOf("week").toDate()
              :
              dayjs().set(this.activeOverview, this.range).startOf(this.activeOverview).toDate();
      const end =
          this.activeOverview === "week" ?
              dayjs().week(this.range + 1).endOf("week").toDate()
              :
              dayjs().set(this.activeOverview, this.range).endOf(this.activeOverview).toDate();
      //BUG: data if view="year" take all 365 days, not month
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
    },
    changeView(view) {
      this.activeOverview = view;
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

