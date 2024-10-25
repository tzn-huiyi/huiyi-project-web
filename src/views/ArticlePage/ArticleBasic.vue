<template>

    <div>
        <h2>普通文章内容</h2>
        <!-- 加长的内容，用于测试滚动 -->
        <p v-for="i in 100" :key="i">这是会员文章内容区域的第 {{ i }} 行。</p>
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
        console.log('进入普通文章页')
    }
}
</script>

<style>

</style>