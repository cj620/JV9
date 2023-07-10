<template>
  <div class="ChildContent">
    <el-row>
      <el-col>
        <div class="ChildContent-main left" style="display: flex">
          <div class="ChildContent-main-nav left-container">
            <img
              :src="transferData.ImgUrl"
              style="width: 150px; height: 150px"
              alt=""
            />
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              position: relative;
            "
          >

            <div class="ChildContent-main-header left-Right">
              <span>
                {{ transferData.EquipmentId }}
              </span>
              <span v-if="transferData.Personnel">
                ({{ transferData.Personnel }})</span
              >
            </div>

            <div class="ChildContent-main-nav left-footer">
              <span>
                {{ transferData.MakInfo }}
              </span>
            </div>
          </div>
        </div>

        <div class="ChildContent-main right">
          <div class="ChildContent-main-nav right-center">
            <div class="ChildContent-main-nav right-top">
              <span>OEE</span>
            </div>

            <div class="Columnar1">
              <div
                class="Columnar-top1"
                :style="{ width: transferData.Activation * 1.5 + 'px' }"
              ></div>
            </div>

            <div>{{ transferData.Activation }}%</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  created() {
    console.log(this.transferData, 648951);
  },
  props: {
    transferData: Object,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.ChildContent {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 12px;

  .left-container {
    text-align: center;
  }

  .left-header {
    // margin: 10px 10px 0 10px;
    // display: flex;
    // justify-content: flex-end;
    // width: 100%;
    position: absolute;
    top: 0;
    right: 0px;
    // .ChildContent-main-header {
    //   display: inline-block;
    //   font-size: 0;
    // }

    .left-Left {
      font-size: 12px;
      width: 20px;
      height: 20px;
      background-color: #66ff00;
      border-radius: 10px;
    }

    .left-State {
      font-size: 12px;
      width: 20px;
      height: 20px;
      background-color: #ff3300;
      border-radius: 10px;
    }
  }
  .left-Right {
    span {
      display: block;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    width: 100%;
  }

  .left-footer {
    text-align: center;
  }

  .ChildContent-main {
    width: 100%;
    height: 100%;

    .right-center {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .Columnar1 {
        height: 20px;
        background-color: #a8b4c1;
        width: 70%;
        display: flex;
        // flex-direction: column-reverse;

        .Columnar-top1 {
          width: 100%;
          background-color: #3a7dd5;
        }
      }
    }

    .right-top {
      width: 20px;
      // height: 20px;
    }
  }
}
</style>
