<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-text="返回" class="page-nav-bar" left-arrow  @click-left='$router.back()'/>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
      <!-- 使用插槽插入图标时，如果vant是单标签需要改成双标签 -->
        <i slot='left-icon' class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userRules.code"
        type="number"
        maxlength="6"
      >
      <i slot='left-icon' class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <!-- 倒计时 -->
        <van-count-down :time="1000*60" format="ss 秒后重新获取" v-if='isCountDownShow' @finish='isCountDownShow=false'/>
        <!-- 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。" （参考vant文档）-->
        <van-button round size="small" type="default" @click="getCode" native-type="button" v-else>获取验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      // 表单验证规则
      userRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /1[3|4|5|6|7|8|9]\d{9}/, message: '请输入正确的手机号码' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /\d{6}/, message: '请输入正确的验证码' }
        ]
      },
      // 是否展示倒计时
      isCountDownShow: false
    }
  },
  methods: {
    // 点击登录
    async onSubmit () {
      /*
     1.获取表单数据
     2.表单验证
     3.提交表单请求登录
     4.根据请求响应结果处理后续操作
     */
      const user = this.user
      // vant提示插件toast
      this.$toast.loading({
        message: '登录中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间,如果为0，则一直展示。
        duration: 0
      })
      try {
        const { data: res } = await login(user)
        console.log(res.data)
        // 当新的toast调用时，就会关闭之前的toast.即此时关闭$toast.loading
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data)
        this.$router.push('/layout')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败,未知错误')
        }
      }
    },
    // 点击获取验证码
    async getCode () {
      /*
      1.验证手机号
      2.显示倒计时
      3.请求获取验证码
      */
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
        this.isCountDownShow = true
        try {
          const { data: res } = await sendCode(this.user.mobile)
          console.log(res)
          this.$toast('发送成功，请注意查收短信')
        } catch (err) {
          if (err.response.status === 429) {
            this.$toast('发送太频繁了，请稍后重新尝试')
          } else {
            this.$toast('发送失败，请稍后重新尝试')
          }
        }
      } catch (err) {
        console.log('验证失败', err)
      }
    }

  }
}
</script>

<style lang='less' scoped>
  .login-container{
    .toutiao{
      font-size: 37px;
    }
    .van-button--default{
      background-color: #ededed;
      opacity: 0.5;
      width: 162px;
      height: 46px;
      line-height: 46px;
    }
    .van-button--info{
      background-color:#6db4fb;
      border-radius: 15px;
      border: none;
    }
    .login-btn{
      padding: 53px 33px;
    }
    /deep/.van-icon,/deep/.van-nav-bar__text{
    color: #fff;
}
  }
</style>
