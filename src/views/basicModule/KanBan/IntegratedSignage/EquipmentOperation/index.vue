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
          <formatted-time />
        </div>
      </div>
        <el-carousel trigger="click" height="990px" :interval="100000">
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
                      <div class="Equipment-signage-content-item-header-state"></div>
                      <div class="Equipment-signage-content-item-header-title">CNC{{item}}</div>
                    </div>
                    <div class="Equipment-signage-content-item-content">
                      <div class="Equipment-signage-content-item-content-left">
                        <div class="Equipment-signage-content-item-content-left-img">
                          <img src="../muju.jpg" alt="">
                        </div>
                        <div class="Equipment-signage-content-item-content-left-device">
                          YZ2023{{item}}
                        </div>
                      </div>
                      <div class="Equipment-signage-content-item-content-right"></div>
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

export default {
  name: "index",
  components: { FormattedTime },
  data() {
    return {
      col: 6,
      total: 100,
      list: [],
      resultList: [],
    };
  },
  created() {
    for(let i = 0; i < this.total; i++) {
      this.list.push(i)
    }
    this.computedList();
  },
  methods: {
    computedList() {
      let num = 0;
      if(this.total % (this.col * 4)) {
        num = Math.floor(this.total / (this.col * 4)) + 1;
        this.setResultList(num);
      } else {
        num = this.total / (this.col * 4)
        this.setResultList(num);
      }
    },
    setResultList(num) {
      for(let i = 0; i < num; i++) {
        this.resultList.push(this.list.slice(i * (this.col * 4), (i+1) * (this.col * 4)))
      }
    }
  }
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
      width: 200px;
      position: relative;
      img {
        width: 80%;
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
      width: 200px;
      justify-content: center;
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
      &-header{
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        &-state{
          height: 30px;
          width: 30px;
          top: 5px;
          left: 10px;
          background: #2ee438;
          position: absolute;
          border-radius: 50%;
        }
      }
      &-content{
        height: calc(100% - 40px);
        display: flex;
        &-left{
          height: 100%;
          width: calc(100% - 40px);
          &-img{
            height: calc(100% - 30px);
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              //width: 90%;
              height: 90%;
            }
          }
          &-device{
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
        }
        &-right{
          width: 40px;
        }
      }
    }
  }
}
</style>
