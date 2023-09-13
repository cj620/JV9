<template>
  <dv-full-screen-container>
    <div class="Quality-signage">
      <!--页面头部-->
      <div class="Quality-signage-header">
        <div class="Quality-signage-header-left">
          logo
        </div>
        <div class="Quality-signage-header-center">
          品质部门看板
        </div>
        <div class="Quality-signage-header-right">
          <formatted-time/>
        </div>
      </div>
      <!-- 页面主体 -->
      <div class="Quality-signage-content">
        <!-- 数据 -->
        <div class="Quality-signage-content-top">
          <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 360px" v-for="(item) in qualityData" :key="item.title">
            <div class="border-box-7-content">
              <div class="border-box-7-content-top">{{ item.title }}</div>
              <div class="border-box-7-content-bottom">{{ item.data }}</div>
            </div>
          </dv-border-box-7>
        </div>
        <!-- 图表 -->
        <div class="Quality-signage-content-body">
          <div class="Quality-signage-content-body-item"></div>
          <div class="Quality-signage-content-body-item"></div>
          <div class="Quality-signage-content-body-item"></div>
        </div>
        <div class="Quality-signage-content-body">
          <div class="Quality-signage-content-body-item"></div>
          <div class="Quality-signage-content-body-item"></div>
          <div class="Quality-signage-content-body-item"></div>
        </div>
      </div>
    </div>
    <d-loading v-show="loading" />
  </dv-full-screen-container>
</template>
<script>
import dLoading from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/d-loading.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";

export default {
  name: "QualitySignage",
  components: {
    FormattedTime,
    dLoading,
  },
  data(){
    return{
      loading: false,
      qualityData:[]
    }
  },
  created() {
    setTimeout(() => {
      this.qualityData = [
        { title:'送检总数', data: 3423},
        { title:'已检验数', data: 1233},
        { title:'本月NG数', data: 876},
        { title:'不良率', data: '3.6%' },
        { title:'返工率', data: '2%'},
      ]
    })
  }
}
</script>
<style scoped lang="scss">
.Quality-signage {
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
    background: url("../EquipmentSignage/3.svg") no-repeat;
    background-size: cover;

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
      line-height: 80px;
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
    height: calc(100% - 90px);
    padding: 0 20px;
    overflow: hidden;
    &-top {
      margin-top: 10px;
      height: 120px;
      display: flex;
      justify-content: space-between;
    }
    &-body {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      &-item {
        height: 400px;
        width: 615px;
        background-color: #242d48;
      }
    }
  }
}
.border-box-7-content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  &-top {
    width: 100%;
    height: 50%;
    color: #eaeaea;
    font-weight: bold;
    text-align: center;
    line-height: 59px;
    font-size: 20px;
  }
  &-bottom {
    width: 100%;
    height: 50%;
    color: #00E7FF;
    text-align: center;
    font-size: 30px;
  }
}
</style>
