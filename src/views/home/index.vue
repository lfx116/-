<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button round class="search-btn" icon="search" type="primary">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
  <van-tabs class="channel-tabs" animated swipeable>
    <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
      <ArticleList :channel="channel" />
       </van-tab>
    <template #nav-right>
      <div class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <div class="placeholder"></div>
    </template>
  </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/login'
export default {
  name: 'HomeIndex',
  components: { ArticleList } ,
  data() {
    return {
      channels: []
    }
  },
  created() {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels() {
      try {
        const ret = await getUserChannels()
        // console.log('ret', ret);
        this.channels = ret.data.data.channels

      } catch (err) {
        console.log(' err', err);
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // 在当前组件私有样式中改变子组件的内部深层次的样式，需要使用 /deep/ 或者 ::v-deep
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {  
    .van-tabs__wrap {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      height: 82px;
      width: 100vw;
      position: fixed;
      left: 0;
      top: 92px;
      z-index: 1;
    }

    .van-tab {  //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      color: #333333;
    }

    .van-tabs__nav {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      padding-bottom: 0;
    }

    .van-tabs__line {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
}

.placeholder {//占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0;//此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before { //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: "";
    position: absolute;
    left: 0;
    width: 1px;//在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
}
</style>
 