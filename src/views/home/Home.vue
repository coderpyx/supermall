<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
  <home-swiper :banners='banners'></home-swiper>
  <recommend-views :recommends='recommends'></recommend-views>
  <feature-view></feature-view>
  <tab-control class="tab-control"
   :titles="['流行','新款','精选']"
   @tabClick = "tabClick"></tab-control>
  <goods-list :goods="ShowGoods"></goods-list>
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata,getHomeGoods} from 'network/home' //网络请求

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
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendViews,
    FeatureView,
    TabControl,
    GoodsList,
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
      })
    },

  }
}
</script>

<style scoped>
#home {
  margin-top: 43px;
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
  top: 43px;
  z-index: 1000;
}
</style>
