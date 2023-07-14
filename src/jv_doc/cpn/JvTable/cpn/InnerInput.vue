<!--
 * @Author: C.
 * @Date: 2022-08-31 14:24:04
 * @LastEditTime: 2022-08-31 15:44:25
 * @Description: file content
-->
<template>
  <el-input size="mini" @input="input" v-model="form[keyName]"></el-input>
</template>

<script>
import { debounce } from "~/utils/optimization";
export default {
  props: ["form", "keyName"],
  methods: {
    input(e) {
      debounce(() => {
        this.$emit("change");
      });
    },
  },
};
</script>

<style></style>
