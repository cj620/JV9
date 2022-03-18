<!--
 * @Author: C.
 * @Date: 2021-09-15 15:07:44
 * @LastEditTime: 2021-11-09 15:35:35
 * @Description: file content
-->
<template>
  <div class="jv-block">
    <div ref="jvBlock"></div>
    <div
      class="jv-block-header"
      :style="headerStyle"
      v-if="$slots.extra || title"
    >
      <div class="title">
        {{ title }}

        <el-tooltip
          effect="dark"
          v-if="helpMsg"
          :content="helpMsg"
          placement="bottom-start"
        >
          <span class="el-icon-question help-msg"></span>
        </el-tooltip>
      </div>
      <div>
        <slot name="extra"></slot>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "JvBlock",
  props: {
    title: String,
    headerStyle: {
      type: Object,
      default: () => {},
    },
    contentStyle: {
      type: Object,
      default: () => {},
    },
    helpMsg: String,
  },
  data() {
    return {
      // 锚点适配
      // offsetTop: 0
    };
  },
  computed: {
    offsetTop() {
      return this.$refs.jvBlock.offsetTop - 160;
    },
  },
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.jv-block {
  margin-bottom: 10px;
  background-color: #fff;
  &-header {
    @include flexBox($jc: space-between);
    padding: 10px 15px;
    border-bottom: 1px solid rgb(214, 214, 214);
    .title {
      font-size: 14px;
      .help-msg {
        color: rgb(41, 41, 41);
        margin-left: 5px;
      }
    }
  }
  .content {
    padding: 10px;
  }
}
</style>
