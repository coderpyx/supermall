<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          @scroll="contentscroll" 
          :pull-up-load="true" 
          @pullingUp="loadMore">
    <home-swiper :banners='banners'></home-swiper>
    <recommend-views :recommends='recommends'></recommend-views>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick = "tabClick"></tab-control>
    <goods-list :goods="ShowGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
  <!-- native 监听组件的原生事件必须要添加native修饰符 -->
</div>
</template>

<script>
// home 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'


// 公共子组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'


//网络请求
import {getHomeMultidata,getHomeGoods} from 'network/home' 


export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      // 请求商品数据
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      },
      currentType:'pop',
      isShow:false,
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendViews,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed:{
    ShowGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 创建组件完成就发送网络请求
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }

    },
    backClick() {
      // console.log('hahah');
      // 可以拿到scroll组件，然后在访问
      // scrollTo 设置滚动到指定位置
      // 三个参数：
      //    1. x 坐标
      //    2. y坐标
        //  3. 滚动过程的时间(毫秒)
        // 监听点击回到顶部
      this.$refs.scroll.scrollTo( 0, 0 , 1000)

    },
    contentscroll(position) {
      // console.log(position);
      // 监听滚动位置到了位置，将回到顶部按钮显示
      this.isShow = -(position.y)>4000;

    },
    loadMore() {
      // console.log('上拉加载');
      // 上拉加载更多数据
      this.getHomeGoods(this.currentType)
      // 商品数据上拉加载完后,调用refresh() 方法 ，重新让scroll计算可滚动高度
      this.$refs.scroll.scroll.refresh()
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page+1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        // 获取完数据后，页码加1
        // console.log(...res.data.data.list);
        this.goods[type].page += 1;

          // 通过$refs.scroll拿到scroll,从而调用finishPullUp() 方法,就可以上拉加载更多多次
        this.$refs.scroll.finishPullUp()
      })
    },

  }
}
</script>

<style scoped>
/* 加上 scoped  说明当前样式只对当前组件起作用  */
#home {
  /* 第一种方法 */
  /* height: 100vh; */
  /* vh 视口高度 */
  /* 第二种方法 */
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8198;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 1000;
}

.content{
  /* 第一种方法 */
  /* calc动态计算滚动局部区域的高度 */
  /* 切记计算符号前后都要留空格 */
  /* height:calc(100% - 93px);
    overflow: hidden;
    margin-top: 43px;  */
/* 第二方法 */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
 }

</style>
