<template>

    <div style="height: 100%;">
        <h2>权限设置</h2>
        <el-table
            :data="tableData"
            style="width: 100%;"
            row-key="index"
            border
            :tree-props="{children:'children',hasChildren:'hasChildren'}"
        >
            <el-table-column prop="index" label="序号"
            width="100"></el-table-column>
            <el-table-column prop="name" label="菜单名" 
            width="200"></el-table-column>
            <el-table-column prop="permissionString" label="权限字符串" ></el-table-column>
            <!-- <el-table-column prop="type" label="类型" ></el-table-column> -->

            <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="viewBtn(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="permissionBtn(scope.row)" type="text" size="small">权限配置</el-button>
                </template>
            </el-table-column>
        </el-table>

        <DataModal 
            :isVisible="isModalVisible"  
            @update:isVisible="isModalVisible = $event"
        >
        </DataModal>

    </div>

</template>

<script>
import DataModal from '@/views/components/DataModal.vue';
export default {
    name:'ArticleBasic',
    components:{
         DataModal
    },
    data(){
        return{
            isModalVisible: false,
            tableData:
            [
                {
                    index:'1',
                    name:'首页',
                    permissionString:'system:homePage',
                    type:'content'
                },
                {
                    index:'2',
                    name:'文章',
                    permissionString:'system:article',
                    type:'extend',
                    children:[{
                        index:'2-1',
                        name:'普通文章',
                        permissionString:'system:article:basic',
                        type:'content',
                        children:[{
                            index:'2-1-1',
                            name:'查看功能',
                            permissionString:'system:article:basic-1',
                            type:'feature'
                        }]
                    },
                    {
                        index:'2-2',
                        name:'会员文章',
                        permissionString:'system:article:vip',
                        type:'content'
                    },
                    {
                        index:'2-3',
                        name:'机密文章',
                        permissionString:'system:article:secret',
                        type:'content'
                    }]
                },
                {
                    index:'3',
                    name:'设置',
                    permissionString:'system:setting',
                    type:'extend',
                    children:[{
                        index:'3-1',
                        name:'用户设置',
                        permissionString:'system:setting:user',
                        type:'content'
                    },
                    {
                        index:'3-2',
                        name:'角色设置',
                        permissionString:'system:setting:role',
                        type:'content'
                    },
                    {
                        index:'3-3',
                        name:'权限设置',
                        permissionString:'system:setting:permission',
                        type:'content'
                    }]
                },
            ],
        }
    },
    methods:{
        viewBtn(row){
            console.log('点击查看按钮--row---',row)
        },
        editBtn(row){
            console.log('点击编辑按钮--row---',row)
        },
        permissionBtn(row){
            console.log('点击权限配置按钮--row---',row)
            this.isModalVisible = true
        }

    },
    created(){
        console.log('进入权限设置页')
    }
}
</script>

<style>

</style>