<!--
 * @Author: your name
 * @Date: 2021-11-22 13:53:49
 * @LastEditTime: 2022-08-12 10:50:57
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \TestProjectGit\src\pages\system\print\tagView\cpns\tags.vue
-->
<template>
  <div class="print-tags-card">
    <el-image :src="qrUrl" class="QR_code"></el-image>
    <div class="tags-billid">
      {{ cdata.Device }}
    </div>
  </div>
</template>

<script>
import { toDataURL } from "qrcode";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
    BillKey: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      qrUrl: "",
    };
  },
  created() {
    console.log(this.cdata, 415545456);
  },
  methods: {
    // 生成二维码
    async crateQrcode() {
      let barData =
        window.global_config.QRCodeFormat.device + this.cdata.Device;
      console.log(barData);
      this.qrUrl = await toDataURL(barData);
    },
  },
  mounted() {
    this.crateQrcode();
  },
};
</script>

<style lang="scss">
.print-tags-card {
  width: 70px;
  height: 70px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  .QR_code {
    width: 50px;
    height: 50px;
  }
}
</style>
