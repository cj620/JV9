<template>
  <PageWrapper :footer="false">
    <div class="mold-list">
      <JvTable :table-obj="tableObj">
        <template #btn-list>
          <Action
            size="mini"
            :actions="[
              {
                label: $t('Generality.Ge_New'),
                confirm: add,
              },
               {
                label: '从erp获取模具',
                confirm: getErpMaterial,
              },
            ]"
          ></Action>
        </template>
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Schedule'),
                confirm: toProjectProcess.bind(null, row),
              },
              {
                label: $t('project.Pro_Cost'),
                confirm: toProjrctCost.bind(null, row, false),
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
    <JvDialog
      :visible.sync="addDialogShow"
      width="35%"
      :title="$t('Generality.Ge_GenerateItems')"
      @confirm="confirmAdd"
      destroy-on-close
    >
      <JvForm :formObj="formObj">
        <template #PhotoUrl>
          <JvUploadList v-model="ImgDataList" :listType="false"></JvUploadList>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import ColProgress from "./cpns/ColProgress";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { delCpn, setCpn } from "~/maps";
import Action from "~/cpn/JvAction/index.vue";
import { Form } from "@/jv_doc/class/form";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
import { adaptor_synchronize_erp_material } from "@/api/workApi/adaptor/material";
import { get_basic_info_list } from '@/api/workApi/project/projectManage';
import { saveItem } from "@/api/basicApi/systemSettings/Item";
import JvUploadList from "@/components/JVInternal/JvUpload/List.vue";
export default {
  name: "Pm_ProjectMoldList",
  components: { JvUploadList, Action },
  data() {
    return {
      tableObj: {},
      formObj: {},
      addDialogShow: false,
      ImgDataList: [],
    };
  },
  async created() {
    setCpn("ColProgress", ColProgress);
    this.tableObj = new Table();
    this.tableObj.getData();

    this.formObj = new Form({
      formSchema: [
        {
          // 编号
          prop: "ItemId",
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_ID"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
        {
          // 名称
          prop: "ItemName",
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_ItemName"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
        {
          // 单位
          prop: "Unit",
          cpn: "SyncSelect",
          label: i18n.t("Generality.Ge_Unit"),
          api: getAllUnit,
          apiOptions: {
            immediate: true,
            keyName: "Unit",
            valueName: "Unit",
          },
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
		  {
			  // 描述
			  prop: "Description",
			  cpn: "FormInput",
			  label: i18n.t("Generality.Ge_Describe"),
		  },
        {
          // 项目
          prop: "Project",
          label: i18n.t("systemSetupData.Project"),
          cpn: "SyncSelect",
          api: get_basic_info_list,
          apiOptions: {
            immediate: true,
            keyName: "Id",
            valueName: "Id",
            params: {
              CurrentPage:1,
              PageSize:1000,
            }
          },
        },
        {
          // 交期
          prop: "TDeliveryDate",
          cpn: "SingleTime",
          label: i18n.t("Generality.Ge_DeliveryDate"),
        },
        {
          // 首样日期
          prop: "TSampleDate",
          cpn: "SingleTime",
          label: i18n.t("production.Pr_ProofDate"),
        },

        // 图片
        {
          prop: "PhotoUrl",
          custom: true,
          label: i18n.t('Generality.Ge_PhotoUrl')
        },
      ],
      autoFocus: true,
      baseColProps: { span: 24 },
      labelWidth: "80px",
    });
  },
  beforeDestroy() {
    delCpn("ColProgress");
  },
  methods: {
    imgUrlPlugin,
    add() {
      this.formObj.reset();
      this.addDialogShow = true;
    },
    //拿取erp的模具数据
    getErpMaterial(){
      adaptor_synchronize_erp_material({
      "SelectDate":"2023-09-01",
        "Types":["02"]
    }).then(res=>{
        console.log(res)
      })

    },
    confirmAdd() {
      this.formObj.form['PhotoUrl'] = this.ImgDataList.toString();
      this.formObj.form.DataState = 2
      this.formObj.validate((valid) => {
        if(valid) {
          saveItem(this.formObj.form).then(res => {
            this.$message({
              message: i18n.t('backendMessage.P10159'),
              type: 'success'
            });
            this.tableObj.reset();
            this.addDialogShow = false;
          }).catch(err => {
            this.addDialogShow = false;
          })
        }
      })

    },
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
  },
};
</script>

<style scoped lang="scss">
.mold-list {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
