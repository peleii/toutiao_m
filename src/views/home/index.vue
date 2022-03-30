<template>
<!-- 首页 -->
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed>
     <template #title>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          background="#3296FA"
          class="nav-search"
          @search="onSearch"
        />
     </template>
    </van-nav-bar>
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
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="select" slot="nav-right" @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 弹出层组件-->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
    <ChannelEdit :myChannels=channels :active=active :allChannels=allChannels @changeActive=onChangeActive></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsList, getAllChannelsList } from '@/api/article.js'
import ArticleList from '@/views/home/components/article_list.vue'
import ChannelEdit from '@/views/home/components/channel_edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/localStorage.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data () {
    return {
      value: '',
      active: 0,
      channels: [],
      show: false, // 控制频道编辑是否显示
      allChannels: []
    }
  },
  methods: {
    // 封装一个获取用户频道的方法
    async getUserChannelsAPI () {
      try {
        // 已登录
        if (this.user) {
          const { data: res } = await getUserChannelsList()
          this.channels = res.data.channels
        } else {
          // 未登录
          const localChannel = getItem('userChannels')
          // 如果本地有数据
          if (localChannel) {
            this.channels = localChannel
          } else {
            // 如果没有本地数据，请求获取默认频道列表
            const { data: res } = await getUserChannelsList()
            this.channels = res.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取频道失败，请稍后重试', err)
      }
    },
    // 封装一个获取所有频道的方法
    async getAllChannelsAPI () {
      try {
        const { data: res } = await getAllChannelsList()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取频道失败，请稍后重试', err)
      }
    },
    // 弹出频道层
    showPopup () {
      this.show = true
    },
    // 接收子组件channel_edit的active的值
    onChangeActive (index, flag) {
      this.active = index
      // 弹出层关闭
      this.show = flag
    },
    // 点击键盘搜索或者enter
    onSearch () {
      this.$router.push('/search')
      console.log('搜索')
    }
  },
  components: {
    ArticleList, ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // eslint-disable-next-line no-undef
    this.getUserChannelsAPI()
    this.getAllChannelsAPI()
  }

}
</script>

<style lang="less" scoped>
  .home-container{
    padding-top: 174px;
    padding-bottom: 100px;
   /deep/.van-nav-bar__content{
     height: 100px;
     background-color: #3296FA;
     .van-search{
       width: 80%;
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
   /deep/.channel-tabs{
     .van-tab {
       border-right: 1px solid #EFF0F4;
       min-width: 200px;

     }
     .van-tabs__wrap {
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        height: 82px;
        z-index: 1;
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
