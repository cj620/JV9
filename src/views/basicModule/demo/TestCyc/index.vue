<template>
  <PageWrapper ref="page" :footer="false">
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
        <el-table-column prop="Date" label="需求日期" align="center"></el-table-column>
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
              return res[0].WorkContent
            }
          }" prop="WorkContent" label="工作内容" :show-overflow-tooltip="true" width="130">
          </el-table-column>
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if(res.length) {
              return res[0].PlanHours
            }
            }" prop="PlanHours" label="预计工时" :show-overflow-tooltip="true" width="130">
          </el-table-column>
          <el-table-column :formatter="(row) => {
            let res = row.Items.filter(trim => item === trim.UserName);
            if(res.length) {
              return res[0].IsCompleted
            }
            }" prop="IsCompleted" label="完成情况" :show-overflow-tooltip="true" width="130">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </PageWrapper>
</template>
<script>
import { project_task_weekly_dashboard } from "@/api/workApi/project/dataReport"
export default {
  name: "index",
  data() {
    return {
      dateData1: ["2024-05-21", "2024-05-22"],
      res: {
        Date: ["2024-05-20", "2024-05-21", "2024-05-22", "2024-05-23", "2024-05-24", "2024-05-25", "2024-05-26"],
        Data: [
          {
            UserName: '陈旭',
            Items: [
              {ToolingNo: "001", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
              {ToolingNo: "001", WorkContent: "DFM", PlanHours: 1, IsCompleted: '是',Date: "2024-05-21"},
              {ToolingNo: "002", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "003", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "004", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "005", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "006", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "007", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            ],
          },
          {
            UserName: '张三',
            Items: [
              {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
              {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
              {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '是',Date: "2024-05-21"},
              {ToolingNo: "012", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "013", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "014", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "015", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
              {ToolingNo: "016", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            ],
          },
          {
            UserName: '李四',
            Items: [
              {ToolingNo: "021", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "022", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "023", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "024", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
              {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
              {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-25"},
              {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-26"},
              {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-26"},
            ],
          },
          {
            UserName: '王五',
            Items: [
              {ToolingNo: "031", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "032", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
              {ToolingNo: "033", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
              {ToolingNo: "033", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-25"},
            ],
          },
        ],
      },
      Date: ["2024-05-20", "2024-05-21", "2024-05-22", "2024-05-23", "2024-05-24", "2024-05-25", "2024-05-26"],
      Data: [
        {
          UserName: '陈旭',
          Items: [
            {ToolingNo: "001", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
            {ToolingNo: "001", WorkContent: "DFM", PlanHours: 1, IsCompleted: '是',Date: "2024-05-21"},
            {ToolingNo: "002", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "003", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "004", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "005", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "006", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "007", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            {ToolingNo: "007", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-24"},
          ],
        },
        {
          UserName: '张三',
          Items: [
            {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
            {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-20"},
            {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '是',Date: "2024-05-21"},
            {ToolingNo: "012", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "013", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "014", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "015", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            {ToolingNo: "016", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
          ],
        },
        {
          UserName: '李四',
          Items: [
            {ToolingNo: "021", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "022", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "023", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "024", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-23"},
            {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-25"},
            {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-26"},
            {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-26"},
          ],
        },
        {
          UserName: '王五',
          Items: [
            {ToolingNo: "031", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "032", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-21"},
            {ToolingNo: "033", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-22"},
            {ToolingNo: "033", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',Date: "2024-05-25"},
          ],
        },
      ],
      newList: [
        {
          Date: "2024-05-21",
          Items: [
            {ToolingNo: "001", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: "011", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '张三'},
            {ToolingNo: "021", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '李四'},
            {ToolingNo: "031", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-21",
          Items: [
            {ToolingNo: "002", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: "012", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '张三'},
            {ToolingNo: "022", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '李四'},
            {ToolingNo: "032", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-21",
          Items: [
            {ToolingNo: "003", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '张三'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-22",
          Items: [
            {ToolingNo: "004", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: "013", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '张三'},
            {ToolingNo: "023", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '李四'},
            {ToolingNo: "033", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-22",
          Items: [
            {ToolingNo: "005", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: "014", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '张三'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-22",
          Items: [
            {ToolingNo: "006", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '陈旭'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '张三'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-23",
          Items: [
            {ToolingNo: "007", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否', UserName: '陈旭'},
            {ToolingNo: "015", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否', UserName: '张三'},
            {ToolingNo: "024", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否', UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-23",
          Items: [
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '陈旭'},
            {ToolingNo: "016", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '张三'},
            {ToolingNo: "025", WorkContent: "DFM", PlanHours: 1, IsCompleted: '否',UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        },
        {
          Date: "2024-05-23",
          Items: [
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '陈旭'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '张三'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '李四'},
            {ToolingNo: null, WorkContent: null, PlanHours: null, IsCompleted: null,UserName: '王五'},
          ]
        }
      ],
      userName: [],
    }
  },
  created() {
    this.userName = this.Data.map(item => item.UserName);
    this.transformData();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) { // 第二列
        if (rowIndex % 3 === 0) { // 每三行的开始
          return {
            rowspan: 3, // 合并三行
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
    transformData() {
      const newData = [];

      this.Date.forEach(Date => {
        const itemsByName = this.Data.reduce((acc, item) => {
          acc[item.UserName] = acc[item.UserName] || [];
          return acc;
        }, {});

        this.Data.forEach(item => {
          item.Items.forEach(subItem => {
            if (subItem.Date === Date) {
              itemsByName[item.UserName].push({
                ToolingNo: subItem.ToolingNo,
                WorkContent: subItem.WorkContent,
                PlanHours: subItem.PlanHours,
                IsCompleted: subItem.IsCompleted,
                UserName: item.UserName
              });
            }
          });
        });

        const names = Object.keys(itemsByName);
        for (let i = 0; i < 3; i++) {
          const dateItem = { Date, Items: [] };
          names.forEach(name => {
            const itemsForName = itemsByName[name];
            const itemToAdd = itemsForName.length > i ? itemsForName[i] : {
              ToolingNo: null,
              WorkContent: null,
              PlanHours: null,
              IsCompleted: null,
              UserName: name
            };
            dateItem.Items.push(itemToAdd);
          });
          newData.push(dateItem);
        }
      });
      this.newList = newData;
    }
  }
}
</script>
<style lang="scss" scoped>
.weekly-task-page {
  height: 100%;
  background-color: #ffffff;
  padding: 10px 15px 10px 15px;
}
</style>
