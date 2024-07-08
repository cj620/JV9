<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <!--模具编号-->
        <template #ToolingNo="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
            @change="changeToolingNo"
            :disabled="editDisabled"
          >
            <el-option
              v-for="item in MouldListData"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </template>
        <!--任务单号-->
        <template #PmTaskBillId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            :disabled="editDisabled"
            @change="changePmTaskBillId"
          >
            <el-option
              v-for="item in TaskListData"
              :key="item.BillId"
              :label="
                item.BillId + '(' + taskTypeEnum[item.TaskType].name + ')'
              "
              :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
        <template #PlanStart="{ prop }">
          <el-date-picker
            v-model="formObj.form[prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </template>
        <template #PlanEnd="{ prop }">
          <el-date-picker
            v-model="formObj.form[prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </template>
        <template #WarningDate="{ prop }">
          <el-date-picker
            v-model="formObj.form[prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </template>
      </JvForm>
    </JvBlock>
    <!--物料信息-->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="selectBomList">{{
          $t("production.Pr_SelectPart")
        }}</el-button>
      </div>
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!-- 工序信息 -->
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')">
      <div slot="extra">
        <Action
          size="mini"
          slot="extra"
          :actions="[
            {
              icon: 'el-icon-caret-top',
              confirm: editSort.bind(null, false),
            },
            {
              icon: 'el-icon-caret-bottom',
              confirm: editSort.bind(null, true),
            },
          ]"
          :primary="[
            {
              label: $t('project.Pro_AddProcedure'),
              confirm: addProcess,
            },
            {
              label: $t('project.Pro_SelectTemplate'),
              confirm: selectProcessTemplate,
            },
            {
              label: $t('project.Pro_LoadingProcedure'),
              confirm: loadingProcess,
            },
          ]"
        >
        </Action>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <template #ProcessContent="{ row }">
          <el-select
            v-model="row.customData.value"
            style="width: 100%"
            multiple
            filterable
            allow-create
            default-first-option
            @visible-change="changeValue($event, row)"
          >
            <el-option
              v-for="item in row.ProcessContentList.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #IsCompulsoryInspection="{ row }">
          <el-checkbox v-model="row.IsCompulsoryInspection.value"></el-checkbox>
        </template>
        <!--<template #IsCompulsoryPrograming="{ row }">-->
        <!--  <el-checkbox v-model="row.IsCompulsoryPrograming.value"></el-checkbox>-->
        <!--</template>-->
        <template #ProcessPicture="{ row }">
          <div @click="addProcessPicture(row)">
            {{ $t("Generality.Ge_New") }}
          </div>
        </template>
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
    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')">
      <div slot="extra">
        <el-button size="mini" @click="(_) => $refs.upLoad.upload()">{{
          $t("Generality.Ge_Upload")
        }}</el-button>
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
    <!-- 选择工序模板-->
    <SelectProcessTemplate
      :visible.sync="ProcessTemplateDialogFormVisible"
      v-if="ProcessTemplateDialogFormVisible"
      @confirmProcessTemplate="confirmProcessTemplate"
    >
    </SelectProcessTemplate>
    <!-- 选择工序-->
    <SelectProcess
      :visible.sync="ProcessDialogFormVisible"
      v-if="ProcessDialogFormVisible"
      @selectProcessData="selectProcessData"
    >
    </SelectProcess>

    <!--选择零件-->
    <selectBomList
      :visible.sync="selectBomListDialogFormVisible"
      v-if="selectBomListDialogFormVisible"
      :transferData="transferData"
      :ToolingNo="ToolingNo"
      @confirmBomData="confirmBomData"
    >
    </selectBomList>
    <jv-dialog
      :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="ImgDialogFormVisible"
      v-if="ImgDialogFormVisible"
      @confirm="confirmProcessImg"
    >
      <JvUploadList v-model="ImgDataList" :listType="true"></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Table } from "./tableConfig";
import selectBomList from "./selectBomList";
import { timeFormat } from "@/jv_doc/utils/time";
import { Form } from "@/jv_doc/class/form";
import SelectProcess from "@/components/JVInternal/SelectProcess/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import SelectProcessTemplate from "@/components/JVInternal/SelectProcessTemplate/index";
import { getByProcess } from "@/api/workApi/production/baseData";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import {
  getPartProcess,
  toolingTaskInfoList,
} from "@/api/workApi/design/toolingBOM";
import { taskTypeEnum } from "@/enum/workModule";

