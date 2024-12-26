<template>
    <div class="markdown-editor">
      <h1>标题：{{ title }}</h1>
      <h2>Markdown 编辑器</h2>
  
      <!-- 编辑器区域 -->
      <el-input
        v-model="markdownContent"
        type="textarea"
        :rows="15"
        placeholder="在这里输入 Markdown 内容..."
        @input="updateMarkdown"  
      ></el-input>
  
      <!-- 分割线 -->
      <div class="divider"></div>
  
      <!-- 预览区域 -->
      <div>
        <h2>Markdown 预览</h2>
        <!-- 强制重新渲染 vue-markdown -->
        <vue-markdown :key="componentKey">
          {{ markdownContent }}
        </vue-markdown>
      </div>
    </div>
  </template>
  
  <script>
  import VueMarkdown from 'vue-markdown';
  import * as techShareApi from '@/api/techShare'
  
  export default {
    components: {
      VueMarkdown
    },
    data() {
      return {
        id: null, //数据id
        title: '无', //标题
        markdownContent: ``,
        componentKey: 0 // 用于强制重新渲染
      };
    },
    methods: {
      updateMarkdown() {
        // 更新 key，强制重新渲染 vue-markdown 组件
        this.componentKey += 1;
      }
    },
    created(){
        console.log('进入Java技术分享详情页')
        // 获取路由传递的参数
        console.log('收到的参数为---',this.$route.params)
        this.id = this.$route.params.id;
        console.log('this.id---',this.id)
        techShareApi.findOne(this.id)
        .then(res=>{
            console.log('Java技术分享页详情数据获取成功---res---',res)
            this.markdownContent = res.data.content
            this.title = res.data.title
            this.updateMarkdown()
        })
        .catch(err=>{
            console.log('Java技术分享页详情数据获取失败---err---',err)
        })
    }
  };
  </script>
  