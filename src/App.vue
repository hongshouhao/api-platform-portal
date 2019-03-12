<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .panel .ivu-tabs-bar {
    margin: 0;
  }
  .content {
    background: #fff;
    border: 1px solid #ddd;
    border-top: none;
    padding: 10px;
  }

  .ivu-form-item {
    margin-bottom: 10px;
  }
}
</style>
