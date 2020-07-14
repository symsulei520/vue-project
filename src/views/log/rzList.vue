<template>
  <div class="rzList">
    <!-- 搜索查询 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <!-- :model相当于v-bind:model的缩写；将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定 -->
      <el-form :inline="true" :model="filters">
        <!-- 姓名查询 -->
        <el-form-item label="姓名：">
          <!-- 监听input输入事件v-on:input -->
          <el-input v-model="filters.name" placeholder="请输入姓名进行查询"></el-input>
        </el-form-item>

        <!-- 日期查询 -->
        <el-form-item label="日期：">
          <el-col :span="11">
            <!-- 监听input输入事件v-on:input -->
            <!-- el-date-picker 日期组件 -->
            <el-date-picker v-model="filters.startTime" placeholder="请选择开始日期时间" type="datetime"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="filters.endTime" placeholder="请选择结束日期时间" type="datetime"></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table style="margin:0px 10px;" height="710px" :data="list" border stripe>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="序号" type="index" width="60" prop="l_id"></el-table-column>
      <el-table-column label="姓名" width="80" sortable prop="nick"></el-table-column>
      <el-table-column label="内容" sortable prop="content">
        <template slot-scope="scope">
          <p v-html="scope.row.content">{{scope.row.content}}</p>
        </template>
      </el-table-column>
      <el-table-column label="日期" sortable prop="logtime" type="data">
        <!--  :formatter="dateFormat" -->
        <span slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM',scope.row.logtime)}}</span>
      </el-table-column>
      <el-table-column label="操作" sortable width="250">
        <template v-slot="scope">
          <el-button
            @click="onDelete(scope.row.l_id)"
            type="primary"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            @click="openLogUpdate(scope.row)"
            type="success"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-card style="height:600px">
        <quillEditor v-model="content" style="height:300px"></quillEditor>
      </el-card>
      <el-button @click="onUpdate()" type="primary" style="margin-top:10px">保存</el-button>
    </el-dialog>

    <!-- 用户分页 -->
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
    <!-- :current-page="[]" 表示当前页数 -->
    <el-pagination
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNo"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import {
  RequestLogList,
  RequestLogDelete,
  RequestLogUpdate
} from "@/api/LoginApi.js";
// 日期格式化工具类
import DataUtil from "@/utils/DataUtil.js";
import DateFormat from "@/utils/dateFormat.js";
// 富文本框
import { quillEditor } from "vue-quill-editor";
// 富文本框组件样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  // 3.注册组件
  components: {
    quillEditor
  },
  data() {
    return {
      list: [],
      pageNo: 1, // 自定义当前页号
      total: 0, // 自定义用户数据总量
      pageSize: 8, // 自定义每页显示用户数据项
      dialogVisible: false, // 编辑-富文本框默认状态
      id: "",
      content: "",
      name: "",
      filters: {
        name: "", // 查询姓名
        startTime: null,
        endTime: null
      }
    };
  },
  created() {
    // 3.调用函数，函数的参数为当前序号
    this.RequestLogListPageData(this.pageNo);
  },
  methods: {
    // 1.函数封装请求数据 参数为当前序号
    RequestLogListPageData(pageNo, name, startTime, endTime) {
      //  获取 用户列表接口需要的参数
      // const name1 = this.$store.getters.user.nick; // 只获取自己的用户信息

      // 2.用户列表获取接口调用
      RequestLogList(pageNo, name, startTime, endTime).then(res => {
        console.log("rslit>>res>>>", res.resultInfo);

        if (res.resultCode == 1) {
          const result = res.resultInfo; // 将接口数据中的resultInfo json对象的值取出赋值
          this.list = result.list; // 在data中定义一个空的数组接受 接口中的list数组数据
          this.pageNo = result.currentNo; // 将接口中的页号赋值给当前自定义的页号
          this.pageSize = result.pageSize; // 将接口中的每页用户数量赋值给当前自定义的用户数量
          this.total = result.total; // 将接口中的数据总数赋值给当前自定义的数据总数
        }
        // console.log("this.list>>>", this.list);
      });
    },
    // 4.请求不同页号的事件函数,val这个参数表示当前页
    handleCurrentChange(val) {
      this.pageNo = val; // 把当前页的值赋给自定义的当前页属性
      this.RequestLogListPageData(this.pageNo); // 调用请求数据函数，参数为当前页号和每页用户数量
    },

    // 5.页面前后跳转事件函数,val这个参数表示每一页用户数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.RequestLogListPageData();
    },

    // 6.删除日志
    onDelete(id) {
      console.log("id>>>>>>>>>>>>>>>>>>", id);
      // 接口调用
      RequestLogDelete(id).then(data => {
        if (data.resultCode == 1) {
          this.$message({
            type: "success",
            message: "日志删除成功！"
          });
          this.RequestLogListPageData(); // 重新加载用户列表
        }
      });
    },
    dateFormat(fmt, date) {
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },

    // 7.编辑日志
    openLogUpdate(row) {
      this.dialogVisible = true;
      this.id = row.l_id;
      this.content = row.content;
    },
    onUpdate() {
      console.log("this.$store.getters.user>>>", this.$store.getters.user);
      RequestLogUpdate(this.id, this.content).then(data => {
        if (data.resultCode == 1) {
          this.RequestLogListPageData();
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "编辑日志成功!"
          });
        }
      });
    },

    // 8.搜索查询
    // 封装获取 查询用户的函数
    onRequestLogListPageData(pageNo) {
      // 定义一个空的 初始时间 变量用来接收 日期格式初始化后的 初始时间
      let startTime1 = null;
      if (this.filters.startTime) {
        // 将日期格式化后的初始时间赋值给空变量
        startTime1 = DataUtil.formatDate.format(
          new Date(this.filters.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      let endTime1 = null;
      if (this.filters.endTime) {
        endTime1 = DataUtil.formatDate.format(
          new Date(this.filters.endTime),
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      // 再次调用 封装的请求用户列表数据 函数
      this.RequestLogListPageData(
        pageNo,
        this.filters.name,
        startTime1,
        endTime1
      );
    },
    // 8.1 姓名搜索查询
    search() {
      // 调用获取 查询用户的函数，传入页号参数(实参)
      console.log(123);
      this.onRequestLogListPageData(this.pageNo);
    }
  }
};
</script>

<style>
</style>
