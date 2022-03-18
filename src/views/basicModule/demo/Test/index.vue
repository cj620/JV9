<template>
  <div>
    <el-button @click="init">init</el-button>
    <!-- <iframe id="frame" :src="src" frameborder="0" ref="iframe"></iframe> -->
  </div>
</template>
<script>
import { printPdf } from "~/utils/system/pdfPrint";
import axios from "axios";
import { DownFile } from "@/api/basicApi/systemSettings/upload";
import request from "@/utils/request";
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
