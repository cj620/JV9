<template>
  <PageWrapper ref="page" :footer="false">
    <div class="weekly-task-header">
      <div class="weekly-task-header-title">
        {{ $t("menu.As_AssyWeeklyDashboard") }}
      </div>
      <div class="weekly-task-header-search">
        <div class="weekly-task-header-search-items">
          <el-date-picker
            size="mini"
            v-model="searchDate"
            type="date"
            :placeholder="$t('production.Pr_SelectDate')"
            :clearable="false"
            value-format="yyyy-MM-dd"
            style="width: 150px;"
          >
          </el-date-picker>
        </div>
        <div class="weekly-task-header-search-items">
          <el-select
            size="mini"
            v-model="selectedDepartment"
            clearable
            :placeholder="$t('DataV.Da_SelectDepartment')"
            style="width: 150px;"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.Department"
              :label="item.Department"
              :value="item.Department">
            </el-option>
          </el-select>
        </div>
        <div class="weekly-task-header-search-items">
          <el-select
            size="mini"
            v-model="selectedWorkers"
            multiple
            collapse-tags
            :placeholder="$t('Generality.Ge_SelectPersonal')"
            style="width: 180px;"
          >
            <el-option
              v-for="item in workersList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="weekly-task-header-search-items">
          <el-button size="mini" type="primary" @click="searchData('search')">
            {{ $t('Generality.Ge_Search') }}
          </el-button>
        </div>
        <div class="weekly-task-header-search-items">
          <el-button size="mini" @click="searchData('reset')">
            {{ $t('Generality.Ge_Reset') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="weekly-task-page">
      <el-table
        ref="BillTable"
        :header-cell-style="{
            background: 'rgb(237, 237, 237)',
            borderColor: 'rgb(241, 242, 247)',
            color:'#4f4f4f',
            fontWeight: '500',
            fontSize: '14px',
            padding: '6px 0',
          }"
        style="width: 100%;"
        :cell-style="getCellStyle"
        height="100%"
        :data="newList"
        :span-method="objectSpanMethod"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column
          type="selection"
          align="center"
          fixed
          width="55">
        </el-table-column>
        <el-table-column prop="Date" :label="$t('Generality.Ge_DemandDate')" align="center" fixed width="100">
          <template slot-scope="scope">
            <div style="white-space: pre-line;">{{ scope.row.Date }}</div>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, i) in userName" :key="i" :label="item" align="center">
          <el-table-column
            :formatter="(row) => {
              let res = row.Items.filter(trim => item === trim.UserName);
              if(res.length) {
                return res[0].ToolingNo
              }
            }"
            prop="ToolingNo"
            :label="$t('Generality.Ge_ToolingNo')"
            :show-overflow-tooltip="true"
            width="115"
          >
          </el-table-column>
          <el-table-column
            :formatter="(row) => {
              let res = row.Items.filter(trim => item === trim.UserName);
              if(res.length) {
                return res[0].ProcessContent
              }
            }"
            prop="ProcessContent"
            :label="$t('Generality.Ge_WorkContent')"
            :show-overflow-tooltip="true"
            min-width="130"
          >
          </el-table-column>
          <el-table-column
            :formatter="(row) => {
              let res = row.Items.filter(trim => item === trim.UserName);
              if(res.length) {
                return res[0].PlanTime
              }
            }"
            prop="PlanTime"
            :label="$t('Generality.Ge_PlanTime')"
            :show-overflow-tooltip="true"
            width="80"
          >
          </el-table-column>
          <el-table-column
            :formatter="(row) => {
              let res = row.Items.filter(trim => item === trim.UserName);
              if (res[0].ToolingNo) {
                return res[0].IsItCompletedAsPlanned ?
                $t('Generality.Ge_Completed') :
                $t('Generality.Ge_Incomplete')
              }
            }"
            prop="IsItCompletedAsPlanned"
            :label="$t('Generality.Ge_CompletionStatus')"
            :show-overflow-tooltip="true"
            width="80"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="weekly-task-footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next"
        :page-sizes="[5, 10]"
        :page-size="5"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </PageWrapper>
