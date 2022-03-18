<!--
 * @Author: H.
 * @Date: 2021-11-09 12:58:07
 * @LastEditTime: 2022-01-24 17:21:31
 * @Description: 设备
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #ShowInProdSchedule="{ row }">
        {{ row.ShowInProdSchedule?$t('Generality.Ge_Show'):$t('Generality.Ge_Hide') }}
      </template>
      <template #operation="{ row }">

        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteProcess.bind(null, [row.DeviceNo]),
              },
            },
          ]"
        ></TableAction
      ></template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add.bind(),
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :visible.sync="dialogVisible"
      :title="devicesDialogTitle"
      @confirm="dialogConfirm"
      width="30%"
      v-if="dialogVisible"
      autoFocus
    >
      <div class="devices-title">
        {{ $t("Generality.Ge_EquipmentPicture") }}
      </div>
      <div class="devices-img" @click="dialogFormVisible = true">
        <div
          v-if="
            formObj.form.PhotoUrl &&
            formObj.form.PhotoUrl !== '' &&
            formObj.form.PhotoUrl !== null
          "
        >
          <img
            :src="imgUrlPlugin(formObj.form.PhotoUrl)"
            :onerror="errorDefaultImg"
            alt=""
            class="avatr"
          />
        </div>
        <div v-else>
          <img
            src="https://static.xinheyun.net/2458972eb1db3e7fcce23c53a27319dd.png"
            alt=""
          />
          <!-- <div class="edit-users-content-header-title">点击上传图片</div> -->
        </div>
      </div>

      <JvForm :formObj="formObj">
        <template #DeviceNo="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
        <template #Device="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
        <template #TimeSpan="{ prop }">
          <el-input v-model="formObj.form[prop]" style="width: 90%"></el-input>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('Generality.Ge_TimeFormat')"
            placement="right"
          >
            <span
              class="el-icon-warning-outline"
              style="margin-left: 10px; font-size: 20px"
            ></span>
          </el-tooltip>
        </template>

        <template #ShowInProdSchedule="{ prop }">
          <el-radio-group v-model="formObj.form[prop]">
            <el-radio :label="true" >{{$t('Generality.Ge_Show')}}</el-radio>
            <el-radio :label="false">{{$t('Generality.Ge_Hide')}}</el-radio>
          </el-radio-group>
        </template>
        <!-- <template #PhotoUrl="{ prop }"> </template> -->
      </JvForm>
    </JvDialog>
    <jv-dialog
      :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="confirmImg"
    >
      <JvUploadList
        v-model="ImgDataList"
        :listType="false"
        @change="changeImg"
      ></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import {
  deleteDevice,
  UpdateDevice,
  AddDevice,
} from "@/api/workApi/production/baseData";
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvUploadList from "@/components/JVInternal/JvUpload/List";

export default {
  data() {
    return {
      tableObj: {},
      formObj: {},
      ImgDataList: [],
      dialogVisible: false,
      dialogFormVisible: false,
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
      devicesDialogTitle: this.$t("Generality.Ge_Edit"),
      isEdit: false,
    };
  },
  methods: {
    imgUrlPlugin,
    deleteProcess(ids) {
      deleteDevice(ids).then(() => this.tableObj.getData());
    },
    changeImg(e) {},
    edit(row) {
      this.devicesDialogTitle = this.$t("Generality.Ge_Edit");
      this.dialogVisible = true;
      this.isEdit = true;
      this.formObj.form = JSON.parse(JSON.stringify(row));
    },
    //图片点击确认事件
    confirmImg() {
      this.dialogFormVisible = false;
      this.formObj.form.PhotoUrl = this.ImgDataList.toString();
      this.ImgDataList = [];
    },
    add() {
      this.dialogVisible = true;
      this.isEdit = false;

      this.devicesDialogTitle = this.$t("Generality.Ge_New");

      this.formObj.form = {
        DeviceNo: "",
        Device: "",
        TimeSpan: "",
        CostRate: "",
        ShowInProdSchedule: true,
        MaxQuantiyUpMachine: "",
      };
    },
    dialogConfirm() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            UpdateDevice(this.formObj.form).then(() => {
              this.tableObj.getData();
              this.dialogVisible = false;
            });
          } else {
            AddDevice(this.formObj.form).then(() => {
              this.tableObj.getData();
              this.dialogVisible = false;
            });
          }
        }
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  mounted() {},
  computed: {},
  components: {
    JvUploadList,
  },
};
</script>

<style lang="scss" scoped>
.devices-img {
  width: 131px;
  height: 131px;
  border: 1px rgba(0, 0, 0, 0.25) dashed;
  background: whitesmoke;
  border-radius: 5px;
  margin-bottom: 20px;

  .avatr {
    width: 126px;
    height: 126px;
  }
}
.devices-title {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
  font-weight: 700;
}
</style>
