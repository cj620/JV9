<template>
  <div>
    <jv-dialog
        :title="$t('device.De_DeviceRepairItem')"
        width="70%"
        :close-on-click-modal="true"
        :modal-append-to-body="false"
        :append-to-body="false"
        v-bind="$attrs"
        v-on="$listeners"
        @confirm="confirmMaterial"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('Generality.Ge_Optional')" name="ToBeSelected">
          <div class="selected-material-filter">
            <span
                v-for="(item, index) in ItemTypeList"
                @click="clickItemType(item.ItemType, index)"
                :key="index"
                :class="[
                isActive === index ? 'active' : '',
                'selected-material-filter-condition-tag',
              ]"
            >
              {{ item.ItemType }}
            </span>
          </div>
          <!-- 表格 -->
          <JvTable
              ref="BillTable"
              :table-obj="tableObj"
              @selectionChange="handleSelectionChange"
          >
            <template #Quantity="{ row }">
              <el-input
                  v-model="row.Quantity"
                  size="mini"
                  style="width: 125px"
              >
                <template slot="append"> {{ row.Unit }}</template>
              </el-input>
            </template>
          </JvTable>
        </el-tab-pane>
        <el-tab-pane :label="$t('Generality.Ge_Selected')" name="selected">
          <div style="height: 459px">
            <!-- 表格 -->
            <JvTable ref="BillTable1" :table-obj="tableObj1">
              <template #Quantity="{ row }">
                <el-input
                    v-model="row.Quantity"
                    size="mini"
                    style="width: 125px"
                >
                  <template slot="append"> {{ row.Unit }}</template>
                </el-input>
              </template>
              <template #Remarks="{ row }">
                <el-input
                    v-model="row.Remarks"
                    size="mini"
                    style="width: 125px"
                ></el-input>
              </template>
            </JvTable>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="sup-round" v-if="tableObj1.props.data.length > 0">
        {{ tableObj1.props.data.length }}
      </div>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "./config";
import { Table1 } from "./selectedConfig";
import { getAllItemType } from "@/api/basicApi/systemSettings/ItemType";
import i18n from "@/i18n/i18n";

export default {
  name: "index",
  data() {
    return {
      activeName: "ToBeSelected",
      ItemsDialogFormVisible: true,
      // 表格数据
      tableObj: {},
      ItemTypeList: [],
      tableObj1: {},
      isActive: 0,
    };
  },
  props: {
    type: {
      type: String,
      default: () => "multiple",
    },
    transferData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj1 = new Table1();
    this.tableObj.getData();
    if (this.type === "singleItem") {
      this.tableObj.props.selectType = "radio";
    }
    this.ConfigurationData();
    this.tableObj.setCallBack((e) => {
      e.Items.forEach((item) => {
        if (!item.Quantity) {
          this.$set(item, "Quantity", "1");
        }
      })
      e.Items.map((item1) => {
        const item2 = this.tableObj1.props.data.find((item3) => item3.ItemId === item1.ItemId);
        if (item2) {
          item1.Quantity = item2.Quantity
        }
        return item1;
      });
    })
  },

  methods: {
    ConfigurationData() {
      getAllItemType().then((res) => {
        this.ItemTypeList = res.Items;
        this.ItemTypeList.unshift({
          id: "all",
          ItemType: this.$t("Generality.Ge_All"),
        });
      });
    },
    doLayout() {
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
    //切换tab栏
    handleClick(tab, event) {
      if (tab.name === "ToBeSelected") {
        this.doLayout();
        this.tableObj.props.data.map((item1) => {
          const item2 = this.tableObj1.props.data.find((item3) => item3.ItemId === item1.ItemId);
          if (item2 && item2.Quantity !== item1.Quantity) {
            item1.Quantity = item2.Quantity
          }
          return item1;
        });
      } else if (tab.name === "selected") {
        this.tableObj1.props.data.map((item1) => {
          const item2 = this.tableObj.props.data.find((item3) => item3.ItemId === item1.ItemId);
          if (item2 && item2.Quantity !== item1.Quantity) {
            item1.Quantity = item2.Quantity
          }
          return item1;
        });
      }
    },

    //选择父级物料
    confirmMaterial() {
      let IsRepeat = false;
      let repeatMateria = "";
      let numFalse = false;
      const arr = this.tableObj1.props.data.map((item) => {
        delete item.Description2
        delete item.ItemCategory
        delete item.ItemStockInfo
        delete item.ItemStockRecord
        delete item.ItemType
        delete item.MaxStock
        delete item.SafetyStock
        delete item.PhotoUrl
        delete item.Project
        delete item.Project
        delete item.State
        this.$set(item, 'Id', 0)
        this.$set(item, 'BillGui', "")
        return item;
      })
      if (arr.length > 0) {
        if (this.transferData.length > 0) {
          console.log(this.transferData,'21312313123')
          arr.forEach((item) => {
            this.transferData.forEach((Titem) => {
              if (item.ItemId === Titem.ItemId) {
                IsRepeat = true;
                repeatMateria = item.ItemName;
              }
            });
            if (item.Quantity <= 0) {
              numFalse = true;
            }
          });
          if (IsRepeat) {
            this.$message({
              type: "warning",
              message: this.$t("menu.Se_Item") + repeatMateria + " 重复!",
            });
          } else if (numFalse) {
            this.$message({
              type: "warning",
              message: this.$t("Generality.Ge_QuantityShouldBeGreaterThan"),
            });
          } else {
            let arr1 = this.transferData.concat(arr)
            this.$emit("confirmData", arr1);
          }
        } else {
          arr.forEach((item) => {
            if (item.Quantity <= 0) {
              numFalse = true;
            }
          })
          if (numFalse) {
            this.$message({
              type: "warning",
              message: this.$t("Generality.Ge_QuantityShouldBeGreaterThan"),
            });
          } else {
            this.$emit("confirmData", arr);
          }
        }
      } else {
        this.$message({
          type: "warning",
          message: i18n.t("Generality.Ge_SelectNeededItems"),
        });
      }
    },

    //点击类别筛选
    clickItemType(e, index) {
      this.isActive = index;
      if (e === this.$t("Generality.Ge_All")) {
        this.tableObj.formObj.form.ItemType = "";
      } else {
        this.tableObj.formObj.form.ItemType = e;
      }

      this.tableObj.getData();
    },

    handleSelectionChange(e, keys) {
      this.tableObj1.props.data = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-material-filter {
  margin-bottom: 15px;
  margin-left: 10px;
  .selected-material-filter-condition-tag {
    border: 1px solid #d9d9d9;
    padding: 2px 7px;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    background: #fafafa;
  }
  .selected-material-filter-condition-tag:hover {
    cursor: pointer;
    color: #006fff;
    background-color: #edf1ff;
    border-radius: 4px;
    padding: 2px 7px;
  }
}
.active {
  color: #006fff;
  background-color: #edf1ff;
  border-radius: 3px;
  padding: 0.4px;
}
.sup-round {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  background-color: red;
  border-radius: 10px;
  position: absolute;
  top: 70px;
  left: 115px;
}
</style>
