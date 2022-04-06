<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
       @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDetail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleDetail.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src=articleDetail.aut_photo
          />
          <div slot="title" class="user-name">{{articleDetail.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleDetail.pubdate|relativeTime}}</div>
          <FollowBtn :articleDetail=articleDetail></FollowBtn>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body">{{articleDetail.content}}</div>
        <van-divider>正文结束</van-divider>
        <CommentList :articleId="articleId" @totalCount='updateTotalCount' @changeReplyPopToIndex="updateIsShowReplyPop" :comments="commentList"></CommentList>
         <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup"
            is-link
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info=totalCount
            color="#777"
          />
          <Collect :articleDetail=articleDetail></Collect>
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <GoodArticle :articleDetail=articleDetail></GoodArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层 -->
        <van-popup v-model="isShowPop" position="bottom" :style="{ height: '20%' }">
          <CommentPopup :targetId="articleId" @postSuccess="handlePostSuccess"/>
        </van-popup>
        <!-- 回复评论弹出层 -->
        <van-popup v-model="isShowReplyPop" position="bottom" :style="{ height: '80%' }">
          <ReplyPopup :comment='comment' :articleId='articleId' @click-close='isShowReplyPop=false' v-if="isShowReplyPop"/>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleDetailAPI">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import FollowBtn from '@/components/followBtn.vue'
import Collect from '@/components/collectBtn.vue'
import GoodArticle from '@/components//goodArticle.vue'
import CommentList from './commentList.vue'
import CommentPopup from './commentPopup.vue'
import ReplyPopup from './replyPopup.vue'

import '@/utils/dayjs'
export default {
  name: 'articleDetail',

  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articleDetail: '', // 文章详情
      isLoading: true, // 加载中的loading状态
      errorStatus: 0, // 失败的状态码
      isFollowLoading: false, // 控制关注按钮加载中的显示
      type: 'a', // 评论回复的对象类型 a-对文章(article)的评论，c-对评论(comment)的回复
      totalCount: 0, // 评论数量
      isShowPop: false, // 控制文章评论弹出层是否显示
      isShowReplyPop: false, // 控制回复评论弹出层是否显示
      comment: null, // 点击回复时对应的评论项
      commentList: []// 文章所有评论
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetailAPI()
  },
  mounted () {},
  components: {
    FollowBtn, Collect, GoodArticle, CommentList, CommentPopup, ReplyPopup
  },
  methods: {
    // 封装获取文章详情的方法
    async getArticleDetailAPI () {
      this.isLoading = true
      try {
        const { data: res } = await getArticleDetail(this.articleId)
        this.articleDetail = res.data
        this.isLoading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorStatus = 404
        }
        this.isLoading = false
      }
    },
    // 导航条的返回箭头
    onClickLeft () {
      this.$router.back()
    },
    // 更新评论数据
    updateTotalCount (val) {
      this.totalCount = val
    },
    // 点击写评论，文章评论弹出层
    showPopup () {
      this.isShowPop = true
    },
    // 发布评论成功后
    handlePostSuccess (data) {
      // 关闭弹出层
      this.isShowPop = false
      // 更新评论列表
      this.commentList.unshift(data.new_obj)
      // 更新评论数量
      this.totalCount++
    },
    updateIsShowReplyPop (val) {
      this.isShowReplyPop = true
      this.comment = val
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  /deep/.van-icon{
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}

</style>
