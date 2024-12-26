<template>
    <el-dialog
      title="数据操作窗口"
      :visible.sync="isVisibleLocal"
      width="60%"
      @close="handleClose"
    >
    <div>
      <!-- 放置列表数据及相关操作按钮 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisibleLocal = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </span>
    </el-dialog>
</template>
  
  <script>
  export default {
    name: "DataModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        isVisibleLocal: this.isVisible, // 本地状态
        tableData: [...this.data],
      };
    },
    watch: {
      isVisible(newVal) {
        // 监听父组件传来的值变化
        console.log('子组件中-接收的isVisible变化---',newVal)
        this.isVisibleLocal = newVal; 
      },
    },
    methods: {
      handleClose() {
        // 关闭弹窗
        console.log('子组件中-关闭窗口')
        this.isVisibleLocal = false; 
        // 通知父组件更新
        this.$emit("update:isVisible", false); 
      },
      handleConfirm() {
        // 点击确认
        this.isVisibleLocal = false;
        this.$emit("update:isVisible", false);
        // 传递确认后的数据
        this.$emit("confirm", this.tableData); 
      },
    },
  };
  </script>
  