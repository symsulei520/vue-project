<template>
  <div class="div">
    <el-row>
      <el-col :span="12">
        <div id="bar" style="width: 600px;height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie" style="width:600px; height:400px;"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div id="bar1" style="width: 600px;height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie1" style="width:600px; height:400px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 1.导入echarts图表库
import ECharts from "echarts";
export default {
  mounted() {
    this.drawBar(); // 调用bar图表 函数
    this.drawPie(); // 调用pie图表 函数
    this.drawBar1(); // 调用bar1图表 函数
    this.drawPie1(); // 调用pie1图表 函数
  },
  methods: {
    // 函数定义bar图表
    drawBar() {
      // 2.初始化Echarts实例（找到画布）
      const myEcharts = ECharts.init(document.getElementById("bar"));

      myEcharts.showLoading(); // 显示加载提示框
      setTimeout(() => {
        myEcharts.hideLoading(); // 隐藏加载提示框
        // 3.指定图表的配置项和数据（在画布中画内容）
        const option = {
          // 标题
          title: {
            text: "知识统计"
          },
          //
          legend: {
            data: ["web前端"]
          },
          // X轴显示内容
          xAxis: {
            data: ["Html", "Css", "JavaScript", "vue"]
          },
          // y轴显示内容
          yAxis: {},

          //图表样式
          series: [
            {
              name: "web前端", //
              type: "bar", // 图标形状配置
              data: [20, 10, 5, 5] //
            }
          ]
        };
        // 4.将配置的图表信息添加到echarts中
        myEcharts.setOption(option);
      }, 1000);
    },
    // 函数定义pie图表
    drawPie() {
      const myEcharts = ECharts.init(document.getElementById("pie"));
      const option = {
        // 标题
        title: {
          text: "访问统计"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ],
            roseType: "angle", // 玫瑰图
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myEcharts.setOption(option);
    },
    // 函数定义bar1图表
    drawBar1() {
      const myEcharts = ECharts.init(document.getElementById("bar1"));
      const option = {
        angleAxis: {
          max: 2,
          startAngle: 30,
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          data: ["v", "w", "x", "y", "z"],
          z: 10
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "red",
            color: "rgba(200, 0, 0, 0.5)",
            itemStyle: {
              borderColor: "red",
              borderWidth: 1
            }
          },
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "green",
            roundCap: true,
            color: "rgba(0, 200, 0, 0.5)",
            itemStyle: {
              borderColor: "green",
              borderWidth: 1
            }
          }
        ],
        legend: {
          show: true,
          data: ["red", "green"]
        }
      };
      myEcharts.setOption(option);
    },
    // 函数定义pie1图表
    drawPie1() {
      const myEcharts = ECharts.init(document.getElementById("pie1"));
      setTimeout(function() {
       const option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2012} ({d}%)"
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012"
              }
            }
          ]
        };

        myEcharts.on("updateAxisPointer", function(event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myEcharts.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        myEcharts.setOption(option);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>