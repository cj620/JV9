<!--
 * @Author: C.
 * @Date: 2021-09-10 14:12:04
 * @LastEditTime: 2022-02-24 18:57:46
 * @Description: file content
-->
<template>
  <el-popover v-model="visible" placement="bottom" id="jvPopover">
    <slot />
    <div style="text-align: right; margin-top: 5px">
      <el-button size="mini" type="text" @click="reset">{{
        $t("Generality.Ge_Reset")
      }}</el-button>
      <el-button type="primary" size="mini" @click="search">{{
        $t("Generality.Ge_Search")
      }}</el-button>
    </div>
    <i slot="reference" class="el-icon-search filter-icon" />
<!--    <svg-icon slot="reference" icon-class="filter" style="cursor: pointer"/>-->
  </el-popover>
</template>

<script>
export default {
  // name: "Popover",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    reset() {
      this.$emit("reset");
      this.visible = false;
    },
    search() {
      this.$emit("confirm");
      this.visible = false;
    },
    keyupEnter() {
      document.onkeyup = (e) => {
        // let keyCode = window.event.keyCode;
        // console.log(e);
        if (window.event.keyCode == 13) {
          this.search();
        }
      };
    },
  },
  watch: {
    visible: {
      handler(n, o) {
        if (n) {
          this.keyupEnter();
          setTimeout(() => {
            this.$slots.default?.[0]?.elm
              ?.getElementsByTagName("input")?.[0]
              ?.focus();
          });
        } else {
          document.onkeyup = undefined;
        }
      },
    },
  },
};
</script>

<style></style>
