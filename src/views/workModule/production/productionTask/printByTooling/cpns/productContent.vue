<!--
 * @Author: C.
 * @Date: 2022-02-16 15:03:04
 * @LastEditTime: 2022-02-24 15:01:22
 * @Description: file content
-->
<template>
  <div class="p-message-list">
    <div class="bill-content">
      {{ cdata.BillId }}
    </div>
    <div class="bill-content">
      {{ cdata.PartNo }}
    </div>
    <div class="bill-content">
      {{ cdata.PartName }}
    </div>
    <div class="bill-content">
      {{ cdata.PartInfo }}
    </div>
  </div>
</template>

<script>
import IconValue from "./iconValue.vue";
export default {
  components: {
    IconValue,
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.p-message-list {
  width: 600px;

  font-size: 14px;
  .bill-content {
    @include ellipsis;
    width: 120px;
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
