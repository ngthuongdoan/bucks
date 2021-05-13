<template>
  <div class="bg-white mt-3 w-full h-1/2 pt-5">
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
import BarChart from "@/components/chart/BarChart";
import * as dayjs from "dayjs";
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)

export default {
  components: {
    BarChart,
  },
  props: {
    activeOverview: {
      default: "month",
      type: String
    },
    transactions: {
      type: Array,
    },
    range: {
      type: Number,
    }
  },
  data() {
    return {
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
  },
  watch: {
    transactions: {
      immediate: true,
      handler: function () {
        this.above = {...this.createData("income")}
        this.below = {...this.createData("expense")}
      }
    }
  },
  methods: {
    generateByUnit(unit, d, type) {
      return this.transactions
          .filter(trans =>
              (trans.category.type === type)
              &&
              dayjs(trans.time.toDate()).isSame(dayjs(d), unit)
          )
          .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
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
      if (this.activeOverview === "year") {
        for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
          data.push(this.generateByUnit("month", d, type));
        }
      } else {
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          data.push(this.generateByUnit("day", d, type));
        }
      }
      return {
        name: type,
        data: data
      }
    },
  },
};
</script>

