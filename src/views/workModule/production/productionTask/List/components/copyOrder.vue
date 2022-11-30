<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_Copy')"
      width="90%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <el-form
        ref="ruleForm"
        class="customize-ruleForm-dialog-form"
        size="mini"
        :rules="rules"
        :model="form"
        label-width="140px"
      >
        <el-form-item :label="$t('Generality.Ge_ToolingNo')" prop="ToolingNo">
          <el-select
            v-model="form.ToolingNo"
            filterable
            remote
            style="width: 180px"
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in ToolingNoList"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('Generality.Ge_NewToolingNo')"
          prop="NewToolingNo"
        >
          <el-select
            v-model="form.NewToolingNo"
            filterable
            remote
            style="width: 180px"
            reserve-keyword
            :remote-method="remoteMethod1"
            :loading="loading1"
          >
            <el-option
              v-for="item in NewToolingNoList"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" style="width: 100%" label-width="20px">
          <el-button
            type="primary"
            size="mini"
            @click="searchForm('ruleForm')"
            >{{ $t("Generality.Ge_Search") }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <JvEditTable ref="BillTable" :table-obj="eTableObj">
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </jv-dialog>
  </div>
</template>
<script>
import { EditTable } from "./editConfig";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import {
  production_task_copy_list,
  production_task_copy,
} from "@/api/workApi/production/productionTask";
export default {
  name: "materialRequirements",
  data() {
    return {
      form: {
        ToolingNo: "",
        NewToolingNo: "",
      },
      ProductionTaskCopyList: {
        BillId: "",
        ToolingNo: "",
        PartNo: "",
        PartName: "",
        Quantity: "",
        PartInfo: "",
        NewPartNo: "",
        PlanStart: "",
        PlanEnd: "",
      },
      loading: false,
      loading1: false,
      eTableObj: {},
      ToolingNoList: [],
      NewToolingNoList: [],
      rules: {
        ToolingNo: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur",
          },
        ],
        NewToolingNo: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.eTableObj = new EditTable();
  },
  methods: {
    //模糊查询模号
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const str = {
          Keyword: query,
          ItemType: "",
          ItemCategory: "Tooling",
          PageSize: 20,
          CurrentPage: 1,
        };
        itemList(str).then((res) => {
          this.ToolingNoList = res.Items;
          this.loading = false;
        });
      }
    },
    //模糊查询模号
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        const str = {
          Keyword: query,
          ItemType: "",
          ItemCategory: "Tooling",
          PageSize: 20,
          CurrentPage: 1,
        };
        itemList(str).then((res) => {
          this.NewToolingNoList = res.Items;
          this.loading1 = false;
        });
      }
    },
    searchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          production_task_copy_list(this.form).then((res) => {
            console.log(res.Items);
            this.eTableObj.push(
              temMerge(this.ProductionTaskCopyList, res.Items)
            );
          });
        }
      });
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    confirmItem() {
      this.eTableObj.validate((valid1) => {
        if (valid1) {
          let str = {
            NewToolingNo: this.form.NewToolingNo,
            ProductionTaskCopyList: this.eTableObj.getTableData(),
          };
          production_task_copy(str).then((res) => {
            this.$emit("confirmCopyOrder");
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.customize-ruleForm-dialog-form {
  display: flex;
}
.select-details-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
