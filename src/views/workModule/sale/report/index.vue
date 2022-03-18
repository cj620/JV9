<template>
  <div>1</div>
  <!--  <keep-alive :include="cachedViews">
    <router-view :key="key" />
  </keep-alive>-->
</template>

<script>
export default {
  name: "Sa_Report",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped></style>
