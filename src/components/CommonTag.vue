<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain' "
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    name:'CommonTag',
    data() {
        return {}
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        changeMenu(item){
            this.$router.push({name:item.name})
        },//点击tag删除的功能
        handleClose(item,index){
            //调用store中的mutation
            this.closeTag(item)
            const length = this.tags.length 
            // console.log(length,'length');
            if(item.name !== this.$route.name){
                return
            }
            if(index === length){//表示删除的最后一项
                this.$router.push({
                    neme:this.tags[index - 1].name
                })
            }else{
                  this.$router.push({
                    neme:this.tags[index].name
                })             
            }

        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>