<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!--
		image: 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示
		round: 设置图片变圆
		fit="cover" ： fit填充模式：	cover保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
		  -->
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航
      column-num: 2 ，列数为2列，代表一行两列
      clickable: 是否开启格子点击反馈(点击格子之后，会出现灰色效果)
    -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell v-if="user" class="logout-cell" clickable title="退出登录" @click="logout" />
  </div>
</template>

<script>
// 获取state中数据的方式 2. 多次使用
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/login'

export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    // 获取state中数据的方式 1. 单次使用
    // console.log(this.$store.state.user)
  },
  created() {
    // 如果已登录，再调接口获取用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    // 获取state中数据的方式 2. 多次使用
    ...mapState(['user'])
  },
  methods: {
    async loadUserInfo() {
      try {
        const ret = await getUserInfo()
        this.userInfo = ret.data.data
      } catch (err) {}
    },
    async logout() {
      const ret = await this.$dialog
        .confirm({
          title: '提示',
          message: '您确定要退出登录吗？'
        })
        .catch(err => err)

      // 如果用户选择【取消】阻止逻辑 什么也不做
      if (ret === 'cancel') return

      // 如果用户选择退出 逻辑: 清掉vuex中的user数据 清掉localStorage中的user数据
      this.$store.commit('setUser', null)
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png'); // css中使用@需要添加~,@代表src
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
