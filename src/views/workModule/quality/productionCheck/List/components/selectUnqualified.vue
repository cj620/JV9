<!--
 * @Author: your name
 * @Date: 2021-12-15 14:06:31
 * @LastEditTime: 2022-01-17 10:36:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\quality\productionCheck\List\components\selectUnqualified.vue
-->
<template>
  <jv-dialog
    :title="$t('quality.Qc_PleaseChooseTheUnqualifiedProcess')"
    width="70%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmItem"
  >
  </jv-dialog>
</template>

<script>
import { getProductionTask } from "@/api/workApi/production/productionTask";

export default {
  name: "selectUnqualified",
  data() {
    return {
      ProcessList: [],
    };
  },
  props: {
    transferData: {
      type: String,
      default: () => {},
    },
  },
  created() {
    this.GetData();
  },
  methods: {
    //获取工序
    GetData() {
      console.log(this.transferData, 66);
    },
    confirmItem() {},
  },
};
</script>

<style scoped></style>
