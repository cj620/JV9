<!--
 * @Author: C.
 * @Date: 2022-10-11 09:25:41
-->
<!--  页面-->
<template>
  <el-popover placement="bottom" v-model="visible">
    <div class="pop-id-list">
      <div v-for="item in tableObj.selectData.datas" class="list-item">
        <i class="el-icon-close item-close" @click="itemClick(item)"></i
        >{{ item[rowId] }}
      </div>
    </div>
    <div style="text-align: right; margin-top: 10px">
      <el-button size="mini" type="text" @click="cancel">
        {{ $t('Generality.Ge_Cancel') }}
      </el-button>
      <el-button type="primary" size="mini" @click="clear">
        {{ $t('Generality.Ge_tagClose') }}
      </el-button>
    </div>

    <template slot="reference">
      <div class="form-tag">
        {{ $t('Generality.Ge_SelectedItems.str1') }}
        <span class="tag-count">{{ tableObj.selectData.keys.length }}</span>
        {{ $t('Generality.Ge_SelectedItems.str2') }}
        <i class="el-icon-arrow-down a-down"></i>
        <i class="el-icon-circle-close a-close" @click.stop="clear"></i>
      </div>
    </template>
  </el-popover>
</template>
<script>
export default {
  // 组件的标识
  name: "",
  data() {
    return {
      visible: false,
    };
  },
  props: {
    tableObj: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    cancel() {
      this.visible = false;
      // this.$emit("fresh");
    },
    //note: there is a bug,when i choose a item after change the page's number , then the selection is added twice
    itemClick(item) {
      // console.log(item);
      this.tableObj?.tableRef?.toggleRowSelection(item);
      this.checkSelect(item);
    },
    checkSelect(item) {
      if (!this.tableObj.selectData.keys.includes(item[this.rowId])) return;
      this.tableObj?.tableRef?.toggleRowSelection(item);
    },
    clear() {
      this.tableObj?.tableRef?.clearSelection();
    },
  },
  computed: {
    rowId() {
      return this.tableObj.props.rowId;
    },
  },
};
</script>
<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.pop-id-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 0 20px;
  .list-item {
    // background-color: #eee;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    border-bottom: 1px dashed #ccc;
    position: relative;
    .item-close {
      position: absolute;
      font-size: 17px;
      left: -20px;
      top: 6px;
      font-weight: bold;
      cursor: pointer;
      background-color: #eee;
      &:hover {
        background-color: #ccc;
      }
    }
  }
}
.form-tag {
  // @include flexBox;
  display: inline-flex;
  gap: 4px;
  align-items: center;

  padding-block: 0;
  padding-inline: 8px;

  height: 30px;
  font-size: 14px;
  line-height: 30px;

  border-radius: 2px;
  cursor: pointer;
  margin-left: 3px;
  background-color: rgba(0, 0, 0, 0.08);
  .tag-count {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }
  @include ellipsis;
  i {
    font-size: 15px;
    font-weight: bold;
  }
  .a-down {
    display: block;
  }
  .a-close {
    display: none;
    // color: gray;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    .a-down {
      display: none;
    }
    .a-close {
      display: block;
    }
  }
}
</style>
