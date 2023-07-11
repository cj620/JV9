<!--
 * @Author: C.
 * @Date: 2022-08-18 18:28:21
-->
<template>
  <div class="jv-table-keyword">
    <template v-if="formObj.formSchema && formObj.formSchema.length !== 0">
      <slot></slot>
      <div v-for="item in formObj.formSchema" :key="item.prop">
        <FormTag
          :formObj="formObj"
          :formItem="item"
          v-if="item._label && formObj.form[item.prop] && !item.hidden"
          @fresh="$emit('fresh')"
        ></FormTag>
      </div>
    </template>
  </div>
</template>

<script>
import FormTag from "../TableHeader/formTag.vue";
import SelectTag from "./SelectTag.vue";
export default {
  props: {
    formObj: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    FormTag,
    SelectTag,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.jv-table-keyword {
  // width: 100%;
  // background-color: #CCC;
  margin-right: 10px;
  @include flexBox($jc: flex-start);
  // overflow: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;
}
</style>
