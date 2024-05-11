<template>
  <draggable
    v-model="resultList"
    :forceFallback="JSON.stringify($attrs.forceFallback) ? $attrs.forceFallback : true"
    v-bind="$attrs"
    v-on="$listeners"
    :isUserSelect="isUserSelect"
  >
    <transition-group>
      <div
        v-for="(item, i) in resultList"
        :key="i + ''+item"
        :style="{userSelect: isUserSelect ? '' : 'none'}"
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
      default: () => []
    },
    isUserSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resultList: [],
    };
  },
  created() {
    this.resultList = this.value;
  },
  methods: {
  },
  watch: {
    resultList(val) {
      this.$emit('input', val)
    }
  }
};
</script>

<style lang="scss" scoped></style>
