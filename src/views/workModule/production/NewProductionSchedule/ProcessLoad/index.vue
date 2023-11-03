<template>
  <PageWrapper :footer="false">
    <div class="wrapper-top">
      <div class="wrapper-top-left">
        <JvTable
          ref="leftTable"
          :table-obj="leftTableObj"
          @row-click="clickToDetail"
        >

        </JvTable>
      </div>
      <div class="wrapper-top-right">
        <JvTable ref="rightTable" :table-obj="rightTableObj">

        </JvTable>
      </div>
    </div>
    <div class="wrapper-bottom">
      <JvTable ref="bottomTable" :table-obj="bottomTableObj">

      </JvTable>
    </div>
  </PageWrapper>
</template>

<script>
import { leftTable, rightTable, bottomTable } from "./config"
import { aps_result_process_load } from "@/api/workApi/production/aps"
import {loading} from "@jiaminghi/data-view";
export default {
  name: "index",
  data(){
    return {
      leftTableObj: "",
      rightTableObj: "",
      bottomTableObj: "",
    }
  },
  created() {
    this.leftTableObj = new leftTable()
    this.rightTableObj = new rightTable()
    this.bottomTableObj = new bottomTable()
    aps_result_process_load({CurrentPage:1,PageSize:50}).then((res) => {
      this.leftTableObj.setData(res.Items)
      this.rightTableObj.setData(res.Items[0].Devices)
      this.bottomTableObj.setData(res.Items[0].ApsResultItems)
    })
  },
  methods: {
    loading,
    clickToDetail(e){
      this.rightTableObj.setData(e.Devices)
      this.bottomTableObj.setData(e.ApsResultItems)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper-top {
  height: 49%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-left,&-right {
    height: 100%;
    width: 49.5%;
    background-color: white;
  }
}
.wrapper-bottom {
  height:49%;
  width: 100%;
  margin-top: 1%;
  background-color: white;
}
::v-deep .table-wrapper{
  height: calc(100% - 20px) !important;
  padding-top: 12px !important;
}
</style>
