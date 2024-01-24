<template>
    <div>

        <el-container>
            <el-aside width="auto">
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <commonHeader />
                </el-header>
                <common-tag-vue />
                <el-main>
                    <!-- <h1>Main主要部分</h1> -->
                    <router-view></router-view>   
                </el-main>
            </el-container>
        </el-container>             
    </div>

</template>
<script>
import CommonTagVue from '../components/CommonTag.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default({
    data() {
        return {}
    },
    components:{
        CommonAside,
        CommonHeader,
        CommonTagVue
    }
})
</script>
<style lang="less" scoped>
    .el-header{
        padding: 0;
    }


</style>
