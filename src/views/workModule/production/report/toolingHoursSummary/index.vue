<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('project.Pro_CheckDetails'),
              confirm: checkDetail.bind(null, row),
            },
          ]"
        ></TableAction>
      </template>
    </JvTable>
    <JvDialog
      :title="$t('menu.Pr_PartHoursDetail')"
      :visible.sync="dialogVisible"
      width="90%"
      @confirm="dialogVisible = false"
      :IsShowFooterBtn="false"
    >
      <JvTable :table-obj="partTableObj">
        <template #titleBar>
          <div class="header-search-bar">
            <div class="header-search-bar-input">
              <div class="tooling-No" style="margin-right: 18px;">
                {{ $t('Generality.Ge_ToolingNo') }}：
                {{ selectedToolingNo }}
              </div>
              <div class="part-No">
                {{ $t('Generality.Ge_PartNo') }}：
                <el-select
                  size="mini"
                  clearable
                  style="margin-left: 10px"
                  v-model="selectedPartNo"
                  @change="searchByPartId(selectedPartNo)"
                  @clear="searchByPartId('')"
                >
                  <el-option v-for="item in partList" :key="item.PartNo" :label="item.PartNo" :value="item.PartNo">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { partTable } from "./partConfig";
import { getPartBomById } from "@/api/workApi/design/toolingBOM"
export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      partTableObj: {},
      dialogVisible: false,
      selectedToolingNo: "",
      selectedPartNo: "",
      partList: [],
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    checkDetail(row) {
      this.partTableObj = new partTable();
      this.selectedToolingNo = row.Id;
      this.partTableObj.getData({ ToolingNo: row.Id });
      getPartBomById({
        ToolingNo: row.Id,
        BOMType: "Part"
      }).then((res) => {
        this.partList = res.Items;
      })
      this.dialogVisible = true;
    },
    searchByPartId(e) {
      if (!e) {
        this.selectedPartNo = "";
      }
      this.partTableObj.getData({ ToolingNo: this.selectedToolingNo, PartNo: e });

    }
  }
}
</script>
<style lang="scss" scoped>
.header-search-bar {
  height: 35px;
  width: 100%;
  padding: 0 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-input {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
  }
}
</style>
