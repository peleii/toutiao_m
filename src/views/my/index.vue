<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header login" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src=userinfo.photo
            round
            fit="cover"
          />
          <span class="text">{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="small" round class="edit-btn">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <van-row>
          <van-col span="6" class="data-item">
            <span class="count">{{userinfo.art_count}}</span>
            <span class="text">头条</span>
          </van-col>
          <van-col span="6" class="data-item">
            <span class="count">{{userinfo.follow_count}}</span>
            <span class="text">关注</span>
          </van-col>
          <van-col span="6" class="data-item">
            <span class="count">{{userinfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </van-col>
          <van-col span="6" class="data-item">
            <span class="count">{{userinfo.like_count}}</span>
            <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 未登录时 -->
    <div class="header no-login" v-else>
      <div class="login-info">
        <img src="@/assets/mobile.png" alt=""><br>
          <router-link to='/login' class="text">登录/</router-link>
          <router-link to="/register" class="text">注册</router-link>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid clickable :column-num="2">
      <van-grid-item text="收藏" to="/" ><i slot="icon" class="toutiao toutiao-shoucang"></i></van-grid-item>
      <van-grid-item text="历史" to="/" ><i slot="icon" class="toutiao toutiao-lishi"></i></van-grid-item>
    </van-grid>
    <!-- 功能列表 -->
    <van-cell-group>
      <van-cell center title="消息通知" is-link/>
      <van-cell center title="小智同学" is-link/>
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button v-if="user" type="primary" block class="exit-btn" @click="exitLogin">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMyInfo } from '@/api/user.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'my',
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    exitLogin () {
      // 退出提示，
      // 确认退出，清除登录状态（容器中的user,本地存储中的user）
      // this.$router.push('/login')
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
        // on confirm
          this.$store.commit('setUser', null)
          console.log('确认')
        })
        .catch(() => {
        // on cancel
          console.log('取消')
        })
    },
    // 封装一个加载用户信息的函数
    async loadUserInfo () {
      try {
        const { data: res } = await getMyInfo()
        console.log(res.data)
        this.userinfo = res.data
      } catch (err) {
        this.$toast('加载失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])

  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
  .my-container{
    .header{
      height: 361px;
      background: url('@/assets/banner.png');
      position: relative;
    }
    .no-login{
      .login-info{
        width: 180px;
        height: 180px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        font-size: 16px;
        color: #fff;
        img{
          width: 135px;
          height: 135px;
        }
        .text{
          color: #fff;
          font-size: 28px;
        }
      }
    }
    .login{
      .base-info{
        height: 231px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 76px 32px 23px;
        .left{
          display: flex;
          align-items: center;
          .avatar{
            width: 132px;
            height: 132px;
            border: 1px solid #fff;
          }
          .text{
            font-size: 30px;
            color: #fff;
            margin-left: 23px;
          }
        }
        .right{
          .edit-btn{
            height:40px;
            background-color: #ccc;
            opacity: 0.6;
          }
        }
      }
      .data-stats{
        height: 130px;
        box-sizing: border-box;
        padding-top: 20px;
        .data-item{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .count,.text{
            font-size: 32px;
            color: #fff;
          }
        }

      }
    }
    /deep/.van-grid-item__text{
      font-size: 30px;
      font-weight: 700;
    }
    .toutiao-shoucang,.toutiao-lishi{
      color: orange;
      font-size: 40px;
    }
    .van-cell{
      height: 120px;
    }
    .exit-btn{
      background-color: #fff;
      color: red;
      border: 0;
      font-size: 34px;
    }
  }
</style>
