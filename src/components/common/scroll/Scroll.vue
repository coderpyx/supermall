<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
  export default {
    name: 'Scroll', 
    props:{
      probeType:{
        type:Number,
        default:0,
      },
      pullUpLoad:{
        type:Boolean,
        default:false,
      }
      
    },
    data(){
      return {
        scroll:null,
      }
    },
    mounted() {
      // 1.创建Bsrcoll 对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        // 动态决定要不要监听滚动
        probeType:this.probeType,
        // 动态决定要不要监听上拉加载更多事件
        pullUpLoad:this.pullUpLoad,
      })

      // 2.监听滚动位置
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })

        // 上拉加载更多事件监听
      this.scroll.on('pullingUp',()=> {
        // console.log('上拉加载更多');
        // 将加载跟多传递到首页
        this.$emit('pullingUp')
      })
    },

    
    methods:{
      // 回到顶部方法
      scrollTo(x, y, time) {
        this.scroll.scrollTo( x, y, time)
      },
      finishPullUp() {
        // 可以上拉加载更多多次
        this.scroll.finishPullUp()
      },
    }
}
</script>

<style scoped>
</style>