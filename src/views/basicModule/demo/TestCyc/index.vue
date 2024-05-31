<template>
  <PageWrapper ref="page" :footer="false">
    <div class="weekly-task-header">
      <div class="weekly-task-header-title">设计周看板</div>
    </div>
    <div class="weekly-task-page">
      <el-table
        :header-cell-style="{
            background: 'rgb(237, 237, 237)',
            borderColor: 'rgb(241, 242, 247)',
            color:'#4f4f4f',
            fontWeight: '500',
            fontSize: '14px',
          }"
        style="width: 100%;"
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
        <el-table-column prop="Date" label="需求日期" align="center" fixed width="100"></el-table-column>
        <el-table-column v-for="(item, i) in userName" :key="i" :label="item" align="center">
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if(res.length) {
              return res[0].ToolingNo
            }
          }" prop="ToolingNo" :label="$t('Generality.Ge_ToolingNo')" :show-overflow-tooltip="true" width="130">

          </el-table-column>
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if(res.length) {
              return res[0].ProcessContent
            }
          }" prop="ProcessContent" label="工作内容" :show-overflow-tooltip="true" width="130">
          </el-table-column>
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if(res.length) {
              return res[0].PlanTime
            }
            }" prop="PlanTime" label="预计工时" :show-overflow-tooltip="true" width="130">
          </el-table-column>
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if (res[0].ToolingNo) {
              return res[0].IsItCompletedAsPlanned ? '已完成' : '未完成'
            }
            }" prop="IsItCompletedAsPlanned" label="完成情况" :show-overflow-tooltip="true" width="130">
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
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        :page-size="10"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </PageWrapper>
</template>
<script>
import { project_task_weekly_dashboard } from "@/api/workApi/project/dataReport"
import { timeFormat } from "~/utils/time";
export default {
  name: "index",
  data() {
    return {
      newList: [],
      userName: [],
      totalCount: 0,
    }
  },
  created() {
    this.getTableData(4,1)
  },
  methods: {
    getTableData(ps, cp) {
      project_task_weekly_dashboard({
        PageSize: ps,
        CurrentPage: cp,
        SelectType: 1,
        InitialDate: timeFormat(new Date(), "yyyy-MM-dd")
      }).then((res) => {
        this.totalCount = res.Count;
        this.userName = res.Data.map(item => item.UserName);
        this.transformData(res)
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

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
          dateItem.Date = timeFormat(dateItem.Date, "yyyy-MM-dd")
          newData.push(dateItem);
        }
      });
      this.newList = newData;
      console.log('this.newList:::', this.newList)
    }
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
    min-width: 200px;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 18px;
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
