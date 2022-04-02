<template>
  <div class="searchResult">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
     <van-cell v-for="(item,index) in searchResult" :key="index" :title="item.title" :to="'/article/'+ item.art_id"/>
   </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search.js'
export default {
  props: {
    searchText: { // 接收父组件搜索框的文本
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchResult: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10,
      searchHistory: []
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getResult({
          page: this.page,
          per_page: this.perpage,
          q: this.searchText
        })
        this.searchResult.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.page++
        } else {
          this.$toast('搜索结束')
          this.finished = true
        }
      } catch (err) {
        this.$toast('请求搜索结果失败，请稍后重试')
      }
    }

  }
}
</script>

<style>

</style>
