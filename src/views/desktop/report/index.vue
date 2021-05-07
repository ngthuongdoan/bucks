<template>
  <div class="bg-white p-10 w-full h-96">
    <v-chart v-if="option" :option="option" class="w-full h-96"/>
  </div>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart} from "echarts/charts";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    let expense = [];
    let income = [];

    const months = Array.from({length: 12}, (item, i) => {
      income.push((Math.random() * 2).toFixed(2));
      expense.push(-Math.random().toFixed(2));
      return new Date(0, i).toLocaleString('en-US', {month: 'long'})
    });

    let emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)'
      }
    };
    return {
      option: {
        autoresize: true,
        title: {
          text: "Monthly Income-Expense",
          left: "center"
        },
        tooltip: {},
        legend: {
          data: ['Income', 'Expense'],
          left: '10%'
        },
        xAxis: {
          data: months,
          name: 'Months',
          axisLine: {onZero: true},
          splitLine: {show: false},
          splitArea: {show: false}
        },
        yAxis: {},
        grid: {
          bottom: 100
        },

        series: [
          {
            name: 'Income',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: income,
            itemStyle: {
              color: "rgb(83,151,83)"
            }
          },
          {
            name: 'Expense',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: expense,
            itemStyle: {
              color: "rgb(243,130,95)"
            }
          },
        ]
      }
    }
  },
  created() {
    setInterval(() => {
      let data0 = this.option.series[0].data;
      let data1 = this.option.series[1].data;
      data0.shift();
      data0.push((Math.random() * 2).toFixed(2));
      data1.shift();
      data1.push(-Math.random().toFixed(2));
    }, 2100);
  }
};
</script>

