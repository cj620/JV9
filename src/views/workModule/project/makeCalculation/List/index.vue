<!--
 * @Author: your name
 * @Date: 2021-10-27 14:48:56
 * @LastEditTime: 2022-01-20 17:18:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edivv
 * @FilePath: \V9_Dev\src\views\basicModule\demo\EditTable\c-menu.vue
-->
<template>
  <PageWrapper :footer="false">
    <JvEditTable :tableObj="eTableObj">
      <el-date-picker
        style="margin-right: 15px"
        slot="btn-list"
        size="mini"
        v-model="CalculationMonth"
        type="month"
        @change="getData"
        :placeholder="$t('project.Pro_ChooseMonth')"
      >
      </el-date-picker>
      <Action
        size="mini"
        slot="btn-list"
        :actions="actions"
        actionType="primary"
      >
      </Action>
      <template #titleBar>
        <Popover @confirm="getData" @reset="toolId = ''" style="margin: 0 10px">
          <el-input
            v-model="toolId"
            :placeholder="$t('Generality.Ge_SearchByNumber')"
            size="mini"
          ></el-input>
        </Popover>
        <span>{{ toolId }}</span>
      </template>
      <template #setingBar>
        <div class="setting-icon el-icon-refresh-right" @click="getData"></div>
      </template>
      <template #Amount="{ row }">
        {{ getSummary(row, "Amount") }}
      </template>
      <template #CalculatedAmount="{ row }"
        >{{ getCalculatedAmount(row) }}
      </template>
      <template #CalculatedScale="{ row }">
        {{ getCalculatedScale(row) }}
      </template>
      <!-- CalculationAmountOfThisMMonth -->
      <template #CalculationAmountOfThisMMonth="{ row }">
        {{ getCalculationAmountOfThisMMonth(row) }}
      </template>
    </JvEditTable>
  </PageWrapper>
</template>

<script>
import { EditTable } from "./config";
// 获取列表接口
import { API as MakeCal } from "@/api/workApi/project/makeCalculation";
import { amountFormat } from "~/utils/handleData/index";
import Popover from "~/cpn/JvTable/cpn/Popover.vue";
import SearchForm from "~/cpn/JvTable/cpn/SearchForm.vue";
export default {
  name: "Pm_MakeCalculation",
  // 表格数据
  components: {
    Popover,
    SearchForm,
  },
  data() {
    return {
      eTableObj: {},
      toolId: "",
      CalculationMonth: "",
      cur_toolId: "",
      actions: [
        {
          // 校验
          label: this.$t("Generality.Ge_Save"),
          confirm: this.l_save,
        },
      ],
    };
  },
  methods: {
    getData() {
      if (!this.toolId) return;
      MakeCal.api_list({
        ToolingNo: this.toolId,
        CalculationMonth: this.CalculationMonth,
      }).then((res) => {
        this.eTableObj.setData(res.Items);
        this.cur_toolId = JSON.parse(JSON.stringify(this.toolId));
        setTimeout(() => {
          this.eTableObj.doLayout();
        }, 200);
      });
    },
    l_save() {
      this.eTableObj.validate((valid) => {
        if (valid) {
          if (!this.toolId) return;
          MakeCal.api_save(
            // this.mixinToolId(this.eTableObj.getTableData())
            {
              CalculationMonth: this.CalculationMonth,
              Items: this.eTableObj.getTableData(),
            }
          ).then((_) => {
            this.getData();
          });
        } else {
          // alert("fail");
        }
      });
    },
    // // 混入ToolingNo
    mixinToolId(list) {
      // ToolingNo
      return list.map((item) => {
        item["ToolingNo"] = this.cur_toolId;
        return item;
      });
    },
  },
  computed: {
    getSummary() {
      return (row, key) => {
        row[key].value = row.Price.value * row.Quantity.value;
        return amountFormat(row[key].value);
      };
    },
    getCalculatedAmount() {
      return (row) => {
        row.CalculatedAmount.value =
          row.Amount.value * row.CalculatedScale.value;
        return amountFormat(row.CalculatedAmount.value);
      };
    },
    getCalculatedScale() {
      return (row) => {
        row.CalculatedScale.value =
          Number(row.CalculationScaleOfThisMMonth.value) +
          row.OldCalculatedScale.value;
        return row.CalculatedScale.value.toFixed(1);
      };
    },
    getCalculationAmountOfThisMMonth() {
      return (row) => {
        // row.CalculatedScale.value = row.;
        row.CalculationAmountOfThisMMonth.value =
          row.Amount.value * row.CalculationScaleOfThisMMonth.value;
        return amountFormat(row.CalculationAmountOfThisMMonth.value);
      };
    },
  },
  created() {
    this.CalculationMonth = new Date();
    this.eTableObj = new EditTable();
  },
};
</script>

<style></style>
