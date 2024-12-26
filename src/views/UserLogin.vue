<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-form">
      <h3 class="title">登录</h3>
      <p style="color: red;">注意：登录功能暂对内开放，若需账号请联系管理员</p>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button @click="noLogin">不登录，直接访问</el-button>
      </el-form-item>
      <p v-if="error" class="error">{{ error }}</p>
    </el-form>
  </div>
</template>

<script>
import * as authApi from '@/api/auth';

export default {
  name: 'UserLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      error: null, // 声明 error 变量
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 登录
     */
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        console.log('valid---',valid)
        if (valid) {
          try {
            const res = await authApi.login(this.loginForm.username, this.loginForm.password);
            console.log('res---',res)
            if(res.code == 200){
              console.log('登录成功---', res);
              //登录成功后，将token更新到vuex中
              this.$store.dispatch('login',res.data)
              // 登录成功后清除错误信息
              this.error = null; 
              // 动态跳转到目标路径或首页
              const redirect = this.$route.query.redirect || '/HomePage'; 
              this.$router.push(redirect);
            }else{
              this.error = res.message

            }
          } catch (error) {
            this.error = error.response?.data?.message || '登录失败';
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    //不登录，直接访问
    noLogin(){
      const redirect = this.$route.query.redirect || '/HomePage'; 
      this.$router.push(redirect);
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.login-form {
  display: flex;
  flex-direction: column;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.error {
  color: red;
  text-align: center;
}
</style>
