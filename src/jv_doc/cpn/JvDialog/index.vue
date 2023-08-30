<!--
 * @Author: C.
 * @Date: 2021-06-10 19:40:23
 * @LastEditTime: 2022-03-23 17:49:51
 * @Description: file content
-->
<template>
  <div v-dialogDrag class="jv-dialog">
    <el-dialog
      ref="jvDialog"
      v-bind="$attrs"
      :width="widthCopy"
      v-on="$listeners"
      :close-on-click-modal="false"
      @opened="dialogOpened"
      :append-to-body="appendToBody"
      @keyup.enter.native="confirm"
    >
      <div class="jv-dialog-content" id="c-jv-dialog">
        <slot />
      </div>
      <div style="height: 30px" />
      <span class="absolute-footer" v-if="IsShowFooterBtn">
        <slot name="btn" />
        <el-button
          type="primary"
          size="mini"
          @click="confirm"
          :loading="loading"
          >{{ $t("Generality.Ge_OK") }}</el-button
        >
        <el-button size="mini" @click="cancel" v-if="IsShowCancelFooterBtn">{{
          $t("Generality.Ge_Cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dialogDrag } from "./drag";
export default {
  name: "JvDialog",
  directives: {
    dialogDrag,
  },
  props: {
    width: {
      type: String,
      default: "60%",
    },
    close: {
      type: Function,
      default: () => Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    IsShowFooterBtn: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    IsShowCancelFooterBtn: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  computed: {
    widthCopy() {
      if (this.width.charAt(this.width.length - 1) === "%") {
        const rate = this.width.replace("%", "") / 100;
        return document.body.clientWidth * rate * 0.9 + "px";
      } else {
        return this.width;
      }
    },
  },
  created() {
    this.dialogOpened();
  },
  methods: {
    handleClose() {},
    cancel() {
      this.$refs.jvDialog.handleClose();
      this.$emit("cancel");
    },
    confirm() {
      this.close();
      this.$emit("confirm");
    },
    dialogOpened() {
      if (!this.autoFocus) return;
      this.$nextTick(() => {
        document
          .getElementById("c-jv-dialog")
          ?.getElementsByTagName("input")?.[0]
          ?.focus();
      });
    },
  },
};
</script>

<style lang="scss">
// .jv-dialog {
//   position: relative;
//   .el-dialog .el-dialog__header {
//     background-color: #efefef;
//     padding: 7px 10px;
//   }
//   .el-dialog .el-dialog__header .el-dialog__headerbtn {
//     top: 12px;
//     right: 12px;
//     background: #ccc;
//     border-radius: 2px;
//   }
//   .absolute-footer {
//     position: absolute;
//     bottom: 15px;
//     right: 15px;
//   }
// }

.el-dialog .el-dialog__header {
  background-color: #efefef;
  padding: 7px 10px;
}
.el-dialog__body {
  padding: 0px;
}
.el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 12px;
  right: 12px;
  background: #ccc;
  border-radius: 2px;
}
.absolute-footer {
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 999;
}
.jv-dialog-content {
  max-height: 60vh;
  overflow: auto;
  padding: 30px 20px;
}
</style>
