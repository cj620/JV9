<template>
  <PageWrapper :footer="false">
    <div class="productionTask" v-loading="loading">
      <div class="productionTask-header">
        <div>
          {{ $t("menu.Pr_ProductionProgress") }}
        </div>
        <div class="productionTask-header-title">
          <div @click="ClickSearch" class="title">
            <i class="el-icon-search"></i>
          </div>
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
                <div style="width: 100px">
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

                <!-- 进度 -->
                <div style="width: 300px">
                  <el-progress :percentage="item.Progress"></el-progress>
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
  </PageWrapper>
</template>
<script>
import { LevelEnum, ProcessState, ProductionTaskState } from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { productionTaskList } from "@/api/workApi/production/productionTask";
import searchForm from "./components/searchForm.vue";

export default {
  name: "ProductionProgress",
  components: {searchForm},
  data() {
    return {
      dataList: [],
      searchFormData: {},
      multipleSelection: [],
      BillSum: 0,
      loading: false,
      drawer: false,
      IsFlag: false,
      isIndeterminate: false,
      tooltipFlag: false,
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
        BillType: "Part",
        CustomerName: "",
        StartDate: "",
        EndDate: "",
        SortColumn: "PlanEnd",
        SortOrder: 4,
        PageSize: 10,
        CurrentPage: 1,
        SortByProgress: false,
      },
    }
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
  created() {
    this.GetData();
  },
  methods: {
    imgUrlPlugin,
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
    searchData(e) {
      this.drawer = false;
      this.form.ToolingNo = e.ToolingNo;
      this.form.Remarks = e.Remarks;
      this.form.Keyword = e.Keyword;
      this.form.States = e.States;
      this.form.BillType = e.BillType;
      this.form.CurrentPage = 1;
      this.GetData();
    },
    //点击筛选事件
    ClickSearch() {
      this.drawer = true;
      this.searchFormData = this.form;
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
    visibilityChange(event) {
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
    }
    .el-icon-search {
      margin-bottom: 2px;

      &:hover {
        cursor: pointer;
      }
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
        padding-bottom: 5px;

        .productionTask-card-content-baseInfo {
          display: flex;
          position: relative;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 5px;

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
</style>
