<!--
 * @Author: C.
 * @Date: 2023-08-09 09:39:52
-->
<template>
  <div class="notify-content">
    <div class="text-content">{{ Content }}</div>
    <div class="notify-msg">
      <div class="user-msg">
        <el-image
          :src="imgUrlPlugin(FromUser.PhotoUrl)"
          class="user-avatar"
        ></el-image
        >{{ FromUser.UserName }}
      </div>
      <div>{{ timeFormat(SendTime, "yyyy-MM-dd hh:mm") }}</div>
    </div>
    <div class="user-action">
      <el-button size="mini" @click="setRead">标记为已读</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="toDetail"
        v-if="DynamicData && DynamicData.BillId && DynamicData.BillKey"
        >处理</el-button
      >
    </div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
export default {
  name: "NotifyContent",
  props: ["FromUser", "SendTime", "Content", "Type", "DynamicData", "Id"],
  computed: {},
  methods: {
    timeFormat,
    imgUrlPlugin,
    setRead() {
      this.$emit("toRead");
    },
    toDetail() {
      this.$emit("toDetail");
    },
  },
};
</script>
<style lang="scss" scoped>
.notify-content {
  .text-content {
    margin: 10px 0;
    cursor: pointer;
  }
  .notify-msg {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 260px;
    .user-msg {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 22px;
        height: 22px;
        border-radius: 100%;
        margin-right: 5px;
      }
    }
  }
  .user-action {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
