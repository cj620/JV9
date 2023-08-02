<!--
 * @Author: C.
import { ElButton } from "element-ui/types/button";
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2023-08-02 13:23:02
 * @Description: file content
-->
<template>
  <div>
    <el-button @click="sendAudit">sendAudit</el-button>
    <el-button @click="sendMsg">sendMsg</el-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { receiveMessages } from "@/jv_doc/utils/system/msgPlugin";
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
    // console.log(this.connect, "this.connect();");
    // this.connect();
    // this.getNotifys();
  },
  mounted: function () {},
  methods: {
    // ...mapMutations("websocket", ["HOLD_CONFIG", "RESET_CONFIG"]),
    ...mapActions("websocket", ["sendNessage", "connect", "getNotifys"]),
    sendAudit() {
      receiveMessages({
        data: JSON.stringify({
          FromUser: {
            UserId: "cj",
            UserName: "henry",
            PhotoUrl: "\\Files\\1480487782907379713.png",
            Department: "销售部",
          },
          Content: "xxx提交的单据等待审核",
          DynamicData: {
            BillId: "SA230606001",
            BillKey: "Sa_Order",
          },
          NotificationType: "info",
          SendTime: new Date(),
          Type: "Audit",
        }),
      });
    },
    sendMsg() {
      this.sendNessage({
        Content: "message",
        Type: "Message",
        ToUserId: "cj",
      });
    },
  },
};
</script>
