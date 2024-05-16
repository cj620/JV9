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
    @add="add"
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
          overflow: 'hidden',
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
import windowOnresize from "@/components/JvDraggable/windowOnresize";
export default {
  mixins: [windowOnresize],
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
    // 自定义Id
    Id: {
      type: String,
      default: '',
    },
    // 自定义cardBox类名
    getClassName: {
      type: String,
      default: ''
    },
    // 是否随窗口大小变化而变化
    isOnResize: {
      type: Boolean,
      default: true,
    },
    add: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      resultList: [],
      templateWidth: '',
      timer:null,
      // Id: '',
    };
  },
  computed: {
    getClassNameFn() {
      if(this.getClassName) {
        return this.getClassName
      } else {
        return `ghostClass-${this.col}`
      }
    },
  },
  created() {
    this.resultList = this.value;
    // this.Id = (new Date().getTime() + Math.random().toFixed(0)).toString();
  },
  methods: {
  },
  watch: {
    resultList(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.resultList = val;
    }
  },
  destroyed() {
    window.onresize = null;
  }
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
