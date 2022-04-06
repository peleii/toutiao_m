<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${replyCount}条回复`">
      <van-icon
        slot="left"
        name="cross"
        color="#3296FA"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <CommentItem :comment="comment"/>
    <!-- 当前评论项 -->
    <!-- /当前评论项 -->

    <van-cell title="所有回复" class="allReply" />

    <CommentList :commentId='comment.com_id' :comments="replyList"/>

    <!-- 底部 -->
    <van-button type="default" size="large" class="commentBtn" @click="reply">发表评论</van-button>
    <!-- 发布评论弹出层 -->
    <van-popup v-model="isShowPop" position="bottom" :style="{ height: '20%' }">
      <CommentPopup :targetId="comment.com_id" :articleId='articleId' @postSuccess="handlePostSuccess"/>
    </van-popup>
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from '@/components/commentItem.vue'
import CommentList from '@/views/articleDetail/commentList.vue'
import CommentPopup from '@/views/articleDetail/commentPopup.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem, CommentList, CommentPopup
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      offset: null, // 获取下一页数据的标记
      limit: 10, // 每页展示的条数
      isShowPop: false,
      replyCount: this.comment.reply_count,
      replyList: []// 评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    reply () {
      this.isShowPop = true
    },
    // 回复评论成功后更新评论数据
    handlePostSuccess (data) {
      // 关闭弹出层
      this.isShowPop = false
      // 更新评论回复列表
      this.replyList.unshift(data.new_obj)
      this.replyCount++
    }
  }
}
</script>

<style lang='less' scoped>
  .commentBtn{
      position: fixed;
      bottom: 0;
    }
</style>
