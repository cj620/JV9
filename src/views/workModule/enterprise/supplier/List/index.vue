<template>
  <div @click="details">供应商</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    details() {
      this.$router.push({
        name: "Pu_Supplier_Detail",
      });
    },
  },
};
</script>

<style></style>
