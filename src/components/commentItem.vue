<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src=comment.aut_photo
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button
        class="like-btn"
        :class="{
            liked:isLiking
        }"
        @click="handleLiking"
      >
      <van-icon
      :name="isLiking ? 'good-job':'good-job-o'"
      :class="{
        liked:isLiking
      }"
      />
      {{likeCount>0?likeCount:'赞'}}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('click-reply',comment)"
        >回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>

</template>

<script>
import { likingComment, cancelLikingComment } from '@/api/article'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLiking: this.comment.is_liking,
      likeCount: this.comment.like_count,
      replyPop: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async handleLiking () {
      try {
        // 如果已经是点赞状态，则点击取消点赞
        if (this.isLiking) {
          this.likeCount--
          await cancelLikingComment(this.comment.com_id)
          this.$toast.success('已取消点赞')

          this.likeCount--
        } else {
          // 如果是未点赞状态，则点击点赞
          this.likeCount++
          await likingComment(this.comment.com_id)
          this.$toast.success('已点赞')
        }
        this.isLiking = !this.isLiking
      } catch (err) {
        this.$toast.fail('请求失败请稍后重试')
      }
    }

  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 140px;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
      color: #222222;
    }
    &.liked{
      color: #F8BF5A;
    }
    .liked{
      color: #F8BF5A;
    }
  }
}
</style>
