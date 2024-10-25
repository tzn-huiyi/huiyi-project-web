<template>
  <div id="app" class="app-container">
    <!-- 固定左侧菜单栏 -->
    <el-aside class="menu-container">
      <el-menu
        ref="menu-left"
        :default-openeds="['1','2']"
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

        <el-menu-item index="0" @click="handleMenuClick('/HomePage')">
          <i class="el-icon-menu left-menu-icon"></i>
          首页
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document left-menu-icon"></i>
            <span>文章</span>
          </template>
          <el-menu-item index="1-1" @click="handleMenuClick('/ArticleBasic')">
            普通文章
          </el-menu-item>
          <el-menu-item index="1-2" @click="handleMenuClick('/ArticleVip')">
            会员文章
          </el-menu-item>
          <el-menu-item index="1-3" @click="handleMenuClick('/ArticleSecret')">
            机密文章
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting left-menu-icon"></i>
            <span>设置</span>
          </template>
          <el-menu-item index="2-1">设置1</el-menu-item>
          <el-menu-item index="2-2">设置2</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-main class="content-container">
      <div>
        <!-- 顶部导航栏 -->
        <el-menu mode="horizontal" class="header-nav">
          <!-- 顶部导航栏-左侧区域 -->
          <div class="header-nav-left">
            <!-- 顶部导航栏-左侧区域-搜索栏 -->
            <div class="search-wrapper">
              <el-input
                placeholder="请输入搜索内容"
                class="search-bar"
                v-model="searchQuery"
              ></el-input>
              <el-button class="search-button" @click="onSearch">搜 索</el-button>
            </div>
          </div>

          <!-- 顶部导航栏-右侧区域 -->
          <div class="header-nav-right">
            <el-menu-item index="1">会员中心</el-menu-item>
            <el-menu-item index="2">消息中心</el-menu-item>
            <span class="username">欢迎您，灰忆</span>
            <el-button  type="danger" size="mini" class="logout-button" @click="logout">注销</el-button>
          </div>
        </el-menu>

        <!-- 右侧内容区域 -->
        <div class="content-box">
          <router-view></router-view>
        </div>
        
      </div>
    </el-main>

  </div>
</template>

<script>

export default {
  name: "MainPage",
  data() {
      return {
        isCollapse: true,
        //当前激活的菜单项（默认为首页）
        activeIndex:''
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
      
    }
  },
  created() {
    console.log('进入created--')
    
  },
  mounted() {
    this.activeIndex = this.$route.path;
    console.log('此时this.activeIndex',this.activeIndex)
  },
  watch: {
  
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

/* 左侧菜单文字图标样式 */
.left-menu-icon {
  color:#ffffff !important;
  font-size: 20px !important;
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

 /* 激活菜单项的背景颜色 */
.el-menu-item.is-active {
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

/* 顶部导航栏-菜单选项样式 */
.header-nav .el-menu-item{
  height: 48px;
  line-height: 48px;
}


/* 顶部导航栏的左侧区域 */
.header-nav-left {
  display: flex;
  align-items: center;
  position: relative;
  left: 25%;
}

/* 顶部导航栏-左侧区域的搜索栏的容器 */
.search-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

/* 顶部导航栏-搜索栏 */
.search-bar {
  width: 450px;
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



</style>
