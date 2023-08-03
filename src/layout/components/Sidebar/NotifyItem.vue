<!--
 * @Author: your name
 * @Date: 2021-10-27 09:45:11
 * @LastEditTime: 2023-08-03 15:35:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div
    class="notify-item"
    :class="cdata.IsRead ? 'isRead' : ''"
    @click="toDetail"
  >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 260px;
      "
    >
      <div style="display: flex; align-items: center">
        <el-image
          :src="imgUrlPlugin(cdata.FromUserPhotoUrl)"
          style="
            width: 22px;
            height: 22px;
            border-radius: 100%;
            margin-right: 10px;
          "
        ></el-image>
        <span style="font-size: 14px; font-weight: bold">
          {{ cdata.Title }}
        </span>
      </div>
      <div>{{ formatTime(cdata.SendTime) }}</div>
    </div>
    <div style="padding: 0 0 0 30px">{{ cdata.Content }}</div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { formatTime } from "@/utils/index";
import { mark_as_read } from "@/api/basicApi/systemSettings/notification";
export default {
  name: "NotifyItem",
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    imgUrlPlugin,
    formatTime,
    async toDetail() {
      await mark_as_read({
        Id: this.cdata.Id,
        NotificationType: this.cdata.Type,
        OneClickRead: false,
      });
      // DynamicDataValue
      const { BillId, BillKey } = this.cdata.DynamicDataValue;
      // console.log(BillId, BillKey);
      if (BillId && BillKey) {
        const str = `${BillKey}_Detail`;
        this.$router.push({
          name: str,
          query: {
            BillId: BillId,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.notify-item {
  /* height: 30px; */
  min-height: 50px;
  padding: 10px 5px 10px 5px;
  /* border-bottom: 1px solid #e2e2e2; */
  &:hover {
    background-color: #eee;
  }
  cursor: pointer;
}
.isRead {
  /* filter: grayscale(100%); */
  color: #ccc;
}
</style>
