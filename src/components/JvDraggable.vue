<template>
  <draggable
    v-model="resultList"
    :forceFallback="
      JSON.stringify($attrs.forceFallback) ? $attrs.forceFallback : true
    "
    v-bind="$attrs"
    v-on="$listeners"
    :isUserSelect="isUserSelect"
    style="height: 100%"
  >
    <transition-group :style="{height:'99%', width: '100%',display: isInlineBlock ? 'inline-block' : ''}">
      <div
        v-for="(item, i) in resultList"
        :key="i + '' + item"
        :style="{ userSelect: isUserSelect ? '' : 'none' }"
      >
        <slot :item="item" />
      </div>
    </transition-group>
  </draggable>
</template>

<script>
//导入draggable组件
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    // 开启文字可被选择
    isUserSelect: {
      type: Boolean,
      default: false,
    },
    // 开启拖拽框体随父元素大小
    isInlineBlock: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      resultList: [],
    };
  },
  created() {
    this.resultList = this.value;
  },
  methods: {},
  watch: {
    resultList(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
