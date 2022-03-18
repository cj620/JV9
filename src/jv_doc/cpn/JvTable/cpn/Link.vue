<!--
 * @Author: C.
 * @Date: 2021-09-15 09:50:28
 * @LastEditTime: 2021-11-24 16:58:00
 * @Description: file content
-->
<template>
  <el-link type="primary" @click="linkTo">{{ state }}</el-link>
</template>

<script>
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
      if (this.routeCheck()) {
        this.$router.push(this.handleRoute());
      }
    },
    handleRoute() {
      let route = {};
      if (this.cpnProps.routeName) {
        route["name"] = this.cpnProps.routeName;
      } else if (this.cpnProps.routePath) {
        route["path"] = this.cpnProps.routePath;
      }

      console.log(this.cpnProps.moreDynamicParameters, this.rowData, 8879798);

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

<style></style>
