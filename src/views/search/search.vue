<template>
  <div class="search-container">
  <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
        class="searchBox"
      />
  </form>
  <!-- 搜索结果 -->
  <SearchResult v-if="isResultShow"></SearchResult>
  <!-- 搜索建议 -->
  <SearchSuggest v-else-if='searchText' :searchText=searchText></SearchSuggest >
  <!-- 搜索历史 -->
  <SearchHistory  v-else></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/searchHistory.vue'
import SearchSuggest from '@/views/search/components/searchSuggest.vue'
import SearchResult from '@/views/search/components/searchResult.vue'
export default {
  name: 'searchCom',
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      this.isResultShow = true
    },
    onCancel () {
      this.isResultShow = false
    }
  },
  components: {
    SearchHistory, SearchSuggest, SearchResult
  }
}
</script>

<style lang="less" scoped>
  .search-container{
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
