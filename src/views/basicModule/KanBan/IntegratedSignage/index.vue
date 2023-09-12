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
          v-for="(item, i) in dataVList" :key="i" @click="goKanban(item.url)">
          <dv-border-box-11 :title="item.title">
            <el-image v-if="item.imgUrl" :src="item.imgUrl"></el-image>
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
        {title: '设备看板', imgUrl: require('./yxhyXoCFs7.png'), url: '/EquipmentSignage'},
        {title: '部门综合看板', imgUrl: require('./TaskStatus.png'), url: '/TaskStatusSignage'},
		  {title: 'NC部门看板', imgUrl: require('./NC.jpg'), url: '/DepartmentSignboard'},
        {title: '销售大数据看板', imgUrl: require('./saleSignage.png'), url: '/SaleSignage'},
        {title: '看板5'},
        {title: '看板6'},
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
