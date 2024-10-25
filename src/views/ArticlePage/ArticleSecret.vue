<template>

    <div>
        <h2>机密文章内容</h2>
        <!-- 加长的内容，用于测试滚动 -->
        <p v-for="i in 100" :key="i">这是机密文章内容区域的第 {{ i }} 行。</p>
    </div>

</template>

<script>
export default {
    name:'ArticleBasic',
    data(){
        return{

        }
    },
    methods:{

    },
    created(){
        console.log('进入机密文章页')
    }
}
</script>

<style>

</style>