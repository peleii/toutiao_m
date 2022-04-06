<template>
  <div class="commentList-container">
     <van-cell title="全部评论"/>
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check=false
     >
     <CommentItem
      v-for="(item,index) in commentList" :key="index"
      :comment=item
      @click-reply="$emit('changeReplyPopToIndex',$event)"
     ></CommentItem>

    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from '@/components/commentItem.vue'
export default {
  props: {
    articleId: {
      type: [Number, String],
      required: true
    },
    commentId: {
      type: [Number, String],
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      commentList: this.comments,
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10// 每页展示的条数
    }
  },
  methods: {
    async getCommentsAPI (type, source) {
      try {
        const { data: res } = await getComments({
          type: type,
          source: source,
          offset: this.offset,
          limit: this.limit
        })
        this.commentList.unshift(...res.data.results)
        this.$emit('totalCount', res.data.total_count)
        // 判断是否还有数据
        if (res.data.results.length) {
          // 有就更新下一页的数据页码
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取评论失败，请稍后重试', err)
        console.log(err)
      }
      this.loading = false
    },
    onLoad () {
      if (this.articleId) {
        this.getCommentsAPI('a', this.articleId)
      } else {
        this.getCommentsAPI('c', this.commentId)
      }
    }

  },
  components: {
    CommentItem
  },
  created () {
    this.loading = true
    // eslint-disable-next-line no-unused-expressions
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>

</style>
