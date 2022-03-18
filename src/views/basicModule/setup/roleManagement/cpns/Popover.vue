<!--
 * @Author: C.
 * @Date: 2021-09-10 14:12:04
 * @LastEditTime: 2022-01-20 17:41:25
 * @Description: file content
-->
<template>
  <el-popover v-model="visible" placement="bottom">
    <slot />
    <div style="text-align: right; margin-top: 5px">
      <el-button size="mini" type="text" @click="reset">{{
        $t("Generality.Ge_Reset")
      }}</el-button>
      <el-button type="primary" size="mini" @click="search">{{
        $t("Generality.Ge_OK")
      }}</el-button>
    </div>
    <i
      slot="reference"
      class="j-set-icon el-icon-s-tools"
      @click="$emit('click')"
    />
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

<style lang="scss">
.j-set-icon {
  color: #2a9bf1;
  font-size: 16px;
}
</style>
