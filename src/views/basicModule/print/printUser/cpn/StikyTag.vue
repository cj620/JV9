<!--
 * @Author: your name
 * @Date: 2021-11-22 13:53:49
 * @LastEditTime: 2022-08-16 10:07:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMEs9.1\src\views\basicModule\print\printUser\cpn\StikyTag.vue
-->
<template>
  <div class="print-tags-style">
    <el-image :src="qrUrl" class="tag-img"></el-image>
    <div class="tag-right-print">
      <div class="tag-txt">{{ cdata.UserName }}</div>
      <div class="tag-txt">
        {{ cdata.UserId }}
      </div>
      <div class="tag-txt">
        {{ cdata.DepartmentName }}
        <!-- 模具工程技术研发部 -->
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
      qrUrl: "",
     
    };
  },
  created() {
  

  },
  methods: {
    // 生成二维码
    async crateQrcode() {
      let barData = window.global_config.QRCodeFormat.user+this.cdata.UserId;
      this.qrUrl = await toDataURL(barData);
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
    // border: 1px solid #000;
    .tag-img {
      width: 20mm;
      height: 20mm;
    }
    .tag-right-print {
      // display: inline-block;
      position: absolute;
      top: 0mm;
      left: 20mm;
      width: 19mm;
     
    .tag-txt{
        padding-top: 2mm;
        width: 19mm;
    }
    }
  }
</style>
