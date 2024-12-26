<template>
  <div id="app" class="app-container">
    <!-- 固定左侧菜单栏 -->
    <el-aside class="menu-container">
      <el-menu
        ref="menu-left"
        class="menu-left"
        background-color="#409EFF"
        text-color="#ffffff"
        active-text-color="#ffd04b"

        @select="handleSelect"
        :default-active="activeIndex"

        @open="handleOpen" 
        @close="handleClose"
      >

        <template slot="default">
          <div class="logo-icon-div">
            <img src="@/assets/灰忆-白字.png" alt="网站图标" class="logo-icon-img">
          </div>
        </template>

        <!-- 动态渲染菜单项 -->
        <template v-for="menu in menuTree" >
          <!-- 如果没有子菜单，直接渲染 el-menu-item -->
          <el-menu-item
            v-if="menu.children.length === 0"
            :index="menu.menuIndex"
            @click="handleMenuClick(menu.path)"
            :key="menu.id"
          >
            <i :class="menu.iconEle ? menu.iconEle : 'el-icon-menu'" class="left-menu-icon"></i>
            <span>{{ menu.name }}</span>
          </el-menu-item>

          <!-- 如果有子菜单，渲染 el-submenu -->
          <el-submenu v-else :index="menu.menuIndex" :key="menu.id">
            <template slot="title">
              <i :class="menu.iconEle ? menu.iconEle : 'el-icon-menu'" class="left-menu-icon"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item
              v-for="submenu in menu.children"
              :key="submenu.id"
              :index="submenu.menuIndex"
              @click="handleMenuClick(submenu.path)"
            >
              {{ submenu.name }}
            </el-menu-item>
          </el-submenu>
        </template>

      </el-menu>
    </el-aside>

    <el-main class="content-container">
      <div>
        <!-- 顶部导航栏 -->
        <el-menu mode="horizontal" class="header-nav">
          <!-- 顶部导航栏-左侧区域 -->
          <div class="header-nav-left">
            <span>您账号有效期倒计时为：</span>
            <br>
            <span>{{ countdown }}</span>
          </div>

          <!-- 顶部导航栏-中间区域 -->
          <div class="header-nav-middle">
            <!-- 顶部导航栏-左侧区域-搜索栏 -->
            <div class="search-wrapper">
              <el-input
                placeholder="搜索功能开发中。。。"
                class="search-bar"
                v-model="searchQuery"
              ></el-input>
              <el-button class="search-button" @click="onSearch">搜 索</el-button>
            </div>
          </div>

          <!-- 顶部导航栏-右侧区域 -->
          <div class="header-nav-right">
            <el-menu-item class="small-screen-hide" index="1" @click="developing">会员中心</el-menu-item>
            <el-menu-item class="small-screen-hide" index="2" @click="developing">消息中心</el-menu-item>
            <span v-if="isLogined" class="username">欢迎您，尊敬的 {{ this.$store.state.nickname }}</span>
            <span v-else class="username">欢迎您，尊敬的 游客</span>
            <!-- 未登录显示登录 -->
            <el-button v-if="!isLogined"  type="primary" size="mini" class="logout-button" @click="login">登录</el-button>
            <!-- 已登录显示注销 -->
            <el-button v-else  type="danger" size="mini" class="logout-button" @click="logout">注销</el-button>

          </div>
        </el-menu>

        <!-- 右侧内容区域 -->
        <div class="content-box">
          <div class="headArea">
              <!-- <p style="color: red;">网站仍在完善中，如有问题请见谅</p> -->
              <p class="headAttention">
                  注意，响应式样式尚未完成，
                  完整内容请在宽度大于1300px的窗口下查看！</p>
          </div>
          <router-view></router-view>
        </div>

        <!-- 底部ICP备案 -->
        <footer class="footArea">
          <p>
            © 2024 版权所有 | 
            <a href="https://beian.miit.gov.cn/" target="_blank" class="beian-link">
              湘ICP备2024096825号
            </a>
          </p>
        </footer>
        
      </div>
    </el-main>

  </div>
</template>

<script>

import * as menuApi from '@/api/menu'

