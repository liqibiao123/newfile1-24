<template >
  <el-form ref="form" :inline="true" label-width="70px" :model="form" :rules="rules" class="login-container">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="username" >
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
        <!-- <input @keyup.enter="submit" v-show="0" style="width=1000px; height:1000px" > -->
        <el-button type="primary" style="margin-left:170%" @click="submit">登录</el-button>
    
    </el-form-item>
  </el-form>



</template>


<script lang="ts">
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
  data() {
    return{
        form:{
            username:"",
            password:""
        },
        rules:{
            username:[
                {required: true, message: '请输入用户名', trigger: 'blur'}
            ],
            password:[
                {required: true, message: '请输入密码', trigger: 'blur'}
            ]          
        }
    }
  },
  methods:{
    submit(){
        // const token = Mock.Random.guid()
        // console.log(token,'token');
        // token信息存入cookie 用于不同页面间的通信
        // Cookie.set('token',token)
        console.log('回车触发');
        
        // 校验通过
        this.$refs.form.validate((valid)=>{
            if(valid){
                getMenu(this.form).then(({data})=>{
                    console.log(data,'data');
                    if(data.code === 20000){
                        Cookie.set('token',data.data.token)
                        this.$store.commit('setMenu',data.data.menu)
                        this.$store.commit('addMenu',this.$router)
                         this.$router.push('/home') 
                    }else{
                         this.$message.error(data.data.message);
                    }
                })               
            }
        })



        //
    }
  }
};
</script>


<style lang="less" scoped>
.login-container{
    margin: 180px auto;
    padding:35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    width: 350px;
    box-sizing: border-box;
    .el-input{
        width: 198px;
    }
    .login-title{
        text-align: center;
        margin-bottom: 40px;
        columns: #505458;
    }
}
</style>