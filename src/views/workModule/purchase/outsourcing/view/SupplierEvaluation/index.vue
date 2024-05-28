<template>
  <div>

    <button @click="getSupplierEvaluation">供应商评估</button>
  </div>
</template>

<script>
import {supplier_evaluation} from '@/api/workApi/purchase/outsourcing';
export default {
  data() {
    return {

    }
  },
  methods: {
    getSupplierEvaluation() {
      supplier_evaluation({StartDate: '2024-01-01', EndDate: '2024-05-28'}).then(res => {

      })
    }
  }
}
</script>



<style scoped lang="scss">

</style>
