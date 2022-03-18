<!--
 * @Author: H.
 * @Date: 2022-01-20 15:50:37
 * @LastEditTime: 2022-02-09 15:07:53
 * @Description:
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('setup.Recover'),
              confirm: recoverUser.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { recoverUser } from "@/api/basicApi/systemSettings/user";
export default {
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.IsDeleted = true;
    this.tableObj.getData();
  },
  methods: {
    recoverUser(row) {
      recoverUser([row.UserId]).then((res) => {
        this.tableObj.getData();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
