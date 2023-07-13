<template>
  <div>
    <JvDialog v-bind="$attrs" v-on="$listeners" @confirm="confirmData">
      <div>
        <div>
          是否开启虚拟数据：
          <el-switch v-model="IsOpen"> </el-switch>
        </div>
        <div class="card-data">
          <div class="title">本月各部门预计稼动率</div>
          <JvEditTable :tableObj="eTableObj1"> </JvEditTable>
        </div>
        <div class="card-data">
          <div class="title">本月各部门稼动率</div>
          <JvEditTable :tableObj="eTableObj2"> </JvEditTable>
        </div>
        <div class="card-data" v-for="(item,index) in Data3" :key="index">
          <div>
            标题：
            <el-input v-model="item.Title"  style="width: 500px"></el-input>
            </div>
          <div>
            月份：
            <el-select v-model="item.Date" multiple style="width: 500px">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            目标值：
            <el-select
              v-model="item.Data[0]"
              filterable
              multiple
              allow-create
              default-first-option
              style="margin-top: 10px; width: 500px"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            合格率：
            <el-select
              v-model="item.Data[1]"
              filterable
              multiple
              allow-create
              default-first-option
              style="margin-top: 10px; width: 500px"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="card-data">
          <div class="title">球形数据</div>
          <JvEditTable :tableObj="eTableObj3"> </JvEditTable>
        </div>
        <div class="card-data">
          <div class="title">圆圈数据</div>
          <JvEditTable :tableObj="eTableObj4"> </JvEditTable>
        </div>

        <div class="card-data">
          <div class="title">
            紧急工单
            <el-button @click="addTableObj5" size="mini">添加</el-button>
          </div>
          <JvEditTable :tableObj="eTableObj5">
            <template #operation="{ row_index }">
              <TableAction
                :actions="[
                  {
                    icon: 'el-icon-delete',
                    confirm: delItem5.bind(null, row_index),
                  },
                ]"
              />
            </template>
          </JvEditTable>
        </div>
        <div class="card-data">
          <div class="title">
            项目进度显示
            <el-button @click="addTableObj6" size="mini">添加</el-button>
          </div>
          <JvEditTable :tableObj="eTableObj6">
            <template #operation="{ row_index }">
              <TableAction
                :actions="[
                  {
                    icon: 'el-icon-delete',
                    confirm: delItem6.bind(null, row_index),
                  },
                ]"
              />
            </template>
          </JvEditTable>
        </div>
        <div class="card-data">
          <div class="title">本月累计出货</div>
          <JvEditTable :tableObj="eTableObj7"> </JvEditTable>
        </div>
      </div>
    </JvDialog>
  </div>
</template>

<script>
import { EditTable } from "@/jv_doc/class/table";

