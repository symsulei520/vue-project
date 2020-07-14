<template>
  <!--el-menu组件 router， 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
  <div  style="background-color:#545c64">
    <h2 class="menu-title" @click="onCollapse">
      <i :class="!isCollapse?'el-icon-d-arrow-left':'el-icon-d-arrow-right'" class="transe-icon"></i>
      &nbsp;&nbsp;&nbsp;{{menuTitle}}
    </h2>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      border:none
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      :collapse="isCollapse"
    >
      <!-- 导航菜单 -->
      <!-- 绑定indx参数，保证他是唯一的标识，才能确保点击导航时是点击当前的导航栏，与 navmenu导航菜单的unique-opened参数(只保持一个子菜单的展开)交互使用 -->
      <el-submenu :index="id+'1'" v-for="(menu,id) in menuList" :key="id">
        <template slot="title">
          <!-- 绑定参数 -->
          <i :class="menu.iconCls"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <el-menu-item v-for="(menuChild,ids) in menu.children" :key="ids" :index="menuChild.path">
          <i :class="menuChild.iconCls"></i>
          {{menuChild.meta.title}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import { RequestMenu } from "@/api/indexApi.js";
// import router from "@/router/index";
export default {
  data() {
    return {
      isCollapse: false,
      menuTitle:'菜单列表'
      // routeArrays: []
    };
  },
  computed: {
    // 在 el-submenu上遍历这个函数数组
    menuList() {
      return this.$store.getters.menuList.filter(item => item.hidden);
    }
  },
  created() {
  },
  methods: {
    // 点击展开收起菜单列表
     onCollapse(){
      this.isCollapse = !this.isCollapse;
      setTimeout(() => {
          this.menuTitle = this.isCollapse?'':'菜单列表'
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.transe-icon{
   transition: all 0.6s ease-in-out;
}

.menu-title {
  background: #1180b8;
  color: white;
  line-height: 50px;
  font-size: 18px;
  padding-left: 24px;
  cursor: pointer;
}


.menu-title:hover .transe-icon{
   transform: translate(-5px,0);
}

.el-menu {
  border: none;
}
</style>
