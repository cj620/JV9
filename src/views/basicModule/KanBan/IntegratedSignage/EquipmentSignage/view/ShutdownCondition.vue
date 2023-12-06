<template>
  <div style="height: calc(100% - 30px);">
    <dRollList :tableConfig="tableConfig" :result="result" id="ShutdownCondition" />
  </div>
</template>

<script>
import dRollList from "../components/d-roll-list.vue";
export default {
  name: "ShutdownCondition",
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
          prop: 'State',
          label: i18n.t('DataV.Da_State'),
        },
        {
          prop: 'DownTime',
          label: i18n.t('DataV.Da_DownTime')
        },
        {
          prop: 'StartTime',
          label: i18n.t('DataV.Da_StartTime')
        },
      ]
    }
  },
}
</script>

<style scoped lang="scss">

</style>

