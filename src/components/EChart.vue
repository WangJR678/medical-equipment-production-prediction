<template>
  <div ref="chart" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EChart',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.chart.setOption(this.option);
  },
  watch: {
    option: {
      handler(newOption) {
        this.chart.setOption(newOption);
      },
      deep: true,
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
</style>
