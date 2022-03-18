<!--
 * @Author: H.
 * @Date: 2021-12-28 08:41:41
 * @LastEditTime: 2022-01-10 14:19:10
 * @Description:
-->
<template>
  <div>
    <jv-dialog
      :title="$t('production.Pr_StartScheduleTime')"
      width="30%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <el-date-picker v-model="StartDate" type="date"> </el-date-picker>
    </jv-dialog>
  </div>
</template>

<script>
import { do_aps } from "@/api/workApi/production/aps";
export default {
  name: "calculateTime",
  data() {
    return {
      StartDate: new Date(),
    };
  },
  methods: {
    //点击计算排程
    confirmItem() {
      do_aps({ StartDate: this.StartDate }).then((res) => {
        console.log(res.ExpiredBills);
        console.log(res.OverloadBills);
        if (res.OverloadBills.length > 0) {
          this.$router.push({
            name: "ProductionScheduleCalculate",
            params: {
              data: res.OverloadBills,
              time: this.StartDate,
            },
          });
          this.$emit("cancel");
        } else {
          this.$emit("cancel");
        }
      });
    },
  },
};
</script>

<style scoped></style>
