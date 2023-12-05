<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <JvBlock
      :title="$t('device.De_PlanInfo')"
      ref="first"
    >
      <JvForm :formObj="formObj">
      </JvForm>
    </JvBlock>
    <!-- 计划成员 -->
    <JvBlock :title="$t('device.De_PlanMember')" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="selectDevice">
            {{ $t('device.De_SelectDevice') }}
        </el-button>
      </div>
      <JvEditTable :tableObj="memberTableObj">
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delMember.bind(null, row_index),
              },
            ]"
          />
        </template>
        <template #PhotoUrl="{ row }">
          <div class="upload-partRes-Img">
            <el-image
              style="width: 50px; height: 50px"
              :src="defaultImgUrl + row.PhotoUrl.value"
              fit="fill"
              :preview-src-list="[defaultImgUrl + row.PhotoUrl.value]"
              class="upload-partRes-Img-error"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture error-icon"></i>
              </div>
            </el-image>
          </div>
        </template>
      </JvEditTable>
    </JvBlock>
    <!-- 计划明细 -->
    <JvBlock :title="$t('device.De_PlanItem')" ref="third">
      <div slot="extra">
        <el-button size="mini" @click="newItem">
            {{ $t('Generality.Ge_New') }}
        </el-button>
      </div>
      <JvEditTable :tableObj="itemTableObj">
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
      </JvEditTable>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="(_) => $refs.upLoad.upload()"
          >{{ $t("Generality.Ge_Upload") }}</el-button
        >
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="fileBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
    <JvDialog
      :title= "$t('device.De_SelectDevice')"
      destroy-on-close
      width="70%"
      v-if="selectDevicesShow"
      :visible.sync="selectDevicesShow"
      @confirm="confirmDevices">
      <JvTable
        :table-obj="deviceTableObj"
        ref="deviceTable"
        v-if="selectDevicesShow"
      ></JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { memberTable, itemTable } from "./editConfig";
import { deviceTable } from "@/views/workModule/equipment/maintenancePlan/components/deviceTableConfig"
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import { mapState } from "vuex";
// 引入模块API接口
import {
  assets_device_spot_check_plan_get,
  assets_device_spot_check_plan_save
} from "@/api/workApi/equipment/spotCheckPlan"
import closeTag from "@/utils/closeTag";
export default {
  name: "As_DeviceSpotCheckPlan_Add",
  components: {
    JvUploadFile,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      type: this.$route.query.type,
      defaultImgUrl: window.global_config.ImgBase_Url,
      fileBillId: "",
      selectDevicesShow: false,
      formObj: {},
      memberTableObj: {},
      itemTableObj: {},
      deviceTableObj: {},
      detailRouteName: "As_DeviceSpotCheckPlanDetail",
      ruleForm: {
        BillId: "",
        BillGui: "",
        PlanName: "",
        RoleName: "",
        PlanType: "",
        SpotCheckType: "",
        ExecutionTime: "",
        TimeOut: "",
        AfterTimeOut: "",
        State: "",
        BillItems: [],
        BillMembers: [],
        BillFiles: [],
      },
      BillItems:{
        Id: 0,
        BillGui: "",
        SortOrder: "",
        SpotCheckContent: "",
      },
      BillMembers:{
        Id: 0,
        BillGui: "",
        DeviceNo: "",
        DeviceName: "",
        SpecModel: "",
        PhotoUrl: "",
      },
      tabPanes: [
        {
          label: this.$t("menu.Pr_Devices"),
          name: "first",
        },
        {
          label: this.$t("device.De_PlanMember"),
          name: "second",
        },
        {
          label: this.$t("device.De_PlanItem"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  async created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 6,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.memberTableObj = new memberTable()
    this.itemTableObj = new itemTable()
    if (this.type === "copy") {
      this.fileBillId = this.cur_Id
      this.GetData()
    }
  },
  methods: {
    // copy时获取数据
    GetData() {
      assets_device_spot_check_plan_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;
        this.itemTableObj.setData(res.BillItems)
        this.memberTableObj.setData(res.BillMembers)
      });
    },
    // 选择成员
    selectDevice() {
      this.deviceTableObj = new deviceTable()
      this.deviceTableObj.getData()
      this.selectDevicesShow = true
    },
    // 确认选择成员
    confirmDevices() {
      const str1 = this.deviceTableObj.selectData.datas.map(item => ({
          "Id": 0,
          "BillGui": "",
          "DeviceNo": item.DeviceNo,
          "DeviceName": item.DeviceName,
          "SpecModel": item.SpecModel,
          "PhotoUrl": item.PhotoUrl,
      }));
      const arr1 = str1.map(item => item.DeviceNo);
      const arr2 = this.memberTableObj.getTableData().map(item => item.DeviceNo);
      const arr3 = arr1.filter(item => arr2.includes(item));
      if (arr3.length === 0) {
          this.memberTableObj.push(str1);
          this.selectDevicesShow = false;
      } else {
          this.$message.error(`${i18n.t('device.De_RepeatedSelection')}:${arr3}`);
      }
    },
    // 删除成员
    delMember(index) {
      this.memberTableObj.delItem(index)
    },
    // 新增明细
    newItem() {
      this.itemTableObj.push([this.BillItems]);
    },
    // 删除明细
    delItem(index) {
      this.itemTableObj.delItem(index)
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //保存销售订单
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.itemTableObj.validate((valid) => {
            if (valid) {
              if (this.itemTableObj.getTableData().length > 0 && this.memberTableObj.getTableData().length > 0) {
                Object.assign(this.ruleForm, this.formObj.form);
                this.ruleForm.BillMembers = this.memberTableObj.getTableData()
                this.ruleForm.BillItems = this.itemTableObj.getTableData()
                this.ruleForm.TimeOut = parseInt(this.ruleForm.TimeOut)
                if (this.type === "copy") {
                  this.ruleForm.BillId = ""
                  this.ruleForm.BillGui = ""
                }
                assets_device_spot_check_plan_save(this.ruleForm).then((res) => {
                    let TagName = {
                        name: this.detailRouteName,
                        query: { BillId: res },
                    };
                    closeTag(this.current, TagName);
                })
              } else {
                this.$message.warning(this.$t("Generality.Ge_PleaseAddItems"));
              }
            }
          })
        }
      })
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-partRes-Img {
  display: flex;
  align-items: center;
  .upload-partRes-Img-error {
    background-color: rgb(231, 231, 231);
    ::v-deep .image-slot {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .error-icon {
        color: rgb(161, 161, 161);
        font-size: 19px;
      }
    }
  }
}
</style>
