<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2021-11-30 10:25:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\List\c-menu.vue
-->

<script>
// 来自项任务记录
import Common from "@/views/workModule/project/projectTask/TaskRecord";
import { Table } from "./config.js";
export default {
  // 页面的标识
  // name: "Pm_ProjectTask_Record",
  // 继承
  extends: Common,
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    init() {
      // 创建表格实例
      this.tableObj = new Table();
      this.tableObj.getData();
    },
  },
};
</script>
