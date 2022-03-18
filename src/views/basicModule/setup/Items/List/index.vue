<!--物料列表-->
<template>
  <PageWrapper :footer="false">
    <div class="account-container">
      <div class="account-left">
        <div class="item-tree">
          <el-tree
            class="filter-tree"
            :data="CategoryListData"
            style="height: 100%"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            @node-click="nodeClick"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span
              class="custom-tree-node items-tree"
              slot-scope="{ node, data }"
            >
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  style="font-size: 14px"
                  v-if="node.label !== $t('Generality.Ge_All')"
                  @click.stop="() => append(data)"
                >
                  {{ $t("Generality.Ge_AddChild") }}
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  style="font-size: 14px"
                  v-if="node.label !== $t('Generality.Ge_All')"
                  @click.stop="() => remove(node, data)"
                >
                  {{ $t("Generality.Ge_Delete") }}
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>

        <div class="addItem">
          <el-button
            style="
              width: 100%;
              border: 1px dashed rgba(0, 0, 0, 0.25);
              font-size: 16px;
            "
            @click="addItemType"
            >{{ $t("Generality.Ge_New") }}</el-button
          >
        </div>
      </div>
      <div class="account-right">
        <!-- 表格 -->
        <JvTable
          ref="BillTable"
          :table-obj="tableObj"
          @selectionChange="handleSelectionChange"
          @importConfirm="importConfirm"
        >
          <template #State="{ row }">
            {{ stateEnum[row.State] && stateEnum[row.State].name }}
          </template>
          <template #operation="{ row }">
            <TableAction
              :actions="[
                {
                  label: $t('Generality.Ge_Edit'),
                  confirm: edit.bind(null, row),
                },
                {
                  label: $t('Generality.Ge_Copy'),
                  confirm: copy.bind(null, row),
                },
                {
                  label: $t('Generality.Ge_Delete'),
                  popConfirm: {
                    title: $t('Generality.Ge_DeleteConfirm'),
                    confirm: delItem.bind(null, row),
                  },
                },
              ]"
            />
          </template>

          <Action slot="btn-list">
            <el-button size="mini" @click="add">{{
              $t("Generality.Ge_New")
            }}</el-button>
          </Action>
        </JvTable>
      </div>
    </div>
    <jv-dialog
      :title="$t('Generality.Ge_New')"
      width="35%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      @confirm="confirmAddCategory"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  getAllItemType,
  deleteMaterialCategory,
  addItemType,
} from "@/api/basicApi/systemSettings/ItemType";
import {
  deleteItem,
  batchInsertMaterialInfo,
} from "@/api/basicApi/systemSettings/Item";
import { stateEnum } from "@/enum/baseModule";
export default {
  data() {
    return {
      stateEnum,
      // 表格数据
      tableObj: {},
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      showTree: false,
      formObj: {},
      dialogFormVisible: false,
      form: { filterText: "" },
      CategoryListData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      departmenForm: {
        keyword: "",
      },
      importData: {},
    };
  },
  watch: {
    "form.filterText"(val) {
      this.$refs.tree.filter(val);
    },
  },

  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
    this.getData();
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  methods: {
    addItemType() {
      this.dialogFormVisible = true;
      this.formObj.form = {
        ItemType: "",
      };
    },
    append(data) {
      this.dialogFormVisible = true;
      var str = JSON.parse(JSON.stringify(data));
      this.formObj.form.ParentID = str.label;
    },
    remove(node, data) {
      deleteMaterialCategory([data.label]).then((data) => {
        this.CategoryListData = [];
        this.getData();
      });
    },
    //新增类别确认保存
    confirmAddCategory() {
      this.formObj.validate((valid) => {
        if (valid) {
          addItemType(this.formObj.form)
            .then((res) => {
              this.dialogFormVisible = false;
              this.formObj.reset();
              this.CategoryListData = [];
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 部门列表筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 部门列表展开/折叠
    handleCommand(command) {
      command === "1" ? (this.showTree = true) : (this.showTree = false);
      this.DepartmentListData.map((item) => {
        this.$refs.tree.store.nodesMap[item.id].expanded = this.showTree;
      });
    },
    //编辑页面
    edit(row) {
      this.$router.push({
        name: "Se_Item_Edit",
        query: { ItemId: row.ItemId, type: "edit", title: "Se_Item_Edit" },
      });
    },
    // 刪除账号
    delItem(data) {
      console.log(data);
      let arr = [];
      arr.push(data.ItemId);
      deleteItem(arr).then((data) => {
        this.tableObj.getData();
      });
    },
    // tree树点击事件
    nodeClick(data) {
      if (data.id === "all") {
        this.tableObj.formObj.form.ItemType = "";
      } else {
        this.tableObj.formObj.form.ItemType = data.label;
      }

      this.tableObj.getData();
    },
    // 打开新增页面
    add() {
      this.$router.push({ name: "Se_Item_Add", params: { type: "add" } });
    },
    //复制一张单子出来
    copy(row) {
      this.$router.push({
        name: "Se_Item_Edit",
        query: { ItemId: row.ItemId, type: "copy" },
      });
    },
    // 获取物料分类列表
    getData() {
      getAllItemType().then((data) => {
        data.Items.forEach((item) => {
          if (item.ParentID === null) {
            const CategoryList = {
              id: item.Id,
              label: item.ItemType,
              children: [],
            };
            this.CategoryListData.push(CategoryList);
          }
        });
        this.childrenList(this.CategoryListData, data.Items);
        this.CategoryListData.unshift({
          id: "all",
          label: this.$t("Generality.Ge_All"),
        });
      });
    },
    childrenList(data, res) {
      data.forEach((r) => {
        res.forEach((m) => {
          if (m.ParentID && m.ParentID === r.label) {
            if (!r.children) r.children = [];
            const childList = {
              id: m.Id,
              label: m.ItemType,
            };
            r.children.push(childList);
          }
        });
        if (r.children) this.childrenList(r.children, res);
      });
    },
    //导入成功
    async importConfirm(e) {
      var saveData = [];
      var materialAttributeListData = [];
      var materialCategoryListData = [];
      var ruleForm = {
        id: "",
        name: "",
        code: "",
        materialAttribute: "",
        materialCategory: "",
        materialInventoryInfo: {
          id: 0,
          defaultWarehouseId: 0, //默认仓库
          defaultWarehouseLocation: 0, //默认库位
        },
      };
      await this.tableObj.formObj.formSchema[3].api().then((res) => {
        materialAttributeListData = res.Items;
      });
      await this.tableObj.formObj.formSchema[4].api().then((res) => {
        materialCategoryListData = res.Items;
      });
      console.log(materialAttributeListData);
      e.forEach((item) => {
        ruleForm.code = item["物料编号"];
        ruleForm.name = item[this.$t("Generality.Ge_ItemsName")];

        materialAttributeListData.forEach((Titem) => {
          if (Titem.attributeName === item["属性"]) {
            ruleForm.materialAttribute = Titem.id;
            console.log(ruleForm, 6969);
          }
        });
        materialCategoryListData.forEach((Ttem) => {
          if (Ttem.name === item["分类"]) {
            ruleForm.materialCategory = Ttem.id;
          }
        });
        saveData.push(ruleForm);
      });

      batchInsertMaterialInfo(saveData).then((res) => {});
    },
    handleSelectionChange() {},
  },
};
</script>

<style lang="scss" scoped>
.account-container {
  height: 100%;
  display: flex;
  padding-bottom: 10px;
  .account-left {
    width: 20%;
    position: relative;
    background: #fff;

    margin-right: 15px;
    ::v-deep .el-form-item {
      margin-bottom: 0;
      background: #fff;
      border-bottom: 1px solid #d9d9d9;
      padding: 4px;
    }
    font-size: 14px;

    .addItem {
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      padding: 6px;
    }
    .item-tree {
      height: calc(100% - 50px);
      margin-top: 50px;
      overflow-y: auto;
    }

    .items-tree {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-right: 15px;
    }
  }
  .account-right {
    // height: calc(100vh - 112px);
    width: 80%;
  }
}
</style>
