<template>
  <PageWrapper :footer="false">
    <div class="mold-list">
      <JvTable :table-obj="tableObj">
<!--        <template #PhotoUrl="{ record }">-->
<!--          <el-image :src="imgUrlPlugin(record)">-->

<!--          </el-image>-->
<!--        </template>-->
      </JvTable>
    </div>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import ColProgress from "./cpns/ColProgress";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import {delCpn, setCpn} from "~/maps";
export default {
  name: "Pm_ProjectMoldList",
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    setCpn("ColProgress", ColProgress);
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  beforeDestroy() {
    delCpn("ColProgress");
  },
  methods: {
    imgUrlPlugin,
  }
};
</script>

<style scoped lang="scss">
.mold-list {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
