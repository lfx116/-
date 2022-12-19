<template>
    <div class="article-list">
      <van-pull-refresh
    :success-text="refreshSuccessText"

    v-model="isRefreshLoading"
    @refresh="onRefresh">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败,点击加载更多"
      @load="onLoad"
    >
      <ArticleItem v-for="(item, index) in list" :article="item" :key="index"  />
    </van-list>
</van-pull-refresh>

    </div>
  </template>
  
  <script>
    import { loadArticleList } from '@/api/channel';
    import ArticleItem from '@/components/article-item'


  export default {
    name: 'ArticleList',
    components: { ArticleItem },
    props: {//接收父组件传递过来的数据channel
      channel: {
        type: Object,
        required: true //这个数据是必须的
      }
    },
    data () {
      return {
    list: [], // 存储列表数据的数组
    loading: false, // 控制加载中 loading 状态
    finished: false, // 控制数据加载结束的状态
    timestamp: null,
    error: false, // 是否加载失败
    // 控制下拉刷新的失败状态
    isRefreshLoading: false,
    refreshSuccessText: ''
}
    },
    methods: {
     async onRefresh() {
        try {
          const ret = await loadArticleList({
            channel_id: this.channel.id, // 频道 id
      timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
      with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          })

          // 检测异常
          //   if (Math.random() > 0.2) {
      //     JSON.parse('模拟的异常')
      //    }

          this.isRefreshLoading = false
          this.list.push(...(ret?.data?.data?.results || []))
          this.successText = `刷新成功, 更新了${ret.data.data.results.length}条数据`
        } catch (error) {
          this.successText = `刷新失败,请重试`
          this.isRefreshLoading = false
        }
      },
      // 初始化或滚动到底部的时候会触发调用 onLoad
      async onLoad() {
        try {
          const ret = await loadArticleList({
            channel_id: this.channel.id,
            timestamp: this.timestamp || Date.now(),
            with_top: 1
          })

          //测试 异常代码
          
       //   if (Math.random() > 0.5) {
      //     throw new Error ('模拟的异常')
      //    }
           

          this.list.push(...(ret?.data?.data?.results || []))

          if (ret.data.data.results.length) {
            this.timestamp = data.data.pre_timestamp
          }
          else {
            this.finished = true//(显示没有更多)
          }
          this.loading = false // 关闭 loading 效果
        } catch (err) {
          this.loading = false
          this.error = true
        }
      },
    },
  }
  </script>
  
  <style scoped lang="less">
    .article-list {
      height: 79vh;
      overflow-y: auto;
    }
  </style>
  