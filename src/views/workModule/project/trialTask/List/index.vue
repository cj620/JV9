<!--
 * @Author: H.
 * @Date: 2021-11-09 11:33:00
 * @LastEditTime: 2021-11-29 16:06:05
 * @Description: 试模任务
-->
<script>
import Common from "../../projectTask/List";
import { tableConfig, Table as T_table } from "./config";
export default {
  extends: Common,
  data() {
    return {
      TaskType: "TrialTooling",
    };
  },
  methods: {
    init() {
      this.tableObj = new T_table();
      this.tableObj.formObj.form.TaskType = this.TaskType;
      this.tableObj.getData();
    },
  },
  created() {},
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
