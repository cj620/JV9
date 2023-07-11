<!--
 * @Author: C.
 * @Date: 2021-09-15 09:50:28
 * @LastEditTime: 2023-07-11 16:55:04
 * @Description: file content
-->
<template>
  <!-- <div>
    <el-link type="primary" @click="linkTo">{{ state }}</el-link>
  </div> -->
  <div @click="linkTo" class="link-style" v-if="state">
    <i class="el-icon-document-copy copy-icon" @click.stop="copy"></i>
    {{ state }}
  </div>
</template>

<script>
import handleClipboard from "@/utils/clipboard";
export default {
  props: {
    state: [Array, String, Boolean, Object],
    rowData: {
      type: Object,
      default: () => {},
    },
    cpnProps: {
      type: Object,
      default: () => {},
    },
    routeName: String,
    routePath: String,
    methods: String,
    parameterKey: String,
    moreStaticParameters: {
      type: Object,
      default: () => {},
    },
    moreDynamicParameters: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    linkTo() {
      if (!this.state) return;
      if (this.routeCheck()) {
        this.$router.push(this.handleRoute());
      }
    },
    copy(e) {
      handleClipboard(this.state, e);
    },
    handleRoute() {
      let route = {};
      if (this.cpnProps.routeName) {
        route["name"] = this.cpnProps.routeName;
      } else if (this.cpnProps.routePath) {
        route["path"] = this.cpnProps.routePath;
      }

      let dynamicParameters = {};
      this.cpnProps.moreDynamicParameters?.forEach((item) => {
        dynamicParameters[item.keyName] = this.rowData[item.valueName] ?? "";
      });
      route[this.cpnProps.methods || "query"] = {
        [this.cpnProps.parameterKey]: this.state,
        ...dynamicParameters,
        ...this.cpnProps.moreStaticParameters,
      };
      return route;
    },
    routeCheck() {
      if (
        (this.cpnProps.routeName || this.cpnProps.routePath) &&
        this.cpnProps.parameterKey
      ) {
        return true;
      } else {
        console.error(
          "配置错误！请确保配置中存在routeName或者routePath，parameterKey"
        );
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.link-style {
  color: #409eff;
  @include ellipsis;
  cursor: pointer;
  .copy-icon {
    color: #909399;
    font-size: 15px;
  }
  &:hover {
    // text-decoration: dashed;
    text-decoration: underline;
  }
}
</style>
