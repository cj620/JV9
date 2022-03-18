<!--
 * @Author: C.
 * @Date: 2021-07-30 13:26:31
 * @LastEditTime: 2021-12-20 16:20:28
 * @Description: file content
-->
<template>
  <div
    :style="{
      width: block.style.width + 'px',
      height: block.style.height + 'px',
    }"
  >
    <template v-for="headerItem in block.nodes">
      <DragQr
        v-if="headerItem.role == 'qrcode' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        :data="data"
      ></DragQr>
      <DragField
        v-if="
          headerItem.role == 'label' ||
          (headerItem.role == 'value' && headerItem.show)
        "
        :key="headerItem.id"
        :cdata="headerItem"
        :data="data"
      ></DragField>
      <InsertImg
        v-if="headerItem.role == 'insertImg' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        :data="data"
      ></InsertImg>
      <DragImg
        v-if="headerItem.role == 'image' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        :data="data"
      ></DragImg>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import DragQr from "./cpn/DragQr";
import DragField from "./cpn/DragField";
import InsertImg from "./cpn/InsertImg";
import DragImg from "./cpn/DragImg";
export default {
  components: {
    DragQr,
    DragField,
    InsertImg,
    DragImg,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "header",
    },
  },
  computed: {
    ...mapState({
      header: (state) => state.print.header,
      body: (state) => state.print.body,
      footer: (state) => state.print.footer,
    }),
    block() {
      if (this.name == "body") {
        return this.body;
      } else if (this.name == "header") {
        return this.header;
      } else if (this.name == "footer") {
        return this.footer;
      }
    },
  },
};
</script>

<style></style>
