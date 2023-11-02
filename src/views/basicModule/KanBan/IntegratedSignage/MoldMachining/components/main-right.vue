<template>
  <div class="data-v-main-right">
    <div class="right-top">
      <div class="right-top-title">模具进度</div>
      <dvScrollRankingBoard
        :config="config1"
        style="width: 460px; height: 350px"
      ></dvScrollRankingBoard>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-title">本月质检情况</div>
      <div class="right-bottom-canvas">
<!--        <canvas id="myCanvas"></canvas>-->
<!--        <div class="slot-title" v-show="false">{{ msg }}</div>-->
        <div id="m_chart"></div>
      </div>
      <div
        class="right-bottom-value"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="circle" :style="{ backgroundColor: item.Color }"></div>
        <div class="name">{{ item.Name }}</div>
        <div class="dataValue">{{ item.Value }}</div>
        <div class="percentage">{{ item.Percentage }}%</div>
        <div class="slot-title" v-show="false">{{ msg }}</div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import dvScrollRankingBoard from "./dvScrollRankingBoard.vue";
import CreateCircle from "./util/createCircle";
import * as echarts from "echarts";
export default {
  name: "main-right",
  components: {
    dvScrollRankingBoard,
  },
  data() {
    return {
      config1: {
        data: [],
      },
      msg: 20,
      dataList: [],
      list: [
        { c1: "#272d4b", c2: "#f45868", num: 2500 },
        { c1: "#272d4b", c2: "#edc240", num: 2500 },
        { c1: "#272d4b", c2: "#25a2f2", num: 2500 },
        { c1: "#272d4b", c2: "#00e3d5", num: 2500 },
      ],
      text1: "2302",
      text2: "电机出货",
      can: null,
    };
  },
  props: {
    RightDataList: {
      type: Object,
      default: {},
    },
  },
  created() {
    this.config1.data = this.RightDataList.Data7;
    if (this.config1.data) {
      this.config1.data.forEach((item, index) => {
        item.index = index;
      });
    }

    this.dataList = this.RightDataList.Data8;
  },
  activated() {
    // console.log("activated");
    this.changeData();
  },
  mounted() {
    this.can = new CreateCircle("myCanvas", 200, 200, 90, 20, 10000);
    this.can.drowCircle(this.list);
    this.creteText(this.dataList);
    this.changeData();
  },
  methods: {
    changeData() {
      this.timer = setInterval(() => {
        this.dataList = this.shuffle(this.dataList);
        console.log(this.dataList);

        this.msg = Math.random();
        this.creteText(this.dataList);
      }, 5000);
    },
    shuffle(array) {
      let str = "";
      str = array[0];
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i + 1];
      }
      array[array.length - 1] = str;
      return array;
    },

    creteText(e) {
      // this.can.creteText(
      //   {
      //     px: "33px",
      //     fontFamliy: "Medium",
      //     txt: e[0].Value,
      //     color: "#fff",
      //     offsetTop: 91,
      //   },
      //   {
      //     px: "16px",
      //     fontFamliy: "Regular",
      //     txt: e[0].Name,
      //     color: "#fff",
      //     offsetTop: 121,
      //   }
      // );
      let myChart = echarts.init(document.getElementById('m_chart'))
      console.log(myChart)
      myChart.setOption({
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.data-v-main-right {
  width: 460px;
  height: 100%;
  margin-right: 10px;
  .right-top {
    height: 418px;
    width: 100%;
    padding: 18px;
    background-color: #242947;
    margin-bottom: 10px;
    .right-top-title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
  .right-bottom {
    height: 535px;
    width: 100%;
    background-color: #242947;
    padding: 35px;
    .right-bottom-title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .right-bottom-canvas {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-bottom-value {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      margin-top: 25px;

      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 20px;
      }
      .name {
        width: 165px;
      }
      .dataValue {
        width: 50px;
      }
      .percentage {
        margin: 0 20px;
      }
    }
  }
}
#myCanvas {
  background-color: #242947;
  margin: 40px 0;
}
</style>
