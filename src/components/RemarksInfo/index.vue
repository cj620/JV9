<!--
 * @Author: your name
 * @Date: 2021-10-27 09:45:10
 * @LastEditTime: 2022-01-20 13:31:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\components\RemarksInfo\c-menu.vue
-->
<!--备注信息-->
<template>
  <JvBlock title="备注信息">
    <div class="remarks-info-content">
      <div class="remarks-info-content-remarks">
        <el-input
          type="textarea"
          :rows="2"
          :placeholder="$t('Generality.Ge_PleaseEnter')"
          v-model="value.remark"
        >
        </el-input>
      </div>
      <div class="remarks-info-content-annex">
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :http-request="changeHandle"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">{{
            $t("Generality.Ge_ClickUploadPicture")
          }}</el-button>
          <div slot="tip" class="el-upload__tip">
            {{ $t("Generality.Ge_FileSizeCannotBeGreaterThan100MB") }}
          </div>
        </el-upload>
      </div>
    </div>
  </JvBlock>
</template>

<script>
import { uploadSingleFile } from "@/api/workApi/materials/fileUpload";
export default {
  name: "remarksInfo",
  data() {
    return {
      textarea: "",
      fileList: [],
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    changeHandle(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      uploadSingleFile(formData).then((res) => {
        this.fileList.push({
          name: res,
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        });
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="scss" scoped>
.remarks-info-content {
  padding: 15px;
  .remarks-info-content-remarks {
    margin-bottom: 20px;
  }
}
</style>
