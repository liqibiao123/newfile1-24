<template>
  <div class="header-container">
    <div class="l-container">
      <el-button style="margin-right:20px" icon="el-icon-menu" @click="handleMenu" size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path:item.path }">{{item.label}}</el-breadcrumb-item>

      </el-breadcrumb>

    </div>
    <div class="r-container" >
      <el-dropdown @command="handleClick">                                             
        <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.png" alt="">
        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
      if(command === 'cancel'){
        console.log('登出');
        //清除cookie信息
        Cookie.remove('token')    
        // 清除cookie中的menu
        Cookie.remove('menu')
        //跳转到登录页面
        this.$router.push('/login') 
      }
   
    }
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabList
    })
  },
  mounted(){
    console.log(this.tags,'tags');
  }

    
  }

</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    margin-left: 10px;
    font-size: 14px;
    color: #fff;
  }
  .r-container{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  }
  .l-container{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color:#f8eeee;
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
}
</style>