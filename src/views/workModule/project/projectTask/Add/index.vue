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
    <JvBlock :title="$t('Generality.Ge_BillInfo') + BillIdShow" ref="first">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')" ref="second">
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
              confirm: addEditRow,
            },
            {
              label: $t('project.Pro_SelectTemplate'),
              confirm: selectProcessTemplate,
            },
          ]"
        >
        </Action>
      </div>
      <JvEditTable :tableObj="M_TableObj" @cell-blur="cellBlur">
        <template #Worker="{ row }">
          <el-select
            v-model="row.Worker.value"
            style="width: 100%"
            size="mini"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            @click.native="getWorkers(row)"
            clearable
            :loading="selectLoading"
          >
            <el-option
              v-for="item in WorkerList"
              :key="item.UserId"
              :label="item.UserName"
              :value="item.UserName"
            >
            </el-option>
          </el-select>
        </template>
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

        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-circle-plus-outline',
                confirm: addItem.bind(null, row_index, M_TableObj),
              },
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index, M_TableObj),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>

    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
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
      <el-button type="primary" @click="save(false)">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="save(true)">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>
    <SelectProjectProcessTemplate
        :visible.sync="ProcessTemplateDialogFormVisible"
        v-if="ProcessTemplateDialogFormVisible"
        @confirmProcessTemplate="confirmProcessTemplate"
    >
    </SelectProjectProcessTemplate>
    <SelectProjectProcess
      :visible.sync="ProcessDialogFormVisible"
      v-if="ProcessDialogFormVisible"
      @selectProcessData="selectProcessData"
    >
    </SelectProjectProcess>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { M_EditTable, getRowIndex } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import CellDom from "@/jv_doc/class/dom/CellDom";
