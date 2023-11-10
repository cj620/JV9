<template>
  <div class="data-v-main-right">
    <div class="right-top">
      <div class="right-top-title">模具进度</div>
      <dvScrollRankingBoard
        :config="config1"
        style="width: 460px; height: 300px"
      ></dvScrollRankingBoard>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-title">本月质检情况</div>
      <div class="right-bottom-canvas">
<!--        <canvas id="myCanvas"></canvas>-->
<!--        <div class="slot-title" v-show="false">{{ msg }}</div>-->
        <div id="m_chart"  style="height:100%;width: 100%"></div>
      </div>
      <div
        class="right-bottom-value"
        v-for="(item, index) in dataList1"
        :key="index"
      >
        <div class="circle" :style="{ backgroundColor: '#e54e64' }"></div>
        <div class="name">{{ item.Name }}</div>
        <div class="dataValue">{{ item.Value }}</div>
        <div class="percentage">{{ item.Percentage }}%</div>
      </div>
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
      dataList1: [],
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
    this.dataList1 = this.RightDataList.Data9;
  },
  activated() {
    // console.log("activated");
    this.changeData();
  },
  mounted() {
    // this.can = new CreateCircle("myCanvas", 200, 200, 90, 20, 10000);
    // this.can.drowCircle(this.list);
    // this.changeData();
    this.creteText(this.dataList)
  },
  methods: {
    changeData() {
      this.timer = setInterval(() => {
        this.dataList = this.shuffle(this.dataList);

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
      let arr = e.map(item => {
        return {
          name: this.$t(`quality.Qc_${item.Name}`) ,
          value: item.Value
        }
      })
      let myChart = echarts.init(document.getElementById('m_chart'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        color: ['#19d4ae','#fa6e86'],
        series: [
          {
            label: {
              textBorderColor: 'red',
              color: '#fff',
            },
            name: this.$t('DataV.Da_PassRate'),
            type: 'pie',
            radius: ['50%', '70%'],
            data: arr,
          }
        ]
      })
      myChart.resize() // 图表自适应
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
    height: 360px;
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
    height: 590px;
    width: 100%;
    background-color: #242947;
    padding: 35px;
    padding-top: 10px;
    .right-bottom-title {
      font-size: 20px;
      font-weight: 500;
    }
    .right-bottom-canvas {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 350px;
    }
    .right-bottom-value {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      margin-top: 20px;

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
        margin-right: 20px;
      }
      .percentage {
        //margin: 0 20px;
      }
    }
  }
}
#myCanvas {
  background-color: #242947;
  margin: 40px 0;
}
</style>
