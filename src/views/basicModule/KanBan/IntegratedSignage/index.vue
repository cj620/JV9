<template>
  <dv-full-screen-container style="width: 100vw; height: 100vh">
    <div class="integrate-signage">
      <!-- 标题 -->
      <div class="integrate-signage-header">
        <div class="integrate-signage-header-left"></div>
        <div class="integrate-signage-header-center">
          {{ $t("DataV.Da_DataBoard") }}
        </div>
        <div class="integrate-signage-header-right"></div>
      </div>
      <el-carousel trigger="click" height="920px" :interval="100000">
        <el-carousel-item>
          <div class="integrate-signage-content">
            <div
              class="dataV-item"
              v-for="(item, i) in DataList.slice(0, 6)"
              :key="i"
              @click="goKanban(item.url)"
            >
              <dv-border-box-11 :title="item.title">
                <el-image v-if="item.imgUrl" :src="item.imgUrl"></el-image>
              </dv-border-box-11>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item v-if="DataList.length>6">
          <div class="integrate-signage-content">
            <div
              class="dataV-item"
              v-for="(item, i) in DataList.slice(6)"
              :key="i"
              @click="goKanban(item.url)"
            >
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
import { mapMutations } from "vuex";
import { getConfigKey } from '@/api/basicApi/systemSettings/sysSettings'
export default {
  name: "Se_MoldProgressKanban",
  data() {
    return {
      dataVList: [
        // 设备
        {
          title: i18n.t("DataV.Da_EquipmentSignage"),
          imgUrl: require("./EquipmentSignage.png"),
          url: "/EquipmentSignage",
        },
        {
          title: i18n.t("DataV.Da_DepartmentSignage"),
          imgUrl: require("./TaskStatus.png"),
          url: "/TaskStatusSignage",
        },
        // NC部门
        {
          title: i18n.t("DataV.Da_NCDepartmentSignboard"),
          imgUrl: require("./NC.jpg"),
          url: "/DepartmentSignboard",
        },
        {
          title: i18n.t("DataV.Da_SaleSignage"),
          imgUrl: require("./SaleSignage.png"),
          url: "/SaleSignage",
        },
        // 产品综合
        {
          title: i18n.t("DataV.Da_MoldMachiningSignage"),
          imgUrl: require("./muju.jpg"),
          url: "/MoldMachining",
        },
        {
          title: i18n.t("DataV.Da_QualitySignage"),
          imgUrl: require("./QualitySignage.png"),
          url: "/QualitySignage",
        },
        {
          title: i18n.t("DataV.Da_EquipmentStateSignage"),
          imgUrl: require("./EquipmentOperation.jpg"),
          url: "/EquipmentOperation",
        },
      ],
      DataList:[]
    };
  },
  created() {
    this.GetConfigData()
  },
  methods: {
    ...mapMutations("dashboard", ["setCurrentPath"]),
   async GetConfigData(){
      await  getConfigKey({ConfigKey:'DefaultDisplayDashboard'}).then(res=>{
        if(JSON.parse(res.ConfigValue).length>0){
          const arr =[]
          this.dataVList.forEach(item=>{
            JSON.parse(res.ConfigValue).forEach(TItem=>{
              if(item.url===TItem){
                arr.push(item)

              }
            })

          })
          this.DataList=arr
          console.log(this.DataList)
        }else {
          this.DataList=this.dataVList
        }


      }).catch(err=>{
        this.DataList=this.dataVList
      })
    },
    goKanban(url) {
      console.log(url);
      this.setCurrentPath(url);
      this.$router.push({ path: url });
    },
  },
};
</script>

<style scoped lang="scss">
.integrate-signage {
  width: 100%;
  height: 100%;
  background: #0c0936;
  overflow: hidden;
  &-header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    &-center {
      color: #fff;
      font-size: 30px;
    }
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    padding-left: 3%;
    .dataV-item {
      height: 46%;
      width: 30%;
      margin-top: 2%;
      margin-right: 3%;
      cursor: pointer;
      .el-image {
        margin-top: 50px;
        margin-left: 10px;
        width: calc(100% - 24px);
        height: calc(100% - 74px);
      }
    }
  }
}
</style>
