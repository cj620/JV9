<!--
 * @Author: H.
 * @Date: 2021-12-01 15:23:50
 * @LastEditTime: 2022-01-20 16:40:49
 * @Description:
-->

<template>
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #Template="{ prop }">
          <el-input
              v-model="formObj.form[prop]"
              :disabled="!!editData.Template"
          />
        </template>
      </JvForm>
    </JvBlock>
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')">
      <div slot="extra">
        <Action
            size="mini"
            slot="extra"
            :actions="[
            {
              icon: 'el-icon-caret-top',
              confirm: editSort.bind(null, false),
            },
            {
              icon: 'el-icon-caret-bottom',
              confirm: editSort.bind(null, true),
            },
          ]"
            :primary="[
            {
              label: $t('project.Pro_AddProcedure'),
              confirm: addProcess,
            },
            {
              label: $t('project.Pro_SelectTemplate'),
              confirm: selectProcessTemplate,
            },
          ]"
        >
        </Action>
      </div>
      <JvEditTable :tableObj="eTableObj">
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
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
          $t("Generality.Ge_Save")
        }}</el-button>
    </div>

    <!-- 选择工序-->

    <SelectProjectProcess
        :visible.sync="ProcessDialogFormVisible"
        v-if="ProcessDialogFormVisible"
        @selectProcessData="selectProcessData"
    >
    </SelectProjectProcess>
    <SelectProjectProcessTemplate
        :visible.sync="ProcessTemplateDialogFormVisible"
        v-if="ProcessTemplateDialogFormVisible"
        @confirmProcessTemplate="confirmProcessTemplate"
    >
    </SelectProjectProcessTemplate>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { EditTable } from "./editConfig";
import SelectProjectProcessTemplate from "@/components/JVInternal/SelectProjectProcessTemplate";
import { temMerge } from "@/jv_doc/utils/handleData";
import { saveProjectProcessTemplate } from "@/api/workApi/project/baseData"
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
import SelectProjectProcess from "@/components/JVInternal/SelectProjectProcess";

export default {
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ProcessDialogFormVisible: false,
      ProcessTemplateDialogFormVisible: false,
      BillItems: {
        Id: 0,
        Process: "",
        SortOrder: 0,
        CostRate: 0,
        StartScale: 0,
        EndScale: 0,
        ProcessType: 0,
        BelongingDepartment: "",
        TemplateGui: ""
      },
      editData: {},
    };
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.eTableObj = new EditTable();
    console.log('传进来的数据',this.$route.params.data)
    if (this.$route.params.data) {
      this.editData = this.$route.params.data;
      this.formObj.form = this.editData;
      if (this.editData.BillItems.length > 0) {
        this.eTableObj.push(temMerge(this.BillItems, this.editData.BillItems));
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  components: {
    SelectProjectProcess,
    SelectProjectProcessTemplate,
  },
  methods: {
    //改工序的顺序
    editSort(isDown = true) {
      if (this.eTableObj.selectData.datas.length !== 1) return;
      let row_index = this.eTableObj.selectData.datas[0].row_index;

      if (isDown) {
        if (this.eTableObj.tableData.length <= row_index + 1) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index + 1, 0, currRow);
      } else {
        if (row_index <= 0) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index - 1, 0, currRow);
      }
    },
    //选择工序
    addProcess() {
      this.ProcessDialogFormVisible = true;
    },
    //选择工艺模板
    selectProcessTemplate() {
      this.ProcessTemplateDialogFormVisible = true;
    },
    //选择模板后返回的数据
    confirmProcessTemplate(e) {
      e.forEach((item) => {
        item.Id = "";
      });
      this.eTableObj.push(temMerge(this.BillItems, e));
      this.ProcessTemplateDialogFormVisible = false;
    },
    //选择工序后返回的数据
    selectProcessData(e) {
      e.forEach((item) => {
        item.Id = "";
      });
      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    delItem(index) {
      this.eTableObj.tableData.splice(index, 1);
    },
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          var arr = JSON.parse(JSON.stringify(this.eTableObj.getTableData()));
          this.formObj.form.BillItems = arr;
          saveProjectProcessTemplate(this.formObj.form).then(() => {
            let TagName = {
              name: `Pm_ProjectProcessTemplate`,
            };
            closeTag(this.current, TagName);
          });
        }
      });
    },
  },

};
</script>

<style lang="scss" scoped></style>
