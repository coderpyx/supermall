<template>
   <div class="tab-bar-item" @click="itemClick">     
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data(){
      return {       
      //  isActive:false,
      }
    },
    props:{
      path:String ,
      activeColor:{
        type:String,
        default:"rgb(255, 87, 119)" 
      }
    },
    computed: {
      isActive(){
        // 判断活跃的和已有的路径是否一致，一致就添加avtive class属性
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }

    }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
}
.tab-bar-item img{
  vertical-align: middle;
  height: 24px;
  width: 24px;
  margin-top: 2px;
  margin-bottom: 1px;

}
</style>