import SelectProjectProcessTemplate from "@/components/JVInternal/SelectProjectProcessTemplate";
import { mapState } from "vuex";
import {
  amountFormat,
  amount2Number,
  temMerge,
} from "@/jv_doc/utils/handleData";
// 引入模块API接口
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import {getAllProjectProcess, project_process_get_by_name} from "@/api/workApi/project/baseData";
import { get_by_department } from "@/api/basicApi/systemSettings/user";
import closeTag from "@/utils/closeTag";
import countEndDate from '@/jv_doc/utils/time/countEndDate';
import {
  pushDoubleCol,
  insertDoubleCol,
  delDoubleCol,
  doubleCol2data,
} from "./utils";
import SelectProjectProcess from "@/components/JVInternal/SelectProjectProcess/index.vue";
import {getByProcess} from "@/api/workApi/production/baseData";
export default {
  name: "Pm_ProjectTask_Add",
  components: {
    SelectProjectProcess,
    JvUploadFile,
    SelectProjectProcessTemplate,
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
      cur_Id: this.$route.query.BillId,
      dom_obj: new CellDom(),
      formObj: {},
      // 材料费用
      M_TableObj: {},
      prefix: "",
      ProcessTemplateDialogFormVisible: false,
      ProcessDialogFormVisible: false,
      selectLoading: false,
      detailRouteName: "Pm_ProjectTask_Detail",
      fileBillId: this.$route.query.BillId,
      WorkerList: [],
      ProcessContentList: [],
      ruleForm: {
        TaskType: 0,
        ToolingNo: "",
        PlanStart: "",
        PlanEnd: "",
        ERPCode: "",
        State: "",
        Creator: "",
        CreationDate: "",
        Remarks: "",
        ProjectTaskVersion:'',
        SaveAndSubmit: true,
        BillItems: [],
        BillFiles: [],
      },
      BillItems: {
        Process: "",
        Worker: "",
        PlanTime: 1,
        PlanStart: "",
        BelongingDepartment: "",
        ProcessContent: "",
        ProcessContentList: [],
        customData: [],
        PlanEnd: "",
        Remarks: "",
        Progress: 0,
      },
      tabPanes: [
        {
          label: this.$t("sale.Sa_MoldQuotation"),
          name: "first",
        },
        {
          label: this.$t("sale.Sa_MaterialCost"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
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

    BillIdShow() {
      return this.cur_Id && this.$route.query.type !== "copy" ? `:  ${this.cur_Id}` : "";
    },

    // getPrefixId() {
    //   return "edit-form-item";
    // },
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
    this.M_TableObj = new M_EditTable();
    // this.ruleForm
    if (this.$route.query.type === "copy") {
      console.log(this.cur_Id)
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form.PlanEnd = res.PlanEnd
        this.formObj.form.PlanStart = res.PlanStart
        this.formObj.form.TaskType = res.TaskType
        this.formObj.form.ToolingNo = res.ToolingNo
        this.formObj.form.ERPCode = res.ERPCode
        if(res.BillItems.length) {
          res.BillItems.forEach(item => {
            if(item.ProcessContent && item.ProcessContent !== "") {
              item.customData = item.ProcessContent.split(",");
            }
          });
          this.M_TableObj.push(temMerge(this.BillItems, res.BillItems))
        }

      })
    }
  },
  mounted() {
    Object.assign(this.formObj.form, this.$route.params);
  },
  methods: {
    changeValue(e, row) {
      var arr = [];
      if (e) {
        getAllProjectProcess({Process: row.Process.value}).then((res) => {
          if(res.Items.length) {
            if(res.Items[0].ProcessContent !== null) {
              console.log(res.Items[0].ProcessContent.split(/[,，]/), 312)
              res.Items[0].ProcessContent.split(/[,，]/).forEach((item) => {
                arr.push({
                  value: item,
                  label: item,
                });
              });
            }
          }
          row.ProcessContentList.value = arr;
        });
      }
    },
    cellBlur(cellObj){
      const _day = 86400000 / 8;
      for(let i = cellObj.row; i < this.M_TableObj.tableData.length-1; i++) {
        if(this.M_TableObj.tableData[i+1]) {
          // 修改計劃開始
          if(cellObj.col === 4 || cellObj.col === 5) {
            this.M_TableObj.tableData[cellObj.row].PlanEnd.value = countEndDate(this.M_TableObj.tableData[cellObj.row].PlanStart.value, this.M_TableObj.tableData[cellObj.row].PlanTime.value);
            this.M_TableObj.tableData[i+1].PlanStart.value = this.M_TableObj.tableData[i].PlanEnd.value;
            this.M_TableObj.tableData[i+1].PlanEnd.value = this.M_TableObj.tableData[i].PlanEnd.value;
          }
          // 修改計劃结束
          if(cellObj.col === 6) {
            // let date = new Date(this.M_TableObj.tableData[i].PlanStart.value).getTime() + this.M_TableObj.tableData[i].PlanTime.value * _day
            // this.M_TableObj.tableData[i].PlanEnd.value = timeFormat(date)
            this.M_TableObj.tableData[i+1].PlanStart.value = this.M_TableObj.tableData[i].PlanEnd.value;
            this.M_TableObj.tableData[i+1].PlanEnd.value = this.M_TableObj.tableData[i].PlanEnd.value;
          }
          // 修改預計工時
          // if(cellObj.col === 4) {
          //   this.M_TableObj.tableData[cellObj.row].PlanEnd.value = countEndDate(this.M_TableObj.tableData[cellObj.row].PlanStart.value, this.M_TableObj.tableData[cellObj.row].PlanTime.value);
          //   this.M_TableObj.tableData[i+1].PlanStart.value = this.M_TableObj.tableData[i].PlanEnd.value;
          //   this.M_TableObj.tableData[i+1].PlanEnd.value = this.M_TableObj.tableData[i].PlanEnd.value;
          // }
        }
      }
      // console.log(this.M_TableObj.tableData[cellObj.row], 'obj');
      // console.log(cellObj,'cellBlur')
    },
    // 新增编辑行
    addEditRow() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ProcessDialogFormVisible = true;
          // getAllProjectProcess().then((res) => {
          //   // 开始时间
          //   let startBase = new Date(this.formObj.form.PlanStart).getTime();
          //   // 总的时间区域
          //   const TimeZone =
          //     new Date(this.formObj.form.PlanEnd).getTime() -
          //     new Date(this.formObj.form.PlanStart).getTime();
          //
          //   const result = res.Items.map((item) => {
          //     let startDate = timeFormat(
          //       startBase + item.StartScale * TimeZone
          //     );
          //     let endDate = timeFormat(startBase + item.EndScale * TimeZone);
          //     return Object.assign({}, this.BillItems, item, {
          //       PlanStart: startDate,
          //       PlanEnd: endDate,
          //       Id: "",
          //     });
          //   });
          //   // console.log(result, 555555);
          //   this.M_TableObj.push(result);
          // });
        }
      });
    },
    //选择工序后返回的数据
    selectProcessData(e) {
      e.forEach((item) => {
        item.Id = "";
      });
      const arr = [Object.assign({}, this.BillItems, e[0])]
      let startBase = new Date(this.formObj.form.PlanStart).getTime();
      const TimeZone =
        new Date(this.formObj.form.PlanEnd).getTime() -
        new Date(this.formObj.form.PlanStart).getTime();
      arr[0].PlanStart = timeFormat(
        startBase + arr[0].StartScale * TimeZone
      );
      arr[0].PlanEnd = timeFormat(startBase + arr[0].EndScale * TimeZone);
      this.M_TableObj.push(arr);
    },
    insertDoubleCol,
    delDoubleCol,
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //删除物料
    delItem(index, target) {
      target.delItem(index);
    },

    dataFilter() {
      return (type = "default", data) => {
        return filterMaps[type].func(data);
      };
    },
    //根据部门查找部门人员
    // changeValue(e, row, cb) {
    //   console.log(e, row, row.BelongingDepartment);
    //   if (e) {
    //     get_by_department({ Department: row.BelongingDepartment.value }).then(
    //       (res) => {
    //         console.log(res.Items);
    //         this.WorkerList = res.Items;
    //       }
    //     );
    //   } else {
    //     cb();
    //     this.prefix = "";
    //   }
    //
    //   console.log(e, row, 5201314);
    // },
    getWorkers(row) {
      if (row.Process.value !== "") {
        this.selectLoading = true;
        project_process_get_by_name({
          Process: row.Process.value,
        }).then((res) => {
          get_by_department({ Department: res.BelongingDepartment }).then(
            (r) => {
              this.WorkerList = r.Items;
              this.selectLoading = false;
            }
          )
        })
      } else {
        this.WorkerList = []
      }
    },
    //选择工艺模板
    selectProcessTemplate() {
      this.formObj.validate((valid) => {
          if (valid) {
            this.ProcessTemplateDialogFormVisible = true;
          }
      })
    },
    //选择模板后返回的数据
    confirmProcessTemplate(e) {
      let startBase = new Date(this.formObj.form.PlanStart).getTime();
      const TimeZone =
        new Date(this.formObj.form.PlanEnd).getTime() -
        new Date(this.formObj.form.PlanStart).getTime();
      e.forEach((item) => {
        item.PlanStart = timeFormat(
          startBase + item.StartScale * TimeZone
        );
        item.PlanEnd = timeFormat(startBase + item.EndScale * TimeZone);
        item.customData = [];
        if(item.ProcessContent && item.ProcessContent !== "") {
          item.ProcessContent.split(/[,，]/).forEach((trim) => {
            item.customData.push(trim)
          });
        }
      })
      this.M_TableObj.push(temMerge(this.BillItems, e));
      this.ProcessTemplateDialogFormVisible = false;
    },
    addItem(index, target) {
      let empty_row = target.getEmptyRow();
      target.insert(index, [target.getEmptyRow()]);
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll(
        [this.formObj.validate, this.M_TableObj.validate],
        (valid) => {
          if (valid) {
            Object.assign(this.ruleForm, this.formObj.form);
            this.ruleForm.BillItems = this.M_TableObj.getTableData();
            this.ruleForm.BillItems.forEach(item => {
              item.ProcessContent = item.customData.join();
            })
            this._save();
          }
        }
      );
    },
    _save() {
      ProjectTask.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: res },
        };
        closeTag(this.current, TagName);
      });
    },
    editSort(isDown = true) {
      if (this.M_TableObj.selectData.datas.length !== 1) return;
      let row_index = this.M_TableObj.selectData.datas[0].row_index;

      if (isDown) {
        if (this.M_TableObj.tableData.lengt <= row_index + 1) return;
        const currRow = this.M_TableObj.tableData.splice(row_index, 1)[0];
        this.M_TableObj.tableData.splice(row_index + 1, 0, currRow);
      } else {
        if (row_index <= 0) return;
        const currRow = this.M_TableObj.tableData.splice(row_index, 1)[0];
        this.M_TableObj.tableData.splice(row_index - 1, 0, currRow);
      }
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
  watch: {
    "M_TableObj.tableData": {
      handler(newV, oldV) {
        // console.log(newV)
        newV.forEach((item, i) => {
          // console.log(i , getRowIndex() )
          if (parseInt(item.PlanTime.value) < 0) {
            item.PlanTime.value = "0";
            this.$message.warning(
              this.$t("project.Pro_PlanTimeShouldBeGreaterThan0")
            );
            return;
          }
          // console.log(i > getRowIndex() && getRowIndex() !== null && getRowIndex() > 0)
          // if(i > getRowIndex() && getRowIndex() !== null) {
          //   newV[i].PlanStart.value = newV[getRowIndex()].PlanEnd.value;
          //   newV[i].PlanEnd.value = newV[getRowIndex()].PlanEnd.value;
          // }
          // newV[getRowIndex()].
          // console.log()
          // item.PlanEnd.value =  countEndDate(item.PlanStart.value, Number(item.PlanTime.value))

        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
</style>
