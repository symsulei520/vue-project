<template>
  <div class="spList">
    <!-- 搜索查询 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名" v-on:input="getUser"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="centerDialogVisible = true">添加信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="batchDelete(sels)">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 表格 -->
    <el-table :data="list" style="margin:0px 10px;" height="710px" @selection-change="selsChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" prop="id" width="60"></el-table-column>
      <el-table-column label="姓名" prop="name" sortable></el-table-column>
      <el-table-column label="地址" prop="addr" sortable></el-table-column>
      <el-table-column label="年龄" prop="age" sortable></el-table-column>
      <el-table-column label="生日" prop="birth" sortable></el-table-column>
      <!-- :formatter="formatSex" 性别显示转换 -->
      <el-table-column label="性别" prop="sex" sortable :formatter="formatSex"></el-table-column>
      <el-table-column label="操作" width="250">
        <template v-slot="scope">
          <el-button
            @click="onDelete(scope.row.id)"
            type="primary"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            @click="onUpdate(scope.row.id,scope.row)"
            type="success"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="userPager.total"
      :current-page.sync="userPager.currentNo"
      :page-size="userPager.pageSize"
      style="float:right;"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import {
  RequestProductListPage,
  RequestProductDeleteByID,
  RequestProducDeleteBatch
} from "@/api/ProductApi.js";
export default {
  data() {
    return {
      list: [],
      idObj: {
        ids: ""
      },
      userPager: {
        // 定义空的用户分页json对象
        total: 0, // 定义初始总页数
        currentNo: 1, // 定义初始页数
        pageSize: 8 //  定义每页显示用户数量
      },
      filters: {
        name: ""
      },
      sels: [] // 接收多选选中的值的数组
    };
  },
  created() {
    this.RequestProductListPageData(); // 调用 获取商品列表的接口的 函数
  },
  methods: {
    // 1.获取商品列表
    RequestProductListPageData(name) {
      // 在函数中调用获取商品列表的函数
      RequestProductListPage(name, this.userPager.currentNo).then(res => {
        console.log("res.data>>>>>>>>>>>>>>>>>", res.data);
        this.list = res.data.users; // 将mockjs构造的users数组赋值给自定义的新数组
        this.userPager.total = res.data.total; // 将mockjs构造的数据总页数赋值
      });
    },

    // 2.性别显示转换
    formatSex: function(row) {
      return row.sex == 1 ? "男" : "女"; // 三目运算符判断sex
    },

    // 3.分页点击事件
    handleCurrentChange(pageno) {
      this.userPager.currentNo = pageno; // 将点击获取到页数赋值给新的页数对象
      this.RequestProductListPageData("");
    },

    // 4.过滤查询内容
    getUser() {
      let name = this.filters.name.trim();
      this.RequestProductListPageData(name);
    },

    // 5.删除
    onDelete(id) {
      // const id = row.id
      console.log("id>>>>>>>>>>>>>>>>", id);
      RequestProductDeleteByID(id).then(data => {
        console.log("data>>>>>>>>>>>>>>>", data);
        if (data.data.code === 200) {
          this.RequestProductListPageData();
          this.$message({
            type: "success",
            message: "删除成功 ！"
          }).catch(err => {
            console.log("err>>>", err);
          });
        }
      });
    },

    // 6.批量删除
    // 批量删除,选中时触发，将选中的数组组成一个数组
    selsChange(sels) {
      this.sels = sels;
    },
    batchDelete() {
      //获取所有选中行的id组成的字符串 并赋值给自定义的json字符串
      this.idObj.ids = this.sels.map(item => item.id).join();
      // 调用批量删除的接口
      RequestProducDeleteBatch(this.idObj).then(res => {
        if (res.data.code == 200) {
          this.RequestProductListPageData();
          this.$message({
            type: "success",
            message: "删除商品信息成功"
          });
        }
      });
    },

    // 7.编辑
  }
};
</script>

<style>
.spList {
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
