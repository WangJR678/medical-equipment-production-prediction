<template>
  <div ref="mapContainer" style="width: 100%; height: 600px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import chinaGeoJson from '../assets/china.json';

export default {
  name: 'MapComponent',
  data() {
    return {
      mapChart: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      echarts.registerMap('china', chinaGeoJson);

      this.mapChart = echarts.init(this.$refs.mapContainer);

      const option = {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#f0f9ff', '#006edd']
          },
          calculable: true
        },
        series: [
          {
            name: '生产数量',
            type: 'map',
            map: 'china',
            roam: false,
            label: {
              show: true,
              color: '#000'
            },
            itemStyle: {
              emphasis: {
                areaColor: '#f0ad4e'
              }
            },
            data: this.getData() // 从父组件获取数据
          }
        ]
      };

      this.mapChart.setOption(option);
    },
    getData() {
      // 从父组件获取数据，这里假设父组件传递了名为 'mapData' 的 prop
      if (this.mapData && this.mapData.length > 0) {
        return this.mapData;
      } else {
        return [
          { name: '北京', value: 500 },
          { name: '上海', value: 1500 },
          { name: '广东', value: 800 },
          { name: '浙江', value: 600 },
          { name: '江苏', value: 800 }
        ];
      }
    }
  },
  props: {
    mapData: {
      type: Array,
      default: () => []
    }
  },
  beforeDestroy() {
    if (this.mapChart) {
      this.mapChart.dispose();
    }
  }
};
</script>

<style scoped>
</style>
