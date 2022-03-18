<template>
  <div @click="details">客户</div>
</template>

<script>
export default {
  methods: {
    details() {
      this.$router.push({
        name: "ClientDetails"
      });
    }
  }
};
</script>

<style></style>
