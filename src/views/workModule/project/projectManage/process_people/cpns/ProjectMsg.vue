<!--
 * @Author: your name
 * @Date: 2021-11-23 11:01:30
 * @LastEditTime: 2022-01-07 10:32:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\process_people\cpns\ProjectMsg.vue
-->
<template>
  <div class="card-style mag-card">
    <!-- 图片 -->
    <div class="img-style">
      <el-image
        style="width: 105px; height: 105px"
        class="productionTask-details-img"
        :src="imgUrlPlugin(cdata.PhotoUrl)"
        :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
      >
          <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline error-icon"></i>
          </div>

      </el-image>
    </div>
    <!-- 项目 -->

    <el-tooltip
      effect="dark"
      :content="$t('Generality.Ge_ToolingNo') + ':' + cdata.ToolingNo"
      placement="top-start"
    >
      <div class="card-text">
        <span>{{ cdata.ToolingNo }}</span>
      </div>
    </el-tooltip>

    <!-- 模具 -->

    <el-tooltip
      effect="dark"
      :content="$t('Generality.Ge_ToolingNo') + ':' + cdata.ToolingNo"
      placement="top-start"
    >
      <div class="card-text link-type">
<!--        <i class="el-icon-setting"></i>-->
        <span class="link-type" @click="toMouldDetail">{{
          cdata.ToolingNo
        }}</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imgUrlPlugin,
    toMouldDetail() {
      // ToolingNo
      this.$router.push({
        name: "ProjectManage_MouldDetail",
        query: { BillId: this.cdata.ToolingNo },
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.card-style {
  width: 120px;
  height: 160px;
  @include shadow;
  @include cardHover;
  background-color: #fff;
  margin: 5px;
}
.mag-card {
  padding: 5px;
  .img-style {
    // padding-top: 5px;
    @include flexBox;
  }
  .card-text {
    margin-top: 5px;
    font-size: 14px;
    width: 100px;
    @include ellipsis;
  }
  .link-type {
    &:hover {
      text-decoration: underline;
    }
  }
}
.productionTask-details-img {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
