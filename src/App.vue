<template>
  <div id="app">
<!-- <el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
  <i class="el-icon-edit"></i>
  <i class="el-icon-share"></i>
  <i class="el-icon-delete"></i>
  <el-button type="primary" icon="el-icon-search">搜索</el-button> -->


    <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less" >
  html,body,p{
    margin: 0;
    padding: 0;
  }
  .el-aside {
    overflow: hidden;
  }
</style>