<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info"> 
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props:{
      goodsItem:{
        type:Object,
        default() {
          return {}
        }
      }
    } ,
    components:{
 }
}
</script>

<style scoped>
.goods-item{
  position: relative;
  padding-bottom: 40px;
  width: 48%;
  margin: 2px;
  padding-left: 7px;
  
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
} 
.goods-info p{
  overflow: hidden;
  /* 文本超出部分用...代替 */
  text-overflow: ellipsis;
  /* 一行展示 */
  white-space: nowrap; 
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  /* 引入背景图 */
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
}



</style>