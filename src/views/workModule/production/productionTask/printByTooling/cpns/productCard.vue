<!--
 * @Author: C.
 * @Date: 2022-02-16 14:19:09
 * @LastEditTime: 2022-02-24 15:03:32
 * @Description: file content
-->
<template>
  <div class="product-card">
    <div class="product-img">
      <el-image
        style="width: 64px; height: 64px"
        :src="imgUrlPlugin(cdata.PhotoUrl)"
        fit="fill"
        class="productionTask-Img-error"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline error-icon"></i>
        </div>
      </el-image>
    </div>
    <div class="product-content">
      <div class="content">
        <ProductContent :cdata="cdata"></ProductContent>
      </div>
      <div class="craft-list">
        <CraftList :cdata="cdata.Process"></CraftList>
      </div>
    </div>

    <div class="qr-code">
      <el-image
        style="width: 64px; height: 64px"
        :src="qrUrl"
        fit="fill"
        class="productionTask-Img-error"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline error-icon"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import ProductContent from "./productContent.vue";
import { toDataURL } from "qrcode";
import CraftList from "./craftList.vue";
export default {
  components: { ProductContent, CraftList },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      qrUrl: "",
    };
  },
  mounted() {
    this.crateQrcode();
  },
  methods: {
    imgUrlPlugin,
    // 生成二维码
    async crateQrcode() {
      // this.qrUrl = await toDataURL(this.data[this.cdata.prop]);
      let barData = "O!_" + this.cdata.BillId;

      this.qrUrl = await toDataURL(barData);
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";

.product-card {
  // width: 100%;
  height: 80px;
  // background-color: pink;
  margin: 5px 0 10px 0;
  border: 1px solid rgb(214, 214, 214);
  padding: 0 15px;
  @include shadow;
  @include flexBox($jc: flex-start);
  position: relative;
  .product-img,
  .qr-code {
    width: 75px;
    height: 75px;
    @include flexBox;

    .productionTask-Img-error {
      background-color: rgb(231, 231, 231);

      .image-slot {
        width: 100%;
        height: 100%;
        @include flexBox;
        // color: rgb(161, 161, 161);
        border: 1px dashed #ccc;
        .error-icon {
          color: rgb(161, 161, 161);
          font-size: 19px;
        }
      }
    }
  }
  .qr-code {
    position: absolute;
    right: 0;
    top: 0;
  }
  .product-content {
    // width: calc(100% - 75px);
    height: 75px;
    // background-color: blue;
    .content {
      height: 50%;
      padding-top: 12px;
      // @include flexBox($jc: flex-start);
    }
    .craft-list {
      // height: 50%;
      // @include flexBox($jc: flex-start, $ai: flex-start);
    }
  }
}
</style>
