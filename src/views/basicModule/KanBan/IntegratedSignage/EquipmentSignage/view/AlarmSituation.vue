<template>
  <div style="height: calc(100% - 10px);">
    <dRollList :tableConfig="tableConfig" :result="result" id="AlarmSituation"></dRollList>
  </div>
</template>

<script>
import dRollList from "../components/d-roll-list.vue";
export default {
  name: "AlarmSituation",
  components: { dRollList },
  props: {
    result: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableConfig: [
        {
          prop: 'Area',
          label: i18n.t('DataV.Da_Area'),
        },
        {
          prop: 'Equipment',
          label: i18n.t('DataV.Da_Equipment'),
        },
        {
          prop: 'AlarmTime',
          label: i18n.t('DataV.Da_AlarmTime'),
        },
        {
          prop: 'AlarmInfo',
          label: i18n.t('DataV.Da_AlarmInfo')
        },
      ]
    }
  },
}
</script>

<style scoped lang="scss">

</style>
