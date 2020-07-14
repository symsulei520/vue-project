<template>
  <div class="khList">
    <!-- element-ui table表格 -->
    <!-- stripe属性可以创建带斑马纹的表格 -->
    <!-- border属性可以创建带边框的表格 -->
    <!-- selection-change 选择项发生改变时触发该事件 -->
    <el-table
      :data="tableData"
      stripe
      border
      @selection-change="handleSelectionChange"
      height="750px"
    >
      <!-- 这一行实现多选框（设置type属性值为selection） -->
      <el-table-column type="selection"></el-table-column>
      <!-- 设置sortable属性即可实现以该列为基准的排序 -->
      <el-table-column label="序号" prop="uid" sortable width="100px"></el-table-column>
      <el-table-column label="头像" width="100px">
        <template v-slot:default="scope">
          <el-image
            style="width:100px;height:100px"
            :src="'http://192.168.0.101:8088'+scope.row.headerimg"
            fit="fill"
          >
            <!-- 服务器图片不显示时，加载本地图片 -->
            <div slot="error" class="image-slod">
              <el-image style="width:100px;height:100px" fit="fill" :src="picUrl"></el-image>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button size="mini" type="success" plain>编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 用户分页组件
    layout属性：组件布局，子组件名用逗号分隔
    子组件：
    total表示用户列表页数总条目
    prev表示上一页，next为下一页
    pager表示页码列表
    jumper表示跳页元素
    sizes用于设置每页显示的页码数量
    -->

    <!-- :page-sizes="[]"每页显示条目个数 -->
    <!-- @current-change 设置当页号发生改变时函数监听触发 -->
    <!-- @size-change 设置当 页大小发生改变时函数监听触发 -->
    <el-pagination
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      :current-page="currentNo"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { baseURL } from "@/api/request.js";
import { RequestUserListPage, RequestUserDelete } from "@/api/UserApi.js"; // 调用分页用户列表%调用删除接口
export default {
  data() {
    return {
      // userList: [],
      tableData: [],
      currentNo: 1, // 当前页号
      total: 0,
      pageSize: 5, // 每页显示列表项数量
      picUrl: require("@/assets/wxb.jpg"),
      baseURL
    };
  },
  created() {
    // 调用函数，函数的参数为当前序号
    this.onRequestUserList(this.currentNo, this.pageSize);
  },
  methods: {
    // 获取复选框集合，val为选中数据的集合
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("val>>>>", val);
    },
    // 删除用户
    handleDelete(index, row) {
      // 1.将用户列表参数中的序号uid取出并赋值
      const id = row.uid;
      this.$confirm("确定删除本条信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 调用删除接口
        RequestUserDelete(id).then(data => {
          // 判断resultCode参数是否 == 1
          if (data.resultCode === 1) {
            // 删除成功
            this.onRequestUserList(this.currentNo, this.pageSize);
            this.$message({
              type: "success",
              message: "删除成功 ！"
            });
          }
        });
      });
    },
    // 请求不同页号
    handleCurrentChange(val) {
      // val参数表示当前页号的值
      this.currentNo = val;
      this.onRequestUserList(this.currentNo, this.pageSize);
    },
    // 页大小转变事件
    handleSizeChange(val) {
      // val参数表示当前页面大小
      this.pageSize = val;
      this.onRequestUserList(this.currentNo, this.pageSize);
    },
    // 封装接口调用
    onRequestUserList(pageNo, pageSize) {
      RequestUserListPage(pageNo, pageSize) // 请求数据接口
        .then(data => {
          if (data.resultCode === 1) {
            const result = data.resultInfo;
            this.currentNo = result.currentNo; // 获取当前页号并赋值
            this.total = result.total; // 获取总记录条数并赋值
            this.pageSize = result.pageSize; // 获取每页记录条数
            this.tableData = result.list; // 获取当前的用户数组
          }
        });
    }
  }
};
</script>

<style>
</style>
