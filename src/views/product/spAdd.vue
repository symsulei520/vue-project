<template>
  <el-form @submit.prevent>
    <el-form-item label="商品名称">
      <el-input placeholder="请输入商品名称" name="name" v-model="user.userName"></el-input>
    </el-form-item>
    <el-form-item label="商品地址">
      <el-input placeholder="请输入商品价格" name="addr" v-model="user.userAddr"></el-input>
    </el-form-item>
    <el-form-item label="商品年龄">
      <el-input placeholder="请输入商品描述" name="age" v-model="user.userAge"></el-input>
    </el-form-item>
    <el-form-item label="商品生日">
      <el-input placeholder="请输入商品数量" name="birth" v-model="user.userBirth"></el-input>
    </el-form-item>
    <el-form-item label="商品性别">
      <el-input placeholder="请输入商品数量" name="sex" v-model="user.userSex"></el-input>
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
import { RequestProductAdd } from "@/api/ProductApi.js";
export default {
  data() {
    return {
      user: {
        userName: "",
        userAddr: "",
        userAge: "",
        userBirth: "",
        userSex: ""
      },
      baseURL,
      imageUrl: ""
    };
  },
  methods: {
    onAddFile() {
      const name = this.user.userName;
      const addr = this.user.userAddr;
      const age = this.user.userAge;
      const birth = this.user.userBirth;
      const sex = this.user.userSex;

      // 调用添加商品数据接口
      // console.log("formdata>>>>>>>>>>>>>", formData);

      RequestProductAdd(name,addr,age,birth,sex)
        .then(data => {
          console.log("data>> 123456",data);
          
          if (data.data.code == 200) {
            this.$router.replace({ path: "/product/list" });
            this.$message({
              type: 'success',
              message: '添加商品信息成功'
            })
          }
        })
        .catch(err => {
          this.$message({ message: "添加失败" + err });
        });
    }
  }
};
</script>

<style>
</style>
