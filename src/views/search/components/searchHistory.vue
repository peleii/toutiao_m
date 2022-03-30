<template>
  <div class="searchHistory">
   <van-cell title="搜索历史">
     <div class="edit" v-if="isShowDelete">
       <span @click='clearAll'>全部删除</span>&nbsp;&nbsp;
       <span @click="doneDelete">完成</span>
     </div>
     <van-icon name="delete-o" @click="deleteHistory"  v-else/>
   </van-cell>
   <van-cell :title=item v-for="(item,index) in searchHistorys" :key="index"  @click="handleItem(index,item)"><van-icon name="close" v-if="isShowDelete"/></van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/localStorage.js'
export default {
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchHistorys: this.searchHistory,
      isShowDelete: false
    }
  },
  methods: {
    deleteHistory () {
      this.isShowDelete = true
    },
    handleItem (i, item) {
      if (this.isShowDelete) {
        // 如果是删除状态，则删除对应的历史记录
        this.searchHistorys.splice(i, 1)
      } else {
        // 如果是非删除状态，则直接搜索
        this.$emit('search', item)
      }
    },
    clearAll () {
      this.searchHistorys = []
    },
    doneDelete () {
      this.isShowDelete = false
    }
  }

}

</script>

<style lang="less" scoped>
  .searchHistory{
    padding-top: 108px;
  }
</style>
