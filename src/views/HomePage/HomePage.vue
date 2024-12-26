<template>

    <div>
        <h2>简介</h2>
        <p>您好，本网站用于分享与总结javaweb技术，欢迎指点交流。</p>
        <p>目前本网站所涉及的技术为：</p>
        <p>前端：Vue2 + Element UI + nginx + axios + vuex</p>
        <p>后端：Spring Boot + Spring Security + Maven + MySQL + Mybatis-Plus + Docker + Redis + minio</p>
        <br>
        <p style="color: red;">注意，登录功能仅为内部测试/演示使用，现仅对外开放技术分享的浏览权限。</p>
        <p style="color: red;">由于网站初步开放，目前内容较少，后续将不断更新JavaWeb技术总结内容。</p>
        
    </div>

</template>

<script>
export default {
    name:'HomePage',
    data(){
        return{

        }
    },
    methods:{

    },
    created(){
        console.log('进入首页')
    }
}
</script>

<style scoped>

</style>