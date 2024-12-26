<template>
    <div style="height: 100%;">
        <h2>菜单设置</h2>
        <!-- <div style="margin-bottom: 10px;">
            <el-button>新增菜单</el-button>
            <el-button>测试</el-button>
        </div> -->
        <el-table
            ref="table"
            :data="menuTree"
            style="width: 100%;"
            row-key="menuIndex"
            border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
           
        >
            <el-table-column prop="menuIndex" label="序号" width="110"></el-table-column>
            <el-table-column prop="name" label="菜单名" width="150"></el-table-column>
            <el-table-column prop="permissionString" label="权限字符串"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="orderNum" label="排序编号" width="50"></el-table-column>

            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button @click="viewBtn(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
                    <!-- <el-button @click="deleteBtn(scope.row)" type="text" size="small" style="color: red;">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 查看对话框 -->
        <el-dialog :visible.sync="viewDialogVisible" title="查看菜单">
            <div>
                <p><strong>菜单名：</strong>{{ currentMenu.name }}</p>
                <p><strong>权限字符串：</strong>{{ currentMenu.permissionString }}</p>
                <p><strong>类型：</strong>{{ currentMenu.type }}</p>
                <p><strong>路径：</strong>{{ currentMenu.path }}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog :visible.sync="editDialogVisible" title="编辑菜单">
            <el-form :model="currentMenu" label-width="120px">
                <el-form-item label="菜单名">
                    <el-input v-model="currentMenu.name"></el-input>
                </el-form-item>
                <el-form-item label="权限字符串">
                    <el-input v-model="currentMenu.permissionString"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="currentMenu.type" placeholder="请选择">
                        <el-option label="扩展节点" value="extend"></el-option>
                        <el-option label="内容节点" value="content"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="currentMenu.path"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import * as menuApi from '@/api/menu'

export default {
    name: 'MenuSettings',
    components: {  },
    data() {
        return {
            menuTree: [],
            viewDialogVisible: false,
            editDialogVisible: false,
            currentMenu: {}, // 当前选中的菜单
        };
    },
    methods: {
        // 查看按钮
        viewBtn(row) {
            this.currentMenu = { ...row }; // 深拷贝菜单数据
            this.viewDialogVisible = true;
        },
        // 编辑按钮
        editBtn(row) {
            this.currentMenu = { ...row }; // 深拷贝菜单数据
            this.editDialogVisible = true;
        },
        // 保存编辑
        saveEdit() {
            menuApi.updateOne(this.currentMenu).then((res) => {
                if(res.code!=200){
                    this.$message.error('菜单更新失败！');
                    return
                }
                this.$message.success('菜单更新成功');
                this.editDialogVisible = false;
                this.fetchMenuTree(); // 重新获取菜单树
            }).catch(err => {
                this.$message.error('菜单更新失败');
                console.error(err);
            });
        },
        // 删除按钮
        deleteBtn(row) {
            this.$confirm('确认删除该菜单吗？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                menuApi.deleteOne(row.id).then(() => {
                    this.$message.success('菜单删除成功');
                    this.fetchMenuTree(); // 重新获取菜单树
                }).catch(err => {
                    this.$message.error('菜单删除失败');
                    console.error(err);
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        // 获取菜单树
        fetchMenuTree() {
            menuApi.getMenuTree()
                .then(res => {
                    this.menuTree = res.data;
                })
                .catch(err => {
                    console.error('获取菜单树失败:', err);
                });
        },
    },
    created() {
        this.fetchMenuTree(); // 页面加载时获取菜单树
    },
};

</script>

<style>

</style>