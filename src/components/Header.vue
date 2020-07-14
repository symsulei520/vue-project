<template>
  <el-row class="header" type="flex" justify="space-between">
    <el-col :span="6">
      <h2>后台管理中心</h2>
    </el-col>
    <el-col :span="6" class="right">
      <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="imgUrl" style="vertical-align:middle"></el-avatar>
          <span style="color:white;">{{nick}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set" icon="el-icon-plus">设置</el-dropdown-item>
          <el-dropdown-item command="help" icon="el-icon-circle-plus">帮助</el-dropdown-item>
          <el-dropdown-item command="exit" icon="el-icon-circle-check" @click="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { RequestLogout } from "@/api/indexApi.js";
import { baseURL } from "@/api/request.js";
// import { RemoveUserCookie } from "@/common/UserCookie.js";
export default {
  data() {
    return {
      baseURL
    };
  },
  computed: {
    // 从存储在本地的数据中取出姓名 数据
    nick() {
      return this.$store.getters.user.nick;
    },
    // 从存储在本地的数据中取出图片 数据
    imgUrl() {
      return this.baseURL + this.$store.getters.user.headerimg;
    }
  },
  methods: {
    onLogout() {
      RequestLogout().then(data => {
        if (data.resultCode === 1) {
          this.$router.replace({ path: "/Login" });
        }
      });
    },
    handleCommand(command) {
      // 判断函数的参数command 是否等于 el-dropdown-item 绑定的command属性的值exit
      if (command == "exit") {
        this.onLogout();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  background: linear-gradient(to left, #6091d1, #7692eb, #8370d6, #723feb);
  display: flex;
  align-items: center;
  h2 {
    text-align: center;
  }
  span {
    color: black;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    padding: 0 20px;
  }
}
</style>
