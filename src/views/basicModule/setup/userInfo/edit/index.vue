<!--
 * @Author: H.
 * @Date: 2021-12-13 09:56:34
 * @LastEditTime: 2021-12-13 09:56:34
 * @Description:
-->
<template>
  <user-form :UserId="UserId" type="edit"></user-form>
</template>

<script>
import UserForm from "../components/index.vue";
export default {
  data() {
    return {
      UserId: this.$route.query.UserId,
    };
  },
  methods: {},
  created() {
    console.log(this.UserId, "UserId");
  },
  mounted() {},
  computed: {},
  components: {
    UserForm,
  },
};
</script>

<style lang="scss" scoped></style>
