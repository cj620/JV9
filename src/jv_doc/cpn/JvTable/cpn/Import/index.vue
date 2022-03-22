<!--
 * @Author: C.
 * @Date: 2021-09-23 09:37:31
 * @LastEditTime: 2022-03-22 13:21:35
 * @Description: file content
-->
<template>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="complete"
    @cancel="cancel"
    :loading="loading"
  >
    <div style="padding: 0 30px" class="import-form-wrapper">
      <el-form ref="form" label-width="100px" size="mini">
        <el-form-item :label="$t('Generality.Ge_FileName')">
          <div v-if="!fileName" @click="chooseFile" class="choose-file">
            {{ $t("Generality.Ge_SlectFile") }}
          </div>
          <div v-else class="file-del">
            {{ fileName }}
            <i class="el-icon-delete del-icon" @click="delCurrentFile"></i>
          </div>
          <input
            ref="excel-upload-input"
            class="excel-upload-input"
            type="file"
            accept=".xlsx"
            @change="handleClick"
            v-show="false"
          />
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_FileSize')" v-if="fileSize">
          {{ fileSize }}
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_FileType')">
          {{ fileType }}
        </el-form-item>
      </el-form>
    </div>
  </JvDialog>
</template>

<script>
import { saveTypeMap } from "../../../../maps";
import { getFileSize, getExtensionName } from "@/jv_doc/utils/file";
import XLSX from "xlsx";
export default {
  name: "Import",
  data() {
    // saveType,
    return {
      fileName: "",
      fileType: "",
      fileData: [],
      fileSize: "",
      loading: false,
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.setDefault();
    },
    complete() {
      this.$emit("complete", this.fileData);
      this.setDefault();
    },
    cancel() {},
    chooseFile() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {

      console.log(55);
      this.loading = true;
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      this.readerData(rawFile);
    },
    readerData(rawFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {

         
          
          const data = e.target.result;
           console.log(data,69696)
          const workbook = XLSX.read(data, { type: "array" });
           console.log(workbook,69696)
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const results = XLSX.utils.sheet_to_json(worksheet);
          let { size, name } = rawFile;
          this.fileName = name;
          this.fileType = this.getFileTypeName(this.fileName);
          this.fileSize = getFileSize(size);
          this.fileData = results;
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    setDefault() {
      // console.log(this.fileData);
      this.fileType = "*.xlsx";
      this.fileData = [];
      this.fileName = "";
      this.fileSize = "";
    },
    delCurrentFile() {
      this.setDefault();
    },
    getFileTypeName(fileName) {
      return saveTypeMap[getExtensionName(fileName)].label;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.import-form-wrapper {
  .choose-file {
    // padding: 5px 10px;
    border: 1px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    border-radius: 5px;
    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }
  .file-del {
    position: relative;
    .del-icon {
      position: absolute;
      right: 0;
      top: 5px;
      display: none;
      font-size: 20px;
      color: #409eff;
    }
    &:hover {
      color: #409eff;
      .del-icon {
        display: block;
      }
    }
  }
}
</style>
