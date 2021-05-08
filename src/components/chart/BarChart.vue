<template>
  <v-chart v-if="option" :option="option" class="w-full h-96"/>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart} from "echarts/charts";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {mapGetters} from "vuex";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  props: {
    title: {
      type: String,
    },
    legends: {
      type: Array,
      required: true,
    },
    xAxis: {
      type: Object
    },
    above: {
      type: Object
    },
    below: {
      type: Object
    },
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    option() {
      const emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      const title = this.title;
      const legends = this.legends;
      const xAxis = this.xAxis;
      const above = this.above;
      const below = this.below;

      return {
        autoresize: true,
        title: {
          text: title,
          left: "center"
        },
        tooltip: {},
        legend: {
          data: [...legends],
          left: '10%'
        },
        xAxis: {
          data: [...xAxis.data],
          name: xAxis.name,
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
            name: above.name,
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: above.data,
            itemStyle: {
              color: "rgb(83,151,83)"
            }
          },
          {
            name: below.name,
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: below.data,
            itemStyle: {
              color: "rgb(243,130,95)"
            }
          },
        ]
      }
    }
  },

};
</script>

