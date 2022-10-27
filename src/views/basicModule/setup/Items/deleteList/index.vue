<!--
 * @Author: H.
 * @Date: 2022-01-20 15:50:37
 * @LastEditTime: 2022-10-27 17:27:42
 * @Description:
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ row }">
        {{ stateEnum[row.State] && stateEnum[row.State].name }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('setup.Recover'),
              confirm: recoverItem.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { stateEnum } from "@/enum/baseModule";
import { item_Recovery } from "@/api/basicApi/systemSettings/Item";
export default {
  data() {
    return {
      stateEnum,
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.State = "Deleted";
    this.tableObj.getData();
  },
  methods: {
    recoverItem(row) {
      item_Recovery([row.ItemId]).then((res) => {
        this.tableObj.getData();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
