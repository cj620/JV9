<!--
 * @Author: C.
 * @Date: 2022-10-11 09:25:41
-->
<!--  页面-->
<template>
  <div>
    <el-popover placement="bottom" v-model="visible">
      <div class="form-name">{{ formItem.label }}:</div>
      <InnerForm :cdata="formItem" :form-obj="formObj" />

      <div style="text-align: right; margin-top: 5px">
        <el-button size="mini" type="text" @click="tagClose(formItem)">
          {{ $t("Generality.Ge_tagClose") }}
        </el-button>
        <el-button type="primary" size="mini" @click="search">
          {{ $t("Generality.Ge_Search") }}
        </el-button>
      </div>

      <template slot="reference">
        <div class="form-tag">
          <!-- {{ formItem._label }} -->
          {{
            type_3.includes(formItem.cpn)
              ? timeFormat(formItem._label)
              : formItem._label
          }}

          <i class="el-icon-arrow-down a-down"></i>
          <!-- todo: when data is default ,make sure the close tag -->
          <!-- v-show="formItem.default !== formObj.form[formItem.prop]" -->
          <i
            class="el-icon-circle-close a-close"
            @click.stop="tagClose(formItem)"
          ></i>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script>
import InnerForm from "../InnerForm.vue";
import { timeFormat } from "~/utils/time";
export default {
  // 组件的标识
  name: "",
  components: {
    InnerForm,
  },
  props: {
    formObj: {
      type: Object,
      default: () => {},
    },
    formItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      tagTypes: ["", "success", "danger", "warning"],
      type_0: ["FormInput"],
      type_1: ["SyncSelect", "AsyncSearch"],
      type_2: ["FormRadio", "FormSelect", "FormCheckBox"],
      type_3: ["SingleTime", "SingleDateTime", "DateRange", "TimePicker"],
    };
  },
  created() {
    console.log(this.formItem);
  },
  methods: {
    timeFormat,
    tagClose(schemaItem) {
      // this.formObj.form[schemaItem.prop] = "";
      // schemaItem._label = "";
      // this.$emit("tagclose");
      this.formObj.form[schemaItem.prop] = schemaItem?.default ?? "";

      if (!this.type_1.includes(schemaItem.cpn)) {
        let staticList = schemaItem?.options?.list ?? false;
        if (staticList && schemaItem.default) {
          let res = staticList.find(
            (item) => item.value === schemaItem.default
          );
          if (res) {
            schemaItem._label = res.label;
          }
        }
      } else {
        schemaItem._label = schemaItem.default;
      }

      // item._label = "";
      // this.$emit("fresh");
      this.search();
    },
    search() {
      this.visible = false;
      this.$emit("fresh");
    },
  },
  computed: {},
};
</script>
<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.form-name {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
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
