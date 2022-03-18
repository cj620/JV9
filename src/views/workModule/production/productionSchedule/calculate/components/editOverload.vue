<!--修改超负荷-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_EditDeliveryDate')"
      width="30%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <JvForm :formObj="formObj">
        <template #PlanDevice="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
              v-for="item in DeviceNoList"
              :key="item.DeviceNo"
              :label="item.DeviceNo"
              :value="item.DeviceNo"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </jv-dialog>
  </div>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { getResourceMember } from "@/api/workApi/production/baseData";
import { modify_aps_result } from "@/api/workApi/production/aps";
export default {
  name: "editOverload",
  data() {
    return {
      formObj: {},
      DeviceNoList: [],
    };
  },
  props: {
    editOverloadData: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    this.formObj = new Form({
      formSchema: [
        {
          // 计划开始
          prop: "PlanStart",
          cpn: "SingleDateTime",
          label: i18n.t("Generality.Ge_PlanStart"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
        {
          // 计划结束
          prop: "PlanEnd",
          cpn: "SingleDateTime",
          label: i18n.t("Generality.Ge_PlanEnd"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
        {
          // 计划机台
          prop: "PlanDevice",
          label: i18n.t("production.Pr_PlanningDevices"),
          custom: true,
        },
        {
          // 备注
          prop: "Remarks",
          cpn: "FormInput",
          label: this.$t("Generality.Ge_Remarks"),
        },
      ],
      baseColProps: {
        span: 24,
      },
      gutter: 30,
      labelWidth: "80px",
      labelPosition: "top",
    });
    this.Configuration();
    this.formObj.form.PlanStart = this.editOverloadData.PlanStart;
    this.formObj.form.PlanEnd = this.editOverloadData.PlanEnd;
    this.formObj.form.PlanDevice = this.editOverloadData.PlanDevice;
    this.formObj.form.TaskProcessId = this.editOverloadData.Id;
  },
  methods: {
    //获取计划设备
    Configuration() {
      getResourceMember({ ResourceId: this.editOverloadData.Resource }).then(
        (res) => {
          this.DeviceNoList = res.Items;
        }
      );
    },
    //确定修改
    confirmItem() {
      modify_aps_result(this.formObj.form).then((res) => {
        this.$emit("editOverloadCancel");
      });
    },
  },
};
</script>

<style scoped></style>
