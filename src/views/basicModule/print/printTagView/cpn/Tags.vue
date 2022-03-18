<!--
 * @Author: your name
 * @Date: 2021-11-22 13:53:49
 * @LastEditTime: 2021-11-22 15:18:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \TestProjectGit\src\pages\system\print\tagView\cpns\tags.vue
-->
<template>
  <div class="print-tags-style">
    <div class="tags-billid">
      {{ cdata.BillId }}
    </div>
    <el-image :src="qrUrl" class="tag-img"></el-image>
    <div class="tag-right-print">
      <div class="tags-resid">{{ cdata.PartNo }}</div>
      <div class="tags-date">
        {{ cdata.PlanEnd | timeFormat("dd-MM-yyyy") }}
      </div>
    </div>
  </div>
</template>

<script>
import { toDataURL } from "qrcode";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      qrUrl: ""
    };
  },
  created() {
    console.log(this.cdata, 415545456);
  },
  methods: {
    // 生成二维码
    async crateQrcode() {
      let barData = this.cdata.BillId;
      this.qrUrl = await toDataURL("O!_" + barData);
    }
  },
  mounted() {
    this.crateQrcode();
  }
};
</script>

<style lang="scss">
  .print-tags-style {
    width: 40mm;
    height: 20mm;
    background-color: #fff;
    font-size: 12px;
    position: relative;
    .tag-right-print {
      // display: inline-block;
      position: absolute;
      top: 6mm;
      left: 15mm;
      width: 29mm;
      .tags-resid {
        width: 25mm;
        word-break: break-all;
      }
      .tags-date {
        margin-top: 1mm;
      }
    }
    .tag-img {
      width: 15mm;
      height: 15mm;
    }
    .tags-billid {
      padding-left: 1mm;
      padding-top: 1mm;
    }
  }
</style>
