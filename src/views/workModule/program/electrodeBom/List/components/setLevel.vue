<!--
 * @Author: H.
 * @Date: 2022-01-10 09:48:28
 * @LastEditTime: 2022-03-21 09:19:37
 * @Description:
-->
<template>
  <div>
    <jv-dialog
      :title="$t('design.De_SetLevel')"
      width="25%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmTask"
    >
      <div class="setup-level">
        <div class="setup-level-item">
          <el-radio v-model="PartLevel" style="margin-bottom: 20px" :label="0"
            >0</el-radio
          >
          <span style="color: gray">{{
            `（${$t("design.De_DoesntShowInProjectManagementPage")}）`
          }}</span>
        </div>
        <div>
          <el-radio v-model="PartLevel" :label="1">1</el-radio>
          <span style="color: gray">{{
            `（${$t("design.De_ShowInProjectManagementPage")}）`
          }}</span>
        </div>
      </div>
    </jv-dialog>
  </div>
</template>

<script>
import { update_bom_part_level } from "@/api/workApi/design/toolingBOM";

export default {
  name: "setLevel",
  data() {
    return {
      PartLevel: 1,
    };
  },
  created() {
    console.log(this.setLevelData, 556);
  },
  props: {
    setLevelData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    confirmTask() {
      const str = {
        PartNoList: this.setLevelData.map((x) => x.PartNo.value),
        PartLevel: this.PartLevel,
      };

      update_bom_part_level(str).then((res) => {
        console.log(res);
        this.$emit("confirmSetLevel", false);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.setup-level {
  display: flex;
  flex-direction: column;
}
</style>
