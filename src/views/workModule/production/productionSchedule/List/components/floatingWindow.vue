<script>
import i18n from "@/i18n/i18n";
export default {
  name: "floatingWindow",
  data() {
    return {
      item: null,
      i18n,
    };
  },
  created() {},
  watch: {
    item(val) {
      console.log(val);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="item">
      <div>{{ i18n.t("Generality.Ge_ProcessName") }}：{{ item.Process }}</div>
      <div>{{ i18n.t("Generality.Ge_PlanTime") }}：{{ item.PlanTime }}H</div>
      <div>
        {{ i18n.t("production.Pr_PlanningDevices") }}：{{ item.PlanDevice }}
      </div>
      <div>{{ i18n.t("Generality.Ge_PlanStart") }}：{{ item._PlanStart }}</div>
      <div>{{ i18n.t("Generality.Ge_PlanEnd") }}：{{ item._PlanEnd }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
