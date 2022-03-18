<!--
 * @Author: C.
 * @Date: 2021-07-30 13:26:31
 * @LastEditTime: 2021-12-20 16:20:04
 * @Description: file content
-->
<template>
  <div
    :style="{
      width: block.style.width + 'px',
      height: block.style.height + 'px',
    }"
    ref="printBlock"
  >
    <DragWrapper
      @resizing="onResize"
      :min-width="25"
      :min-height="10"
      :max-height="name == 'header' ? 270 : 999"
      :w="block.style.width"
      :h="block.style.height"
      :handles="['bm', 'mr']"
      :draggable="false"
      :onDragStart="dragstart"
      :x="-3"
      :y="-3"
    >
    </DragWrapper>
    <template v-for="headerItem in block.nodes">
      <DragQr
        v-if="headerItem.role == 'qrcode' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        @dragstart="changeToggle"
      ></DragQr>
      <DragField
        v-if="
          headerItem.role == 'label' ||
          (headerItem.role == 'value' && headerItem.show)
        "
        :key="headerItem.id"
        :cdata="headerItem"
        @dragstart="changeToggle"
      ></DragField>
      <InsertImg
        v-if="headerItem.role == 'insertImg' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        @dragstart="dragstart"
      ></InsertImg>
      <DragImg
        v-if="headerItem.role == 'image' && headerItem.show"
        :key="headerItem.id"
        :cdata="headerItem"
        @dragstart="changeToggle"
      ></DragImg>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DragWrapper from "../../DragWrapper";
import DragQr from "./cpn/DragQr";
import DragField from "./cpn/DragField";
import InsertImg from "./cpn/InsertImg";
import DragImg from "./cpn/DragImg";
export default {
  components: {
    DragWrapper,
    DragQr,
    DragField,
    InsertImg,
    DragImg,
  },
  props: {
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
    offsetHeight() {
      return this.$refs.printBlock.offsetHeight;
    },
  },
  methods: {
    ...mapMutations("print", ["SET_ACTIVE_TOGGLE"]),
    onResize(x, y, width, height) {
      // this.headerStyle.width = width
      this.block.style.height = height;
      this.block.style.width = width;
      console.log(height, 1);
    },
    dragstart() {
      this.SET_ACTIVE_TOGGLE([this.name]);
    },
    changeToggle() {
      console.log([this.name, "font"], 9999);
      this.SET_ACTIVE_TOGGLE([this.name, "font"]);
    },
  },
};
</script>

<style></style>
