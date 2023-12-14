<!--
 * @Author: your name
 * @Date: 2021-11-26 10:31:43
 * @LastEditTime: 2021-12-16 14:16:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Edit\c-menu.vue
-->
<script>
import Common from "../Add/index.vue";
import { API as Quotation } from "@/api/workApi/sale/quotation";
import { data2doubleCol } from "../utils";
export default {
  name: "Sa_SaleQuote_Edit",
  extends: Common,
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.fileBillId = this.$route.query.BillId;
      Quotation.api_get({ BillId: this.cur_Id }).then((res) => {
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;

        this.M_TableObj.setData(res.MaterialCost);
        this.Project_TableObj.setData(data2doubleCol(res.ProductionCost));
        this.C_TableObj.setData(res.AdditionalCost);
      });
    },
  },
  watch: {
    $route(to, from) {
      if (to.name !== this.$options.name) return;
      if (to.query.BillId != this.cur_Id) {
        this.cur_Id = to.query.BillId;
        this.getData();
      }
    },
  },
};
</script>

<style></style>
