<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar  class="layout-tabbar" route>
      <van-tabbar-item replace to="/layout/home"><i slot="icon" class="toutiao toutiao-shouye"></i> 首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/my"><i slot="icon" class="toutiao toutiao-wode"></i>{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout'
}
</script>

<style lang='less' scoped>
  .layout-container {
    .layout-tabbar {
      i.toutiao {
        font-size: 40px;
      }
      span.text {
        font-size: 20px;
      }
    }
}
</style>
