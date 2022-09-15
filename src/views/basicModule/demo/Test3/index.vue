<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2022-09-14 15:03:29
 * @Description: file content
-->
<template>
  <div>
    <el-button @click="init">init</el-button>
    <!-- <iframe id="frame" :src="src" frameborder="0" ref="iframe"></iframe> -->
  </div>
</template>
<script>
import { printPdf } from "~/utils/system/pdfPrint";
export default {
  name: "Home",

  data() {
    return {
      src: "",
    };
  },
  created() {},
  mounted: function () {},
  methods: {
    init() {
      printPdf(
        "http://192.168.1.22:9002/Pdf/c318763b-bcca-46d3-b77d-13269efd0543.pdf"
      );
    },
  },
};
</script>
