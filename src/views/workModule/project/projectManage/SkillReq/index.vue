<!--
 * @Author: your name
 * @Date: 2021-10-27 14:48:56
 * @LastEditTime: 2022-01-20 17:19:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edivv
 * @FilePath: \V9_Dev\src\views\basicModule\demo\EditTable\c-menu.vue
-->
<template>
  <PageWrapper :footer="false">
    <JvEditTable :tableObj="eTableObj">
      <Action
        size="mini"
        slot="btn-list"
        :actions="actions"
        actionType="primary"
      >
      </Action>
      <template #operation="{ row_index }">
        <TableAction
          :actions="[
            {
              icon: 'el-icon-circle-plus-outline',
              confirm: addItem.bind(null, row_index),
            },
            {
              icon: 'el-icon-delete',
              confirm: delItem.bind(null, row_index),
            },
          ]"
        />
      </template>
    </JvEditTable>
  </PageWrapper>
</template>

<script>
import { EditTable } from "./config";
import {
  save_tooling_specs,
  get_tooling_spec_tpl,
} from "@/api/workApi/project/projectInfo";
import closeTag from "@/utils/closeTag";
export default {
  // 表格数据
  components: {},
  data() {
    return {
      eTableObj: {},
      actions: [
        {
          // 校验
          label: this.$t("Generality.Ge_New"),
          confirm: this.addEditRow,
        },
        {
          // 校验
          label: this.$t("Generality.Ge_Save"),
          confirm: this.save,
        },
      ],
      cur_Id: "",
    };
  },
  methods: {
    init() {
      this.eTableObj = new EditTable();
      let params = this.$route.params;
      this.cur_Id = params?.ToolingNo;
      if (params?.skillTemp?.length !== 0) {
        this.eTableObj.setData(
          params.skillTemp.map((item) => {
            return {
              SpecName: item.SpecName,
              Spec: item.Spec,
            };
          })
        );
      } else {
        this.getData();
      }
    },
    getData() {
      get_tooling_spec_tpl().then((res) => {
        // console.log(res, 88888);
        this.eTableObj.setData(res);
      });
    },
    // 新增编辑行
    addEditRow() {
      this.eTableObj.addEmptyRow();
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    addItem(index) {
      let empty_row = this.eTableObj.getEmptyRow();
      this.eTableObj.insert(index, [empty_row]);
    },
    save() {
      this.eTableObj.validate((valid) => {
        if (valid) {
          let params = {
            ToolingNo: this.cur_Id,
            ToolingSpecList: this.eTableObj.getTableData(),
          };
          this._save(params);
        }
      });
    },
    _save(params) {
      save_tooling_specs(params).then((res) => {
        let TagName = {
          name: "ProjectManage_MouldDetail",
          query: { BillId: this.cur_Id },
        };
        closeTag(this.$route, TagName);
      });
    },
  },
  computed: {},
  created() {
    this.init();
  },
};
</script>

<style></style>
