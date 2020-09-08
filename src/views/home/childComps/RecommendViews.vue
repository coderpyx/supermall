<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendViews",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
 }
}
</script>

<style scoped>
.recommend{
  padding:10px 0 20px 0;
  /* 横向布局 */
  display: flex; 
  width: 100%;
  text-align: center;
  font-size: 12px;
  border-bottom: 10px solid #eee;

}
.recommend-item{
  /* 平均分配空间 */
  flex: 1;
}
.recommend-item img{
  width:80%;
  margin-bottom: 10px;
}
</style>