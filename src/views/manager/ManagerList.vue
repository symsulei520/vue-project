<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(user, index) in userList"
      :key="user.index"
      :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '20px' }">
        <img :src="baseURL + user.headerimg" class="image" />
        <div style="padding: 5px;">
          <span>{{user.nick}}</span>
          <div class="bottom clearfix">
            <time class="time">{{user.createtime|formatDate}}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import DataUtil from "@/utils/DataUtil.js";
import { baseURL } from "@/api/request.js";
import { RequestManagerList } from "@/api/ManagerApi.js";
export default {
  data() {
    return {
      userList: [],
      img: "",
      baseURL
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      RequestManagerList().then(res => {
        console.log("res>>>>", res);
        console.log("res>>>>>1122222", res.resultInfo);
        if (res.resultCode == 1) {
          this.userList = res.resultInfo;
          // for(let i = 0;i<this.userList.length; i++){
          //   this.img = this.userList[i];
          //   console.log("imgurl>>>>>",this.img);
          // }
          console.log("userlist", this.userList);
        }
      });
    }
  },
  // 格式化日期时间
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatRiQi(date);
    }
  }
};
// 日期格式化日
function formatRiQi(sj) {
  var now = new Date(sj);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  // return   year+"-"+month+"-"+date; //+"   "+hour+":"+minute+":"+second;
  return year + "年" + month + "月" + date + "日"; //+"   "+hour+":"+minute+":"+second;
}
</script>

<style  lang="scss" scoped>
.el-col{
  width: 300px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 30px;
  line-height: 12px;
  height: 100px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 300px;
  height: 300px;
  width: 100%;
  display: block;
}
</style>