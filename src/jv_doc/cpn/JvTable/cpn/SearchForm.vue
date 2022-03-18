<!--
 * @Author: C.
 * @Date: 2021-07-12 15:12:53
 * @LastEditTime: 2022-02-24 18:43:30
 * @Description: file content
-->
<template>
  <!-- 表单搜索抽屉 -->
  <el-drawer
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    direction="rtl"
    :with-header="false"
    size="25%"
  >
    <div class="table-search-form">
      <div class="title">{{ $t("Generality.Ge_SearchForm") }}</div>
      <el-divider />
      <JvForm :formObj="formObj" ref="jvFormRef" :autoFocus="true"> </JvForm>
      <div class="btn-footer">
        <!-- 重置 -->
        <el-button style="margin-right: 10px" @click="$emit('reset')">{{
          $t("Generality.Ge_Reset")
        }}</el-button>
        <!-- 搜索 -->
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-right: 30px"
          @click="$emit('search')"
          >{{ $t("Generality.Ge_Search") }}</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "SearchForm",
  props: {
    formObj: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    aa() {
      alert("ok");
    },
  },
  created() {
    // console.log(this.formObj, 5558778);
  },
  watch: {
    "$attrs.visible": {
      handler(n, o) {
        console.log(11111);
        if (n) {
          this.$refs?.jvFormRef?.theFirstInputFocus?.();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table-search-form {
  position: relative;
  padding: 30px;
  height: 100%;
  .title {
    color: rgb(77, 77, 77);
    font-size: 20px;
  }
  .btn-footer {
    width: 100%;
    height: 75px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: end;
    border-top: 1px solid #ccc;
    padding-top: 20px;
  }
}
.table-search-form .el-form-item__label {
  font-size: 12px;
  // line-height: 20px;
}
</style>
