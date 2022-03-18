<!--
 * @Author: H.
 * @Date: 2021-11-08 09:17:24
 * @LastEditTime: 2022-01-14 13:45:28
 * @Description:
-->
<template>
  <div>
    <user-form :UserId="UserId" type="edit"></user-form>
  </div>
</template>

<script>
import UserForm from "../components/index.vue";

export default {
  data() {
    return {
      UserId: this.$route.query.UserId,
    };
  },
  components: {
    UserForm,
  },
};
</script>

<style lang="scss" scoped></style>
