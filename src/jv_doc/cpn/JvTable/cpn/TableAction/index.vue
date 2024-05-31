<!--
 * @Author: C.
 * @Date: 2021-09-14 08:52:23
 * @LastEditTime: 2022-02-15 17:07:11
 * @Description: file content
-->
<template>
  <div class="table-action">
    <span
      class="point-link"
      v-for="(actionItem, index) in actions"
      :key="index"
    >
      <!-- 有确认框的文字按钮 -->
      <el-popconfirm
        :title="actionItem.popConfirm.title"
        v-if="actionItem.popConfirm && !actionItem.disabled"
        @confirm="popConfirm(actionItem)"
      >
        <i :class="actionItem.icon" slot="reference" style="font-style: normal"
          ><span>{{ actionItem.label }}</span></i
        >
      </el-popconfirm>
      <!-- 不带确认框的文字按钮 -->
      <span
        v-else-if="actionItem.badge"
        @click="confirm(actionItem, actionItem.disabled)"
        :class="{ 'btn-disabled': actionItem.disabled }"
        >
        <i :class="actionItem.icon"></i>
        <el-badge v-if="actionItem.badgeValue && actionItem.badgeValue !== 0" :value="actionItem.badgeValue" class="button-badge">
          {{ actionItem.label }}
        </el-badge>
        <span v-else>{{ actionItem.label }}</span>
      </span>
      <span
        v-else
        @click="confirm(actionItem, actionItem.disabled)"
        :class="{ 'btn-disabled': actionItem.disabled }"
        ><i :class="actionItem.icon"></i> {{ actionItem.label }}</span
      >
      <span v-if="index !== actions.length - 1" class="break-line">|</span>
    </span>

    <!-- 下拉框 -->
    <el-dropdown v-if="dropDownActions.length != 0">
      <span class="point-link">
        <span class="break-line">|</span>
        <i class="el-icon-more el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="icon-color">
        <el-dropdown-item
          v-for="(dActionItem, index) in dropDownActions"
          :key="index"
        >
          <!-- 有确认框的文字按钮 -->
          <el-popconfirm
            :title="dActionItem.popConfirm.title"
            v-if="dActionItem.popConfirm && !dActionItem.disabled"
            @confirm="popConfirm(dActionItem)"
          >
            <i :class="dActionItem.icon" slot="reference"
              ><span style="margin: 0 7px">{{ dActionItem.label }}</span></i
            >
          </el-popconfirm>
          <!-- 不带确认框的文字按钮 -->
          <span
            v-else
            @click="confirm(dActionItem, dActionItem.disabled)"
            :class="{ 'btn-disabled': dActionItem.disabled }"
            ><i :class="dActionItem.icon" style="margin: 0 7px"></i>
            {{ dActionItem.label }}</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "TableAction",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    confirm(actionItem, disabled) {
      if (disabled) return;
      actionItem?.confirm() ?? "";
    },
    popConfirm(actionItem) {
      actionItem?.popConfirm?.confirm() ?? "";
    },
  },
  props: {
    actions: {
      type: Array,
      default: () => [],
    },
    dropDownActions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.table-action {
  .point-link {
    cursor: pointer;
    color: #0960bd;
  }
  .break-line {
    color: #ccc;
    margin: 0 5px;
    font-size: 12px;
  }
  .btn-disabled {
    color: rgb(161, 161, 161);
  }
}
.button-badge .el-badge__content {
  height: 12px;
  line-height: 11px;
  font-size: 11px;
  overflow: visible;
  padding: 0 3px;
  top: 4px;
  right: 2px;
}
.button-dot-badge .el-badge__content {
  top: 4px;
  right: 2px;
}
</style>