</template>
<script>
import { project_task_weekly_dashboard } from "@/api/workApi/project/dataReport";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllSysConfig } from "@/api/basicApi/systemSettings/sysSettings";
import { timeFormat } from "~/utils/time";
export default {
  name: "As_AssyWeeklyDashboard",
  data() {
    return {
      newList: [],
      userName: [],
      searchDate: "",
      jumpToRowIndex: null,
      selectedDate: "",
      selectedDepartment: "",
      selectedWorkers: [],
      departmentList: [],
      workersList: [],
      totalCount: 0,
      pageSize: 5,
      currentPage: 1,
    }
  },
  created() {
    this.searchDate = timeFormat(new Date(), "yyyy-MM-dd");
    this.getDepartmentWorkerInfo();
    this.getTableData();
  },
  methods: {
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.Date.slice(-10) === this.selectedDate && columnIndex === 1) {
        return 'background-color: #fce4d3; height: 24px; padding: 6px 0';
      } else {
        return 'height: 24px; padding: 6px 0;'
      }
    },
    getDepartmentWorkerInfo() {
      getDepartmentList().then((res) => {
        this.departmentList = res.Items
      })
      getAllSysConfig().then((res) => {
        const arr = [...res]
        for (let i = 0; i < arr.length; i++) {
          const categoryObject = arr[i];
          if (categoryObject.Category === 'Design') {
            for (let j = 0; j < categoryObject.ConfigList.length; j++) {
              const config = categoryObject.ConfigList[j];
              if (config.ConfigKey === 'DesignUsers') {
                this.workersList = JSON.parse(config.ConfigValue).map((name, index) => ({ name, id: index}));
              }
            }
          }
        }
      })
    },
    getTableData() {
      this.selectedDate = this.searchDate;
      project_task_weekly_dashboard({
        PageSize: this.pageSize,
        CurrentPage: this.currentPage,
        SelectType: 2,
        InitialDate: this.selectedDate,
        DepartmentName: this.selectedDepartment,
        UserNames: this.selectedWorkers,
      }).then((res) => {
        this.totalCount = res.Count;
        this.userName = res.Data.map(item => item.UserName);
        this.transformData(res)
      })
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.BillTable.doLayout();
      })
    },
    handleSelectionChange() {},
    handleSizeChange(e) {
      this.pageSize = e;
      this.getTableData()
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getTableData()
    },
    searchData(e) {
      if (e === 'reset') {
        this.searchDate = timeFormat(new Date(), "yyyy-MM-dd");
        this.selectedDepartment = "";
        this.selectedWorkers = [];
        this.pageSize = 5;
        this.currentPage = 1;
      }
      this.getTableData()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) { // 第二列
        if (rowIndex % 8 === 0) { // 每八行的开始
          return {
            rowspan: 8, // 合并八行
            colspan: 1, // 不跨列
          };
        } else {
          return {
            rowspan: 0, // 其他行不显示
            colspan: 0,
          };
        }
      }
    },
    transformData(res) {
      const newData = [];

      res.Date.forEach(Date => {
        const itemsByName = res.Data.reduce((acc, item) => {
          acc[item.UserName] = acc[item.UserName] || [];
          return acc;
        }, {});

        res.Data.forEach(item => {
          item.Items.forEach(subItem => {
            if (subItem.Date === Date) {
              itemsByName[item.UserName].push({
                ToolingNo: subItem.ToolingNo,
                ProcessContent: subItem.ProcessContent,
                PlanTime: subItem.PlanTime,
                IsItCompletedAsPlanned: subItem.IsItCompletedAsPlanned,
                UserName: item.UserName
              });
            }
          });
        });

        const names = Object.keys(itemsByName);
        for (let i = 0; i < 8; i++) {
          const dateItem = { Date, Items: [] };
          names.forEach(name => {
            const itemsForName = itemsByName[name];
            const itemToAdd = itemsForName.length > i ? itemsForName[i] : {
              ToolingNo: null,
              ProcessContent: null,
              PlanTime: null,
              IsItCompletedAsPlanned: null,
              UserName: name
            };
            dateItem.Items.push(itemToAdd);
          });
          const formattedTime = timeFormat(dateItem.Date, "yyyy-MM-dd")
          dateItem.Date = `${this.getWeekNum(formattedTime)}\n${formattedTime}`;
          newData.push(dateItem);
        }
      });
      this.newList = newData;
      this.findRowIndex();
      this.doLayout();
      const table = this.$refs.BillTable.$el.querySelector('.el-table__body-wrapper');
      table.scrollTop = this.jumpToRowIndex * 36;
    },
    findRowIndex() {
      for (let i = 0; i < this.newList.length; i++) {
        if (this.newList[i].Date.slice(-10) === this.selectedDate) {
          this.jumpToRowIndex = i
          return
        }
      }
    },
    getWeekNum(formattedTime) {
      const weekTime = [
        this.$t('Generality.Ge_Sunday'),
        this.$t('Generality.Ge_Monday'),
        this.$t('Generality.Ge_Tuesday'),
        this.$t('Generality.Ge_Wednesday'),
        this.$t('Generality.Ge_Thursday'),
        this.$t('Generality.Ge_Friday'),
        this.$t('Generality.Ge_Saturday'),
      ]
      const dayOfWeek = new Date(formattedTime + 'Z').getUTCDay();
      return weekTime[dayOfWeek];
    },
  }
}
</script>
<style lang="scss" scoped>
.weekly-task-header {
  width: 100%;
  height: 45px;
  background-color: #ffffff;
  display: flex;
  justify-content: left;
  align-items: center;
  &-title {
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 18px;
  }
  &-search {
    display: flex;
    align-items: center;
    justify-content: left;
    &-items {
      margin-right: 10px;
    }
  }
}
.weekly-task-page {
  height: calc(100% - 82px);
  background-color: #ffffff;
  padding: 0 15px;
}
.weekly-task-footer {
  width: 100%;
  height: 32px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: right;
}
</style>
