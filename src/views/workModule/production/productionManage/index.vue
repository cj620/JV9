<template>
  <PageWrapper :footer="false">
    <div class="productionTask" v-loading="loading">
      <div class="productionTask-header">
        <div class="productionTask-header-items">
          <div class="productionTask-header-items-desc">{{
              $t("Generality.Ge_KeyWords")
            }}:</div>
          <el-input size="medium" v-model="form.Keyword"></el-input>
        </div>
        <div class="productionTask-header-items">
          <div class="productionTask-header-items-desc">{{
              $t("Generality.Ge_ToolingNo")
            }}:</div>
          <el-input size="medium" v-model="form.ToolingNo"></el-input>
        </div>
        <div class="productionTask-header-items">
          <div class="productionTask-header-items-desc">{{
              $t("Generality.Ge_State")
            }}:</div>
          <el-select
            v-model="form.States"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            size="medium"
            multiple
          >
            <el-option
              v-for="item in StateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="searchTasks">
            {{ $t("Generality.Ge_Search") }}
          </el-button>
          <el-button  @click="clear">
            {{ $t("Generality.Ge_Reset") }}
          </el-button>
          <el-button @click="newTask">
            {{ $t("Generality.Ge_New") }}
          </el-button>
        </div>
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
                <!--操作-->
                <div class="top-operate">
                  <el-button type="text" @click="edit(item.BillId)">{{
                      $t("Generality.Ge_Edit")
                    }}</el-button>
                </div>
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
              <!--操作-->
              <div class="bottom-operate">
                <el-button
                  type="text"
                  @click="outsourcingProcess(item.BillId)"
                >{{ $t("production.Pr_ProcessOutsourcing") }}</el-button
                >
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
    <!--工序委外-->
    <outsourcingProcess
      :visible.sync="outsourcingProcessDialogFormVisible"
      v-if="outsourcingProcessDialogFormVisible"
      :transferData="transferData"
      @confirmOutsourcingProcessData="confirmOutsourcingProcessData"
    ></outsourcingProcess>
  </PageWrapper>
</template>
<script>
import {enumToList, LevelEnum, ProcessState, ProductionTaskState} from "@/enum/workModule";
import outsourcingProcess from "@/views/workModule/production/productionTask/List/components/outsourcingProcess.vue";
import { imgUrlPlugin } from "~/utils/system";
import { productionTaskList } from "@/api/workApi/production/productionTask";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";

export default {
  name: "Pr_TaskManagement",
  components: { outsourcingProcess },
  data() {
    return {
      loading: false,
      dataList: [],
      ProductionTaskStateList: [
        "ToBeReceived",
        "Received",
        "Processing",
        "Processed",
        "Pausing",
        "Outsourcing",
        "OutsourcingApplying",
      ],
      form: {
        ToolingNo: "",
        Remarks: "",
        Keyword: "",
        States: [],
        CustomerName: "",
        StartDate: "",
        EndDate: "",
        PageSize: 10,
        CurrentPage: 1,
      },
      tooltipFlag: false,
      IsFlag: false, //判断选择框是否全部选中
      isIndeterminate: false, //判断选择框里面的状态
      outsourcingProcessDialogFormVisible: false, //选择委外工序的弹窗
      multipleSelection: [],
      transferData: "",
      BillSum: 0,
      StateOptions: enumToList(ProductionTaskState),
    }
  },
  created() {
    this.GetData();
    console.log('StateOptions', this.StateOptions)
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
  methods: {
    imgUrlPlugin,
    // 新增任务
    newTask() {
      this.$router.push({
        name: "AddProductionTask",
        params: { type: "add", title: "addSaleOrder" },
      });
    },
    // 搜索任务
    searchTasks() {
      this.GetData()
    },
    // 重置搜索
    clear() {
      this.form = {
        ToolingNo: "",
        Remarks: "",
        Keyword: "",
        States: [],
        CustomerName: "",
        StartDate: "",
        EndDate: "",
        PageSize: 10,
        CurrentPage: 1,
      };
      this.GetData()
    },
    // 获取数据
    async GetData() {
      this.loading = true;
      await productionTaskList(this.form).then((res) => {
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
          if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
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
    //工序委外
    outsourcingProcess(e) {
      this.transferData = e;
      this.outsourcingProcessDialogFormVisible = true;
    },
    //工序委外确认保存
    confirmOutsourcingProcessData(e) {
      let arr = [];
      e.forEach((item) => {
        let str = {};
        str.KeyId = item.Id;
        str.Remarks = "";
        str.Quantity = item.Quantity;
        arr.push(str);
      });
      this.OutsourcingRequirement({
        Category: "Process",
        Items: arr,
      });
    },
    //保存委外物料需求
    OutsourcingRequirement(res) {
      addOutsourcingrRequirement(res).then((res) => {
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
  }
}
</script>
<style lang="scss" scoped>
@import "~@/jv_doc/style/mixin.scss";
.productionTask {
  height: 100%;
  min-width: 1400px;
  .productionTask-header {
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    background-color: #fff;
    margin-bottom: 15px;
    display: flex;
    justify-content: left;
    align-items: center;
    .productionTask-header-items {
      min-width: 320px;
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 10px;
      .productionTask-header-items-desc {
        min-width: 100px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: right;
        margin-right: 5px;
      }
    }
  }
  .productionTask-content {
    height: calc(100% - 110px);
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
          display: flex;
          justify-content: center;
          align-items: center;
          .image-slot {
            width: 100%;
            height: 100%;
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
          position: relative;
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
        }
        .productionTask-card-content-craft {
          display: flex;
          position: relative;
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
.top-operate {
  min-width: 120px;
  position: absolute;
  right: 0;
  bottom: 1px;
  display: flex;
  justify-content: left;
}
.bottom-operate {
  min-width: 120px;
  position: absolute;
  top: -5px;
  right: 0;
  margin-right: 10px;
  display: flex;
  justify-content: left;
}
</style>
