<!--
 * @Author: C.
 * @Date: 2021-10-12 09:41:51
 * @LastEditTime: 2023-02-07 15:10:16
 * @Description: 员工选择
-->
<template>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="$emit('confirm')"
    style="z-index: 3333"
    width="50%"
    :append-to-body="true"
    @open="dialogOpen"
  >
    <JvDetail :detailObj="detailObj">
      <template #BillId="{ record }">
        <a @click="toDetail" style="color: #2a9bf1">{{ record }}</a>
      </template>
    </JvDetail>
    <JvTable :table-obj="fileTable">
      <template #operation="{ row, scope }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Download'),
              confirm: downLoad.bind(null, {
                params: {
                  FileUrl: row.FileUrl,
                },
                fileName: row.FileName,
              }),
            },
          ]"
        ></TableAction>
      </template>
    </JvTable>
    <el-divider content-position="left">零件图纸</el-divider>
    <el-button type="primary" @click="downLoadProductImg"
      >下载零件图纸</el-button
    >
  </JvDialog>
</template>

<script>
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "./config";
import { detailConfig } from "./config";
import { getBillFile } from "@/api/basicApi/systemSettings/upload";
import { downLoad } from "@/jv_doc/utils/file/index";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";

export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      detailObj: null,
      fileTable: null,
      preImgUrl: [],
    };
  },
  created() {
    this.fileTable = new Table();
  },
  methods: {
    downLoad,
    toDetail() {
      this.$router.push({
        name: "Pm_ProjectTask_Detail",
        query: { BillId: this.cdata.BillId },
      });
    },
    GetData() {
      getBillFile({ OwnerId: this.cdata.BillId }).then((res) => {
        this.fileTable.setData(res.Items);
      });
    },
    dialogOpen() {
      this.detailObj = new Detail({
        data: this.cdata,
        schema: detailConfig,
      });
      this.GetData();
    },
    downLoadProductImg() {
      downLoad({
        params: {
          Version: this.cdata.ProductVersion,
          PartNo: this.cdata.PartNo,
        },
        url: `/files/down_file_ftp`,
      });
    },
  },
};
</script>

<style lang="scss"></style>
