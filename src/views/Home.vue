<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2024-1-8</span></p>
          <p>上次登录地点：<span>安庆</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="name" label="课程" >
          </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买" >
          </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买" >
          </el-table-column>
        <el-table-column prop="totalBuy" label="总购买" > 
          </el-table-column>-->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
          />
        </el-table>
      </el-card>

      <div class="grid-content bg-purple"></div
    ></el-col>
    <el-col :span="16" style="padding-left: 10px"
      ><div class="grid-content bg-purple-light">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">${{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div></div
    ></el-col>
  </el-row>
</template>
<script>
import { getData } from "../api";
import * as echarts from "echarts";

export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData, userData , videoData} = data.getStatisticalData.data;
      this.tableData = tableData;
      console.log(data.getStatisticalData.data);
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var echartsOption = {};
      const { orderData } = data.getStatisticalData.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echartsOption.xAxis = xAxisData;
      echartsOption.yAxis = {};
      echartsOption.legend = xAxisData;
      echartsOption.series = [];
      xAxis.forEach((key) => {
        echartsOption.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
        // console.log(orderData.data.map(item => item[key]));
      });
      //  console.log(echartsOption);
      console.log("----------------");
      // 使用刚指定的配置项和数据显示图表
      echarts1.setOption(echartsOption);

      // 柱状图  // 基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Options = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            // data:[1,23,4,5,74],
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            // data:[1,23,4,5,74],
            type: "bar",
          },
        ],
      };
      // console.log(echarts2Option);
      echarts2.setOption(echarts2Options);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Options = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data:videoData,
            type:'pie'
          }
        ],
      };
      echarts3.setOption(echarts3Options);



    }); // getData().then(res => {console.log(res)})
  },
};

//   // console.log(data);

//     // console.log(data);
//     this.tableData = data.data.getStatisticalData.data.tableData
//     // console.log(data.data.getStatisticalData.data.tableData);
// //   console.log(data.getStatisticalData.data.tableData);
// //   const {tableData} = data.getStatisticalData.data.tableData
//     // const  {tableData}  = data.data
//     // this.tableData = tableData
//     // console.log(tableData);
//     // 基于准备好的dom，初始化echarts实例
//     const echarts1 = echarts.init(this.$refs.echarts1)
//   // 指定图表的配置项和数据
//     var echartsOption = {}
//     // this.orderData = data.data.getStatisticalData.data.videoData
//     // const xAxis = Object.keys(orderData[0])

//     console.log(data.data.getStatisticalData.data.videoData);
//     const xAxis = data.data.getStatisticalData.data.videoData.map(item => item.name);
//     console.log(xAxis);
//     console.log("^^^^^^^^^^");

//     const axisData = {
//         data:xAxis
//     }
//     echartsOption.xAxis = axisData
//     echartsOption.yAxis = {}
//     echartsOption.legend = axisData
//     echartsOption.series = []

//     console.log(data.data.getStatisticalData.data.orderData.data);
//     console.log("!!!!!!!!!!!");
//     let newList = []
//     for(let i in data.data.getStatisticalData.data.orderData.data){
//       // console.log(data.data.getStatisticalData.data.orderData.data[i]);
//       // newList += data.data.getStatisticalData.data.orderData.data[i]
//       for(let j in data.data.getStatisticalData.data.orderData.data[i]){
//         console.log(data.data.getStatisticalData.data.orderData.data[i][j]);
//         // newList += data.data.getStatisticalData.data.orderData.data[i][j]
//         newList.push(data.data.getStatisticalData.data.orderData.data[i][j])
//       }
//     }
//     console.log(newList)

//     // console.log(newList);
//     // let nnlist = [][7]
//     // let index = 0;
//     // for(let i = 0 ; i < newList.length; ++i){
//     //   let temp = 0;
//     //   nnlist[index][temp] = newList[i]

//     // }
//     // console.log("+++++");

//     // console.log(data.data.getStatisticalData.data.orderData.data[0]);
//     // console.log(data.data.getStatisticalData.data.orderData.data.map(item => item.value));

//   // let newArray = [];
//   // const chunkSize = 6;
//   // for (let i = 0; i < newList.length; i += chunkSize) {
//   //   newArray.push(newList.slice(i, i + chunkSize));
//   // }

//   console.log("********");
//   console.log(data.data);
//     xAxis.forEach(key => {
//         echartsOption.series.push({
//             name:key,
//             // data:data.data.getStatisticalData.data.orderData.data.map(item => item.value),
//             data:newList,
//             // data:newList,
//             type:'line'
//         })
//     });
//     // console.log(echartsOption);

//     // 使用刚指定的配置项和数据显示图表
//     echarts1.setOption(echartsOption)

//     // console.log(orderData);
//     // console.log(data.data.getStatisticalData.data.videoData);
//     // console.log(xAxis);

//     })
//   }
// }
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
