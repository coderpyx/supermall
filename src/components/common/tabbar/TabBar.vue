<template>
   <div id="tab-bar">
      <slot></slot>
    </div> 
</template>

<script>
  export default {
    name: "TabBar"
}
</script>

<style scoped>
#tab-bar{
  display: flex;
  height: 49px;
  background-color: #f6f6f6;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  box-shadow: 0 -1px 0.5px rgba(100,100,100,0.1);
  z-index: 1000;
}
</style>