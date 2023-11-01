<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj" @selection-change="canPick">
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <Action
          size="mini"
          slot="btn-list"
          :actions="[
          {
            label: $t('program.Pr_SubmitPurchase'),
            confirm: submit,
            disabled: this.isDisabled
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
        v-if="selectProjectFormVisible"
        :visible.sync="selectProjectFormVisible"
        destroy-on-close
        :title="$t('project.Pro_TaskSheetNo')"
        width="30%"
        @confirm="confirmItem"
    >
      <JvForm :formObj="formObj">
        <template #PmTaskBillId="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
                v-for="item in TaskListData"
                :key="item.BillId"
                :label="
                item.BillId + '(' + taskTypeEnum[item.TaskType].name + ')'
              "
                :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import BillStateTags from "@/components/WorkModule/BillStateTags/index.vue";
import { taskTypeEnum } from "@/enum/workModule";
import { Table } from "./config";
import { Form } from "~/class/form";
import { toolingTaskInfoList } from "@/api/workApi/design/toolingBOM";
import { adaptor_synchronize_electrode_demand } from "@/api/workApi/adaptor/material"
export default {
  name: "Pa_ElectrodeDemand_Details_list",
  components: { BillStateTags },
  data() {
    return {
      taskTypeEnum,
      tableObj: {},
      formObj: {},
      TaskListData: [],
      isDisabled: true,
      selectProjectFormVisible: false,
      ToolingNo: "",
    }
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.formObj = new Form({
      formSchema: [
        {
          prop: "PmTaskBillId",
          cpn: "SyncSelect",
          label: i18n.t("project.Pro_TaskSheetNo"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
          custom: true,
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.tableObj.getData({ Category: 1 });
  },
  methods: {
    // 判断按钮是否禁用
    canPick() {
      if (this.tableObj.selectData.datas.length === 1){
        this.isDisabled = false
        this.ToolingNo = this.tableObj.selectData.datas[0].ToolingNo
      } else if (this.tableObj.selectData.datas.length > 1){
        const bol = !this.tableObj.selectData.datas.every(item =>
          item.ToolingNo === this.tableObj.selectData.datas[0].ToolingNo
        )
        bol ? this.isDisabled = bol : this.ToolingNo = this.tableObj.selectData.datas[0].ToolingNo
      } else {
        this.isDisabled = true
      }
    },
    // 点击触发
    submit() {
		console.log(123456)
      var str = {
        ToolingNo: this.ToolingNo,
        SelectType: 0,
      };
      toolingTaskInfoList(str).then((res) => {
        if (res.Count === 1) {
          this.formObj.form.PmTaskBillId = res.Items[0].BillId;
        }
        this.TaskListData = res.Items;
        this.selectProjectFormVisible = true;
      });
    },
    // 确认提交
    confirmItem() {
      this.selectProjectFormVisible = false;
      // console.log(this.tableObj.selectData.datas,this.formObj.form.PmTaskBillId);

      // 参数可能需要修改
      const BillItems = this.tableObj.selectData.datas
      adaptor_synchronize_electrode_demand({
        BillItems:BillItems,
        PmTaskBillId:this.formObj.form.PmTaskBillId
      }).then(res => {
        console.log('同步成功');
        this.selectProjectFormVisible = false
      }).catch(() =>{
          this.selectProjectFormVisible = false
        }
      )
    }
  },
}
</script>
