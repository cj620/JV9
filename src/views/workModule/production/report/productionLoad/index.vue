<!--
 * @Author: H.
 * @Date: 2021-11-09 10:34:41
 * @LastEditTime: 2021-12-06 15:00:31
 * @Description: 生产调度
-->

<script>
// 设计任务页面
import Common from "@/views/workModule/production/report/capacityAnalyse";
import { load_analysis_items } from "@/api/workApi/production/dataReport";
import { Table } from "./config";
import { DetailTable } from "../capacityAnalyse/detailConfig";
export default {
  // name: "Pa_ProgramTask",
  // 继承
  extends: Common,
  data() {
    return {};
  },
  methods: {
    clickToDetail(row, column) {
      const columnLabel = "Data" + column.label
      if (row[columnLabel] && row[columnLabel].length !== 0){
        this.detailTableObj.setData(row[columnLabel])
        this.detailDataView = true
      }
    },
    init() {
      this.tableObj = new Table();
      this.tableObj.getData();
      this.detailTableObj = new DetailTable
    },
    load(tree, treeNode, resolve) {
      load_analysis_items({
        Month: this.tableObj.formObj.form.Month,
        ProcessName: tree.Resource,
      }).then((res) => {
        resolve(res.Items);
      });
    },
  },
};
</script>
