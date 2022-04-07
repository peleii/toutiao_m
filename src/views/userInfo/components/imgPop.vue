<template>
  <div class="imgPop-container">
    <img :src="imgsrc" class="previewimg" ref="img">
    <van-nav-bar
        left-text="取消"
        right-text="完成"
        @click-left="$emit('closePop')"
        @click-right="uploadPhoto"
        class="tools"
    />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api/user'
export default {
  props: {
    imgsrc: {
      type: [Object, String],
      required: true
    }
  },
  data () {
    return {
      cropper: null

    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      // 配置
      viewMode: 1,
      /*  视图模式
          0：没有限制
          1：限制裁剪框不超过画布的大小。
          2：限制最小画布大小以适合容器。如果画布和容器的比例不同，则最小画布将被其中一个维度中的额外空间包围。
          3：限制最小画布大小以填充适合容器。如果画布和容器的比例不同，则容器将无法在其中一个维度中容纳整个画布。 */
      dragMode: 'move',
      /*
      拖动模式
      'crop'：创建新的裁剪框
      'move'：移动画布
      'none'：不执行任何操作
      */
      aspectRatio: 1,
      /*
      截图比例  16/9  1/1
      */
      autoCropArea: 1,
      /* 自动截图比例 */
      cropBoxMovable: false,
      /* 截图区域是否可以移动 */
      cropBoxResizable: false,
      /* 截图区域是否可以缩放 */
      background: false,
      /* 背景 */
      movable: true
      /* 画布是否可以拖动 */
    })
  },
  methods: {
    uploadPhoto () {
      // 如果是基于服务端的裁切，将this.cropper.getData()发给服务器就可以
      // console.log(this.cropper.getData())
      // 如果是客户端裁切，则使用getCroppedCanvas方法，得到裁切之后得图片对象
      this.cropper.getCroppedCanvas().toBlob(
        async (blob) => {
          console.log(blob)
          // 如果请求参数类型为multipart/form-data，则需要将参数通过formData对象传入
          // 1.创建formData对象
          const formData = new FormData()
          // 2.将需要传得参数传入formData,photo对应api文档的请求体参数名称
          formData.append('photo', blob)
          // 3.将formData作为参数发起请求
          const { data: res } = await uploadPhoto(formData)
          console.log(res)
          this.$emit('updataPhotoUrl', res.data.photo)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .imgPop-container{
    height: 100%;
    .previewimg{
      display: block;
      max-width: 100%;
    }
    .tools{
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);

    }
    /deep/.van-nav-bar__text{
      color: #fff;
    }
  }

</style>
