<!--
 * @Author: your name
 * @Date: 2021-11-08 15:07:28
 * @LastEditTime: 2021-11-09 15:03:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvEditTable\cpns\HeaderPopver\index.vue
-->
<!--
 * @Author: C.
 * @Date: 2021-09-10 14:12:04
 * @LastEditTime: 2021-11-08 14:59:09
 * @Description: file content
-->
<template>
  <el-popover v-model="visible" placement="bottom">
    <FormItem :cdata="getFormItem(cdata)" :form="form"></FormItem>
    <div style="text-align: right; margin-top: 5px">
      <!-- 取消 -->
      <el-button size="mini" type="text" @click="reset">{{$t('Generality.Ge_Cancel')}}</el-button>
            <!-- 设置 -->
      <el-button type="primary" size="mini" @click="setData">{{$t('Generality.Ge_Settings')}}</el-button>
    </div>
    <!-- 批量设置 -->
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('Generality.Ge_MultipleSetup')"
      placement="top-start"
      slot="reference"
    >
      <i class="el-icon-s-tools filter-icon" />
    </el-tooltip>
  </el-popover>
</template>

<script>
import FormItem from "../../../JvForm/cpn/FormItem.vue";
export default {
  // name: "Popover",
  components: {
    FormItem,
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      form: {},
    };
  },
  created() {
    this.init();
  },
  computed: {
    getFormItem() {
      return (item) => {
        return Object.assign({}, item, {
          cpn: item.formCpn,
        });
      };
    },
  },
  methods: {
    init() {
      this.form = {
        [this.cdata.prop]: "",
      };
    },
    reset() {
      this.$emit("reset");
      this.visible = false;
    },
    setData() {
      this.$emit("confirm", {
        prop: this.cdata.prop,
        value: this.form[this.cdata.prop],
      });
      this.visible = false;
      this.init();
    },
  },
};
</script>

<style></style>
