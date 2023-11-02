<!--
 * @Author: your name
 * @Date: 2021-11-23 17:12:36
 * @LastEditTime: 2021-11-24 09:08:59
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\components\JVInternal\SelectProcess\index.vue
-->
<!--选择工序-->
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
                label: $t('Generality.Ge_Add'),
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
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
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
        // /*预计工时*/
        // {
        //   prop: "ItemName",
        //   label:i18n.t("Generality.Ge_PlanTime"),
        // },
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
      getAllProjectProcess().then((res) => {
        this.tableObj.setData(res.Items);
      })
    },
    //添加工序
    add(row){
      this.$emit('selectProcessData',[row])
    }
  }
}
</script>

<style scoped>

</style>

