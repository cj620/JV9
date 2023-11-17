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
          height: '100px',
        }"
    >
      <JvForm :formObj="formObj">
      </JvForm>
    </JvBlock>
    <JvBlock :title="$t('device.De_DeviceInfo')" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="selectDevices">
          {{ $t('device.De_SelectDevice') }}
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
    <JvBlock :title="$t('device.De_MaintenanceInfo')" ref="third">
      <div slot="extra">
        <el-button size="mini" @click="newItems">
          {{ $t('Generality.Ge_New') }}
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
import JvBlock from "~/cpn/JvBlock/index.vue";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index.vue";
import JvDialog from "~/cpn/JvDialog/index.vue";
import JvEditTable from "~/cpn/JvEditTable/index.vue";
import { mapState } from "vuex";
import { Form } from "@/jv_doc/class/form";
import closeTag from "@/utils/closeTag";
import {
  assets_device_maintenance_plan_save,
  assets_device_maintenance_plan_get,
} from "@/api/workApi/equipment/maintenancePlan"
import { deviceTable } from "./deviceTableConfig";
import { formSchema, EditTable1, EditTable2 } from "./config"

export default {
  name: "index",
  components: { JvEditTable, JvDialog, JvUploadFile, JvBlock },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
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
      cur_Id: "",
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
      BillItems: {
        Id: 0,
        BillGui: "",
        MaintenanceContent: "",
      },
      tabPanes: [
        {
          label: this.$t("menu.As_MaintenancePlan"),
          name: "first",
        },
        {
          label: this.$t('device.De_DeviceInfo'),
          name: "second",
        },
        {
          label: this.$t('device.De_MaintenanceInfo'),
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
    if (this.type === 'edit'){
      this.fileBillId = this.billData
      this.cur_Id = this.billData
      await this.GetData(this.fileBillId);
    } else if(this.type === 'copy') {
      this.fileBillId = this.billData
      await this.GetData(this.fileBillId);
    }
  },
  methods: {
    async GetData(Id) {
      await assets_device_maintenance_plan_get({ BillId: Id }).then((res) => {
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        this.eTableObj1.setData(res.BillMembers)
        this.eTableObj2.setData(res.BillItems)
      })
    },
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    delItem1(index) {
      this.eTableObj1.delItem(index)
    },
    delItem2(index) {
      this.eTableObj2.delItem(index)
    },
    newItems() {
      this.eTableObj2.push([this.BillItems]);
    },
    selectDevices(){
      this.deviceTableObj = new deviceTable()
      this.deviceTableObj.getData({ DeviceCategory: "Machine" })
      this.selectDevicesShow = true
    },
    confirmDevices(){
      const str1 = this.deviceTableObj.selectData.datas.map(item => ({
        "DeviceNo": item.DeviceNo,
        "DeviceName": item.DeviceName,
        "SpecModel": item.SpecModel
      }));
      const arr1 = str1.map(item => item.DeviceNo);
      const arr2 = this.eTableObj1.getTableData().map(item => item.DeviceNo);
      const arr3 = arr1.filter(item => arr2.includes(item));
      if (arr3.length === 0) {
        this.eTableObj1.push(str1);
        this.selectDevicesShow = false;
      } else {
        // console.log('重复选择了设备：', arr3);
        this.$message.error(`重复选择了设备: ${arr3}`);
      }
    },
    save(){
      this.formObj.validate((valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          this.ruleForm.BillMembers = this.eTableObj1.getTableData()
          this.ruleForm.BillItems = this.eTableObj2.getTableData()
          assets_device_maintenance_plan_save(this.ruleForm).then((res) => {
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
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
      }
    },
  },
}
</script>
