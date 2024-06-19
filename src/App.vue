<!-- App.vue -->
<template>
  <div id="app">
    <EquipmentManager />
  </div>
</template>

<script>
import EquipmentManager from './components/EquipmentManager.vue'; // 更新路径

export default {
  name: 'App',
  components: {
    EquipmentManager
  }
};
</script>

<style>
/* 添加一些基本样式确保页面内容可见 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
