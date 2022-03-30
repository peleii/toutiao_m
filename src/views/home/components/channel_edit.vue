<template>
  <div class="channelEdit">
     <!-- 我的频道 -->
    <van-cell title="我的频道"  :border='false'>
      <template #default>
        <van-button plain type="info" round  color="#F85A5A" @click="edit">{{isEdit?'完成':'编辑'}}</van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10"  class="my-grid">
      <van-grid-item
      class="grid-item van-ellipsi"
      v-for="(item,index) in mcs"
      :key="index"
      @click=handleEdit(item,index)
      >
      <!--
        v-bind:class语法
        一个对象，对象中key表示要作用得css类名，对象中得value要计算出布尔值，true则作用该类名，false则不用做该类名
       -->
        <span
        slot='text'
        :class="{active:index===active}"
        >{{item.name}}</span>
        <van-icon
        slot="icon"
        name="clear"
        class="clear"
        v-if="isEdit&&!fiexChannels.includes(item.id)"
        ></van-icon>
      </van-grid-item>

    </van-grid>
     <!-- 频道推荐 -->
     <van-cell title="频道推荐" :border='false'>
    </van-cell>
    <van-grid :gutter="10" class="tuijian">
      <van-grid-item
      class="grid-item van-ellipsis"
      v-for="(item,index) in recommendChannels"
      :key=index
      :text=item.name
      icon="plus"
      @click="insertMyChannels(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage.js'
import { setUserChannels, deleteUserChannels } from '@/api/article.js'
export default {
  props: {
    // 用户频道
    myChannels: {
      type: Array,
      required: true
    },
    // 激活项
    active: {
      type: Number,
      required: true
    },
    // 所有频道
    allChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 用户频道
      mcs: this.myChannels,
      // 所有频道
      acs: this.allChannels,
      isEdit: false, // 是否展示编辑状态
      fiexChannels: [0]// 固定频道不准许删除
    }
  },
  computed: {
    // 推荐频道为所有频道-用户频道
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(item => {
    //     // find遍历数组，找到满足条件的元素
    //     const res = this.channels.find(mychannelItem => {
    //       return mychannelItem.id === item.id
    //     })
    //     // 如果找到我的频道中不包括该频道，则收集到推荐频道中
    //     if (!res) {
    //       channels.push(item)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
    recommendChannels () {
      return this.acs.filter(item => {
        return !this.mcs.find(mychannelItem => {
          return mychannelItem.id === item.id
        })
      })
    },
    ...mapState(['user'])

  },
  methods: {
    // 点击推荐频道，对应项加入我的频道
    async insertMyChannels (item) {
      this.mcs.push(item)
      // 数据持久化处理
      if (this.user) {
        // 已登录：把数据请求接口放到线上
        try {
          const { data: res } = await setUserChannels({
            id: item.id, // 频道id
            seq: this.mcs.length// 序号
          })
          console.log(res)
        } catch (err) {
          console.log('请求失败', err)
        }
      } else {
        // 未登录：把数据存储到本地
        setItem('userChannels', this.mcs)
      }
    },
    // 点击编辑按钮
    edit () {
      this.isEdit = !this.isEdit
    },
    // 封装删除频道接口
    async deleteChannel (item) {
      if (this.user) {
        // 已登录
        try {
          const { data: res } = await deleteUserChannels(item.id)
          console.log(res)
        } catch (err) {
          console.log('请求失败', err)
        }
      } else {
        // 未登录
        setItem('userChannels', this.mcs)
      }
    },
    // 点击clear图标
    handleEdit (item, index) {
      // 如果是编辑状态，
      if (this.isEdit) {
        // 如果点击的是推荐频道，则不执行操作
        if (index === 0) {
          return
        }
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('changeActive', this.active - 1, true)
        }
        //  如果是编辑状态，点击删除对应频道，且追加到推荐频道
        this.mcs.splice(index, 1)
        // 将删除的信息传回后台
        this.deleteChannel(item)
      } else {
      //  如果是非编辑状态，点击直接切换到对应频道
        // 向父组件中发送选中的激活项
        this.$emit('changeActive', index, false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .channelEdit{
    padding-top: 80px;
    .van-cell__title{
      font-size: 32px;
      color: #222222;
    }
    .van-button--plain{
      width: 122px;
      height: 50px;
    }
    .van-button__text{
      font-size: 16px;
    }
    /deep/.my-grid{
      .grid-item{
        .van-icon-clear{
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }
    /deep/.grid-item{
      width: 160px;
      height: 81px;
      .van-grid-item__content{
        background-color: #F4F5F6;
        .van-grid-item__text,span{
          margin-top: 0;
          font-size: 28px;
          color: #222;
        }
        .active{
          color: #F85A5A;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }

    }
    /deep/.tuijian{
      .grid-item{
        .van-grid-item__content{
          flex-direction: row;
          .van-grid-item__icon{
            font-size: 28px;
            margin-right: 6px;

          }
        }
      }
    }
  }
</style>
