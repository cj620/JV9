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
