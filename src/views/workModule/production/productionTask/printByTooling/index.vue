<!--
 * @Author: C.
 * @Date: 2022-02-16 13:53:00
 * @LastEditTime: 2022-02-25 15:56:19
 * @Description: file content
-->
<template>
  <div class="product-print-demo">
    <div class="print-page" ref="printPage">
      <table style="width: 100%">
        <thead>
          <th>{{ form.ToolingNo }}</th>
        </thead>

        <tbody>
          <tr v-for="item in printData" :key="item.BillId">
            <td>
              <ProductCard :cdata="item"></ProductCard>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="height: 40px"></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="btn-list">
      <el-button @click="printDemo" type="primary">{{
        $t("Generality.Ge_Print")
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { productionTaskList } from "@/api/workApi/production/productionTask";
import ProductCard from "./cpns/productCard.vue";
import Print from "@/views/basicModule/print/printView/print";

import Vue from "vue";
Vue.use(Print);
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      form: {
        CurrentPage: 1,
        PageSize: 9999,
        ToolingNo: this.$route.query.ToolingNo,
      },
      printData: [],
    };
  },
  created() {
    // console.log(this.$route.query.ToolingNo);
    this.getData();
  },
  methods: {
    getData() {
      productionTaskList(this.form).then((res) => {
        console.log(res);
        this.printData = res.Items;
      });
    },
    printDemo() {
      this.$print(this.$refs.printPage);
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.product-print-demo {
  padding: 40px 0 100px 0;
  background-color: rgb(99, 99, 99);
  position: relative;
  .print-page {
    background-color: #fff;
    width: 310mm;
    min-height: 297mm;
    margin: 0 auto;
    // padding: 10px;
  }
}
.btn-list {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
