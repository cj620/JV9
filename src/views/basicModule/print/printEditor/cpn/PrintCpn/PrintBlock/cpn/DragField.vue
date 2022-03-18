<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2022-01-14 14:36:47
 * @Description: file content
-->
<template>
  <DragWrapper
    :w="cdata.style.width"
    :h="cdata.style.height"
    :x="cdata.style.x"
    :y="cdata.style.y"
    class-name-active="drag-active-class"
    :onDragStart="dragstart"
    @dragging="onDrag"
    @resizing="onResize"
    :z="9"
    v-bind="commonSet"
  >
    <div class="content-wrapper" :style="contentStyle">
      <span v-if="cdata.role == 'label'" @dblclick="dblclick(cdata.id)">
        <span v-if="!inputShow">{{ cdata.label }}</span>
        <el-input
          v-model="cdata.label"
          v-else
          @blur="inputShow = false"
          :ref="cdata.id"
        ></el-input>
      </span>
      <span v-else-if="cdata.role == 'value'"> [{{ cdata.label }}] </span>
    </div>
  </DragWrapper>
</template>

<script>
import { mapMutations } from "vuex";
import DragWrapper from "../../../DragWrapper";
import { handleStyle } from "../../../../../utils";
export default {
  components: {
    DragWrapper,
  },
  data() {
    return {
      inputShow: false,
      commonSet: {
        snap: true,
        grid: [16, 16],
      },
    };
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    ...mapMutations("print", ["CHANGE_NODES", "SET_ACTIVE_TOGGLE"]),
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
    },
    dragstart() {
      // console.log(this.cdata.style.fontSize);
      console.log("dragstart");
      this.CHANGE_NODES(this.cdata);
      this.$emit("dragstart");
    },
    dblclick(e) {
      this.inputShow = true;
      this.$nextTick(() => {
        this.$refs[e].focus();
      });
    },
  },
  computed: {
    contentStyle() {
      return handleStyle(this.cdata.style, "only-style");
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
