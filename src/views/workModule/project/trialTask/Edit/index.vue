<!--
 * @Author: your name
 * @Date: 2021-11-26 10:31:43
 * @LastEditTime: 2022-03-02 10:00:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Edit\index.vue
-->
<script>
import Common from "../Add/index.vue";
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
export default {
  name: "Pm_TrialTask_Edit",
  extends: Common,
  data(){
    return{
      fileBillId: this.$route.query.BillId,
      cur_Id: this.$route.query.BillId,
    }
  },
  created() {
    this.getData();
    console.log(this.$route.query);
    this.cur_Id = this.$route.query.BillId
    this.fileBillId= this.$route.query.BillId
  },
  methods: {
    getData() {
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        for (let key in this.formObj.form) {
          if (res.hasOwnProperty(key)) {
            this.formObj.form[key] = res[key];
          }
        }
        for (let key in res.TrialToolingDynamicData){
          if (this.formObj.form.hasOwnProperty(key)) {
            this.formObj.form[key] = res.TrialToolingDynamicData[key];
          }
        }
        this.tableObj.setData(res.TrialToolingDynamicData.TestMouldProblemPoints);
        this.ruleForm.Remarks = res.Remarks
      });
    },
  },
  watch: {
    $route(to, from) {
      console.log(to,909090,this.$parent.$options.name);
      if (to.name !== this.$parent.$options.name) return;

      if (to.query.BillId !== this.cur_Id) {

        this.cur_Id = to.query.BillId;
        this.getData();
      }
    },
  },
};
</script>

<style></style>
