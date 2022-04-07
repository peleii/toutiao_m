<template>
  <div class="userInfo-container">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-uploader ref='file' :after-read="afterRead">
        <van-cell title="头像" is-link>
          <van-image
          slot="default"
            width="30"
            height="30"
            round
            fit="cover"
            :src="userInfo.photo"
          />
        </van-cell>
      </van-uploader >
      <van-cell title="昵称" is-link :value="userInfo.name" @click="isShowNamePop=true"/>
      <van-cell title="性别" is-link :value="userInfo.gender===1?'女':'男'"  @click="isShowSexPop=true"/>
      <van-cell title="生日" is-link :value="userInfo.birthday"  @click="isShowBirthday=true" />
    </van-cell-group>
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isShowNamePop" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="昵称"
        left-text="取消"
        right-text="完成"
        left-arrow
        @click-left="closePop"
        @click-right="editNameDone"
      />
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isShowSexPop" position="bottom" :style="{ height: '40%' }">
      <van-picker
      show-toolbar
      title="编辑性别"
      :columns="columns"
      @confirm="editSexConfirm"
      @cancel="closePop"
      :default-index="userInfo.gender"/>
    </van-popup>
    <!-- 编辑生日 -->
     <van-popup v-model="isShowBirthday" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm='editBirthdayConfirm'
        @cancel='closePop'
      />
    </van-popup>
    <!-- 上传头像按钮 -->

    <!-- 头像预览弹出层 -->
    <van-popup v-model="isShowPhotoPop" position="bottom" :style="{ height: '100%' }" class="previewPop">
      <ImgPop :imgsrc="fileList[0].url" @closePop='closePop' v-if='isShowPhotoPop' @updataPhotoUrl='onupdataPhotoUrl'/>

    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, editUserInfo } from '@/api/user'
import dayjs from 'dayjs'
import ImgPop from './components/imgPop.vue'
export default {
  name: 'userInfo',
  data () {
    return {
      userInfo: {}, // 用户个人信息
      isShowNamePop: false,
      isShowSexPop: false,
      isShowBirthday: false,
      isShowPhotoPop: false,
      message: '',
      columns: ['男', '女'],
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      fileList: [
        { url: '' }
      ]
    }
  },
  methods: {
    // 资料编辑--->点击返回
    onClickLeft () {
      this.$router.back()
    },
    closePop () {
      this.isShowNamePop = false
      this.isShowSexPop = false
      this.isShowBirthday = false
      this.isShowPhotoPop = false
    },
    // 编辑昵称--->点击完成，发送修改昵称请求
    async editNameDone () {
      try {
        if (this.message === '') {
          this.$toast('名称不能为空')
          return
        }
        const { data: res } = await editUserInfo({
          name: this.message
        })
        console.log(res)
        this.userInfo.name = this.message
        this.$toast.success('姓名修改成功')
      } catch (error) {
        this.$toast.filed('姓名修改失败')
      }
      this.isShowNamePop = false
    },
    // 编辑性别--->点击确认
    async editSexConfirm (value, index) {
      try {
        const { data: res } = await editUserInfo({
          gender: index
        })
        console.log(res)
        this.userInfo.gender = index
        this.$toast.success('性别修改成功')
      } catch (error) {
        this.$toast.filed('性别修改失败')
      }
      this.isShowSexPop = false
    },
    // 编辑生日--->点击确认
    async editBirthdayConfirm () {
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        const { data: res } = await editUserInfo({
          birthday: currentDate
        })
        console.log(res)
        this.userInfo.birthday = currentDate
        this.$toast.success('生日修改成功')
      } catch (error) {
        this.$toast.filed('生日修改失败')
      }
      this.isShowBirthday = false
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      /*  try {
        const { data: res } = await uploadPhoto({
          photo: file
        })
        console.log(res)
        this.$toast('头像上传成功')
        this.isShowPhotoPop = true
      } catch (error) {
        this.$toast('头像上传失败')
      } */
      this.fileList[0].url = file.content
      console.log(file)
      this.isShowPhotoPop = true
    },
    onupdataPhotoUrl (val) {
      this.userInfo.photo = val
      this.isShowPhotoPop = false
    }

  },
  components: {
    ImgPop
  },
  // 请求用户个人资料
  async created () {
    try {
      const { data: res } = await getUserInfo()
      this.userInfo = res.data
      this.message = this.userInfo.name
      this.currentDate = new Date(this.userInfo.birthday)
    } catch (err) {
      this.$toast.filed('请求失败', err)
    }
  }

}
</script>

<style lang="less" scoped>
  .userInfo-container{
    .van-nav-bar{
      background-color: #3296FA;
      /deep/.van-icon{
        color: #fff;
      }
      /deep/.van-nav-bar__text {
        color: #fff;
      }
      /deep/.van-nav-bar__title{
        color: #fff;
      }
    }
    .van-popup{
      background-color: #F5F7F9;
    }
    .van-uploader{
      width: 100%;
      /deep/.van-uploader__input-wrapper{
        width: 100%;
        background-color: skyblue;
      }
    }
    .previewPop{
      background-color: #000;

    }

  }
</style>
