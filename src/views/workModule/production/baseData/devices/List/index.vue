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
          {
            label: $t('Generality.Ge_Print'),
            confirm: printMachine.bind(),
          },
          {
            label: $t('design.De_DownloadTemplate'),
            confirm: downLoadTemplate.bind(),
          },
          {
            label: $t('Generality.Ge_Import'),
            confirm: importDevices.bind(),
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :visible.sync="dialogVisible"
      :title="devicesDialogTitle"
      @confirm="dialogConfirm"
      width="30vw"
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

      <div class="jvForm-box">
        <JvForm :formObj="formObj">
          <template #DeviceNo="{ prop }">
            <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
          </template>
          <template #Device="{ prop }">
            <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
          </template>
          <template #TimeSpan="{ prop }">
            <div style="display:flex;align-items: center;margin-bottom: 10px"
                 v-for="(item, i) in TimeSpanList" :key="i">
              <el-time-picker
                is-range
                v-model="TimeSpanList[i]"
                format="HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="pickerChange"
                placeholder="选择时间范围">
              </el-time-picker>
              <div style="width: 70px;display: flex">
                <div class="el-icon-plus" v-if="i === TimeSpanList.length-1" style="border-radius: 50%; border: 1px solid #ccc;padding: 4px;margin-left: 6px;cursor: pointer" @click="TimeSpanList.push('')"></div>
                <div class="el-icon-minus" v-if="i !== 0" style="border-radius: 50%; border: 1px solid #ccc;padding: 4px;margin-left: 6px;cursor: pointer" @click="TimeSpanList.splice(i,1)"></div>
              </div>
            </div>
          </template>

          <template #ShowInProdSchedule="{ prop }">
            <el-radio-group v-model="formObj.form[prop]">
              <el-radio :label="true" >{{$t('Generality.Ge_Show')}}</el-radio>
              <el-radio :label="false">{{$t('Generality.Ge_Hide')}}</el-radio>
            </el-radio-group>
          </template>
          <!-- <template #PhotoUrl="{ prop }"> </template> -->
        </JvForm>
      </div>
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
    <Import
      :visible.sync="importShow"
      width="420px"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
    <JvDialog
      v-if="editTableShow"
      :visible.sync="editTableShow"
      width="70%"
      :title="$t('Generality.Ge_Import')"
      @confirm="confirmImport"
    >
      <JvEditTable :tableObj="editTableObj">
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
        <template #ShowInProdSchedule="{ row }">
          <el-checkbox v-model="row.ShowInProdSchedule.value"></el-checkbox>
        </template>
      </JvEditTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import {
  deleteDevice,
  UpdateDevice,
  AddDevice,
  BatchAddDevice,
} from "@/api/workApi/production/baseData";
import { Table } from "./config";
import { EditTable } from "./editConfig"
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { export2Excel } from "~/cpn/JvTable/utils/export2Excel";
import { format2source } from "@/jv_doc/class/utils/dataFormat";

export default {
  data() {
    return {
      tableObj: {},
      formObj: {},
      editTableObj: {},
      ImgDataList: [],
      dialogVisible: false,
      dialogFormVisible: false,
      importShow: false,
      editTableShow: false,
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
      devicesDialogTitle: this.$t("Generality.Ge_Edit"),
      isEdit: false,
      exportTemplate: [
        {
          prop: "DeviceNo",
          label: i18n.t("production.Pr_DeviceNo"),
        },
        {
          prop: "Device",
          label: i18n.t("production.Pr_DeviceName"),
        },
        {
          prop: "TimeSpan",
          label: i18n.t("production.Pr_TimeSpan"),
        },
        {
          prop: "CostRate",
          label: i18n.t("production.Pr_CostRate"),
        },
        {
          prop: "MaxQuantiyUpMachine",
          label: i18n.t("production.Pr_MaximumNumberOfWorkSheet"),
        }
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: this.$t("menu.Pr_Devices"),
      },
      TimeSpanList: [null,null],
    };
  },
  methods: {
    imgUrlPlugin,
    pickerChange(e) {
      console.log(e);
      console.log(this.TimeSpanList);
    },
    printMachine() {
      this.$router.push({
        name: "printMachine",
        params: {
          Data: this.tableObj.selectData.datas,
        },
      });
    },
    deleteProcess(ids) {
      deleteDevice(ids).then(() => this.tableObj.getData());
    },
    changeImg(e) {},
    edit(row) {
      this.devicesDialogTitle = this.$t("Generality.Ge_Edit");
      this.dialogVisible = true;
      this.isEdit = true;
      this.formObj.form = JSON.parse(JSON.stringify(row));
      
      this.TimeSpanList = this.convertTimeString(this.formObj.form.TimeSpan)
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
    // 格式化时间范围
    convertTimeString(timeString) {
      const date = new Date(); // 获取当前日期
      const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // 当前日期的零点
      const timeRanges = timeString.split(','); // 按逗号分割时间段

      const result = timeRanges.map((range) => {
        const [start, end] = range.split('-'); // 按照"-"分割开始时间和结束时间

        const [startHour, startMinute] = start.split(':'); // 分割开始时间的小时和分钟
        const [endHour, endMinute] = end.split(':'); // 分割结束时间的小时和分钟

        const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute); // 创建开始时间
        const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, endMinute); // 创建结束时间

        return [startTime, endTime]; // 返回时间范围
      });

      return result;
    },
    dialogConfirm() {
      /*时间范围转换*/
      let resultList = []
      this.TimeSpanList.forEach(item => {
        let arr = []
        item.forEach(trim => {
          arr.push(timeFormat(trim, 'hh:mm'))
        })
        resultList.push(arr.join('-'))
        
      })
      this.formObj.form.TimeSpan = resultList.join(',');
      /*时间范围转换*/

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
    downLoadTemplate() {
      var arr = [];
      this.tableObj.props.tableSchema.forEach((item) =>
        this.exportTemplate.forEach((Titem) => {
          if (item.label === Titem.label) {
            arr.push(item);
          }
        })
      );
      this.exportTemplateData.checkedFields = arr;
      export2Excel(this.exportTemplateData);
    },
    importDevices() {
      this.importShow = true;
      this.editTableObj = new EditTable()
    },
    delItem(index) {
      this.editTableObj.delItem(index);
    },
    importComplete(e) {
      this.importShow = false;

      var arr = [];
      e.forEach((Titem) => {
        var str = {
          DeviceNo: "",
          Device: "",
          TimeSpan: "",
          CostRate: "",
          MaxQuantiyUpMachine: "",
          ShowInProdSchedule: false,
        };
        this.exportTemplate.forEach((item) => {
          if (Titem[item.label]) {
            str[item.prop] = Titem[item.label];
          }
        });
        arr.push(str);
      });

      this.editTableShow = true;
      this.editTableObj.setData(arr);
    },
    confirmImport() {
      this.editTableObj.validate((valid) => {
        if (valid) {
          if (this.editTableObj.selectData.datas.length !== 0) {
            BatchAddDevice(format2source(this.editTableObj.selectData.datas)).then(() => {
              this.tableObj.getData();
              this.editTableShow = false;
            })
          } else {
            this.$message.warning(this.$t("Generality.Ge_ChooseAtLeastOneItem"));
          }
        }
      })
    }
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
.jvForm-box{
  ::v-deep.el-col{
    height: auto!important;
  }
}

</style>