export default {
  name: "MainPage",
  data() {
      return {
        isCollapse: true,
        //当前激活的菜单项（默认为首页）
        activeIndex:'',
        searchQuery:'',
        //左侧菜单树
        menuTree:[]

        //jwt倒计时
        //剩余时间（秒）
        ,remainingTime: 0
        // 格式化后的倒计时
        ,countdown: ""
        // 定时器引用
        ,timer: null

        //是否已登录（true登录 false未登录）
        ,isLogined:false
      };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    handleSelect(key, keyPath){
      console.log(key, keyPath);
      this.activeIndex = key
    },

    //处理菜单点击事件（动态路由跳转）
    handleMenuClick(path) {
      //路径不同才跳，避免重复跳转的问题
      if(this.$route.path !== path){
        this.$router.push(path); 
      }
      
    },

    //搜索
    onSearch(){
      console.log('搜索---',this.searchQuery);
      this.$message('开发中...敬请期待');
    },
    //开发中...
    developing(){
      this.$message('开发中...敬请期待');
    },
    //登录
    login(){
      console.log('登录---'),
      //触发vuex中的注销方法
      this.$store.dispatch('logout');
      this.$router.push('/Login');
    },

    //注销
    logout(){
      console.log('注销---')
      //触发vuex中的注销方法
      this.$store.dispatch('logout');
      this.$router.push('/Login');

    }

    //解析jwt
    ,parseJwt(token) {
        const base64Url = token.split('.')[1]; // 提取 payload 部分
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        let parseJWTJson = JSON.parse(jsonPayload)
        console.log('解析后的jwt---',parseJWTJson)
        //解析后获取用户的昵称
        this.$store.state.nickname = parseJWTJson.nickname
        return parseJWTJson; // 返回解析后的 JSON 对象
    },
    //获取jwt时间
    getTokenRemainingTime(token) {
        const decoded = this.parseJwt(token);
        const exp = decoded.exp; // 提取 exp 字段
        const currentTime = Math.floor(Date.now() / 1000); // 当前时间（秒）
        return exp - currentTime; // 返回剩余秒数
    },
    //时间格式化
    formatTime(seconds) {
      const days = Math.floor(seconds / 86400); // 计算天数
      const hrs = Math.floor((seconds % 86400) / 3600); // 计算剩余小时
      const mins = Math.floor((seconds % 3600) / 60); // 计算剩余分钟
      const secs = seconds % 60; // 计算剩余秒数

  return `${days}天 ${hrs}小时 ${mins}分 ${secs}秒`;
    }
    //jwt倒计时功能
    ,startCountdown() {
      if (!this.$store.state.token) {
        this.countdown = "无有效 Token";
        this.isLogined = false;
        return;
      }else{
        this.isLogined = true
      }

      // 初始化剩余时间
      this.remainingTime = this.getTokenRemainingTime(this.$store.state.token);

      // 更新倒计时
      this.updateCountdown();

      // 每秒更新一次
      this.timer = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this.stopCountdown();
          this.countdown = "Token 已过期";
        } else {
          this.updateCountdown();
        }
      }, 1000);
    },
    updateCountdown() {
      this.countdown = this.formatTime(this.remainingTime);
    },
    stopCountdown() {
      clearInterval(this.timer);
    }    

    ,
    // 根据菜单路径递归查找菜单menuIndex
    findMenuIndexByPath(menuList, currentPath) {
      for (const menu of menuList) {
        if (menu.path === currentPath) {
          return menu.menuIndex;
        }
        if (menu.children && menu.children.length > 0) {
          const result = this.findMenuIndexByPath(menu.children, currentPath);
          if (result) {
            return result;
          }
        }
      }
      return null; // 未找到
    },
  },
  created() {
    console.log('进入created--')
    //获取最新的菜单树
    menuApi.getMenuTree()
    .then(res=>{
      console.log('菜单树--res--',res)
      this.menuTree = res.data
      console.log('this.menuTree---',this.menuTree)

      //根据当前页面的router找到对应的菜单menuIndex
      console.log('此时this.$route.path---',this.$route.path)
      this.activeIndex = this.findMenuIndexByPath(this.menuTree,this.$route.path)
    })
    .catch(err=>{
      console.log('菜单树--err--',err)
    })

    //获取token
    console.log('token---',this.$store.state.token)
    this.token = this.$store.state.token
    this.startCountdown()
    
  },
  mounted() {
    

  }

  ,watch: {
  
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100%;
}

/* 左侧菜单栏中心区域 */
.menu-left {
  border:0px !important
}

/* 固定左侧菜单栏样式 */
.menu-container {
  position: fixed; /* 固定位置 */
  padding-top: 4%;
  top: 0;
  left: 0;
  width: 12% !important;
  height: 100%; /* 占满整个屏幕高度 */
  background-color: #409EFF;
  color: #ffffff;
  z-index: 1000; /* 确保在最上层 */
}

