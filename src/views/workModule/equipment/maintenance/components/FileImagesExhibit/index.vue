<!--上传文件接口-->
<template>
  <div class="upload-cpn-style">
    <el-upload
      action="#"
      ref="uploadCpn"
      :http-request="changeHandle"
      multiple
      :file-list="fileList"
      :show-file-list="false"
      v-show="false"
    >
    </el-upload>
    <div v-if="fileList.length !== 0">
      <JvTable :table-obj="tableFileObj">
        <template #operation="{ row, scope }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Download'),
                confirm: download.bind(null, row),
              },
              {
                label: $t('Generality.Ge_Delete'),
                popConfirm: {
                  title: $t('Generality.Ge_DeleteConfirm'),
                  confirm: handleRemove.bind(null, scope),
                },
              },
            ]"
          /> </template
        ></JvTable>
    </div>
    <el-empty
      v-else
      :description="$t('Generality.Ge_FileSizeCannotBeGreaterThan100MB')"
      :image-size="100"
    >
    </el-empty>
  </div>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { tableConfig } from "./config";
import { uploadFiles, getBillFile } from "@/api/basicApi/systemSettings/upload";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      tableFileObj: {},
      fileList: [],
    };
  },
  props: {
    BillId: {
      type: String,
      default: () => "",
    },
  },
  async created() {
    this.tableFileObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: true,
      height: 250,
    });
    if (this.BillId !== "") {
      await this.GetData();
    }
  },
  methods: {
    upload() {
      this.$refs.uploadCpn.$refs["upload-inner"].handleClick();
    },
    async GetData() {
      await getBillFile({ OwnerId: this.BillId }).then((res) => {
        this.fileList = res.Items;
        this.tableFileObj.setData(res.Items);
        this.returnFileData(this.tableFileObj.tableData);
      });
    },
    handleRemove(scope) {
      this.tableFileObj.delItem(scope.$index);
      this.fileList = this.tableFileObj.tableData;
      this.returnFileData(this.tableFileObj.tableData);
    },
    //下载上传的附件
    download(row) {
      axios({
        baseURL: window.global_config.Base_Url + "/files/down_file",
        method: "post",
        responseType: "blob", // 服务器返回的数据类型
        params: {
          // 其他参数
          FileUrl: row.FileUrl,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Ba " + getToken(),
        },
        data: {},
      }).then((res) => {
        const content = res.data;
        const blob = new Blob([content]); // 构造一个blob对象来处理数据
        const fileName = row.FileName; // 导出文件名

        if ("download" in document.createElement("a")) {
          // 支持a标签download的浏览器
          const link = document.createElement("a"); // 创建a标签
          link.download = fileName; // a标签添加属性
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click(); // 执行下载
          URL.revokeObjectURL(link.href); // 释放url
          document.body.removeChild(link); // 释放标签
        } else {
          // 其他浏览器
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //文件上传
    changeHandle(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      uploadFiles(formData).then((res) => {
        this.fileList.push(res[0]);
        this.tableFileObj.setData(this.fileList);
        this.returnFileData(this.tableFileObj.tableData);
      });
    },
    //文件上传返回数据
    returnFileData(fileData) {
      this.$emit(
        "returnData",
        fileData.map((x) => x.FileUrl)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.upload-cpn-style {
  .el-empty {
    padding: 0 !important;
  }
}
</style>
