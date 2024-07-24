<!--
 * @Author: your name
 * @Date: 2021-11-26 10:31:43
 * @LastEditTime: 2022-03-02 10:00:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Edit\c-menu.vue
-->
<script>
import Common from "../Add/index.vue";
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import {temMerge} from "~/utils/handleData";
import Detail from "~/class/detail/Detail";
import {detailConfig} from "@/views/workModule/project/projectTask/Add/dialogConfig";
export default {
  name: "Pm_ProjectTask_Edit",
  extends: Common,
  created() {
    this.confirmTestMouldProblemPointsFlag = true;
    this.detailObj = new Detail({
      column: 3,
      schema: detailConfig,
      data: {},
    })

    this.getData();
  },
  methods: {
    getData() {
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;

        this.detailObj.setData(res.MoldRepairProblemData);
        console.log(this.detailObj.detailData, 3232);
        if(res.BillItems.length) {
          res.BillItems.forEach(item => {
            if(item.ProcessContent && item.ProcessContent !== "") {
              console.log(item.ProcessContent, 27)
              item.customData = item.ProcessContent.split(/[,，]/);
            }
          });
          this.M_TableObj.push(temMerge(this.BillItems, res.BillItems))
        }
        if(res.MoldRepairProblemPoints.length) {
          this.ProblemPointsInMoldRepairTableObj.push(temMerge(this.TestMouldProblemPoints, res.MoldRepairProblemPoints))
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      if (to.name !== this.$parent.$options.name) return;

      if (to.query.BillId != this.cur_Id) {
        this.cur_Id = to.query.BillId;
        this.getData();
      }
    },
  },
};
</script>

<style></style>
