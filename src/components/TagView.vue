<template>
  <div class="tag-wrap">
    <router-link
      :to="{path:route.path}"
      v-for="route in tagLists"
      :key="route.path"
      class="tag"
      :class="isActive(route) ? active:''"
    >
      {{route.meta.title}}
      <!-- @click.prevent.stop 表示阻止点击事件向上冒泡 -->
      <span class="el-icon-close" @click.prevent.stop="delSelectTag(route)"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "active"
    };
  },
  methods: {
    // 路由选中状态，确定选中的路由为当前路由
    isActive(route) {
      /* 
      route.path 表示遍历当前数组路由对象的path
      this.$route.path 表示当前点击的路由对象的path
      route.path与this.$route.path相同，返回值就表示当前对象为选中的状态
      */
      return route.path == this.$route.path; // 当前路由对象
    },
    delSelectTag(route) {
      // 参数route表示当前要删除的路由对象
      // 调用tagView.js中封装的删除标签,传入参数并执行异步操作，执行成功的then方法
      // data就是封装的promise对象中的resolve成功的方法返回的数据 data是一个数组
      this.$store.dispatch("deleteTag", route).then(data => {
        console.log("data>>>>>>>>>>>", data);
        console.log("当前标签数组11111111111111：", this.tagLists)
        //判断当前删除的标签是否为选中的标签，判断为真执行向前跳的操作
        if (this.isActive(route)) {
          const lastRoute = data.slice(-1)[0]; // 查找数组中最后一个元素
          // 判断标签数组中最后一个元素是否存在，如果不存在就跳转到index页面
          console.log("lastRoute>>>>>>>>>>>>>>>>>", lastRoute);
          if (lastRoute) {
            this.$router.push(lastRoute); // 路由将导航到数组的最后一个元素，实现删除数组元素后的路由跳转
          } else {
            // 路由跳转到index页面时，侦听器会执行添加标签的动作，需要在侦听器中判断路由对象为index时不执行添加标签的动作
            this.$router.replace({ path: "/index" });
            console.log("主页面路由： ",this.$route);
            console.log("当前标签数组：", this.tagLists)
          }
        }
      });
    }
  },
  computed: {
    // 监听tagList数组的变化，并返回函数调用处
    tagLists() {
      // console.log("this.$store.getters.tagList>>><<<",this.$store.getters.tagList);
      
      return this.$store.getters.tagList; // 从vuex中取出数据tagList
    }
  },
  watch: {
    // 侦听路由的变化，当路由变化时，将路由对象保存到vuex中
    $route() {
      // console.log("this.$route.path", this.$route.path);
      // console.log("this.tagLists:::::::::::::::", this.tagLists);
      
      // 判断当前路由对象为index时直接返回，不执行添加标签的路由动作
      if (this.$route.path == "/index") return;
      // console.log("this.$route-  this.$route  -",this.$route);
      this.$store.dispatch("addTag", this.$route); // 添加addtag标签对象到vuex
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-wrap {
  margin-bottom: 20px;
}
a {
  text-decoration: none;
}
.tag {
  background-color: rgb(221, 223, 224);
  padding: 3px 8px;
  color: rgb(27, 27, 27);
  margin: 0 5px;
  border-radius: 5px;
  &:hover {
    background: #40bb84;
  }
}
.active {
  margin-right: 10px;
  background: #40bb84;
  padding: 6px 8px;
  display: inline-block;
  color: white;
}
</style>