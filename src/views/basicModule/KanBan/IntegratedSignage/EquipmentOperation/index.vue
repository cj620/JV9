<template>
  <dv-full-screen-container>
    <div class="Equipment-signage">
      <div class="Equipment-signage-header">
        <div class="Equipment-signage-header-left">
          <img src="../logo.png" alt="" />
        </div>
        <div class="Equipment-signage-header-center">
          {{ $t("DataV.Da_EquipmentSignage") }}
        </div>
        <div class="Equipment-signage-header-right">
          <div
            style="
              margin-right: 10px;
              position: absolute;
              bottom: 5px;
              left: 10px;
              cursor: pointer;
            "
          >
            <el-dropdown @command="handleCommand">
              <i
                class="el-icon-setting"
                style="font-size: 30px; color: #fff"
              ></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="item in commadList"
                  :key="item"
                  ><div style="padding: 0 10px">
                    {{ item }}
                  </div></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div style="margin-right: 20px"><formatted-time /></div>
        </div>
      </div>
      <el-carousel
        trigger="click"
        height="990px"
        :interval="100000"
        v-if="resize"
      >
        <el-carousel-item v-for="(term, t) in resultList" :key="t">
          <div class="Equipment-signage-content">
            <div
              v-for="item in term"
              :key="item"
              class="Equipment-signage-content-item"
              :style="{ width: `calc(${100 / col}% - 10px)` }"
            >
              <dv-border-box-7>
                <div class="Equipment-signage-content-item-header">
                  <div
                    class="Equipment-signage-content-item-header-state"
                  ></div>
                  <div class="Equipment-signage-content-item-header-title">
                    {{ item.DeviceNo }}
                  </div>
                </div>
                <div class="Equipment-signage-content-item-content">
                  <div class="Equipment-signage-content-item-content-left">
                    <div
                      class="Equipment-signage-content-item-content-left-img"
                    >
                      <div class="image-box">
                        <CImage :src="item.PhotoUrl"></CImage>
                      </div>
                    </div>
                    <div
                      class="Equipment-signage-content-item-content-left-device"
                    >
                      {{ item.Device }}
                    </div>
                  </div>
                  <div class="Equipment-signage-content-item-content-right">
                    <div>66%</div>
                    <div
                      class="Equipment-signage-content-item-content-right-progress-box"
                    >
                      <div
                        class="Equipment-signage-content-item-content-right-progress"
                        :style="{ height: 66+'%' }"
                      ></div>
                    </div>
                    <div>CEE</div>
                  </div>
                </div>
              </dv-border-box-7>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </dv-full-screen-container>
</template>

<script>
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import CImage from "@/components/CImage/index.vue";
import { production_device_list } from "@/api/workApi/production/baseData";

export default {
  name: "index",
  components: { FormattedTime, CImage },
  data() {
    return {
      col: 6,
      total: 100,
      list: [],
      resultList: [],
      resize: true,
      commadList: [3, 4, 5, 6, 7],
    };
  },
  created() {
    this.getDeviceList();
  },
  watch: {
    col(val) {
      if (val >= 3 && val <= 7) {
        this.resultList = [];
        this.computedList();
        this.resize = false;
        setTimeout(() => {
          this.resize = true;
        }, 10);
      }
    },
  },
  methods: {
    handleCommand(command) {
      this.col = command;
    },
    getDeviceList() {
      production_device_list({
        CurrentPage: 1,
        PageSize: 9999,
      }).then((res) => {
        this.list = res.Items;
        this.total = res.Count;
        this.computedList();
      });
    },
    computedList() {
      let num = 0;
      if (this.total % (this.col * 4)) {
        num = Math.floor(this.total / (this.col * 4)) + 1;
        this.setResultList(num);
      } else {
        num = this.total / (this.col * 4);
        this.setResultList(num);
      }
    },
    setResultList(num) {
      for (let i = 0; i < num; i++) {
        this.resultList.push(
          this.list.slice(i * (this.col * 4), (i + 1) * (this.col * 4))
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.Equipment-signage {
  width: 100%;
  height: 100%;
  background: #0b0f28;
  overflow: hidden;
  &-header {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: url("../bg5.png") no-repeat;
    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &-center {
      font-size: 30px;
      color: #fff;
      height: 100%;
      line-height: 60px;
      z-index: 1;
    }
    &-left {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 220px;
      position: relative;
      img {
        width: 160px;
        position: absolute;
        bottom: -4px;
      }
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 220px;
      justify-content: flex-end;
      position: relative;
    }
  }
  &-content {
    width: 100%;
    //height: 100%;
    display: flex;
    flex-wrap: wrap;
    //padding-bottom: 1%;
    padding-left: 5px;
    padding-right: 10px;
    &-item {
      height: 234px;
      margin-right: 5px;
      margin-left: 5px;
      color: #fff;
      margin-bottom: 10px;
      &-header {
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        &-state {
          height: 30px;
          width: 30px;
          top: 10px;
          left: 10px;
          background: #2ee438;
          position: absolute;
          border-radius: 50%;
        }
      }
      &-content {
        height: calc(100% - 40px);
        display: flex;
        &-left {
          height: 100%;
          width: calc(100% - 50px);
          &-img {
            height: calc(100% - 30px);
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .image-box {
              //width: 90%;
              min-width: 150px;
              height: 90%;
            }
          }
          &-device {
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
        }
        &-right {
          width: 50px;
          display: flex;
          justify-content: space-between;
          height: 100%;
          flex-direction: column;
          &-progress-box {
            width: 30px;
            height: 75%;
            background: #a8b4c1;
            display: flex;
            align-items: flex-end;
          }
          &-progress {
            width: 30px;
            background: #3a7dd5;
          }
        }
      }
    }
  }
}
</style>
