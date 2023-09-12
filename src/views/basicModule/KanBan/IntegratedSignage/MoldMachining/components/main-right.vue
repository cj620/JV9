<template>
  <div class="data-v-main-right">
    <div class="right-top">
      <div class="right-top-title">项目进度展示</div>
      <dvScrollRankingBoard
        :config="config1"
        style="width: 782px; height: 700px"
      ></dvScrollRankingBoard>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-title">本月累计出货情况</div>
      <div class="right-bottom-canvas">
        <canvas id="myCanvas"></canvas>
        <div class="slot-title" v-show="false">{{ msg }}</div>
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
    this.can = new CreateCircle("myCanvas", 400, 400, 180, 40, 10000);
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
      this.can.creteText(
        {
          px: "66px",
          fontFamliy: "Medium",
          txt: e[0].Value,
          color: "#fff",
          offsetTop: 183,
        },
        {
          px: "34px",
          fontFamliy: "Regular",
          txt: e[0].Name,
          color: "#fff",
          offsetTop: 243,
        }
      );
      console.log( this.can);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-v-main-right {
  width: 795px;
  height: 100%;

  .right-top {
    height: 836px;
    width: 100%;
    padding: 36px;
    background-color: #242947;
    margin-bottom: 22px;
    .right-top-title {
      font-size: 40px;
      font-weight: 500;
      margin-bottom: 22px;
    }
  }
  .right-bottom {
    height: 1070px;
    width: 100%;
    background-color: #242947;
    padding: 35px;
    .right-bottom-title {
      font-size: 40px;
      font-weight: 500;
      margin-bottom: 22px;
    }
    .right-bottom-canvas {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-bottom-value {
      display: flex;
      align-items: center;
      font-size: 32px;
      font-weight: 400;
      margin-top: 50px;

      .circle {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 0 40px;
      }
      .name {
        width: 330px;
      }
      .dataValue {
        width: 100px;
      }
      .percentage {
        margin: 0 40px;
      }
    }
  }
}
#myCanvas {
  background-color: #242947;
  margin: 80px 0;
}
</style>
