<template>
  <PageWrapper :footer="false">
    <div class="mold-list">
      <JvTable :table-obj="tableObj">
        <template #operation="{ row }">
          <TableAction :actions="[
          {
              label: $t('Generality.Ge_Schedule'),
              confirm: toProjectProcess.bind(null, row),
            },
            {
              label: $t('project.Pro_Cost'),
              confirm: toProjrctCost.bind(null, row, false),
            }
          ]" />
        </template>
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
    // 跳转项目进度
    toProjectProcess(row) {
      console.log(row);
      this.$router.push({
        name: "ProjectManage_process_people",
        query: { Project: row.Project, ToolingNo: row.Id },
      });
    },
    toProjrctCost(row, flag) {
      this.$router.push({
        name: "Pm_PivotTable",
        query: { ProjectId: row.Id, Typ: flag },
      });
    },
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
