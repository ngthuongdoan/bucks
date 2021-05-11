<template>
  <div class="bg-white w-full h-96 pt-5">
    <v-chart v-if="option" :option="option" class="w-full h-96"></v-chart>
  </div>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {PieChart} from "echarts/charts";
import {LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);
export default {
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
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
  computed: {
    refinedData() {
      let result = [];
      const incomeFilter = this.transactions.filter(trans => trans.category.type === "expense");
      const categoryList = new Set(incomeFilter.map(trans => trans.category.name));
      categoryList.forEach(category => {
        const sum = this.transactions
            .filter(trans => trans.category.name === category)
            .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        result.push({
          name: category,
          value: sum,
        })
      })
      return result
    },
    option() {
      const refinedData = this.refinedData;
      return {
        title: {
          text: 'Income Category',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '75%',
            data: refinedData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
}
</script>

<style scoped>

</style>