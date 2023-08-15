<!--
 * @Author: H.
 * @Date: 2021-11-09 10:24:11
 * @LastEditTime: 2022-11-30 15:28:51
 * @LastEditTime: 2022-01-20 17:17:19
 * @Description: 生产任务
-->

<template>
  <PageWrapper :footer="false">
    <div class="productionTask" v-loading="loading">
      <div class="productionTask-header">
        <div>
          {{ $t("menu.Pr_ProductionTask") }}
        </div>
        <div class="productionTask-header-title">
          <div @click="ClickSearch" class="title">
            <i class="el-icon-search"></i>
          </div>
          <div class="oprations">
            <el-button-group>
              <el-button size="mini" @click="refresh">
                {{ $t("Generality.Ge_Refresh") }}
              </el-button>
              <el-button size="mini" @click="add">{{
                $t("Generality.Ge_New")
              }}</el-button>
              <el-button size="mini" @click="copy">{{
                $t("Generality.Ge_Copy")
              }}</el-button>
              <el-button size="mini" @click="del">{{
                $t("Generality.Ge_Delete")
              }}</el-button>
              <el-button size="mini" @click="print(false)">{{
                $t("Generality.Ge_Print")
              }}</el-button>
              <el-button size="mini" @click="print(true)">{{
                $t("menu.Pr_LabelPrint")
              }}</el-button>
              <el-button
                size="mini"
                @click="printbyTooling"
                :disabled="!form.ToolingNo"
                >{{ $t("production.Pr_PrintByTooling") }}</el-button
              >
              <el-button size="mini" @click="outsourcingPart">{{
                $t("production.Pr_PartOutsourcing")
              }}</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="productionTask-header-setting"></div>
      </div>
      <div class="productionTask-content">
        <div
          v-for="(item, index) in dataList"
          :key="index"
          class="productionTask-card"
          :style="{ borderLeft: '10px solid ' + LevelMap[item.Level].fcolor }"
        >
          <div class="productionTask-card-check">
            <el-checkbox
              v-model="item.IsHas"
              @change="SelectedRow(item, item.IsHas)"
            ></el-checkbox>
          </div>
          <div class="productionTask-card-Img">
            <el-image
              style="width: 64px; height: 64px"
              :src="imgUrlPlugin(item.PhotoUrl)"
              fit="fill"
              :preview-src-list="[imgUrlPlugin(item.PhotoUrl)]"
              class="productionTask-Img-error"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline error-icon"></i>
              </div>
            </el-image>
          </div>
          <div class="productionTask-card-content">
            <div class="productionTask-card-content-baseInfo">
              <div class="productionTask-card-content-baseInfo-content">
                <!--模具编号-->
                <div style="width: 125px">
                  <svg-icon icon-class="number" />
                  <el-tooltip
                    ref="tlp"
                    :content="item.BillId"
                    effect="dark"
                    :disabled="!tooltipFlag"
                    placement="top-start"
                  >
                    <span
                      style="color: #1890ff"
                      @click="linkTo(item.BillId)"
                      @mouseenter="visibilityChange($event)"
                    >
                      {{ item.BillId }}
                    </span>
                  </el-tooltip>
                </div>

                <!--零件编号-->

                <div style="width: 155px">
                  <el-tooltip
                    ref="tlp"
                    :content="item.PartNo"
                    effect="dark"
                    :disabled="!tooltipFlag"
                    placement="top-start"
                  >
                    <span @mouseenter="visibilityChange($event)">
                      <svg-icon icon-class="setting" />
                      {{ item.PartNo }}
                    </span>
                  </el-tooltip>
                </div>
                <!--零件名称-->
                <div style="width: 155px">
                  <el-tooltip
                    ref="tlp"
                    :content="item.PartName"
                    effect="dark"
                    :disabled="!tooltipFlag"
                    placement="top-start"
                  >
                    <span @mouseenter="visibilityChange($event)">
                      <svg-icon icon-class="list-settings-line" />
                      {{ item.PartName }}
                    </span>
                  </el-tooltip>
                </div>
                <!--零件描述-->
                <div style="width: 155px">
                  <el-tooltip
                    ref="tlp"
                    :content="item.PartInfo"
                    effect="dark"
                    :disabled="!tooltipFlag"
                    placement="top-start"
                  >
                    <span @mouseenter="visibilityChange($event)">
                      <svg-icon icon-class="description" />
                      {{ item.PartInfo }}
                    </span>
                  </el-tooltip>
                </div>
                <!--结束时间-->
                <div style="width: 150px">
                  <svg-icon icon-class="date_range" />
                  {{ item.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}
                </div>

                <!--状态-->
                <div style="width: 80px">
                  <svg-icon icon-class="tag" />
                  {{
                    ProductionTaskStateMap[item.State] &&
                    ProductionTaskStateMap[item.State].name
                  }}
                </div>
                <!--当前站点-->
                <div style="width: 100px">
                  <svg-icon icon-class="whole-site-accelerator" />
                  {{ item.CurrentStation }}
                </div>
                <!--备注-->
                <div style="width: 300px">
                  <el-tooltip
                    ref="tlp"
                    :content="item.Remarks"
                    effect="dark"
                    :disabled="!tooltipFlag"
                    placement="top-start"
                  >
                    <span @mouseenter="visibilityChange($event)">
                      <svg-icon icon-class="remarks" />
                      {{ item.Remarks }}
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div class="productionTask-card-content-baseInfo-operate">
                <el-button type="text" @click="edit(item.BillId)">{{
                  $t("Generality.Ge_Edit")
                }}</el-button>
                <el-button
                  type="text"
                  @click="outsourcingProcess(item.BillId)"
                  >{{ $t("production.Pr_ProcessOutsourcing") }}</el-button
                >
              </div>
            </div>
            <div class="productionTask-card-content-craft">
              <div
                v-for="(TItem, index) in item.Process"
                :key="index"
                :style="{
                  backgroundColor:
                    ProcessStateMap[TItem.State] &&
                    ProcessStateMap[TItem.State].color,
                }"
                class="productionTask-card-content-craft-content"
              >
                {{ TItem.Process }}({{ TItem.PlanTime }}H)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="productionTask-footer">
        <div class="productionTask-pagination">
          <div style="padding-top: 4px">
            <el-checkbox
              v-model="IsFlag"
              :indeterminate="isIndeterminate"
              @change="AllSelected"
              :label="$t('Generality.Ge_SelectAll')"
            ></el-checkbox>
          </div>

          <div
            v-for="(item, index) in ProductionTaskStateList"
            :key="index"
            class="productionTask-pagination-status"
          >
            <div
              class="status-circle"
              :style="{ backgroundColor: ProcessStateMap[item].color }"
            ></div>
            {{ ProcessStateMap[item].name }}
          </div>
        </div>

        <div class="productionTask-pagination">
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            :page-size="form.PageSize"
            :current-page.sync="form.CurrentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="BillSum"
            @size-change="SizeChange"
            @current-change="CurrentChange"
            @prev-click="PrevNextClick"
            @next-click="PrevNextClick"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <searchForm
      :visible.sync="drawer"
      v-if="drawer"
      :append-to-body="true"
      direction="rtl"
      :with-header="false"
      size="25%"
      @search="searchData"
      :searchFormData="searchFormData"
    >
    </searchForm>

    <!--零件委外-->
    <outsourcingPart
      :visible.sync="outsourcingPartDialogFormVisible"
      v-if="outsourcingPartDialogFormVisible"
      @confirmOutsourcingPartData="confirmOutsourcingPartData"
    >
    </outsourcingPart>
    <!--工序委外-->

    <outsourcingProcess
      :visible.sync="outsourcingProcessDialogFormVisible"
      v-if="outsourcingProcessDialogFormVisible"
      :transferData="transferData"
      @confirmOutsourcingProcessData="confirmOutsourcingProcessData"
    >
    </outsourcingProcess>
    <copyOrder
      :visible.sync="copyOrderDialogFormVisible"
      v-if="copyOrderDialogFormVisible"
      @confirmCopyOrder="confirmCopyOrder"
    >
    </copyOrder>
  </PageWrapper>
