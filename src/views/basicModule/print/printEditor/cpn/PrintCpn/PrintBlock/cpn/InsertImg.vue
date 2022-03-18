<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2021-12-20 17:10:29
 * @Description: file content
-->
<template>
  <DragWrapper
    :w="cdata.style.width"
    :h="cdata.style.height"
    :x="cdata.style.x"
    :y="cdata.style.y"
    @dragging="onDrag"
    @resizing="onResize"
    :onDragStart="dragstart"
    :z="9"
    v-bind="commonSet"
  >
    <el-image
      :src="cdata.url"
      :style="{
        width: cdata.style.width + 'px',
        height: cdata.style.height + 'px',
      }"
    ></el-image>
  </DragWrapper>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DragWrapper from "../../../DragWrapper";
export default {
  components: {
    DragWrapper,
  },
  data() {
    return {
      commonSet: {
        snap: true,
        grid: [16, 16],
      },
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    cdata: {
      type: Object,
      default: () => {},
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    ...mapMutations("print", ["CHANGE_NODES"]),
    onDrag(x, y) {
      this.cdata.style.x = x;
      this.cdata.style.y = y;
      // console.log(this.cdata.style);
    },
    onResize(x, y, width, height) {
      this.cdata.style.x = x;
      this.cdata.style.y = y;
      this.cdata.style.width = width;
      this.cdata.style.height = height;
      // console.log(this.alignType[this.cdata.style.textAlign], 111111111111111111111);
    },
    dragstart() {
      // console.log(this.cdata.style.fontSize);
      console.log("dragstart");
      this.CHANGE_NODES(this.cdata);
      this.$emit("dragstart");
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
