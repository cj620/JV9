<!--
 * @Author: H.
 * @Date: 2021-11-05 13:19:54
 * @LastEditTime: 2023-07-13 16:22:05
 * @Description: 审核人配置
-->
<template>
  <PageWrapper :footer="false">
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >
      <template #BillKey="{ record }">
        {{ $t("menu." + record) }}
      </template>
      <template #ApproveNodes="{ record }">
        <div class="auditnodes">
          <span class="auditnodes-items" v-for="item in record" :key="item.Id">
            <span
              class="auditnodes-items-auditor"
              :style="{ background: multiplayer[item.ApproveType].color }"
              >{{ item.Name }}</span
            >
            <span
              ><i
                class="el-icon-caret-right"
                v-if="item !== record[record.length - 1]"
              ></i
            ></span>
          </span>
        </div>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: add.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>

    <StaffSelect
      :title="$t('Generality.Ge_DocumentName')"
      :visible.sync="addStaffShow"
      @complete="complete"
      :defaultStaff="choosedStaff"
    ></StaffSelect>
  </PageWrapper>
</template>

<script>
import StaffSelect from "@/components/BasicModule/StaffSelect";
import { setAudit } from "@/api/basicApi/systemSettings/auditFlowSetup";
import { Table } from "./config";
import { multiplayer } from "@/views/basicModule/OA/maps/auditMap";
console.log(multiplayer, "multiplayer");
export default {
  name: "Se_AuditFlowSetup",
  data() {
    return {
      addStaffShow: false,
      choosedStaff: [],
      tableObj: {},
      auditor: {
        BillKey: "",
        AuditorIds: [],
      },
      multiplayer,
    };
  },
  methods: {
    complete(e) {
      this.auditor.AuditorIds = e.map((item) => {
        return item.UserName;
      });
      setAudit(this.auditor).then((res) => {
        //this.$message.success("配置成功");
        this.tableObj.getData();
        this.addStaffShow = false;
      });
    },
    add(e) {
      console.log(e);
      // this.addStaffShow = true;
      // this.auditor.BillKey = e.BillKey;
      // this.choosedStaff = e.AuditNodes;
      this.$router.push({
        name: "Se_oadesign",
        query: {
          BillKey: e.BillKey,
        },
      });
    },
    handleSelectionChange() {},
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {},
  components: {
    StaffSelect,
  },
};
</script>

<style lang="scss" scoped>
.auditnodes-items {
  display: inline-flex;
  align-items: center;
  &-auditor {
    // background-color: #ecf5ff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #fff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    margin: 0 8px;
  }
}
</style>
