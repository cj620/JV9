<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
-->
<template>
  <PageWrapper :footer="false">
    <div @click="chooseFile" class="choose-file">
      {{ $t("Generality.Ge_SelectFile") }}
    </div>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx"
      @change="handleClick"
    />


    <div class="mxdiv" style="width: 100%;height: 90vh">
      <canvas id="mxcad"></canvas>
    </div>
  </PageWrapper>
</template>
<script>
import XLSX from "xlsx";

// import  { MxFun }  from "mxdraw"
export default {
  data() {
    return {};
  },
  mounted() {
   /*  // 配置 鼠标点击图形 自定选中该图形对象
    MxFun.setIniset({
      // 启用对象选择功能.
      EnableIntelliSelect: true,
      // 选择类型
      IntelliSelectType: 1,
      // 是否开启多个选择
      multipleSelect: false,
    }); */
    // 创建控件对象
    MxFun.createMxObject({
      canvasId: "mxcad", // canvas元素的id
      cadFile: "./XYK20231019B.dwg",
      useWebsocket: false,
    });
    console.log(MxFun,56789)
  },
  methods: {
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
          console.log(data, 69696);
          const workbook = XLSX.read(data, { type: "array" });
          console.log(workbook, 69696);
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const results = XLSX.utils.sheet_to_json(worksheet);
          console.log(results, "results");
          this.handleExcelData(results);
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    handleExcelData(res = []) {
      let endIndex = res.findIndex((item) => {
        return !item["__EMPTY"] && !item["__EMPTY_1"];
      });
      let data = res.slice(4, endIndex - 1);
      let result = data.map((item) => {
        return {
          PartNo: item["__EMPTY_1"] || "",
          PartName: item["__EMPTY"] || "",
          Description2: item["__EMPTY_2"] || "",
          Quantity: item["__EMPTY_3"] || "",
          Description: this.handleDescription([
            item["__EMPTY_4"],
            item["__EMPTY_5"],
            item["__EMPTY_6"],
          ]),
          SupplierName: item["__EMPTY_7"] || "",
          Remarks: item["__EMPTY_8"] || "",
        };
      });
      console.log(result);
    },
    handleDescription(descArr = []) {
      let arr = descArr.filter((item) => !!item);
      return arr.join("*");
    },
  },
};
</script>
<style lang="scss" scoped>


</style>
