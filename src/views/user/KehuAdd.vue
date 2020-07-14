<template>
  <el-form @submit.prevent>
    <el-form-item label="用户名">
      <el-input placeholder="请输入用户名" name="username" v-model="user.username"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input placeholder="请输入密码" name="password" v-model="user.psw"></el-input>
    </el-form-item>

    <el-form-item label="头像">
      <!-- el-upload 表示上传组件
         :show-file-list="false" 绑定属性表示是否显示选中图片地址列表
         list-type: picture-card 图片预览效果（图片上传框形状）
         :auto-upload= "true|false" 绑定属性表示是否自动提交图片到服务器,要成功获取到文件对象，必须将图片自动上传打开，auto-upload=true; 
         action指一个不存在地址 
         :on-change="函数" 绑定属性表示内容转变事件，这里表示上传的图片发生改变时执行
      -->
      <el-upload
        list-type="picture-card"
        :show-file-list="false"
        :auto-upload="true"
        action="/"
        :on-change="onChangFile"
        :before-upload="onbeforeUpload"
        :headers="headers"
      >
        <!-- 当执行if判断时判断地址是否存在，如果地址存在，将图片地址作为src绑定属性的值，同时头像上传框显示上传的图片 -->
        <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
        <!-- 当else执行时，头像上传框显示icon标签 -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onAddFile">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入开发环境的URL地址
import { baseURL } from "@/api/request.js";
// 引入添加用户接口
import { RequestUserAdd } from "@/api/UserApi.js";
export default {
  data() {
    return {
      user: {
        username: "",
        psw: "",
        headerFile: null
      },
      baseURL,
      imageUrl: "",
      headers: {
        Authorization: "Bear" + RequestUserAdd()
      }
    };
  },
  methods: {
    // 选择本地图片时回调，预览本地上传文件;file表示本地上传的文件对象
    onChangFile(file) {
      console.log("file>>>>>>>", typeof file, file);
      // 将本地上传的图片地址赋值给imageUrl
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传之前回调
    onbeforeUpload(file) {
      // 将本地上传的文件对象赋值给自定义的空的数组对象
      this.user.headerFile = file;
    },
      onAddFile() {
        const username = this.user.username;
        const psw = this.user.psw;
        const fileHeader = this.user.headerFile;

        const formData = new FormData(); // 创建formdata对象
        formData.append("username", username); // 添加数据，将帐号、密码、文件对象都添加到formdata中
        formData.append("psw", psw);
        formData.append("fileHeader", fileHeader);

        // 调用添加用户接口
        RequestUserAdd(formData)
          .then(data => {
            if (data.resultCode === 1) {
              this.$router.replace({ path: "/user/list" });
            }
          })
          .catch(err => {
            this.$message({ message: "上传失败!" + err });
          });
      }
  }
};
</script>

<style>
</style>
