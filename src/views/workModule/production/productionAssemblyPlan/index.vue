<template>
  <div class="page-wrapper">
    <!-- 列表 -->
    <div class="page-wrapper-content">
      <div class="page-wrapper-header">
        <div class="page-wrapper-header-left">
          {{ $t('menu.Pr_ProductionAssemblyPlan') }}
        </div>
        <div class="page-wrapper-header-right">
          <el-input
            v-model="keyword"
            :placeholder="$t('Generality.Ge_PleaseEnterkey')"
            prefix-icon="el-icon-search"
            size="mini"
            clearable
            style="margin-right: 5px"
          ></el-input>
          <el-button @click="filter" size="mini">
            <i class="el-icon-search"></i>
            {{ $t('production.Pr_Filter') }}
          </el-button>
        </div>
      </div>
      <div class="page-wrapper-body">
        <el-table
          ref="BillTable"
          :data="tableData.Items"
          v-if="tableHeight"
          :cell-style="cellStyle"
          :header-cell-style="headerRowStyle"
          @expand-change="expandDetail"
          :row-key='getRowKeys'
          :expand-row-keys="expands"
          border
          stripe
          :height="tableHeight"
        >
          <el-table-column
            fixed
            type="index"
            :index = "1"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                ref="detailTable"
                :data="detailTableData"
                border
              >
                <el-table-column
                  fixed
                  type="index"
                  :index = "1"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  v-for="(item, j) in detailConfig" :key="j"
                  v-bind="item"
                >
                  <template slot-scope="scope">
                    <div v-if="item.custom" class="table-item-box">
                      <div v-if="item.prop === 'Level'">
                        {{ LevelEnum[scope.row.Level].name }}
                      </div>
                      <div v-if="item.prop === 'State'">
                        {{ ProductionTaskState[scope.row.State].name }}
                      </div>
                    </div>
                    <div v-else class="table-item-box">{{scope.row[item.prop] || '--'}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, i) in tableConfig" :key="i"
            v-bind="item"
          >
            <template slot-scope="scope">
              <div v-if="item.custom" class="table-item-box">
                <div v-if="item.prop === 'State'">
                  {{ stateEnum[scope.row.State].name }}
                </div>
                <div v-if="item.prop === 'Progress'">
                  {{scope.row[item.prop]}}
                </div>
                <div v-if="item.prop === 'Completeness'">
                  {{ completenessEnum[scope.row.Completeness].name }}
                </div>
              </div>
              <div v-else class="table-item-box">{{scope.row[item.prop] || '--'}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper-footer">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            layout="total, sizes, prev, pager, next"
            :page-sizes="[5,10,20,30,50]"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="tableData.Count"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { assy_task_list } from "@/api/workApi/project/projectTask"
import { productionTaskList } from "@/api/workApi/production/productionTask"
import { tableConfig, detailConfig } from "./config"
import { stateEnum, LevelEnum, ProductionTaskState } from "@/enum/workModule";
export default {
  name: "ProductionAssemblyPlan",
  data() {
    return {
      stateEnum,
      LevelEnum,
      ProductionTaskState,
      completenessEnum: {
        Complete: {
          name: "齐套",
          value: 0,
        },
        Incomplete: {
          name: "未齐套",
          value: 1,
        }
      },
      tableConfig,
      detailConfig,
      tableData: {
        Items:[],
        Count: 0
      },
      detailTableData: [],
      pageSize: 20,
      keyword: '',
      currentPage: 1,
      tableHeight: 0,
      expands: [],
      getRowKeys(row) {
        return row.Id
      }
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
    this.getTableBoxHeight();
    window.onresize = () => {
      this.getTableBoxHeight();
    }
  },
  methods: {
    getTableBoxHeight() {
      const tableBox = document.querySelector('.page-wrapper-body');
      this.tableHeight = tableBox.clientHeight - 50
    },
    headerRowStyle() {
      return {
        textAlign: 'center',
        background:'rgb(237,237,237)',
        color:'rgb(79,79,79)',
        borderRight: '1px solid rgb(223,230,236)'
      }
    },
    cellStyle() {
      return {
        color: 'rgb(79,79,79)',
        padding: 0,
      }
    },
    getTableData() {
      assy_task_list({PageSize: this.pageSize, CurrentPage: this.currentPage, Keyword: this.keyword}).then((res) => {
        this.tableData = res;
      })
    },
    filter() {
      this.getTableData()
    },
    sizeChange(size) {
      this.pageSize = size;
      this.getTableData();
    },
    currentChange(current) {
      this.currentPage = current;
      this.getTableData();
    },
    expandDetail(row, expandedRows) {
      this.detailTableData = []
      if (expandedRows.length > 0) {
        this.expands = []
        this.expands.push(row.Id)
        productionTaskList({
          PmTaskBillId: row.BillId,
          PageSize: 200,
          CurrentPage: 1,
        }).then((res) => {
          this.detailTableData = res.Items
        })
      } else {
        this.expands = []
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.page-wrapper {
  background-color: rgb(240, 242, 245);
  width: 100%;
  height: calc(100vh - 85px);
  padding: 10px;
  overflow: hidden;
  &-content {
    height: 99%;
    width: 100%;
    padding: 8px 10px 0 10px;
    margin: auto;
    background-color: #fff;
  }
  &-header {
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    &-left {
      font-size: 18px;
      line-height: 29px;
    }
    &-right {
      display: flex;
    }
  }
  &-body {
    width: 100%;
    height: calc(100% - 39px);
  }
  &-footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  ::v-deep .el-table__row{
    height: 40px;
  }
  ::v-deep .el-table__expanded-cell {
    padding: 10px;
  }
}
</style>
