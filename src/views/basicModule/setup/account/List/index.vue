<template>
  <PageWrapper :footer="false">
    <div class="account-container">
      <div class="account-left">
        <div class="Dep-tree">
          <el-tree
            class="filter-tree"
            :data="DepartmentListData"
            :props="defaultProps"
            node-key="label"
            style="height: 100%"
            default-expand-all
            @node-click="nodeClick"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span
              class="custom-tree-node department-list-tree"
              slot-scope="{ node, data }"
            >
              <span>{{ node.label }}</span>
              <!-- <span>
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
              </span> -->
              <span>
                <el-button
                  type="text"
                  size="mini"
                  style="font-size: 14px; margin-right: 15px"
                  v-if="node.label !== $t('Generality.Ge_All')"
                  @click.stop="() => append(data)"
                >
                  {{ $t("Generality.Ge_AddChild") }}
                </el-button>
                <el-popconfirm
                  :title="$t('Generality.Ge_DeleteConfirm')"
                  v-if="node.label !== $t('Generality.Ge_All')"
                  @confirm="remove(node, data)"
                >
                  <el-button
                    type="text"
                    size="mini"
                    style="font-size: 14px"
                    slot="reference"
                    icon="el-icon-delete"
                    @click.stop="() => {}"
                  >
                  </el-button>
                </el-popconfirm>
              </span>
              <!-- <TableAction
                :actions="[
                  {
                    label: '删除',
                    icon: 'el-icon-delete',
                    popConfirm: {
                      title: '是否删除？',
                      confirm: () => {},
                    },
                  },
                  {
                    icon: 'el-icon-delete',
                    popConfirm: {
                      title: '是否删除？',
                      confirm: remove.bind(null, node, data),
                    },
                  },
                ]"
              /> -->
            </span>
          </el-tree>
        </div>

        <div class="addDep">
          <el-button
            style="
              width: 100%;
              border: 1px dashed rgba(0, 0, 0, 0.25);
              font-size: 16px;
            "
            @click="addDocument"
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
        >
          <template #Activate="{ row }">
            {{ row.Activate ? $t("setup.Active") : $t("setup.Deactive") }}
          </template>
          <template #operation="{ row }">
            <TableAction
              :actions="[
                {
                  label: $t('Generality.Ge_Edit'),
                  confirm: editAccount.bind(null, row),
                },
                {
                  label: $t('Generality.Ge_Delete'),
                  popConfirm: {
                    title: $t('Generality.Ge_DeleteConfirm'),
                    confirm: deleUser.bind(null, row),
                  },
                },
              ]"
            />
          </template>

          <Action slot="btn-list"
            ><el-button size="mini" @click="addUser">{{
              $t("Generality.Ge_New")
            }}</el-button>
            <el-button size="mini" @click="deleted">{{
              $t("setup.DeletedUsers")
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
      v-if="dialogFormVisible"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
// import { printPlugin } from "@/jv_doc/utils/system/printPlugin";

import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  getDepartmentList,
  deleteDepartment,
  editDepartment,
} from "@/api/basicApi/systemSettings/department";
import {
  getUserInfoList,
  editUserInfo,
  deleteUserAccount,
} from "@/api/basicApi/systemSettings/user";
export default {
  name: "Se_Users",
  data() {
    return {
      // 表格数据
      tableObj: {},
      formObj: {},
      remarkShow: false,
      dialogFormVisible: false,
      chooseList: [],
      editAccountTitle: "编辑账号",
      showTree: false,
      form: {
        filterText: "",
      },
      DepartmentListData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      departmenForm: {
        keyword: "",
      },
      addDialogVisible: false,
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
    deleted() {
      this.$router.push({
        name: "Se_Users_Deleted",
      });
    },
    append(data) {
      this.dialogFormVisible = true;
      var str = JSON.parse(JSON.stringify(data));
      this.formObj.form.ParentID = str.label;
    },
    remove(node, data) {
      deleteDepartment([data.label]).then((data) => {
        this.DepartmentListData = [];
        this.getData();
      });
    },
    addDocument() {
      this.dialogFormVisible = true;
      this.formObj.form = {
        Department: "",
      };
    },
    //新增类别确认保存
    confirmAddCategory() {
      this.formObj.validate((valid) => {
        if (valid) {
          editDepartment(this.formObj.form)
            .then((res) => {
              this.dialogFormVisible = false;
              this.formObj.reset();
              this.DepartmentListData = [];
              this.getData();
            })
            .catch((err) => {});
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
      this.DepartmentListData.forEach((item, index) => {
        this.$refs.tree.store.nodesMap[item.label].expanded = this.showTree;
      });
    },
    // 刪除账号
    deleUser(data) {
      let arr = [];
      arr.push(data.UserId);
      deleteUserAccount(arr).then((data) => {
        this.tableObj.getData();
      });
    },
    // tree树点击事件
    nodeClick(data) {
      if (data.label === this.$t("Generality.Ge_All")) {
        this.tableObj.formObj.form.DepartmentName = "";
      } else {
        this.tableObj.formObj.form.DepartmentName = data.label;
      }

      this.tableObj.getData();
    },
    // 获取部门列表
    getData() {
      getDepartmentList(this.departmenForm).then((data) => {
        function childrenList(data) {
          let list = [];
          data?.map((item) => {
            list.push({
              label: item.Department,
              children: childrenList(item.Children),
            });
          });
          return list;
        }
        data.Items.map((item) => {
          childrenList(item.children);
          const DepartmentList = {
            label: item.Department,
            children: childrenList(item.Children),
          };
          this.DepartmentListData.push(DepartmentList);
        });
        this.DepartmentListData.unshift({
          Children: [],
          label: this.$t("Generality.Ge_All"),
        });
      });
    },
    addUser() {
      this.$router.push({
        name: "Se_Users_Add",
      });
    },

    // 编辑部门
    editAccount(data) {
      this.$router.push({
        name: "Se_Users_Edit",
        query: {
          type: "edit",
          title: "editUser",
          UserId: data.UserId,
          UserName: data.UserName,
        },
      });
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
    // height: calc(100vh - 267px);
    position: relative;
    margin-right: 15px;
    background: #fff;
    ::v-deep .el-form-item {
      margin-bottom: 0;
      border-bottom: 1px solid #d9d9d9;
      padding: 4px;
    }
    .Dep-tree {
      height: calc(100% - 50px);
      margin-top: 50px;
      overflow-y: auto;
      font-size: 14px;
    }
    .addDep {
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
      font-size: 16px;
    }
  }
  .account-right {
    // height: calc(100vh - 112px);
    width: 80%;
  }
}
.department-list-tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 15px;
}
</style>
