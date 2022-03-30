<template>
  <div class="article-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  success-text="刷新成功">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      success-text="刷新成功"
    >
      <ArticleItem v-for="(item,index) in list" :key="index" :title="item.title" :article="item"></ArticleItem>
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/> -->
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import ArticleItem from '@/components/articleItem/articleItem.vue'
export default {
  name: 'article_list',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储数据
      loading: false, // 控制加载中loading状态
      finished: false, // 控制加载结束状态，为true时，就提示没有更多了,
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  methods: {

    // 初始化或者滚动到底部的时候会触发onload
    async onLoad () {
      // 请求获取数据
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now()// 可以理解成请求数据的页码
        })
        // 把请求结果数据放入list数组中
        this.list.push(...res.data.results)
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          // 如果数据加载完，加载结束状态改为true,提示没有更多了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }

      // 本次数据加载完，把加载完状态设置为结束
      this.loading = false
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now()// 可以理解成请求数据的页码
        })
        // 把请求结果数据放入list数组的前面
        this.list.unshift(...res.data.results)
        this.refreshing = false
      } catch (err) {
        console.log('请求失败', err)
      }
    }

  }
}
</script>

<style lang='less' scoped>
  .article-container{
    // vh：相对视口的高度 1vh=可视窗口的百分之一
      height: 79vh;
      overflow-y: auto;
  }
</style>