export default {
  name: "stringArrayObject",
  data() {
    return {
      dataList: {},
      eTableObj1: {},
      eTableObj2: {},
      eTableObj3: {},
      eTableObj4: {},
      eTableObj5: {},
      eTableObj6: {},
      eTableObj7: {},
      options1: [],
      options2: [],
      IsOpen: false,
      Date1: "",
      Data1: "",
      Data2: "",
      Data3: [],
    };
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    let str = JSON.parse(this.formData.ConfigValue);
    this.dataList = str;
    this.IsOpen = this.dataList.IsOpen;
    console.log(this.IsOpen);
    this.processingData();
    this.getData();
  },
  methods: {
    getData() {
      for (let index = 1; index < 200; index++) {
        this.options1.push({
          value: index,
          label: index,
        });
      }
      for (let index = 1; index < 13; index++) {
        this.options2.push({
          value: index + "月",
          label: index + "月",
        });
      }
    },

    //处理数据
    processingData() {
      this.eTableObj1 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "部门",
            formCpn: "FormInput",
          },
          {
            prop: "Value",
            label: "稼动率",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationCol: false,
      });
      this.eTableObj1.setData(this.dataList.Data.Data1);
      this.eTableObj2 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "部门",
            formCpn: "FormInput",
          },
          {
            prop: "Value",
            label: "稼动率",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationCol: false,
      });
      console.log(this.dataList.Data.Data3, 4242);
      this.eTableObj2.setData(this.dataList.Data.Data2);
      this.Data3 = this.dataList.Data.Data3
     /*  this.Date1 = this.dataList.Data.Data3[0].Date;
      this.Data1 = this.dataList.Data.Data3[0].Data[0];
      this.Data2 = this.dataList.Data.Data3[0].Data[1]; */
      this.eTableObj3 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "配置值",
            editConfig: {
              disabled: true,
            },
          },
          {
            prop: "Value",
            label: "数量",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationCol: false,
      });
      this.eTableObj3.setData(this.dataList.Data.Data4);
      this.eTableObj4 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "配置值",
            editConfig: {
              disabled: true,
            },
          },
          {
            prop: "Value",
            label: "数量",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationCol: false,
      });
      this.eTableObj4.setData(this.dataList.Data.Data5);
      this.eTableObj5 = new EditTable({
        tableSchema: [
          {
            prop: "BillId",
            label: "单号",
            formCpn: "FormInput",
          },
          {
            prop: "ToolingNo",
            label: "产品号",
            formCpn: "FormInput",
          },
          {
            prop: "PartNo",
            label: "零件号",
            formCpn: "FormInput",
          },
          {
            prop: "PartName",
            label: "零件名称",
            formCpn: "FormInput",
          },
          {
            prop: "State",
            label: "状态",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationWidth: 80,
        height: 300,
      });
      this.eTableObj5.setData(this.dataList.Data.Data6);
      this.eTableObj6 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "名称",
            formCpn: "FormInput",
          },
          {
            prop: "Value",
            label: "数量",
            formCpn: "FormInput",
          },
          {
            prop: "Percentage",
            label: "进度",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationWidth: 80,
        height: 300,
      });
      this.eTableObj6.setData(this.dataList.Data.Data7);
      this.eTableObj7 = new EditTable({
        tableSchema: [
          {
            prop: "Name",
            label: "名称",
            formCpn: "FormInput",
          },
          {
            prop: "Value",
            label: "数量",
            formCpn: "FormInput",
          },
          {
            prop: "Percentage",
            label: "进度",
            formCpn: "FormInput",
          },
        ],
        data: [],
        title: "",
        tableHeaderShow: false,
        chooseCol: false,
        operationCol: false,
      });
      this.eTableObj7.setData(this.dataList.Data.Data8);
    },
    addTableObj5() {
      this.eTableObj5.push([
        {
          BillId: "",
          ToolingNo: "",
          PartNo: "",
          PartName: "",
          State: "",
        },
      ]);
    },
    addTableObj6() {
      this.eTableObj6.push([
        {
          Name: "",
          Value: "",
          Percentage: "",
        },
      ]);
    },
    //删除表格
    delItem5(index) {
      this.eTableObj5.delItem(index);
    },
    //删除表格
    delItem6(index) {
      this.eTableObj6.delItem(index);
    },
    confirmData() {
      let str = {};
      let arr = [];
      let str1 = {};
      let str2 = {};

      str.Data1 = JSON.parse(JSON.stringify(this.eTableObj1.getTableData()));
      str.Data2 = JSON.parse(JSON.stringify(this.eTableObj2.getTableData()));
/*       str1.Date = JSON.parse(JSON.stringify(this.Date1));
      arr.push(JSON.parse(JSON.stringify(this.Data1)));
      arr.push(JSON.parse(JSON.stringify(this.Data2))); 
      str1.Data = arr;*/
      str.Data3 = this.Data3;
      str.Data4 = JSON.parse(JSON.stringify(this.eTableObj3.getTableData()));
      str.Data5 = JSON.parse(JSON.stringify(this.eTableObj4.getTableData()));
      str.Data6 = JSON.parse(JSON.stringify(this.eTableObj5.getTableData()));
      str.Data7 = JSON.parse(JSON.stringify(this.eTableObj6.getTableData()));
      str.Data8 = JSON.parse(JSON.stringify(this.eTableObj7.getTableData()));
      str2.IsOpen = this.IsOpen;
      str2.Data = str;
      console.log(str2, 5656);
      this.$emit('StringArrayObjectConfirm',JSON.stringify(str2))
    },
  },
};
</script>

<style scoped>
.card-data {
  margin-top: 30px;
}
.title {
  margin: 10px 0;
  font-size: 20px;
  font-weight: 500;
}
</style>