</template>

<script>
import {
  productionTaskList,
  deleteProductionTask,
} from "@/api/workApi/production/productionTask";
import AComponents from "./components/AComponents";
import outsourcingProcess from "./components/outsourcingProcess";
import outsourcingPart from "./components/outsourcingPart";
import searchForm from "./components/searchForm";
import copyOrder from "./components/copyOrder";
import {
  LevelEnum,
  ProcessState,
  ProductionTaskState,
} from "@/enum/workModule";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import { imgUrlPlugin, printPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  // 页面的标识
  name: "ProductionTask",
  data() {
    return {
      dataList: [],
      ProductionTaskStateList: [
        "ToBeReceived",
        "Received",
        "Processing",
        "Processed",
        "Pausing",
        "Outsourcing",
      ],
      form: {
        ToolingNo: "",
        Remarks: "",
        Keyword: "",
        CustomerName: "",
        StartDate: "",
        EndDate: "",
        PageSize: 10,
        CurrentPage: 1,
      },
      loading: false,
      drawer: false,
      Checked: false,
      tooltipFlag: false,

      CheckedData: 1,
      IsFlag: false, //判断选择框是否全部选中
      isIndeterminate: false, //判断选择框里面的状态
      outsourcingProcessDialogFormVisible: false, //选择委外工序的弹窗
      outsourcingPartDialogFormVisible: false, //选择委外零件的弹窗
      copyOrderDialogFormVisible: false, //复制工单的弹窗
      multipleSelection: [],
      transferData: "",
      searchFormData: {},
      BillSum: 0,
    };
  },
  created() {
    this.GetData();
  },
  methods: {
    imgUrlPlugin,
    async GetData() {
      this.loading = true;
      await productionTaskList(this.form).then((res) => {
        console.log(res.Items);
        res.Items.forEach((item) => {
          item.IsHas = false;
        });
        this.dataList = res.Items;
        this.BillSum = res.Count;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    printbyTooling() {
      this.$router.push({
        name: "Pr_ProductionTask_print_by_tooling",
        query: {
          ToolingNo: this.form.ToolingNo,
        },
      });
    },
    //点击筛选事件
    ClickSearch() {
      this.drawer = true;
      this.searchFormData = this.form;
    },
    //点击搜索
    searchData(e) {
      console.log(e);
      this.drawer = false;
      this.form.ToolingNo = e.ToolingNo;
      this.form.Remarks = e.Remarks;
      this.form.Keyword = e.Keyword;
      this.form.CurrentPage = 1;
      this.GetData();
    },
    //跳转到详情
    linkTo(Id) {
      this.$router.push({
        name: "ProductionTaskDetails",
        query: { BillId: Id },
      });
    },
    //全选和取消的判断
    AllSelected(value) {
      if (value) {
        this.dataList.forEach((item) => {
          item.IsHas = true;
          if (item.BillId) {
            this.multipleSelection.push(item);
          }
        });
        this.isIndeterminate = false;
      } else {
        this.dataList.forEach((item) => {
          item.IsHas = false;
          this.multipleSelection.forEach((Titem, index) => {
            if (Titem.BillId === item.BillId) {
              this.multipleSelection.splice(index, 1);
            }
          });
        });
        this.isIndeterminate = false;
      }
      this.unique(this.multipleSelection);
    },
    //全部选中的数据
    async IsAllSelect() {
      var transitData = [];
      this.dataList.forEach((item) => {
        this.multipleSelection.forEach((Titem, index) => {
          if (Titem.BillId === item.BillId) {
            transitData.push(Titem);
            item.IsHas = true;
          }
        });
      });
      if (transitData.length === this.form.PageSize) {
        this.IsFlag = true;
        this.isIndeterminate = false;
      } else if (
        this.multipleSelection.length > 0 &&
        transitData.length < this.form.PageSize
      ) {
        this.IsFlag = false;
        this.isIndeterminate = true;
      } else if (transitData.length === 0) {
        this.IsFlag = false;
        this.isIndeterminate = false;
      }
    },
    //单个的判断
    SelectedRow(row, flag) {
      if (flag) {
        this.multipleSelection.push(row);
        if (this.multipleSelection.length === this.dataList.length) {
          this.IsFlag = true;
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = true;
        }
      } else {
        this.multipleSelection.forEach((item, index) => {
          if (row.BillId === item.BillId) {
            this.multipleSelection.splice(index, 1);
          }
        });
        if (this.multipleSelection.length === 0) {
          this.isIndeterminate = false;
        } else {
          this.IsFlag = false;
          this.isIndeterminate = true;
        }
      }
    },
    //数组删除相同的数据
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            //第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    //刷新
    refresh() {
      this.form.CurrentPage = 1;
      this.GetData();
    },
    //新增
    add() {
      this.$router.push({
        name: "AddProductionTask",
        params: { type: "add", title: "addSaleOrder" },
      });
    },
    //编辑
    edit(Id) {
      editLock({ BillId: Id }).then((res) => {
        this.$router.push({
          name: "EditProductionTask",
          query: { BillId: Id },
        });
      });
    },
    //删除
    del() {
      if (this.multipleSelection.length !== 0) {
        this.$confirm(this.$t("Generality.Ge_DeleteConfirm"), {
          confirmButtonText: this.$t("Generality.Ge_OK"),
          cancelButtonText: this.$t("Generality.Ge_Cancel"),
        }).then(() => {
          var arr = this.multipleSelection.map((x) => x.BillId);
          deleteProductionTask({ BillIds: arr }).then((res) => {
            this.multipleSelection = [];
            this.IsAllSelect();
            this.GetData();
          });
        });
      } else {
        console.log(11);
      }
    },

    //打印
    print(isTag) {
      printPlugin({
        ids: this.multipleSelection.map((x) => x.BillId),
        category: "Pr_Task",
        isTag: isTag,
      });
    },
    //零件委外
    outsourcingPart() {
      this.outsourcingPartDialogFormVisible = true;
    },
    //工序委外
    outsourcingProcess(e) {
      this.transferData = e;
      this.outsourcingProcessDialogFormVisible = true;
    },
    //工序委外确认保存
    confirmOutsourcingProcessData(e) {
      console.log(e);
      let arr = [];

      e.forEach((item) => {
        let str = {};
        str.KeyId = item.Id;
        str.Remarks = "";
        str.Quantity = item.Quantity;
        arr.push(str);
      });
      this.OutsourcingrRequirement({
        Category: "Process",
        Items: arr,
      });
    },

    //工单复制确认
    confirmCopyOrder() {
      this.copyOrderDialogFormVisible = false;
    },
    //零件委外确认保存
    confirmOutsourcingPartData(e) {
      console.log(e);
      let arr = [];
      e.forEach((item) => {
        let str = {};
        str.KeyId = item.PartNo;
        str.Remarks = item.Remarks;
        str.Quantity = item.Quantity;
        arr.push(str);
      });
      this.OutsourcingrRequirement({
        Category: "Part",
        Items: arr,
      });
    },

    //复制工单
    copy() {
      this.copyOrderDialogFormVisible = true;
    },
    //保存委外物料需求
    OutsourcingrRequirement(res) {
      addOutsourcingrRequirement(res).then((res) => {
        console.log(res);
        this.outsourcingPartDialogFormVisible = false;
        this.outsourcingProcessDialogFormVisible = false;
      });
    },

    visibilityChange(event) {
      console.log(11);
      this.tooltipFlag = true;
    },

    // 页码变更
    async SizeChange(num) {
      this.form.PageSize = num;
      await this.GetData();
      await this.IsAllSelect();
    },
    // 页数变更
    async CurrentChange(Now) {
      this.form.CurrentPage = Now;
      await this.GetData();
      await this.IsAllSelect();
    },
    // 上下页切换
    async PrevNextClick(Now) {
      this.form.CurrentPage = Now;
      await this.GetData();
      await this.IsAllSelect();
    },
  },
  computed: {
    LevelMap() {
      return LevelEnum;
    },
    ProcessStateMap() {
      return ProcessState;
    },
    ProductionTaskStateMap() {
      return ProductionTaskState;
    },
  },
  components: {
    AComponents,
    outsourcingProcess,
    outsourcingPart,
    searchForm,
    copyOrder,
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.productionTask {
  height: 100%;
  /*width: 100%;*/
  min-width: 1400px;
  .productionTask-header {
    width: 100%;
    height: 45px;
    padding: 5px 10px;
    background-color: #fff;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .productionTask-header-title {
      height: 100%;

      display: flex;
      flex: 1;
      .title {
        margin-left: 15px;
        height: 100%;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        flex-flow: row;
      }
      .oprations {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: center;
        flex-flow: row;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  .productionTask-content {
    height: calc(100% - 95px);
    width: 100%;
    overflow: auto;
    min-width: 1400px;

    .productionTask-card {
      width: 100%;
      display: flex;
      background-color: #ffffff;

      @include shadow;
      @include cardHover;
      align-items: center;
      margin-bottom: 15px;

      .productionTask-card-check {
        margin-left: 20px;
      }
      .productionTask-card-Img {
        margin: 0 20px;
        padding: 7px 0;
        .productionTask-Img-error {
          background-color: rgb(231, 231, 231);
          .image-slot {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            // color: rgb(161, 161, 161);
            .error-icon {
              color: rgb(161, 161, 161);
              font-size: 19px;
            }
          }
        }
      }
      .productionTask-card-content {
        width: 100%;
        font-size: 14px;
        .productionTask-card-content-baseInfo {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .productionTask-card-content-baseInfo-content {
            display: flex;
            div {
              margin-right: 10px;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .productionTask-card-content-baseInfo-operate {
            min-width: 120px;
            padding-right: 20px;
          }
        }
        .productionTask-card-content-craft {
          display: flex;
          .productionTask-card-content-craft-content {
            text-align: center;
            font-size: 14px;

            border: 1px solid #eee;

            padding: 3px 15px;
            margin-right: 10px;
            border-radius: 15px;
          }
        }
      }
    }
  }
  .productionTask-footer {
    display: flex;
    /*width: 100%;*/
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
  }
}

.productionTask-pagination {
  display: flex;
  font-size: 14px;
  .productionTask-pagination-status {
    display: flex;
    margin-left: 10px;
    align-items: center;
    border: 1px solid #ccc;
    padding: 3px;
    .status-circle {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin: 0 5px;
    }
  }
}
</style>
