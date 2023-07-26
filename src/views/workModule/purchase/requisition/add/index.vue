<!--
 * @Author: H.
 * @Date: 2021-11-10 09:48:47
 * @LastEditTime: 2021-12-21 10:09:01
 * @Description: 新增采购订单
-->

<!-- <template>
  <AddRequisition />
</template>

<script>
import AddRequisition from "../components/index.vue";
export default {
  name: "Pu_Requisition_Add",
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
  components: {
    AddRequisition,
  },
};
</script>

<style lang="scss" scoped></style> -->

<template>
  <AddRequisition :billData="billData" :type="type"></AddRequisition>
</template>

<script>
import AddRequisition from "../components/index.vue";
export default {
  name: "Pu_Requisition_Add",
  components: {
    AddRequisition,
  },
  data() {
    return {
      type: undefined,
      billData: "",
    };
  },
  methods: {},
  created() {
    console.log(this.$route.query);
    this.billData = this.$route.query.BillId;
    this.type = this.$route.query.type;
  },
};
</script>

<style lang="scss" scoped></style>