import {
  saveProductionTask,
  getProductionTask,
} from "@/api/workApi/production/productionTask";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { data } from "../../../../basicModule/demo/EditTable/data";
export default {
  name: "Sa_SaleOrder_Edit",
  components: {
    JvUploadFile,
    SelectProcess,
    JvUploadList,
    SelectProcessTemplate,
    selectBomList,
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
  data() {
    return {
      formObj: {},
      eTableObj: {},
      tableObj: {},
      transferData: [],
      PmTaskData: [],
      taskTypeEnum,
      ProcessDialogFormVisible: false,
      ImgDialogFormVisible: false,
      ProcessTemplateDialogFormVisible: false,
      selectBomListDialogFormVisible: false,
      loading: false,
      editDisabled: false,
      ImgDataList: [],
      MouldListData: [],
      TaskListData: [],
      SelectedData: {}, //添加工序图片的时候要确定选择那一道工序用的
      textarea: "",
      ToolingNo: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        ToolingNo: "",
        PartNo: "",
        PartName: "",
        PartInfo: "",
        PlanEnd: "",
        PlanStart: "",
        WarningDate: "",
        Level: "Ordinary",
        Quantity: "",
        CurrentStation: "",
        IsFinishedProductInspection: false,
        Remarks: "",
        Process: [],
        BillFiles: [],
        Parts: [],
      },
      Parts: {
        Id: "",
        ToolingNo: "",
        PartNo: "",
        PartName: "",
        Quantity: "",
        BillGui: "",
        Description:"",
        Description2:"",
        Remarks:"",
      },
      Process: {
        Id: "",
        BillGui: "",
        Process: "",
        ProcessCode: "",
        State: "",
        Remarks: "",
        PlanTime: 1,
        ProcessContent: "",
        Resource: "",
        ProcessPicture: [],
        customData: [],
        ProcessContentList: [],
        IsCompulsoryInspection: false,
		    ProgramingProcess: "",
        ProgramingPlanTime: 1,
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    getSummary() {
      return (row, key) => {
        row[key].value = row.Quantity.value * row.Price.value;
        return amountFormat(row[key].value);
      };
    },
  },
  async created() {
    console.log(this.taskTypeEnum, 54321);
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 6,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.formObj.form.Level = "Ordinary";
    this.eTableObj = new EditTable();
    this.tableObj = new Table();
    this.formObj.form.PlanStart = new Date();
    console.log(this.formObj.form, new Date(), 5656);
    if (this.type === "edit") {
      this.editDisabled = true;
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    }
  },

  methods: {
    //编辑的时候获取信息
    async GetData(Id) {
      await getProductionTask({ BillId: Id }).then((res) => {
        this.ruleForm = res;
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        this.tableObj.setData(res.Parts);
        res.Process.forEach((item) => {
          if (item.ProcessContent.length > 0) {
            item.customData = item.ProcessContent.split(",");
          }
        });
        const arr = temMerge(this.Process, res.Process);
        this.eTableObj.setData(arr);
      });
    },

    //模糊查询模号
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const str = {
          Keyword: query,
          ItemType: "",
          ItemCategory: "Tooling",
          PageSize: 20,
          CurrentPage: 1,
        };
        itemList(str).then((res) => {
          this.MouldListData = res.Items;
          this.loading = false;
        });
      }
    },

    //根据模号搜索任务单
    changeToolingNo() {
      var str = {
        ToolingNo: this.formObj.form.ToolingNo,
        SelectType: 0,
      };
      toolingTaskInfoList(str).then((res) => {
        this.PmTaskData = res.Items;
        if (res.Items.length === 1) {
          this.formObj.form.PmTaskBillId = res.Items[0].BillId;
          this.formObj.form.PlanEnd = res.Items[0].PlanEnd;
        } else if (res.Items.length === 0) {
          this.formObj.form.PmTaskBillId = "";
        }
        this.TaskListData = res.Items;

        //判断说明不只一个任务单
      });
    },

    //根据任务单号拿计划结束日期
    changePmTaskBillId() {
      console.log(this.formObj.form.PmTaskBillId);
      this.PmTaskData.forEach((item) => {
        if (this.formObj.form.PmTaskBillId === item.BillId) {
          this.formObj.form.PlanEnd = item.PlanEnd;
        }
      });
    },
    //选择零件
    selectBomList() {
      this.formObj.validate((valid1) => {
        if (valid1) {
          this.selectBomListDialogFormVisible = true;
          this.ToolingNo = this.formObj.form.ToolingNo;
          this.transferData = this.tableObj.getTableData();
        }
      });
    },
    //选择零件确认
    confirmBomData(e) {
      this.tableObj.push(e);
      this.selectBomListDialogFormVisible = false;
      this.formObj.form.PartNo = [
        ...new Set(this.tableObj.getTableData().map((x) => x.PartNo)),
      ].toString();
      this.formObj.form.PartName = [
        ...new Set(this.tableObj.getTableData().map((x) => x.PartName)),
      ].toString();
      this.formObj.form.PartInfo = [
        ...new Set(this.tableObj.getTableData().map((x) => x.Description)),
      ].toString();
      this.formObj.form.Quantity = this.sum(
        this.tableObj.getTableData().map((x) => x.Quantity)
      );
    },
    //数组数字相加
    sum(arr) {
      var s = 0;
      arr.forEach(function (val, idx, arr) {
        s += val;
      }, 0);

      return s;
    },

    //选择工序
    addProcess() {
      if (this.tableObj.getTableData().length > 0) {
        this.ProcessDialogFormVisible = true;
      } else {
        this.$message.warning(this.$t("Generality.Ge_ChoosePart"));
      }
    },
    //选择模板后返回的数据
    confirmProcessTemplate(e) {
      console.log(e);
      e.forEach((item) => {
        if (item.ProcessContent.length > 0) {
          item.customData = item.ProcessContent.split(",");
        }
        item.Id = "";
      });
      this.eTableObj.push(temMerge(this.Process, e));
      this.ProcessTemplateDialogFormVisible = false;
    },
    //选择工序后返回的数据
    selectProcessData(e) {
      e.forEach((item) => {
        item.ProcessContent = "";
        item.Id = "";
      });
      this.eTableObj.push(temMerge(this.Process, e));
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },

    //添加工序图片
    addProcessPicture(row) {
      this.SelectedData = row;
      this.ImgDialogFormVisible = true;
      this.ImgDataList = JSON.parse(JSON.stringify(row.ProcessPicture.value));
    },
    //选择工序图片
    confirmProcessImg() {
      this.SelectedData.ProcessPicture.value = JSON.parse(
        JSON.stringify(this.ImgDataList)
      );
      this.ImgDataList = [];
      this.ImgDialogFormVisible = false;
    },
    //内容下拉框
    changeValue(e, row) {
      var arr = [];
      if (e) {
        getByProcess({ Process: row.Process.value }).then((res) => {
          res.ProcessContent.split(",").forEach((item) => {
            arr.push({
              value: item,
              label: item,
            });
          });
          row.ProcessContentList.value = arr;
        });
      }
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //选择工艺模板
    selectProcessTemplate() {
      if (this.tableObj.getTableData().length > 0) {
        this.ProcessTemplateDialogFormVisible = true;
      } else {
        this.$message.warning(this.$t("Generality.Ge_ChoosePart"));
      }
    },
    //加载工序
    loadingProcess() {
      if (this.tableObj.getTableData().length > 0) {
        getPartProcess({ PartNo: this.tableObj.getTableData()[0].PartNo }).then(
          (res) => {
            if (res.ProcessList.length > 0) {
              res.ProcessList.forEach((item) => {
                item.customData = item.ProcessContent.split(",");
                item.Id = "";
              });
              this.eTableObj.setData(temMerge(this.Process, res.ProcessList));
            }
          }
        );
      } else {
        this.$message.warning(this.$t("Generality.Ge_ChoosePart"));
      }
    },
    //保存销售订单
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
    //改工序的顺序
    editSort(isDown = true) {
      if (this.eTableObj.selectData.datas.length !== 1) return;
      let row_index = this.eTableObj.selectData.datas[0].row_index;

      if (isDown) {
        if (this.eTableObj.tableData.lengt <= row_index + 1) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index + 1, 0, currRow);
      } else {
        if (row_index <= 0) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index - 1, 0, currRow);
      }
    },

    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.tableObj.getTableData().length > 0) {
            if (this.tableObj.getTableData().length > 0) {
              this.eTableObj.validate((valid1) => {
                if (valid1) {
                  this.formObj.form.PlanStart = timeFormat(
                    this.formObj.form.PlanStart,
                    "yyyy-MM-dd hh:mm"
                  );
                  this.formObj.form.PlanEnd = timeFormat(
                    this.formObj.form.PlanEnd,
                    "yyyy-MM-dd hh:mm"
                  );
                  this.formObj.form.WarningDate = timeFormat(
                    this.formObj.form.WarningDate,
                    "yyyy-MM-dd hh:mm"
                  );
                  var arr = JSON.parse(
                    JSON.stringify(this.eTableObj.getTableData())
                  );
                  arr.forEach((item) => {
                    item.ProcessContent = item.customData.toString();
                  });
                  this.ruleForm.Process = arr;
                  this.ruleForm.Parts = this.tableObj.getTableData();
                  saveProductionTask(
                    Object.assign({}, this.ruleForm, this.formObj.form)
                  ).then((res) => {
                    let TagName = {
                      path: "/production/productionTaskDetails",
                      name: `ProductionTaskDetails`,
                      query: { BillId: res },
                      fullPath: "/production/productionTaskDetails",
                    };
                    closeTag(this.current, TagName);
                  });
                }
              });
            } else {
              /* 请添加工序 */
              this.$message.warning(this.$t("Generality.Ge_AddProcess"));
            }
          } else {
            /* 请添加明细 */
            this.$message.warning(this.$t("Generality.Ge_PleaseAddItems"));
          }
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        this.editDisabled = true;
        console.log(this.$route.query.BillId);
        this.billData = this.$route.query.BillId;
        console.log(this.billData, 696969);
        this.GetData(this.billData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remarks-info-content {
  padding: 15px;
  .remarks-info-content-remarks {
    margin-bottom: 20px;
  }
}
</style>
