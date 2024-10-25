<template>

    <div>
        <h2>首页</h2>
        <p v-for="i in 100" :key="i">这是首页内容区域的第 {{ i }} 行。</p>
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