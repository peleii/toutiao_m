<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <nav class="nav">
      <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      background="#3296FA"
      class="nav-search"
      />
    </nav>
    <!-- 频道列表 -->
    <van-tabs
    v-model="active"
    animated
    swipeable
    color='#3296FA'
    title-inactive-color='#888888'
    title-active-color='#3296FA'
    class="channel-tabs"
    line-width='100'
    >
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">内容 1</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="select" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelsList } from '@/api/article.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data () {
    return {
      value: '',
      active: 0,
      channels: []
    }
  },
  methods: {
    // 封装一个获取频道的方法
    async getChannelsAPI () {
      try {
        const { data: res } = await getChannelsList()
        this.channels = res.data.channels
      } catch (err) {
        this.$toast('获取频道失败，请稍后重试', err)
      }
    }
  },
  created () {
    // eslint-disable-next-line no-undef
    this.getChannelsAPI()
  }

}
</script>

<style lang="less" scoped>
  .home-container{

   .nav{
     height: 100px;
     background-color: #3296FA;
     .van-search{
       width: 70%;
       margin: 0 auto;
       height: 100px;
       .van-search__content--round{
         background-color:#5BABFB;
         .van-cell{
            height: 60px;
            /deep/.van-icon{
              color: #fff;
            }
          }
       }

     }
   }
   .channel-tabs{
     /deep/.van-tab {
       border-right: 1px solid #EFF0F4;
       min-width: 200px;
     }
    .placeholder{
      width: 80px;
      height: 88px;
      flex-shrink: 0;
      margin-right: 0;
    }
    .select{
        position: fixed;
        right:0;
        background-color: #fff;
        opacity: 0.8;
        width: 100px;
        height: 88px;
        text-align: center;
        line-height: 88px;

        .toutiao-gengduo{
          font-size: 50px;
        }
        &:before{
          content: '';
          width: 2px;
          height: 100%;
          position: absolute;
          left: 0;
          background-image: url('@/assets/gradient-gray-line.png');
          background-size: contain;
        }
      }
   }
  }
</style>
