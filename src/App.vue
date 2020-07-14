<template>
  <div class="bg">
    <!-- 根路由输出 -->
    <router-view />
  </div>
</template>

<script>
import { SaveUserList } from "@/common/UserListStore.js";
export default {
  created() {
    // 监听在页面刷新时将vuex里的信息保存到localStorage中
    window.addEventListener("beforeprint", () => {});

    // 页面刷新时重新调用menu.js文件的actions对象中的路由方法
    this.$store.dispatch('saveMenu');
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.bg {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    #36699a,
    #dbbef6,
    #e9e8f8,
    #6199e2,
    #97a2f2,
    #947cea
  );
}
ul {
  list-style: none;
}
</style>
