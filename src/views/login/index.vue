<template>
    <div class="login-container">
      <van-nav-bar title="登录" :border="false">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
        

        <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      >
        <template #left-icon>
            <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
      <template #left-icon>
            <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
            <van-count-down v-if="isCountDownShow" :time="60 * 1000" @finish="isCountDownShow = false" />
          <van-button v-else class="send-sms-btn" round size="small" type="default" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
        </div>
  </template>
  
  <script>
 import { login, getSmsCode } from '@/api/login'




  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
      return {
        isCountDownShow: false ,
        mobile: '',
        code: '',
        rules: {
            mobile: [
                { required: true, message: '请输入手机号'},
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
            ],
            code: [
                { required: true, message: '请填写密码'},
                { pattern: /^\d{6}$/, message: '请输入正确驗證碼'}

            ]
        }
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onSubmit(values) {
            this.$toast.loading({
                message: '加載中...',
                forbidClick: true,
                duration: 0
            })
            try {
                const ret = await login(values)
                console.log('登錄成功', ret)
                this.$toast.success('登錄成功')
                this.$store.commit('setUser', ret.data.data)
            } catch (err) {
                console.log('err錯誤',err)
                if (err?.response?.status === 400) {
                    this.$toast.fail('驗證碼輸入醋無')
                    
                }else {
                    this.$toast.fail('網絡異常')

                }
            }
        },
        async onSendSms() {
            try {
                const ret = await this.$refs.form.validate('mobile').catch(err => err)
                if (ret) return this.$toast.fail(err.message)

                this.isCountDownShow = true
                await getSmsCode(this.mobile)
                this.$toast.success('短信發送成功')
            } catch (err){
                if(err?.response?.status === 429) {
                    this.$toast.fail('短信发送频繁')
                } else {
                    this.$toast.fail('短信發送失敗')
                }
                
                this.isCountDownShow = false
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less">
    .van-nav-bar {
        background-color: #3196fa;
    }
    /deep/ .van-nav-bar__title {
        color: #fff;
    }
    .login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
  </style>