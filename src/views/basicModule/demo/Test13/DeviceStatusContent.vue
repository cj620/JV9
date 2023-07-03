<template>
  <div class="ChildContent">
    <el-row>
      <el-col :span="20">
        <div class="ChildContent-main left">
          <div class="ChildContent-main-nav left-header">
            <div
              v-if="transferData.State === 'Runing'"
              class="ChildContent-main-header left-Left"
            ></div>
            <div v-else class="ChildContent-main-header left-State"></div>
            <div class="ChildContent-main-header left-Right">
              <span>
                {{ transferData.EquipmentId }}
              </span>
              <span v-if="transferData.Personnel">
                ({{ transferData.Personnel }})</span
              >
            </div>
          </div>
          <div class="ChildContent-main-nav left-container">
            <img
              :src="transferData.ImgUrl"
              style="width: 150px;height: 150px"
              alt=""
            />
          </div>
          <div class="ChildContent-main-nav left-footer">
            <span>
              {{ transferData.MakInfo }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ChildContent-main right">
          <div class="ChildContent-main-nav right-center">
            <div style="margin-top: 10px">{{ transferData.Activation }}%</div>
            <div class="Columnar1">
              <div
                class="Columnar-top1"
                :style="{ height: transferData.Activation * 1.5 + 'px' }"
              ></div>
            </div>
          </div>
          <div class="ChildContent-main-nav right-top">
            <span>OEE</span>
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
    transferData: Object
  }
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
  color: #a8b4c1;
  font-size: 12px;
  .left-container {
    text-align: center;
  }
  .left-header {
    margin: 10px 10px 0 10px;

    .ChildContent-main-header {
      display: inline-block;
      font-size: 0;
    }
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
    .left-Right {
      span {
        display: block;
        text-align: center;
        font-size: 16px;
      }
      width: 80%;

      font-size: 12px;
    }
  }
  .left-footer {
    text-align: center;
  }
  .ChildContent-main {
    width: 100%;
    height: 100%;
    .right-center {
      margin-top: 10px;

      .Columnar1 {
        width: 20px;
        background-color: #a8b4c1;
        height: 150px;
        display: flex;
        flex-direction: column-reverse;

        .Columnar-top1 {
          width: 100%;
          background-color: #3a7dd5;
        }
      }
    }
    .right-top {
      width: 20px;
      height: 10%;
    }
  }
}
</style>
