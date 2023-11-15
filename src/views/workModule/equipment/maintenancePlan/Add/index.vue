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
        :title="$t('menu.As_MaintenancePlan')"
        ref="first"
        :contentStyle="{
          paddingLeft: '30px',
          paddingRight: '30px',
          position: 'relative',
          height: '160px',
        }"
    >
      <JvForm :formObj="formObj">
      </JvForm>
    </JvBlock>
    <JvBlock title="设备信息" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="selectDevices">
          选择设备
        </el-button>
      </div>
      <JvEditTable :tableObj="eTableObj1">
        <template #operation="{ row_index }">
          <TableAction
              :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem1.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <JvBlock title="保养信息" ref="third">
      <div slot="extra">
        <el-button size="mini" @click="newItems">
          新增
        </el-button>
      </div>
      <JvEditTable :tableObj="eTableObj2">
        <template #operation="{ row_index }">
          <TableAction
              :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem2.bind(null, row_index),
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
      title= "选择设备"
      destroy-on-close
      width="35%"
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
import { formSchema, EditTable1, EditTable2 } from "./config"
import { Form } from "@/jv_doc/class/form";
import { deviceTable } from "./deviceTableConfig";
import { assets_device_maintenance_plan_save } from "@/api/workApi/equipment/maintenancePlan"
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index.vue";
import JvBlock from "~/cpn/JvBlock/index.vue";
import JvEditTable from "~/cpn/JvEditTable/index.vue";
import JvDialog from "~/cpn/JvDialog/index.vue";
import closeTag from "@/utils/closeTag";

export default {
  name: "As_MaintenancePlan_Add",
  components: {JvDialog, JvEditTable, JvBlock, JvUploadFile},
  props: {
    billData: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "",
    },
  },
  data(){
    return {
      cur_Id: this.$route.query.BillId,
      detailRouteName: "As_MaintenancePlanDetail",
      formObj: {},
      eTableObj1: {},
      eTableObj2: {},
      deviceTableObj: {},
      fileBillId: "",
      selectDevicesShow: false,
      ruleForm: {
        BillId: "",
        BillGui: "",
        PlanName: "",
        Description: "",
        MaintenanceMode: "",
        IntervalDays: 0,
        State: "",
        Creator: "",
        CreationDate: "",
        BillItems: [],
        BillMembers: [],
        BillFiles: [],
      },
      tabPanes: [
        {
          label: this.$t("menu.As_MaintenancePlan"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
    }
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
    this.eTableObj1 = new EditTable1();
    this.eTableObj2 = new EditTable2();
    console.log(this.type,this.billData)
  },
  methods: {
    delItem1(index) {
      this.eTableObj1.delItem(index)
    },
    delItem2(index) {
      this.eTableObj2.delItem(index)
    },
    newItems() {
      this.eTableObj2.addEmptyRow();
    },
    selectDevices(){
      this.deviceTableObj = new deviceTable()
      this.deviceTableObj.getData()
      this.selectDevicesShow = true
    },
    confirmDevices(){
      console.log('111',this.deviceTableObj.selectData.datas)
      const str2 = this.deviceTableObj.selectData.datas.map(item => ({
        "DeviceNo": item.DeviceNo,
        "DeviceName": item.Device,
        "SpecModel": ""
      }));
      this.eTableObj1.push(str2)
      this.selectDevicesShow = false
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    save(){
      this.formObj.validate((valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          this.ruleForm.BillMembers = this.eTableObj1.getTableData()
          this.ruleForm.BillItems = this.eTableObj2.getTableData()
          assets_device_maintenance_plan_save(this.ruleForm).then((res) => {
            console.log(res)
            let TagName = {
              name: this.detailRouteName,
              query: { BillId: res },
            };
            closeTag(this.current, TagName);
          })
        }
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  }
}
</script>
