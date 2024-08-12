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
                label: $t('setup.Preview'),
                hidden: ![...P_inSite, ...P_offSite].includes(
                  row.FileType.toLocaleLowerCase()
                ),
                confirm: preview.bind(null, row),
              },
              {
                label: $t('Generality.Ge_Download'),
                confirm: download.bind(null, row),
              },
              {
                label: $t('Generality.Ge_Delete'),
                confirm: handleRemove.bind(null, scope),
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
    <el-image-viewer
      v-if="showViewer"
      :on-close="
        () => {
          showViewer = false;
        }
      "
      :url-list="[preImgUrl]"
    />

    <jv-dialog
      :visible.sync="ExcelPreviewVisible"
      v-if="ExcelPreviewVisible"
      title="Excel"
      width="90%"
      @confirm="ExcelPreviewVisible = false"
      :custom-style="{
        maxHeight: '100vh',
      }"
    >
      <ExcelPreview ref="ExcelPreviewRef" />
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { tableConfig } from "./config";
import { uploadFiles, getBillFile } from "@/api/basicApi/systemSettings/upload";
import { getToken } from "@/utils/auth";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { P_inSite, P_offSite } from "@/enum/baseModule/fileEnum/previewEnum";
import axios from "axios";
import ExcelPreview from "@/components/ExcelPreview/index.vue";
import JvDialog from "~/cpn/JvDialog/index.vue";
export default {
  name: "index",
  components: {
    JvDialog, ExcelPreview,
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer"),
  },
  data() {
    return {
      tableFileObj: {},
      showViewer: false,
      fileList: [],
      preImgUrl: "",
      ExcelPreviewVisible: false,
      P_inSite,
      P_offSite,
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
      console.log(this.tableFileObj, this.fileList);
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
        // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
        // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
        // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = res.data;
        const blob = new Blob([content]); // 构造一个blob对象来处理数据
        const fileName = row.FileName; // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
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
    preview(row, scope) {
      console.log(row, 194194);
      // 判断是excel则本地弹窗预览
      if(row.FileType === '.xlsx' || row.FileType === '.xls') {
        console.log(row.FileType,197)
        this.ExcelPreviewVisible = true;
        this.$nextTick(() => {
          this.$refs.ExcelPreviewRef.FilePreviewDialogHandle('xlxs', imgUrlPlugin(row.FileUrl))
        })
      } else {
        this.preImgUrl = imgUrlPlugin(row.FileUrl);
        if (this.P_inSite.includes(row.FileType)) {
          this.showViewer = true;
        } else {
          window.open(this.preImgUrl, "_blank");
        }
      }

    },
  },
};
</script>

<style scoped lang="scss">
.upload-cpn-style {
  /* padding-bottom: 15px; */
  // .el-upload {
  //   display: block !important;
  // }
  .el-empty {
    padding: 0 !important;
  }
}
</style>
