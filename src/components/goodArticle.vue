<template>
  <van-icon
    v-if="isGoodArticle===1"
    color="#F8BF5A"
    name="good-job"
    @click="attitude"
  />
  <van-icon
    v-else
    color="#777"
    name="good-job-o"
     @click="attitude"
  />

</template>

<script>
import { likingArticle, cancelLiking } from '@/api/article'
export default {
  props: {
    articleDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isGoodArticle: this.articleDetail.attitude

    }
  },
  methods: {
    async attitude () {
      try {
      // 如果已经是点过赞了，再点取消
        if (this.isGoodArticle === 1) {
          await cancelLiking(this.articleDetail.art_id)
          this.isGoodArticle = -1
          this.$toast('已取消点赞')
        } else {
        // 如果是不喜欢或者无表态，点击点赞
          await likingArticle(this.articleDetail.art_id)
          this.isGoodArticle = 1
          this.$toast('已点赞')
        }
      } catch (err) {
        this.$toast('请求失败请稍后重试', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
