<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.index" class ="tab-control-item">
      <span :class="{active: index === currentIndex}" @click="itemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl', 
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0,
      }
    },
    methods:{
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 41px;
    line-height: 41px;
  }
  .active{
    color:var(--color-high-text);
    padding:5px;
    border-bottom:2px solid var(--color-high-text);
  }
</style>