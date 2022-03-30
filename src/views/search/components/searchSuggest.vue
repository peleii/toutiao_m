<template>
  <div class="searchSuggest">
    <van-cell
    v-for="(item,index) in options"
    :key=index
    icon="search"
    >
    <div slot="title" v-html="item"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggest } from '@/api/search.js'
// npm i lodash,然后按需加载
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: [] // 搜索建议
    }
  },
  watch: {
    searchText: {
      // 当searchText发生变化的时候就会调用handler函数
      // handler函数名称是固定的
      handler: debounce(async function () {
        try {
          const { data: res } = await getSuggest(this.searchText)
          this.options = res.data.options
        } catch (err) {
          this.$toast('数据获取失败')
        }
      }, 1000),
      immediate: true
    }
  }
}
</script>

<style>

</style>
