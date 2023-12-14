<template>
  <div>
    <EditCom :billData="billData" :type="type"> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";
export default {
  name: "As_MaintenancePlan_Add",
  components: {
    EditCom,
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
}
</script>
