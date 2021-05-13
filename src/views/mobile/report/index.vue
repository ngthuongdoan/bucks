<template>
  <div class="px-3">
    <div class="flex w-full items-center flex-col my-5">
      <change-view :active-overview="activeOverview" class="mb-3" @change-view="changeView($event)"></change-view>
      <chart-criteria
          :active-overview="activeOverview"
          :range="range"
          :wallet-id="walletId"
          @change-wallet="walletId=$event"
          @change-range="range=$event"
      ></chart-criteria>
    </div>
    <div class="font-bold uppercase text-xl text-black">Monthly Income-Expense</div>
    <report-overview
        :active-overview="activeOverview"
        :range="range"
        :transactions="transactions"
    ></report-overview>
    <div class="mt-5 flex w-full h-full">
      <div class="w-1/2">
        <div class="font-bold uppercase text-md text-black">Income Category</div>
        <pie-chart
            :active-overview="activeOverview"
            :range="range"
            :transactions="transactions"
            title="Income Category"
            type="income"
        ></pie-chart>
      </div>
      <div class="w-1/2">
        <div class="font-bold uppercase text-md text-black">Expense Category</div>
        <pie-chart
            :active-overview="activeOverview"
            :range="range"
            :transactions="transactions"
            title="Expense Category"
            type="expense"
        ></pie-chart>
      </div>

    </div>
  </div>
</template>

<script>
import ReportOverview from "@/components/layout/ReportOverview";
import ChangeView from "@/components/ui/ChangeView";
import PieChart from "@/components/layout/PieChart";
import * as dayjs from "dayjs";
import {mapGetters} from "vuex";
import {transactionStore} from "@/plugin/db";
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import ChartCriteria from "@/components/layout/ChartCriteria";

dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)

export default {
  data() {
    return {
      transactions: [],
      range: 0,
      activeOverview: "month"
    }
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    walletId() {
      return this.user.data.selectedWallet;
    },
    startRange() {
      if (this.activeOverview === "week") return dayjs().week(this.range + 1).startOf("week").toDate()
      return dayjs().set(this.activeOverview, this.range).startOf(this.activeOverview).toDate();
    },
    endRange() {
      if (this.activeOverview === "week") return dayjs().week(this.range + 1).endOf("week").toDate()
      return dayjs().set(this.activeOverview, this.range).endOf(this.activeOverview).toDate();
    },
  },
  watch: {
    range: {
      immediate: true,
      handler: function () {
        this.fetchTransaction();
      }
    },
    walletId: {
      immediate: true,
      handler: function () {
        this.fetchTransaction()
      }
    },
    activeOverview: {
      immediate: true,
      handler: function (view) {
        switch (view) {
          case "week":
            this.range = dayjs().week() - 1;
            break;
          case "month":
            this.range = dayjs().month();
            break;
          case "year":
            this.range = dayjs().year();
            break;
        }
      }
    }
  },
  components: {
    ChartCriteria,
    ReportOverview,
    ChangeView,
    PieChart,
  },
  methods: {
    changeView(view) {
      this.activeOverview = view
    },
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
  },
}
</script>