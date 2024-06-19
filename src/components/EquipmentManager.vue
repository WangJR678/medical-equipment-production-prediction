<template>
  <div class="equipment-manager">
    <header class="header">
      <h1>医疗设备生产预测系统</h1>
      <p>请管理您的医疗设备信息</p>
    </header>

    <main class="main-container">
      <section class="sidebar">
        <form @submit.prevent="addEquipment" class="form">
          <h2 class="form-title">添加设备</h2>
          <div class="form-group">
            <label for="name">设备名称</label>
            <input type="text" v-model="newEquipment.name" id="name" required>
          </div>
          <div class="form-group">
            <label for="quantity">数量</label>
            <input type="number" v-model="newEquipment.quantity" id="quantity" required>
          </div>
          <div class="form-group">
            <label for="purchaseDate">购买日期</label>
            <input type="date" v-model="newEquipment.purchaseDate" id="purchaseDate">
          </div>
          <button type="submit" class="btn">添加设备</button>
        </form>

        <table class="table">
          <thead>
          <tr>
            <th>设备名称</th>
            <th>数量</th>
            <th>购买日期</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(equipment, index) in equipments" :key="index">
            <td>{{ equipment.name }}</td>
            <td>{{ equipment.quantity }}</td>
            <td>{{ equipment.purchaseDate }}</td>
            <td><button @click="removeEquipment(index)" class="btn btn-danger">删除</button></td>
          </tr>
          </tbody>
        </table>
      </section>

      <section class="content">
        <div class="charts">
          <div class="chart pie-chart">
            <div ref="pieChart" style="width: 100%; height: 300px;"></div>
          </div>
          <div class="chart line-chart">
            <div ref="lineChart" style="width: 100%; height: 300px;"></div>
          </div>
          <div class="chart bar-chart">
            <div ref="barChart" style="width: 100%; height: 400px;"></div>
          </div>
        </div>
        <div class="tips">
          <h2>设备预测系统小贴士</h2>
          <p>定期维护和校准传感器，确保数据采集的准确性；同时，利用机器学习算法优化预测模型，提高生产预测的精确度和可靠性。</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      newEquipment: {
        name: '',
        quantity: 0,
        purchaseDate: ''
      },
      equipments: [
        { name: '心电图机', quantity: 13, purchaseDate: '2023-01-01' },
        { name: '超声波扫描仪', quantity: 25, purchaseDate: '2023-02-01' },
        { name: '呼吸机', quantity: 33, purchaseDate: '2023-03-01' },
        { name: '血液透析机', quantity: 21, purchaseDate: '2023-04-01' },
        { name: '麻醉机', quantity: 45, purchaseDate: '2023-05-01' },
        { name: 'CT扫描仪', quantity: 54, purchaseDate: '2023-06-01' },
        { name: 'MRI扫描仪', quantity: 61, purchaseDate: '2023-07-01' }
      ],
    };
  },
  mounted() {
    this.initPieChart();
    this.initLineChart();
    this.initBarChart();
  },
  methods: {
    addEquipment() {
      this.equipments.push({ ...this.newEquipment });
      this.newEquipment.name = '';
      this.newEquipment.quantity = 0;
      this.newEquipment.purchaseDate = '';
    },
    removeEquipment(index) {
      this.equipments.splice(index, 1);
    },
    initPieChart() {
      const pieChart = echarts.init(this.$refs.pieChart);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical', // 垂直排列
          right: 10, // 图例放在右侧
          top: 'center' // 图例垂直居中
        },
        series: [
          {
            name: '设备比例',
            type: 'pie',
            radius: ['40%', '70%'],
            data: this.equipments.map(equipment => ({
              value: equipment.quantity,
              name: equipment.name
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      pieChart.setOption(option);
    },
    initLineChart() {
      const lineChart = echarts.init(this.$refs.lineChart);
      const option = {
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [130, 230, 300, 170, 190, 250, 330],
            type: 'line'
          }
        ]
      };
      lineChart.setOption(option);
    }
    ,
    initBarChart() {
      const barChart = echarts.init(this.$refs.barChart);
      const option = {
        xAxis: {
          type: 'category',
          data: ['心电图机', '超声波扫描仪', '呼吸机', '血液透析机', '麻醉机', 'CT扫描仪', 'MRI扫描仪']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [13, 25, 33, 21,45, 54, 61],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      barChart.setOption(option);
    }

  }
};
</script>

<style scoped>
.equipment-manager {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/images/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.header {
  text-align: center;
  padding: 20px;
  background-color: rgba(0, 123, 255, 0.7);
  color: white;
  transition: background-color 0.3s ease;
}

.header:hover {
  background-color: rgba(0, 123, 255, 0.9);
}

.main-container {
  display: flex;
  padding: 20px;
  flex: 1;
}

.sidebar {
  width: 25%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.sidebar:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.input, .btn {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.btn {
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.charts {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pie-chart, .line-chart {
  width: 100%;
  margin-bottom: 20px;
}

.bar-chart {
  width: 100%;
  height: 400px;
}

.tips {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
