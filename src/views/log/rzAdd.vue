<template>
  <div>
    <el-card style="height:600px">
      <quillEditor v-model="content" style="height:500px"></quillEditor>
    </el-card>
    <el-button @click="onSave" type="primary" style="margin-top:10px">保存</el-button>
  </div>
</template>

<script>
// 1.引入富文本框vue-quill-editor
import { quillEditor } from "vue-quill-editor";
// 5.引入添加日志接口
import { RequestLogAdd } from "@/api/LoginApi.js";
// 7.引入初始化时间工具类
import DataUtil from "@/utils/DataUtil.js";
// 2.引入组件样式
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
      content: ""
    };
  },
  methods: {
    onSave() {
      // 获取当前日期时间并赋值
      let newDate = new Date();
      // 调用DataUtil这个js文件夹下formatDate方法内封装的format方法，传入两个参数
      // newData是以当前日期时间作为参数；'yyyy-MM-dd hh:mm:ss'参数是当前日期时间的格式
      const logtime = DataUtil.formatDate.format(
        newDate,
        "yyyy-MM-dd hh:mm:ss"
      );
      console.log("111111111111logtime",logtime);
      
      // 通过vuex的getters方法获取到用户的id并赋值
      const mid = this.$store.getters.user.m_id;
      // 6.调用添加日志接口,传入参数
      // 参数1为富文本框v-model绑定的值,参数2为格式化后的当前日期时间，参数3为用户的id
      RequestLogAdd(this.content, logtime, mid).then(data => {
        if (data.resultCode === 1) {
          this.$router.replace({ path: "/log/list" });
          this.$message({
            type: "success",
            message: "添加日志成功!"
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
