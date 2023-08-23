<!--
 * @Author: H.
 * @Date: 2021-12-28 08:41:41
 * @LastEditTime: 2022-01-10 14:19:10
 * @Description:
-->
<template>
  <div>
    <jv-dialog
      :title="$t('production.Pr_DoAPS')"
      width="30%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <!-- <el-date-picker v-model="StartDate" type="date"> </el-date-picker> -->
      <JvForm :formObj="formObj">
        <template #header-SchedulingType>
          {{$t("production.Pr_SchedulingAlgorithmSelection")}}
          <el-popover
            class="popoverTip"
            placement="top-start"
            trigger="hover"
          >
            <template v-for="item in tipContent">
              <p class="popoverTipItem">{{ item }}</p>
            </template>
            <i class="el-icon-question" slot="reference" style="color:#1890ff"/>
          </el-popover>
        </template>
      </JvForm>
    </jv-dialog>
  </div>
</template>

<script>
import { do_aps } from "@/api/workApi/production/aps";
import { formSchema } from "./calculateTimeTableConfig";
import { AlgorithmTypeEnum } from "@/enum/workModule/production";
import { Form } from "@/jv_doc/class/form";
export default {
  name: "calculateTime",
  data() {
    return {
      StartDate: new Date(),
      formObj: {},
      tipContent:[],
    };
  },
  created() {
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.formObj.form.StartDate = this.StartDate;
    this.tipContent = AlgorithmTypeEnum.getEnums().map(obj => obj.description)
  },
  methods: {
    //点击计算排程
    confirmItem() {
      this.$emit("loading", true);
      do_aps({
        StartDate: this.formObj.form.StartDate,
        SchedulingType: this.formObj.form.SchedulingType,
      }).then((res) => {
        if (res.OverloadBills.length > 0) {
          this.$router.push({
            name: "ProductionScheduleCalculate",
            params: {
              data: res.OverloadBills,
              time: this.StartDate,
              SchedulingType: this.formObj.form.SchedulingType,
            },
          });
          this.$emit("cancel");
        } else {
          this.$emit("completed");
        }
        this.$emit("loading", false);
      }).catch(() => {
        this.$emit("loading", false);
      });
    },
  },
};
</script>

<style scoped></style>
