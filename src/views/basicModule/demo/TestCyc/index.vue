<!--
 * @Author: H.
 * @Date: 2021-11-09 10:36:15
 * @LastEditTime: 2022-01-20 17:17:07
 * @Description: 生产排程
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
      <!-- 表格操作行 -->
      <Action
        :actions="[
          {
            label: $t('production.Pr_Calculate'),
            confirm: calculate.bind(null),
          },

          {
            label: $t('production.Pr_CheckLoad'),
            confirm: equipmentLoad.bind(null),
          },
          {
            label: $t('production.Pr_Release'),
            popConfirm: {
              title: $t('Generality.Ge_WhetherReleaseSchedulingResults'),
              confirm: release.bind(null),
            },
          },
          {
            label: $t('production.Pr_APSLog'),
            confirm: openApsLog.bind(null),
          }
        ]"
        size="mini"
      >
      </Action>
      <calculateTime
      v-if="calculateTimeDialogFormVisible"
      :visible.sync="calculateTimeDialogFormVisible"
      @cancel="cancel"
      ></calculateTime>
      <apsLog
      v-if="apsDialogFormVisible"
      :visible.sync="apsDialogFormVisible"
      ></apsLog>
  </PageWrapper>
</template>
<script>
import { do_publish } from "@/api/workApi/production/aps";
import calculateTime from "./components/calculateTime";
import apsLog from "./components/apsLog.vue";

export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: {
    calculateTime,
    apsLog,
  },
  data() {
    return {
      calculateTimeDialogFormVisible: false,
      apsDialogFormVisible:false,
    };
  },
  methods: {
    //计算
    calculate() {
      this.calculateTimeDialogFormVisible = true;
    },
    //关闭计算
    cancel() {
      this.calculateTimeDialogFormVisible = false;
    },
    //查看设备负荷
    equipmentLoad() {
      this.$router.push({
        name: "ProductionDetailedLoad",
      });
    },
    //发布APS结果
    release() {
      do_publish().then((res) => {
        console.log(res);
      });
    },
    // 查看排程日志
    openApsLog(){
      this.apsDialogFormVisible = true;
      console.log('触发了弹出日志',this.apsDialogFormVisible);
    }
  },
};
</script>
