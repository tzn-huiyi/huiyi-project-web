<template>

    <div>
        <h2>Java后端技术分享</h2>
        
        <el-table
            ref="table"
            :data="tableData"
            style="width: 100%;"
            row-key="id"
            border
            @row-click="rowClick"
        >
            <el-table-column prop="code" label="编号" width="200"></el-table-column>
            <el-table-column prop="title" label="标题" ></el-table-column>

        </el-table>
    </div>

</template>

<script>
import * as techShareApi from '@/api/techShare'
export default {
    name:'JavaTech',
    data(){
        return{
            tableData:[

            ]
        }
    },
    methods:{
        rowClick(row){
            console.log('java技术---行点击按钮---row---',row)
            this.$router.push({
                name:'JavaTechDetail',
                params: { id:row.id }
            })
        },
    },
    created(){
        console.log('进入Java技术分享页')
        techShareApi.findList({
            "type":"java",
            "currentPage":this.currentPage_Img,
            "pageSize":this.pageSize_Img
        })
        .then(res=>{
            console.log('技术分享页列表数据获取成功---res---',res)
            this.tableData = res.data
        })
        .catch(err=>{
            console.log('技术分享页列表数据获取失败---err---',err)
        })
    }
}
</script>

<style>

</style>