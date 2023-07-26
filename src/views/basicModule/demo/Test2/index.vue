<!--
 * @Author: C.
import { ElButton } from "element-ui/types/button";
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2023-07-26 15:43:07
 * @Description: file content
-->
<template>
  <div>
    <el-button @click="sendAudit">sendAudit</el-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { receiveMessages } from "@/store/modules/websocket";
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
    // console.log(this.connect, "this.connect();");
    this.connect();
  },
  mounted: function () {},
  methods: {
    // ...mapMutations("websocket", ["HOLD_CONFIG", "RESET_CONFIG"]),
    ...mapActions("websocket", ["sendNessage", "connect"]),
    sendAudit() {
      receiveMessages({
        data: JSON.stringify({
          FromUser: {
            UserId: "cj",
            UserName: "henry",
            PhotoUrl: null,
            Department: "销售部",
          },
          Content: "xxx提交的单据等待审核",
          DynamicData: {
            BillId: "SA230606001",
            BillKey: "Sa_Order",
          },
          SendTime: new Date(),
          Type: "Audit",
        }),
      });
    },
  },
};
</script>