@media (max-width:1300px) {
  .menu-container {
    display: none;
  }
}

/* 左侧菜单文字图标样式 */
.left-menu-icon {
  color:#ffffff !important;
  font-size: 20px !important;
  margin-right: 5px;
}

/* 左菜单logo图标的外部div */
.logo-icon-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
  position: relative;
}
/* 左菜单logo图标的img标签 */
.logo-icon-img {
  width: 80px;
  height: auto;
  position: relative;
}

/* 左菜单logo图标左右的横线效果 */
.logo-icon-div::before,
.logo-icon-div::after {
  content: '';
  display: block;
  width: 20%;
  height: 2px;
  background-color: #fff;
  position: absolute;
  top: 50%;
}
/* 左菜单logo-左侧横线 */
.logo-icon-div::before {
  left: 0; 
  margin-right: 10px; 
}
 /* 左菜单logo-右侧横线 */
.logo-icon-div::after {
  right: 0;
  margin-left: 10px; 
}

 /* 左侧菜单-激活菜单项的背景颜色 */
.menu-container .el-menu-item.is-active {
  background-color: #1E7FD0 !important;
}

/* 右侧内容区域的外部容器 */
.content-container {
  margin-left: 12%;
  padding: 6px;
  background-color: #f5f5f5;
  border-left: 2px solid #ddd;
  position:relative;
  height: 100%;
  width: 100%;
  top: 44px;
}


@media (max-width:1300px) {
  .content-container {
    margin-left: 0%;
  }
}

/* 右侧内容区域的容器内部 */
.content-box {
  width: 98% !important;
  background-color: #ffffff;
  border: 1px solid #ddd !important;
  padding: 8px !important;
}

/* 顶部导航栏 */
.header-nav {
  position: fixed;
  top: 0;
  left: 12%;
  width: 88%;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 1000;
  height: 48px;
}
@media (max-width:1300px) {
  .header-nav {
    left: 0%;
    width: 100%;
  }
}

/* 顶部导航栏-菜单选项样式 */
.header-nav .el-menu-item{
  height: 48px;
  line-height: 48px;
}


/* 顶部导航栏的左侧区域 */
.header-nav-left {
  font-size: 14px;
  padding-left: 10px;
  width: 25%;
  color: red;
}
@media (max-width:1300px) {
  .header-nav-left {
    width: 50%;
  }
}

/* 顶部导航栏-左侧区域的搜索栏的容器 */
.search-wrapper {
  /* display: flex;
  align-items: center;
  position: relative; */
}

/* 顶部导航栏-中间区域 */
.header-nav-middle{
   display: flex;
  align-items: center;
  position: relative;
}

@media (max-width:1300px) {
  .header-nav-middle {
    display: none;
  }
}

/* 顶部导航栏-搜索栏 */
.search-bar {
  width: 360px;
  height: 35px; 
}
/* 搜索栏内置样式 */
.search-bar >>> .el-input__inner {
  height: 100%;
  border-radius: 20px 0 0 20px;
  border-right: none; 
}

/* 顶部导航栏-搜索按钮 */
.search-button {
  height: 35px; 
  line-height: 0;
  border-radius: 0 20px 20px 0;

  margin-left: -1px;
  background-color: #409eff;
  color: white;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  border: none; 
}


/* 顶部导航栏的右侧区域 */
.header-nav-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

@media (max-width:1300px) {
  .header-nav-right {
    /* display: none; */
    /* width: 45%; */
  }
}

/* 用户名 */
.username {
  font-size: 13px;
  margin-right: 15px;
}

/* 注销按钮 */
.logout-button {
  border-radius: 14px;
  color: white;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
}

/* 小于1300px隐藏css */
@media (max-width:1300px) {
  .small-screen-hide{
    display: none;
  }
}

 /* 头部注意事项栏 */
.headAttention {
        display: none;
        color: #F56C6C;
        white-space: normal; /* 允许换行 */
}
@media (max-width:1300px) {
    .headAttention {
        display: block;
    }
}

/* 备案区域 */
.footArea {
  text-align: center;
  font-size: 12px;
  color: #666;
  padding: 10px 0;
  background-color: #f9f9f9;
}
.beian-link {
  color: #409EFF;
  text-decoration: none;
}
.beian-link:hover {
  text-decoration: underline;
}


</style>
