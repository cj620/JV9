<template>
  <dv-full-screen-container>
    <div class="integrate-signage">
      <!-- 标题 -->
      <div class="integrate-signage-header">
        <div class="integrate-signage-header-left"></div>
        <div class="integrate-signage-header-center">
          {{$t('DataV.Da_DataBoard')}}
        </div>
        <div class="integrate-signage-header-right"></div>
      </div>
      <el-carousel trigger="click" height="calc(90vh - 60px)" :interval="100000">
        <el-carousel-item>
          <div class="integrate-signage-content">
            <div
              class="dataV-item"
              v-for="(item, i) in dataVList.slice(0,6)" :key="i" @click="goKanban(item.url)">
              <dv-border-box-11 :title="item.title">
                <el-image v-if="item.imgUrl" :src="item.imgUrl"></el-image>
              </dv-border-box-11>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="integrate-signage-content">
            <div
              class="dataV-item"
              v-for="(item, i) in dataVList.slice(6)" :key="i" @click="goKanban(item.url)">
              <dv-border-box-11 :title="item.title">
                <el-image v-if="item.imgUrl" :src="item.imgUrl"></el-image>
              </dv-border-box-11>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

    </div>
  </dv-full-screen-container>
</template>

<script>
export default {
  name: "Se_MoldProgressKanban",
  data() {
    return {
      dataVList: [
        {title: i18n.t("DataV.Da_EquipmentSignage"), imgUrl: require('./EquipmentSignage.png'), url: '/EquipmentSignage'},
        {title: i18n.t("DataV.Da_DepartmentSignage"), imgUrl: require('./TaskStatus.png'), url: '/TaskStatusSignage'},
        {title: i18n.t("DataV.Da_NCDepartmentSignboard"), imgUrl: require('./NC.jpg'), url: '/DepartmentSignboard'},
        {title: i18n.t("DataV.Da_SaleSignage"), imgUrl: require('./SaleSignage.png'), url: '/SaleSignage'},
        {title: i18n.t("DataV.Da_MoldMachiningSignage"), imgUrl: require('./muju.jpg'),url: '/MoldMachining'},
        {title: i18n.t("DataV.Da_QualitySignage"), imgUrl: require('./QualitySignage.png'), url: '/QualitySignage'},
        {title: i18n.t("DataV.Da_EquipmentStateSignage"), imgUrl: require('./EquipmentOperation.jpg'), url: '/EquipmentOperation'},
      ]
    }
  },
  methods: {
    goKanban(url) {
      console.log(url)
      this.$router.push({path: url})
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
      width: 610px;
      height: 400px;
      margin-right: 15px;
      margin-left: 15px;
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
