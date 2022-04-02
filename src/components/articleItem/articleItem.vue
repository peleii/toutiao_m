<template>
  <div>
    <van-cell class="articleItem" :to="'/article/'+ article.art_id">
      <template #title>
        <div class="title van-multi-ellipsis--l2">
          {{article.title}}
        </div>
      </template>
      <template #label>
        <div class="label">
          <!-- 3张封面 -->
          <div class="cover-wrap" v-if="article.cover.type===3">
            <div class="imgItem">
              <van-image
                class="img"
                :src="article.cover.images[0]"
                fit="cover"
              />
            </div>
            <div class="imgItem">
              <van-image
                class="img"
                fit="cover"
                :src="article.cover.images[1]"
              />
            </div>
            <div class="imgItem">
              <van-image
                class="img"
                fit="cover"
                :src="article.cover.images[2]"
              />
            </div>
          </div>
          <!-- 作者信息，发布时间，评论数 -->
          <div class="articleInfo">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate|relativeTime}}</span>
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <van-image
          v-if="article.cover.type===1"
          class="rightImage"
          :src="article.cover.images[0]"
          fit="cover"
          />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .articleItem{
    .title{
      font-size: 32px;
      color: #3a3a3a;

    }
    .van-cell__value{
        flex: unset;
        height: 146px;

      }
    .cover-wrap{
        display: flex;
        padding: 30px 0;
        .imgItem{
          flex: 1;
          height: 146px;
          &:not(:last-child){
            padding-right: 4px;
          }
          .img{
            width: 100%;
            height: 146px;
          }
        }
    }
    .articleInfo span{
        color: #b4b4b4;
        font-size: 22px;
        margin-right: 25px;
    }
    .rightImage{
        width: 232px;
        height: 146px;
        margin-left: 25px;
    }
  }

</style>
