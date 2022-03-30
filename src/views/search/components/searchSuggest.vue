<template>
  <div class="searchSuggest">
    <van-cell
    v-for="(item,index) in options"
    :key=index
    icon="search"
    @click="$emit('search',item)"
    >
    <div slot="title" v-html='hightlight(item)'></div>
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
  },
  methods: {
    hightlight (val) {
      // 正则表达式中间的内容都会被当作字符使用，如果需要根据数据动态的创建正则表达式，则需要手动的new RegExp
      /* 参数1：匹配模式字符串，它会根据这个字符串创建正则对象
        参数2：匹配模式，要写到字符串中
      */
      const higthligthStr = `<span class='active'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return val.replace(reg, higthligthStr)
    }
  }
}
</script>

<style lang="less" scoped>
  .searchSuggest{
    /deep/.active{
      color: orange;
    }
  }
</style>
