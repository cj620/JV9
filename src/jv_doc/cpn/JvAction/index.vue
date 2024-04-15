<!--
 * @Author: C.
 * @Date: 2021-09-17 14:10:09
 * @LastEditTime: 2022-01-14 09:55:07
 * @Description: file content
-->
<template>
  <div class="jv-action-btn-group">
    <el-button-group>
      <slot></slot>
      <el-button
        :type="actionType"
        :icon="actionsItem.icon"
        :size="size"
        v-for="(actionsItem, index) in actions"
        v-if="!actionsItem.hidden"
        :key="index"
        :disabled="isDisabled(actionsItem)"
        @click="confirm(actionsItem)"
        >{{ actionsItem.label }}</el-button
      >

      <el-dropdown v-if="dropDownActions.length != 0">
        <el-button icon="el-icon-more" :size="size"> </el-button>
        <el-dropdown-menu slot="dropdown" class="icon-color">
          <el-dropdown-item
            v-for="(dActionItem, index) in dropDownActions"
            :key="index"
            :disabled="isDisabled(dActionItem)"
            @click.native="confirm(dActionItem)"
          >
            <span
              ><i :class="dActionItem.icon" style="margin: 0 7px"></i>
              {{ dActionItem.label }}</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>
    <span style="margin-left: 15px">
      <el-button
        type="primary"
        :size="size"
        :icon="primaryItem.icon"
        v-for="(primaryItem, index) in primary"
        :key="index"
        :disabled="isDisabled(primaryItem)"
        @click="confirm(primaryItem)"
        >{{ primaryItem.label }}</el-button
      >
    </span>
    <JvDialog
      :visible.sync="dialogVisible"
      :title="$t('Generality.Ge_Remind')"
      @confirm="dialogConfirm"
      width="30%"
    >
      <span style="font-size: 16px">{{ popConfirm.title }}</span>
    </JvDialog>
  </div>
</template>

<script>
export default {
  name: "Action",
  props: {
    actions: {
      type: Array,
      default: () => [],
    },
    dropDownActions: {
      type: Array,
      default: () => [],
    },
    primary: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "default",
    },
    actionType: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      dialogVisible: false,
      popConfirm: {},
    };
  },
  computed: {
    isDisabled() {
      return (config) => {
        return config?.disabled ?? false;
      };
    },
  },
  methods: {
    confirm(actionItem) {
      // console.log(actionItem);
      // if(actionItem)
      if (actionItem.confirm) {
        actionItem.confirm();
      } else if (actionItem.popConfirm && actionItem.popConfirm.confirm) {
        this.popConfirm = actionItem.popConfirm;
        this.dialogVisible = true;
      }
    },
    dialogConfirm() {
      // console.log(this.popConfirm, 5565665);
      this.popConfirm.confirm();
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.jv-action-btn-group {
  .el-button-group > .el-dropdown > .el-button {
    border-left-color: #dcdfe6;
  }
}
// .el-button-group > .el-dropdown > .el-button
</style>
