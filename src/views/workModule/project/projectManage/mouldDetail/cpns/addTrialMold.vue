<template>
  <JvDialog
    :visible.sync="dialogShow"
    width="30%"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirm"
  >
    <JvForm :formObj="formObj">
      <template #BillId="{ prop }">
        <el-select
            v-model="formObj.form[prop]"
            clearable
        >
          <el-option
              v-for="item in formData"
              :key="item.BillId"
              :label="item.BillId"
              :value="item.BillId"
          >
            <span style="float: left">{{ item.BillId }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ taskTypeEnum[item.TaskType].name }}</span>
          </el-option>
        </el-select>
      </template>
    </JvForm>
  </JvDialog>
</template>
<script>
// 引入表格类
import { Form } from "@/jv_doc/class/form";
import { taskTypeEnum } from "@/enum/workModule";
export default {
  name: "addTrialMold",
  components: { taskTypeEnum },
  props: {
    addTrialMoldShow: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      formObj: {},
      dialogShow: false,
      taskTypeEnum,
    };
  },
  created() {
    this.formObj = new Form({
      formSchema:[
        {
          prop: "BillId",
          label: i18n.t("project.Pro_TaskSheetNo"),
          custom: true,
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter") + i18n.t("project.Pro_TaskSheetNo"),
              trigger: ["change", "blur"],
            },
          ],
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  methods: {
    setDialogShow() {
      this.dialogShow = !this.dialogShow;
    },
    confirm(){
      this.formObj.validate((valid) => {
        if (valid) {
          this.setDialogShow();
          let arr = this.formData.filter((item) => item.BillId === this.formObj.form.BillId)
          this.$emit('toAddMold',arr[0])
        } else {
          return false;
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-table__header-wrapper  .el-checkbox{
  display: none !important;
}
</style>
