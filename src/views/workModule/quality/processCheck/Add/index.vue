<template>
  <div>
    <EditCom> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";

export default {
  name: "Qc_ProcessCheck_Add",
  components: {
    EditCom,
  },

  methods: {},
  activated() {
    console.log(11111);
  },
};
</script>
