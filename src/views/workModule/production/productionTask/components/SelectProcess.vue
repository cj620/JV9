<template>
    <div>
      <el-drawer
        title=""
        v-bind="$attrs"
        v-on="$listeners"
      >
        <JvTable :table-obj="tableObj">
          <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                 label: $t('Generality.Ge_New'),
                confirm: add.bind(null, row),
              },
            ]"
          />
          </template></JvTable>

      </el-drawer>
    </div>
</template>

<script>
import { Table,TableAPI } from "@/jv_doc/class/table";
import { getAllProcess } from "@/api/workApi/production/baseData";
export default {
  name: 'SelectProcess',
  data() {
    return {
      drawer: false,
      tableObj: {},

    };
  },
  created() {




    this.tableObj = new Table({
      tableSchema: [
        /*工序*/
        {
          prop: "Process",
          label:i18n.t("Generality.Ge_Process"),

        },
        /*预计工时*/
        {
          prop: "ItemName",
          label:i18n.t("Generality.Ge_PlanTime"),

        },
       ],
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      // 操作列宽度
      operationWidth:110,

    });
    this.GetData()
  },
  methods:{
    GetData() {
      getAllProcess().then((res) => {
        console.log(res.Items)
        this.tableObj.setData(res.Items);
      })
      },
    //添加工序
    add(row){
      console.log(row)
      this.$emit('selectProcessData',[row])
    }
  }
}
</script>

<style scoped>

</style>
