<template>

    <div style="height: 100%;">
        <h2>角色设置</h2>
        <el-table
            :data="tableData"
            style="width: 100%;"
            row-key="id"
            border
            :tree-props="{children:'children',hasChildren:'hasChildren'}"
        >
            <el-table-column prop="id" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="标识" width="200"></el-table-column>
            <el-table-column prop="description" label="描述" ></el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="viewBtn(scope.row)" type="text" size="small" disabled>查看</el-button>
                    <el-button @click="editBtn(scope.row)" type="text" size="small" disabled>编辑</el-button>
                    <!-- <el-button @click="permissionBtn(scope.row)" type="text" size="small">权限配置</el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import * as roleApi from '@/api/role'

export default {
    name:'RoleSetting',
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        viewBtn(){

        },
        editBtn(){

        }
    },
    created(){
        console.log('进入角色设置页')
        roleApi.findList({})
        .then(res=>{
            console.log('role---res---',res)
            this.tableData = res.data.records
        })
        .catch(err=>{
            console.log('role---err---',err)
        })
    }
}
</script>

<style>

</style>