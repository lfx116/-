<template>
    <div class="article-item">
      <van-cell :title="article.title">
        <template #title>
          <div class="van-multi-ellipsis--l2">{{ article.title }}</div>
        </template>
        <template #default v-if="+article.cover.type === 1">
          <van-image :src="article.cover.images[0]" fit="cover" class="right-cover"></van-image>
        </template>
        <template #label>
          <div class="cover-wrap">
            <div v-if="+article.cover.type === 3" class="cover-item">
              <van-image v-for="src in article.cover.images" :src="src" fit="cover" class="cover-item-img"></van-image>
            </div>
            <div class="label-info-wrap">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}评论</span>
              <span>{{ article.pubdate | relativeTime  }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticleItem',
    props: {
      article: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped lang="less">
  .article-item {
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }
  
    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
  
    .right-cover {
      width: 232px;
      height: 146px;
    }
  
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  
    .cover-wrap {
      padding: 30px 0;
      //.cover-item:last-child : 选择最后一个子元素
      //.cover-item:not(:last-child) : 选择非最后一个子元素
      .cover-item {
        display: flex;
        // flex: 1;
        height: 146px;
        &:not(:last-child) {
          //嵌套语法里&代表父元素.cover-item
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 146px;
          margin: 0 5px;
        }
      }
    }
  }
  </style>
  