<template>
  <draggable
    v-model="resultList"
    :forceFallback="
      JSON.stringify($attrs.forceFallback) ? $attrs.forceFallback : true
    "
    v-bind="$attrs"
    v-on="$listeners"
    :isUserSelect="isUserSelect"
    style="height: 100%; width: 100%"
    :ghostClass="getClassNameFn"
  >
    <transition-group
      class="clearfix"
      :Id="Id"
      :style="{
        height: '99%',
        width: '100%',
        display: isInlineBlock ? 'inline-block' : '',
      }"
    >
      <div

        v-for="(item, index) in resultList"
        :key="index + '' + item"
        :style="{
          userSelect: isUserSelect ? '' : 'none',
          float: isFloat ? 'left' : '',
          width: templateWidth,
        }"
      >
        <slot :item="item" :index="index" />
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
    // 开启浮动，类似flex布局，自动换行
    isFloat: {
      type: Boolean,
      default: true,
    },
    // 列数量
    col: {
      type: Number | String,
      default: 1
    },
    Id: {
      type: String,
      default: 'JvDraggableId'
    },
    getClassName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      resultList: [],
      templateWidth: '',
    };
  },
  computed: {
    getClassNameFn() {
      if(this.getClassName) {
        return this.getClassName
      } else {
        return `ghostClass-${this.col}`
      }
    }
  },
  created() {
    this.resultList = this.value;
  },
  mounted() {
    this.$nextTick(() => {
      const clearfixBox = document.querySelector(`#${this.Id}`);
      this.templateWidth = clearfixBox.clientWidth / this.col - 2 + 'px';

      const style = document.createElement('style');
      style.id = 'draggable-ghost-style'
      style.textContent = `
          .ghostClass-${this.col} {
            width: ${(100 / this.col).toFixed(2)}%!important;
          }
        `;
      document.head.appendChild(style);
    })
  },
  methods: {
  },
  watch: {
    resultList(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
//清除浮动
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>
