<!--
 * @Author: C.
 * @Date: 2022-02-10 11:25:20
 * @LastEditTime: 2022-02-10 14:20:53
 * @Description: file content
-->

<script>
import { ShareTable } from "./config";
import Common from "../List";
import { setLocalStorage } from "@/jv_doc/utils/handleData/localCache";
export default {
  extends: Common,
  methods: {
    init() {
      // 创建表格实例
      this.tableObj = new ShareTable();
      this.tableObj.formObj.form.dataSharingKey = this.$route.query.key;
      setLocalStorage("dataSharingKey", this.$route.query.key);
      this.tableObj.getData();
    },
  },
};
</script>
