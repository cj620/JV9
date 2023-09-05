<template>
  <dv-full-screen-container>
    <div class="integrate-signage">
      <!-- 标题 -->
      <div class="integrate-signage-header">
        <div class="integrate-signage-header-left"></div>
        <div class="integrate-signage-header-center">
          {{$t('DataV.Da_IntegratedSignage')}}
        </div>
        <div class="integrate-signage-header-right"></div>
      </div>
      <div class="integrate-signage-content">
        <div
          class="dataV-item"
          v-for="(item, i) in dataVList" :key="i">
          <dv-border-box-11 :title="item.title">
            <el-image v-if="item.url" :src="item.url"></el-image>
          </dv-border-box-11>
        </div>
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script>
export default {
  name: "Se_MoldProgressKanban",
  data() {
    return {
      dataVList: [
        {title: '设备看板', url: require('./yxhyXoCFs7.png')},
        {title: '看板2'},
        {title: '看板3'},
        {title: '看板4'},
        {title: '看板5'},
        {title: '看板6'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.integrate-signage{
  width: 100%;
  height: 100%;
  background: #0c0936;
  overflow: hidden;
  &-header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    &-center{
      color: #fff;
      font-size: 30px;
    }
  }
  &-content{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .dataV-item{
      width: 30vw;
      height: 450px;
      margin-right: 1.6vw;
      margin-left: 1.6vw;
      margin-bottom: 20px;
      cursor: pointer;
      .el-image{
        margin-top: 50px;
        margin-left: 10px;
        width:  calc(100% - 24px);
        height: calc(100% - 74px);
      }
    }
  }
}
</style>
