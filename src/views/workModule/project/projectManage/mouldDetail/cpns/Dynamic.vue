<!--
 * @Author: your name
 * @Date: 2021-11-30 17:17:48
 * @LastEditTime: 2022-01-07 10:16:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\cpns\Dynamic.vue
-->
<template>
  <JvDialog v-bind="$attrs" v-on="$listeners" @confirm="complete">
    <JvForm :formObj="formObj" style="margin-bottom: 15px"> </JvForm>
    <JvUploadList v-model="ImgList" :listType="true" :limit="4"></JvUploadList>
  </JvDialog>
</template>

<script>
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { Form } from "@/jv_doc/class/form";
export default {
  components: {
    JvUploadList,
  },
  data() {
    return {
      ImgList: [],
      formObj: {},
    };
  },
  created() {
    this.formObj = new Form({
      formSchema: [
        {
          prop: "Remarks",
          label: this.$t("Generality.Ge_Describe"),
          cpn: "FormInput",
          type: "textarea",
          options: {
            // 是否展示文字长度限制
            showWordLimit: true,
            // 长度限制
            maxlength: 100,
          },
        },
      ],
    });
  },
  methods: {
    complete() {
      // console.log(5555555555);
      this.$emit(
        "dynamicConfirm",
        Object.assign(
          {
            Images: this.ImgList.map((item) => ({ ImageUrl: item })),
          },
          this.formObj.form
        )
      );
      // 重置
      this.formObj.reset();
      this.ImgList = [];
    },
  },
};
</script>

<style></style>
