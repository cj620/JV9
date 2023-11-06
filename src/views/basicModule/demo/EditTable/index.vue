<!--
 * @Author: your name
 * @Date: 2021-10-27 14:48:56
 * @LastEditTime: 2022-01-20 13:42:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edivv
 * @FilePath: \V9_Dev\src\views\basicModule\demo\EditTable\c-menu.vue
-->
<template>
  <PageWrapper>
    <JvEditTable :tableObj="eTableObj">
      <Action size="mini" slot="btn-list" :actions="actions"> </Action>
      <template #summary="{ row }">
        {{ getSummary(row, "summary") }}
      </template>
      <template #operation="{ row, row_index }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Insert'),
              confirm: insert.bind(null, row_index),
            },
            {
              icon: 'el-icon-delete',
              confirm: delItem.bind(null, row_index),
            },
          ]"
          :dropDownActions="[
            {
              label: $t('Generality.Ge_Submit'),
              popConfirm: {
                title: '是否提交本条数据？',
                confirm: handleOpen.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </JvEditTable>
  </PageWrapper>
</template>

<script>
import { EditTable } from "./config";
import { amountFormat } from "@/jv_doc/utils/handleData/index";
export default {
  // 表格数据

  data() {
    return {
      eTableObj: {},
      dataItem: {
        name: "亚索",
        date: "2021-11-02",
        age: "15",
        sex: "男",
        customSex: "男",
        num: 10,
        unit: 100,
        summary: 0,
        remark: "面对疾风吧",
        list: [{ sex: "男" }, { sex: "女" }],
      },
      actions: [
        {
          label: "打印数据",
          confirm: this.printData,
        },
        {
          label: "重置",
          confirm: this.reset,
        },
        {
          // 校验
          label: "校验",
          confirm: this.validData,
        },
      ],
    };
  },
  methods: {
    handleOpen(e) {
      // console.log(e);
      alert("提交成功了");
    },
    printData() {
      console.log(this.eTableObj.getTableData());
    },
    insert(index) {
      this.eTableObj.insert(index, [this.dataItem]);
    },
    reset() {
      this.eTableObj.reset();
    },
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    validData() {
      this.eTableObj.validate((valid) => {
        if (valid) {
          alert("ok");
        } else {
          // alert("fail");
        }
      });
    },
  },
  computed: {
    getSummary() {
      return (row, key) => {
        row[key].value = row.unit.value * row.num.value;
        return amountFormat(row[key].value);
      };
    },
  },
  created() {
    this.eTableObj = new EditTable();
  },
};
</script>

<style></style>
