<template>
  <van-icon
      v-if="isCollected"
      name="star"
      color="#F8BF5A"
      @click="collection"
  />
  <van-icon
      v-else
      name="star-o"
      color="#777"
      @click="collection"
  />
</template>

<script>
import { collectArticle, cancelCollect } from '@/api/article'
export default {
  props: {
    articleDetail: {
      type: [Object],
      required: true
    }
  },
  data () {
    return {
      isCollected: this.articleDetail.is_collected
    }
  },
  methods: {
    async collection () {
      try {
        // 如果此时是已经收藏，点击取消收藏
        if (this.isCollected) {
          await cancelCollect(this.articleDetail.art_id)
          this.$toast('已取消收藏')
        } else {
          await collectArticle(this.articleDetail.art_id)
          this.$toast('已收藏')
        }
        this.isCollected = !this.isCollected
      } catch (err) {
        this.$toast('请求失败请稍后重新尝试')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
