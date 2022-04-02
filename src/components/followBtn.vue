<template>
    <van-button
      v-if="followStatus"
      class="follow-btn"
      round
      size="small"
      @click="handlefollow"
      :loading='isFollowLoading'
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading='isFollowLoading'
      @click="handlefollow"
    >关注</van-button>
</template>

<script>
import { following, cancelFollowing } from '@/api/user'
export default {
  props: {
    articleDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      followStatus: this.articleDetail.is_followed, // 关注状态
      authorID: this.articleDetail.aut_id, // 作者id
      isFollowLoading: false// 是否展示加载中状态
    }
  },
  methods: {
    // 处理关注按钮点击事件
    async handlefollow () {
      this.isFollowLoading = true
      try {
        // 如果此时按钮是已关注，点击取消关注
        if (this.followStatus) {
          await cancelFollowing(this.authorID)
          this.$toast('已取消关注')
        } else {
        //  如果此时按钮是关注，点击关注
          await following(this.authorID)

          this.$toast('已关注')
        }
        this.followStatus = !this.followStatus
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己', err)
        }
        this.$toast('请重试', err)
      }

      this.isFollowLoading = false
    }
  }
}
</script>

<style>

</style>
