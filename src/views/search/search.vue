<template>
  <div class="search-container">
  <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
        class="searchBox"
        fixed
      />
  </form>
  <!-- 搜索结果 -->
  <SearchResult v-if="isResultShow" :searchText=searchText></SearchResult>
  <!-- 搜索建议 -->
  <SearchSuggest v-else-if='searchText' :searchText=searchText @search='onSearch'></SearchSuggest >
  <!-- 搜索历史 -->
  <SearchHistory  v-else :searchHistory="searchHistory" @search='onSearch'></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/searchHistory.vue'
import SearchSuggest from '@/views/search/components/searchSuggest.vue'
import SearchResult from '@/views/search/components/searchResult.vue'
import { setItem, getItem } from '@/utils/localStorage'
export default {
  name: 'searchCom',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('searchHistory' || [])// 搜索历史记录
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 每次搜索完把当前的搜索文本给搜索历史数组
      // 如果这个之前已经搜索过了，index!==-1,就把之前的历史记录删掉
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchHistory, SearchSuggest, SearchResult
  },
  watch: {
    // 只要监听到搜索历史数据发生变化，就将变化后的数据存储到本地
    searchHistory (value) {
      setItem('searchHistory', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container{
    .search-form{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .searchBox{
      .van-search__content{
        border-radius: 8px;
      }
      .van-search__action{
        color: #fff;
      }
    }
  }

</style>
