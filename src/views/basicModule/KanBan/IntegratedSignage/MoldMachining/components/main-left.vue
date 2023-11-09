<template>
  <div class="data-v-main-left">
    <div class="left-top">
      <div class="left-top-title">
        {{ $t("Mold.Mo_ExpectedDepartmentOEEThisMonth") }}
      </div>
      <div class="left-top-center">
        <div class="left-top-center-left">
          <conic-press
            :config="{
              showEyes: true,
              startColor: '#313956',
              circleColor: '#00e3d5',
              endColor: '#00e3d5',
            }"
            :rate="Number(dataListObject1.Obj.Value)"
          >
            <div class="slot-bg">
              <div class="slot-process">{{ dataListObject1.Obj.Value }}%</div>
              <div class="slot-title">{{ dataListObject1.Obj.Name }}</div>
<!--              <div v-show="false" class="slot-title">{{ msg }}</div>-->
            </div>
          </conic-press>
        </div>
        <div>
          <div
            v-for="(item, index) in dataListObject1.Arr"
            :key="index"
            class="left-top-center-right"
          >
            <div class="left-top-center-right-circle"></div>
            <div class="left-top-center-right-dept">{{ item.Name }}</div>
            <div>{{ item.Value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="left-center">
      <div class="left-center-title">
        {{ $t("Mold.Mo_DepartmentOEEThisMonth") }}
      </div>
      <div class="left-center-center">
        <div class="left-center-center-left">
          <conic-press
            :config="{
              showEyes: true,
              startColor: '#313956',
              circleColor: '#31b5ff',
              endColor: '#31b5ff',
            }"
            :rate="Number(dataListObject2.Obj.Value)"
          >
            <div class="slot-bg">
              <div class="slot-process">{{ dataListObject2.Obj.Value }}%</div>
              <div class="slot-title">{{ dataListObject2.Obj.Name }}</div>
            </div>
          </conic-press>
        </div>
        <div>
          <div
            v-for="(item, index) in dataListObject2.Arr"
            :key="index"
            class="left-center-center-right"
          >
            <div class="left-center-center-right-circle"></div>
            <div class="left-center-center-right-dept">{{ item.Name }}</div>
            <div>{{ item.Value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="left-bottom">
      <div class="left-bottom-title">{{ QualityTitle }}</div>
      <div
        id="myMiddleChart"
        :style="{ width: '440px', height: '360px' }"
      ></div>
      <div v-show="false" class="slot-title">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import conicPress from "./conic-process.vue";
import * as echarts from "echarts";

export default {
  name: "main-left",
  data() {
    return {
      dataList1: [],
      dataListObject1: {
        Obj: {
          Value: '',
          Name: '',
        }
      },
      dataList2: [],
      dataList3: [],
      dataListObject2: {
        Obj: {
          Value: '',
          Name: '',
        }
      },
      DateTime: [],
      Data1: [],
      Data2: [],
      middleChartExtend: {},
      msg: 20,
      QualityTitle: "",
      myMiddleChartObj: null, //图表对象
    };
  },
  props: {
    LeftDataList: {
      type: Object,
      default: {},
    },
  },
  components: {
    conicPress,
  },
  created() {
    this.dataList1 = this.LeftDataList.Data1;
    this.dataList2 = this.LeftDataList.Data2;
    this.dataList3 = this.LeftDataList.Data3;

    /*
        this.QualityTitle = this.LeftDataList.Data3[0].Title
    */

    this.changeData1(this.dataList1);
    this.changeData2(this.dataList2);
    this.changeData3(this.dataList3);
    /*
        this.LeftDataList=this.LeftDataList.data1
    */
  },
  mounted() {
    this.drawMiddleChart();
    this.changeData();
  },
  activated() {
    this.changeData();
  },
  methods: {
    changeData() {
      this.timer = setInterval(() => {
        this.dataList1 = this.shuffle(this.dataList1);
        this.dataList2 = this.shuffle(this.dataList2);
        this.dataList3 = this.shuffle(this.dataList3);
        this.changeData1(this.dataList1);
        this.changeData2(this.dataList2);
        this.changeData3(this.dataList3);
      }, 5000);
    },
    changeData1(arr) {
      this.dataListObject1.Obj.Value = arr[0].Value;
      this.dataListObject1.Obj.Name = arr[0].Name;
      this.dataListObject1.Arr = arr.slice(1);
      // this.msg = Math.random();
    },
    changeData2(arr) {
      this.dataListObject2.Obj.Value = arr[0].Value;
      this.dataListObject2.Obj.Name = arr[0].Name;
      this.dataListObject2.Arr = arr.slice(1);
    },
    changeData3(arr) {
      // this.DateTime = arr[0].Date;
      // this.Data1 = arr[0].Data[0];
      // this.Data2 = arr[0].Data[1];
      // this.QualityTitle = arr[0].Title;
      this.init();
      // this.drawMiddleChart();
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
    init() {
      this.middleChartExtend = {
        title: {
          text: this.$t('Mold.Mo_DailyPartsQualifiedRate')
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '6%',
          top: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
    },
    drawMiddleChart() {
      //绘制图表方法
      this.myMiddleChartObj = echarts.init(
        document.getElementById("myMiddleChart")
      );
      //将图表配置项赋给图表,true参数表示不和之前的数据合并
      this.myMiddleChartObj.setOption(this.middleChartExtend, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-v-main-left {
  width: 460px;
  height: 100%;
  padding-left: 11px;

  .left-top {
    width: 100%;
    height: 280px;
    background-color: #242947;
    padding: 15px;

    .left-top-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 29px;
    }

    .left-top-center {
      display: flex;

      .left-top-center-left {
        width: 165px;
        height: 165px;
        box-sizing: border-box;
        margin-right: 50px;

        .slot-bg {
          color: #00e3d5;
          text-align: center;

          .slot-process {
            font-size: 33px;
            font-weight: 500;
          }

          .slot-title {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .left-top-center-right {
        margin-bottom: 17px;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        align-items: center;

        .left-top-center-right-circle {
          width: 9px;
          height: 9px;
          background-color: #00e3d5;
          border-radius: 50%;
          margin-right: 30px;
        }

        .left-top-center-right-dept {
          width: 140px;
        }
      }
    }
  }

  .left-center {
    width: 100%;
    height: 280px;
    background-color: #242947;
    padding: 15px;
    margin: 20px 0;

    .left-center-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 29px;
    }

    .left-center-center {
      display: flex;

      .left-center-center-left {
        width: 165px;
        height: 165px;
        box-sizing: border-box;
        margin-right: 50px;

        .slot-bg {
          color: #31b5ff;
          text-align: center;

          .slot-process {
            font-size: 33px;
            font-weight: 500;
          }

          .slot-title {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .left-center-center-right {
        margin-bottom: 17px;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        align-items: center;

        .left-center-center-right-circle {
          width: 9px;
          height: 9px;
          background-color: #31b5ff;
          border-radius: 50%;
          margin-right: 30px;
        }

        .left-center-center-right-dept {
          width: 140px;
        }
      }
    }
  }

  .left-bottom {
    height: 360px;
    background-color: #242947;
    padding: 15px;

    .left-bottom-title {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>
