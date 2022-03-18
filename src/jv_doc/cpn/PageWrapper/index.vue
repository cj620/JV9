<!--
 * @Author: C.
 * @Date: 2021-09-15 13:12:57
 * @LastEditTime: 2022-01-24 09:24:59
 * @Description: file content
-->
<template>
  <div class="c-page-wrapper" ref="pageWrapper">
    <!-- <div class="sticky-bottom-to-top sticky-top" v-if="$slots['sticky-top']">
      <slot name="sticky-top"></slot>
    </div> -->
    <!-- 头部 -->
    <div
      class="page-header"
      ref="pageHeader"
      v-if="title || content || $slots.content || $slots.footer || $slots.extra"
    >
      <!-- 顶部 -->
      <div class="page-header-heading" v-if="title">
        <span class="title">{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
      <!-- 描述 -->
      <div class="page-content" v-if="content || $slots.content">
        <div v-if="content" class="page-content-text">{{ content }}</div>
        <slot name="content"></slot>
      </div>
    </div>

    <div
      class="sticky-line sticky-top"
      v-if="$slots['sticky-tabs'] || $slots['sticky-extra']"
    >
      <slot name="sticky-tabs" class="sticky-tabs"></slot>
      <div class="sticky-extra"><slot name="sticky-extra"></slot></div>
    </div>

    <!-- 默认插槽 -->
    <div class="main-content" :style="mainContentHeight">
      <slot></slot>
      <!-- 底部边距适配 （待优化）-->
      <div
        v-if="$slots.fixedFooter"
        :style="{ height: $slots.fixedFooter ? '70px' : '10px' }"
      ></div>
      <div
        v-if="!$slots.fixedFooter && headerHeight !== 0"
        :style="{ height: '10px' }"
      ></div>
      <JvFooter v-if="footer"></JvFooter>
    </div>

    <div class="fixed-footer" v-if="$slots.fixedFooter" v-show="footerShow">
      <el-button style="margin-right: 10px" v-if="isBack" @click="back">{{
        $t("Generality.Ge_Back")
      }}</el-button>
      <slot name="fixedFooter"> </slot>
    </div>
  </div>
</template>

<script>
import { scrollTo } from "@/jv_doc/utils/system";
import JvFooter from "@/jv_doc/cpn/JvFooter";
export default {
  name: "PageWrapper",
  components: {
    JvFooter,
  },
  props: {
    title: String,
    content: String,
    isBack: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      footerShow: false,
      headerHeight: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.footerShow = true;
    }, 700);
    this.headerHeight = this.$refs?.pageHeader?.offsetHeight ?? 0;
  },
  methods: {
    back() {
      // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      // this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)

      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    scrollTo(endValue) {
      scrollTo(this.$refs.pageWrapper, endValue);
    },
  },
  computed: {
    mainContentHeight() {
      return {
        height: `calc(100% - ${this.headerHeight}px)`,
      };
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.c-page-wrapper {
  // height: ca;
  // padding-bottom: 800px;
  height: calc(100vh - 100px);
  overflow: auto;
  .page-header {
    width: 100%;
    background-color: #fff;
    // height: 200px;
    padding: 15px 20px 0px 20px;
    &-heading {
      @include flexBox($jc: space-between);
      padding: 5px 0;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .page-content {
      padding: 7px 0;
      &-text {
        font-size: 14px;
      }
    }
  }
  .main-content {
    padding: 15px 20px 0 20px;
  }
  .sticky-line {
    width: 100%;
    // @include flexBox($jc: space-between);
    background-color: #fff;
    padding: 15px 20px 0 20px;
    // position: relative;
    // // sticky-tabs
    // .sticky-extra {
    //   position: absolute;
    //   right: 0;
    //   top: -10px;
    // }
    .el-tabs__nav-scroll {
      padding-top: 20px;
    }
  }
}
.fixed-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  padding: 10px 24px;
  line-height: 44px;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;
  box-shadow: 0 -6px 16px -8px #00000014, 0 -9px 28px #0000000d,
    0 -12px 48px 16px #00000008;
  transition: width 1s;
  @include flexBox($jc: flex-end);
}
.sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 8;
  .sticky-extra {
    position: absolute;
    right: 30px;
    top: 7px;
  }
  box-shadow: 0 6px 8px 4px #00000014;
}
</style>
