<template>
  <div class="bg-white w-full pt-5 pb-10">
    <v-chart v-if="option" :option="option" class="w-full h-96"></v-chart>
  </div>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {PieChart} from "echarts/charts";
import {LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {isMobile} from "mobile-device-detect";

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
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  computed: {
    refinedData() {
      let result = [];
      const locale = this.$i18n.locale;
      const incomeFilter = this.transactions.filter(trans => trans.category.type === this.type);
      const categoryList = new Set(incomeFilter.map(trans => trans.category.name[locale]));
      categoryList.forEach(category => {
        const sum = this.transactions
            .filter(trans => trans.category.name[locale] === category)
            .reduce((accumulator, currentValue) => accumulator + Math.abs(currentValue.value), 0);
        result.push({
          name: category,
          value: sum,
        })
      })
      console.log(JSON.stringify(result))
      return result
    },
    option() {
      const refinedData = this.refinedData;
      const title = isMobile ? "" : this.title;

      return {
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: "bottom"
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