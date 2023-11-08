<!--
 * @Author: your name
 * @Date: 2021-11-23 15:01:18
 * @LastEditTime: 2021-12-09 10:33:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\addProject.vue
-->
<!--新增项目-->
<template>
    <div>
      <jv-dialog
      :title="$t('sale.Sa_AddProject')"
      width="35%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmAddProject"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj">
      </JvForm>
    </jv-dialog>
    </div>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
export default {
  name: 'addProject',
  data(){
    return{
      formObj: {},
    }
  },
  async created() {
    this.formObj = new Form({
      formSchema:[
        {
          // 项目
          prop: 'Project',
          cpn: "FormInput",
          label: i18n.t("menu.Pm_Project"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: [ 'blur']
            }
          ]
        },
        {
          // 备注
          prop: 'Remarks',
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_Remarks"),
        },
      ],
      baseColProps: {
        span: 24,
      },

      labelWidth: "80px",
    });
  },
  methods:{
    //确认保存项目
    confirmAddProject(){
      this.formObj.validate((valid) => {
        if (valid) {
        this.$emit('confirmAddProject', this.formObj.form)
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
