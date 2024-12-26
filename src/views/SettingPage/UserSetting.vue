<template>

    <div style="height: 100%;">
        <h2>用户设置</h2>
        <el-table
            :data="tableData"
            style="width: 100%;"
        >
            <el-table-column prop="code" label="编码" ></el-table-column>
            <el-table-column prop="username" label="用户名" ></el-table-column>
            <el-table-column prop="phoneNumber" label="电话号码" >暂无</el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" disabled>查看</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small" disabled>编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small" disabled>角色配置</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import * as userApi from '@/api/user'
export default {
    name:'ArticleBasic',
    data(){
        return{
            tableData:
            [
  
            ]
        }
    },
    methods:{
        handleClick(){
            
        }

    },
    created(){
        console.log('进入用户设置页')
        userApi.findList({})
        .then(res=>{
            console.log('user---res---',res)
            this.tableData = res.data.records
        })
        .catch(err=>{
            console.log('user---err---',err)
        })
    }
}
</script>

<style>

</style>