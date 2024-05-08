<template>
  <PageWrapper :footer="false">
    <div style="height: 100%">
      <!-- 表格 -->
      <JvTable class="wrapper" ref="BillTable" :table-obj="auditTableObj">
        <Action
          size="mini"
          slot="btn-list"
          :actions="[
            {
              disabled: auditTableObj.selectData.datas.length === 0,
              label: $t('Generality.Ge_Approve'),
              confirm: allAudit,
            },
            {
              label: $t('setup.MyAuditingRecords'),
              confirm: scanAuditRecord,
            },
          ]"
        >
        </Action>
        <template #BillKey="{ record,row }">
          <span v-if="row.DynamicData==='Part'">{{'零件'}}{{ $t("menu." + record) }}</span>
          <span v-else-if="row.DynamicData==='Electrode'">{{'电极'}}{{ $t("menu." + record) }}</span>
          <span v-else>{{ $t("menu." + record) }}</span>
        </template>
        <template #BillId="{ record, row }">
          <el-link type="primary" @click="linkTo(row)">{{ record }}</el-link>
        </template>
        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Approve'),
                confirm: billAudit.bind(null, row),
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
    <JvDialog
      :title="$t('setup.MyAuditingRecords')"
      :visible.sync="auditRecordVisible"
      v-if="auditRecordVisible"
      width="50%"
      @confirm="auditRecordVisible = false"
    >
      <JvTable :table-obj="auditRecordTable">
        <template #BillId="{ record, row }">
          <el-link type="primary" @click="linkTo(row)">{{ record }}</el-link>
        </template>
        <!-- AuditState -->
        <template #AuditState="{ record }">
          <MapBox :state="record" :map="auditEnum"></MapBox>
        </template>
        <template #BillKey="{ record,row }">
          <span v-if="row.DynamicData==='Part'">{{'零件'}}{{ $t("menu." + record) }}</span>
          <span v-else-if="row.DynamicData==='Electrode'">{{'电极'}}{{ $t("menu." + record) }}</span>
          <span v-else>{{ $t("menu." + record) }}</span>
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import MapBox from "@/components/BasicModule/mapBox/index.vue";
import { unified_audit_bill } from "@/api/basicApi/systemSettings/user";
import { Table as AuditTable } from "@/views/basicModule/system/desk/audit.config";
import { AuditRecordTable } from "../desk/audit.record"
import { auditEnum } from "@/enum/baseModule/auditEnum";

export default {
  name: "Se_PendingDocuments",
  components: { MapBox },
  data() {
    return {
      auditTableObj: {},
      auditRecordTable: {},
      auditRecordVisible: false,
      auditEnum,
    }
  },
  created() {
    this.auditTableObj = new AuditTable();
    this.auditRecordTable = new AuditRecordTable();
    this.auditTableObj.getData();
  },
  methods: {
    allAudit() {
      // this.auditTableObj.selectData.datas
      Promise.all(
        this.auditTableObj.selectData.datas.map((item) => {
          return unified_audit_bill({
            ...item,
            Remarks: this.$t("setup.Approve"),
          });
        })
      ).then((res) => {
        this.auditTableObj.getData();
      });
    },
    scanAuditRecord() {
      this.auditRecordTable.getData();
      this.auditRecordVisible = true;
    },
    linkTo(row) {
      this.auditRecordVisible = false;
      if(row.BillKey==='De_PartBomTable'){
        this.$router.push({
          name:'ToolingBOM',
          params: {
            PartNo: row.DynamicData,
          },
        });
      } else if (row.BillKey==='De_MaterialRequirement') {
        if(row.DynamicData==='Part'){
          this.$router.push({
            name:'De_MaterialRequirement_Detail',
            query: {
              BillId: row.BillId,
            },
          });
        } else if (row.DynamicData==='Electrode'){
          this.$router.push({
            name:'Pa_ElectrodeDemand_Detail',
            query: {
              BillId: row.BillId,
            },
          });
        }
      } else {
        const str =`${row.BillKey}_Detail`
        this.$router.push({
          name:str,
          query: {
            BillId: row.BillId,
          },
        });
      }
    },
    billAudit(row) {
      unified_audit_bill({
        ...row,
        Remarks: this.$t("setup.Approve"),
      }).then((res) => {
        this.auditTableObj.getData();
      });
    },
  }
}
</script>
