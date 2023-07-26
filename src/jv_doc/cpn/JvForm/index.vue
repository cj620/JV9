<!--
 * @Author: C.
 * @Date: 2021-07-12 15:12:53
 * @LastEditTime: 2022-02-24 18:50:49
 * @Description: file content
-->
<template>
  <div>
    <el-form
      v-bind="elFormBind"
      class="c-jv-form"
      id="c-jv-form"
      size="mini"
      :model="formObj.form"
      :rules="formObj.rules"
      ref="ruleForm"
      @submit.native.prevent
    >
      <el-row :gutter="formProps.gutter">
        <el-col
          v-bind="formProps.baseColProps"
          v-for="formItem in formObj.formSchema"
          :key="formItem.prop"
          :style="{
            height: formObj.props.labelPosition == 'top' ? '75px' : 'auto',
          }"
          v-show="!formItem.hidden"
        >
          <el-form-item
            :prop="formItem.prop"
            v-if="formItem.custom"
            :label="showLabel ? formItem.label : ''"
          >
            <slot :name="formItem.prop" :prop="formItem.prop"></slot>
          </el-form-item>

          <el-form-item
            orm-item
            :prop="formItem.prop"
            v-else
            :label="showLabel ? formItem.label : ''"
          >
            <FormItem
              :cdata="formItem"
              :form="formObj.form"
              :formObj="formObj"
            ></FormItem>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import FormItem from "./cpn/FormItem.vue";
export default {
  name: "JvForm",
  components: {
    FormItem,
  },
  mounted() {
    this.formObj.formRef = this.$refs.ruleForm;
    this.theFirstInputFocus();
  },
  beforeMount() {
    this.formObj.formRef = null;
  },
  props: {
    formObj: {
      type: Object,
      default: () => {},
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      addFieldShow: false,
    };
  },
  computed: {
    formProps() {
      return this.formObj.props;
    },
    elFormBind() {
      let { labelPosition, labelWidth } = this.formObj.props;
      return {
        labelPosition,
        labelWidth,
      };
    },
  },
  created() {},
  methods: {
    theFirstInputFocus() {
      if (this.autoFocus || this.formObj.props.autoFocus) {
        this.$nextTick(() => {
          this.$refs.ruleForm.$el[0]?.focus();
          this.$refs.ruleForm.$el[0]?.select();
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.c-jv-form {
  .el-date-editor--daterange {
    width: 100%;
  }
  .el-date-editor--date {
    width: 100%;
  }
  .el-form-item .el-form-item__label {
    padding: 0;
  }
  .el-select {
    width: 100%;
  }

  .el-date-editor {
    width: 100%;
  }
}
</style>
