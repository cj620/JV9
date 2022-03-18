<!--搜索物料-->
<template>
  <div>
    <el-drawer title="" v-bind="$attrs" v-on="$listeners">
      <el-form
        :inline="true"
        :model="form"
        size="mini"
        class="demo-form-inline"
        style="padding: 0 10px"
      >
        <el-form-item :label="$t('Generality.Ge_KeyWords')">
          <el-input v-model="form.Keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{
            $t("Generality.Ge_Search")
          }}</el-button>
        </el-form-item>
      </el-form>
      <JvTable :table-obj="tableObj">
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_New'),
                confirm: add.bind(null, row),
              },
            ]"
          /> </template
      ></JvTable>
    </el-drawer>
  </div>
</template>

<script>
import { Table, TableAPI } from "@/jv_doc/class/table";
import { itemList } from "@/api/basicApi/systemSettings/Item";
export default {
  name: "searchItem",
  data() {
    return {
      drawer: false,
      tableObj: {},
      form: {
        CurrentPage: 1,
        ItemType: "",
        ItemCategory: "Standard",
        Keyword: "",
        PageSize: 20,
      },
    };
  },
  created() {
    this.tableObj = new Table({
      tableSchema: [
        /*编号*/
        {
          prop: "ItemId",
          label: this.$t("Generality.Ge_ID"),
        },
        /*名称*/
        {
          prop: "ItemName",
          label: this.$t("Generality.Ge_ItemName"),
        },
        /*描述*/
        {
          prop: "Description",
          label: this.$t("Generality.Ge_Describe"),
        },
      ],
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      // 操作列宽度
      operationWidth: 110,
    });
    this.GetData();
  },
  methods: {
    GetData() {
      itemList(this.form).then((res) => {
        console.log(this.tableObj.pager.Total);
        this.tableObj.setData(res.Items);
        this.tableObj.pager.Total = res.Count;
      });
    },
    //添加工序
    add(row) {
      console.log(row);
      this.$emit("manualControlMaterial", [row]);
    },
    //查询物料
    onSubmit() {
      this.GetData();
    },
  },
};
</script>

<style scoped></style>
