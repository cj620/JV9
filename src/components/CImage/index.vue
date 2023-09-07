<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "index",
  methods: {
    imgUrlPlugin
  }
}
</script>

<template>
  <div class="custom-image">
    <el-image
      v-bind="$attrs"
      v-on="$listeners"
      :src="imgUrlPlugin($attrs.src)"
      :preview-src-list="$attrs['preview-src-list'] || $attrs.previewSrcList ?
      [imgUrlPlugin($attrs['preview-src-list'] || $attrs.previewSrcList)] : []"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<style lang="scss">
.custom-image{
  width: 100%;
  height: 100%;
  .el-image {
    width: 100%;
    height: 100%;
    .image-slot {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e7e7e7;
      color: #a1a1a1;
      font-size: 160%;
    }
  }
}

</style>
