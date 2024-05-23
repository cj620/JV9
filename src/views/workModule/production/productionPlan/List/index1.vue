<!--
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-08-18 16:26:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-23 15:57:45
 * @FilePath: \jvmmsv9-1front\src\views\workModule\production\report\toBeProcessedProcess\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper ref="page" :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj"> </JvTable>
  </PageWrapper>
</template>

<script>
// 引入表格类
import { Table } from "./config1";

export default {
  data() {
    return {
      tableObj: {},
    };
  },
  components: {},
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {},
};
</script>

<style></style>
