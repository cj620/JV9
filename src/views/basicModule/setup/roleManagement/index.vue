<template>
  <PageWrapper :footer="false">
    <div class="role-management-container">
      <div class="role-management-left">
        <ul>
          <li
            v-for="(item, index) in roleList"
            :key="index"
            @click="roleClick(item.RoleId)"
            :class="{ actived: RoleId === item.RoleId }"
          >
            <span class="role-management-left-item"
              >{{ item.RoleName
              }}<span class="role-management-left-item-icon">
                <i
                  class="el-icon-user"
                  @click.stop="addUser(item.RoleId, item.RoleName)"
                ></i>
                <i class="el-icon-edit" @click.stop="editRole(item)"></i
                ><i
                  class="el-icon-delete"
                  @click.stop="deleteRole(item.RoleId)"
                ></i></span
            ></span>
          </li>
        </ul>
        <div class="addRole">
          <el-button
            style="width: 100%; border: 1px dashed rgba(0, 0, 0, 0.25)"
            @click="addRole"
            >{{ $t("Generality.Ge_New") }}</el-button
          >
        </div>
      </div>
      <div class="role-management-right">
        <JvTable ref="BillTable" :table-obj="tableObj">
          <template #PermissionValue="{ row }">
            <el-radio-group
              v-if="row.Children.length === 0"
              v-model="row.PermissionValue"
              @change="roleChange(row, row.PermissionValue)"
            >
              <el-radio :label="1">{{
                $t("Generality.Ge_NoAuthority")
              }}</el-radio>
              <el-radio :label="2">{{ $t("Generality.Ge_Readable") }}</el-radio>
              <el-radio :label="4">{{
                $t("Generality.Ge_ReadWrite")
              }}</el-radio>
            </el-radio-group>

            <Popover
              v-else
              @click="batchRadio = 4"
              @confirm="batchChange(row.Children)"
            >
              <el-radio-group v-model="batchRadio">
                <el-radio :label="1">{{
                  $t("Generality.Ge_NoAuthority")
                }}</el-radio>
                <el-radio :label="2">{{
                  $t("Generality.Ge_Readable")
                }}</el-radio>
                <el-radio :label="4">{{
                  $t("Generality.Ge_ReadWrite")
                }}</el-radio>
              </el-radio-group>
            </Popover>
          </template>
        </JvTable>
        <div class="addRoleAuthority">
          <el-button @click="addRoleAuthority">{{
            $t("Generality.Ge_Save")
          }}</el-button>
        </div>
      </div>
    </div>
    <JvDialog
      :title="dialogTitle"
      :visible.sync="editDialogVisible"
      v-if="editDialogVisible"
      @confirm="confirmEditRole"
      width="25%"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
    <JvDialog
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="userDialogVisible"
      @confirm="confirmEditRoleUser"
      width="50%"
      v-if="userDialogVisible"
    >
      <editRoleUser @updateUser="userList = $event" :RoleId="curRoleId" />
    </JvDialog>
  </PageWrapper>
</template>

<script>
import {
  getAllRole,
  getAllKey,
  getRoleAuthority,
  editRole,
  editRoleAuthority,
  deleteRole,
  editRoleMember,
} from "@/api/basicApi/systemSettings/role";

import { formSchema } from "./config";
import { Table } from "./tableConfig";
import { Form } from "@/jv_doc/class/form";
import { fn, translation, getPermission } from "./utils";
import editRoleUser from "./editRoleUser.vue";
import Popover from "./cpns/Popover";
export default {
  data() {
    return {
      roleList: [],
      tableObj: {},
      formObj: {},
      dialogTitle: this.$t("Generality.Ge_Edit"),
      rolePermissionsList: [],
      editDialogVisible: false,
      userDialogVisible: false,
      userList: [],
      RolePermissions: [],
      RoleId: "",
      curRoleId: "",
      visible: false,
      batchRadio: 4,
    };
  },
  created() {
    this.getData();
    this.tableObj = new Table();
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelPosition: "top",
      labelWidth: "100px",
    });
  },
  methods: {
    batchChange(row) {
      for (let key in row) {
        row[key].PermissionValue = this.batchRadio;
        if (row[key].Children.length !== 0) {
          this.batchChange(row[key].Children);
        }
      }
    },
    // 选择角色
    roleClick(id) {
      this.RoleId = id;
      this.getRoleAuthority(id);
    },
    // 选择权限
    roleChange(row, value) {
      if (row.Children.length > 0) {
        fn(row.Children, value);
      }
    },
    // 打开新增角色弹窗
    addRole() {
      this.editDialogVisible = true;
      this.dialogTitle = this.$t("Generality.Ge_New");
      this.formObj.form = {
        RoleName: "",
        RoleId: 0,
        RoleDefaultNavigationBar: "",
      };
    },
    // 打开编辑角色dialog
    editRole(params) {
      this.dialogTitle = this.$t("Generality.Ge_Edit");
      this.editDialogVisible = true;
      this.formObj.form = { ...params };
    },
    // 打开新增角色成员弹窗
    addUser(id, name) {
      this.userDialogVisible = true;
      this.curRoleId = id;
    },
    confirmEditRoleUser() {
      editRoleMember({
        RoleId: this.curRoleId,
        UserIds: this.userList,
      }).then(() => {});
      this.userDialogVisible = false;
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm(this.$t("setup.ConfirmDeleteRoles"), this.$t("Generality.Ge_DeleteData"), {
        confirmButtonText: this.$t("Generality.Ge_OK"),
        cancelButtonText: this.$t("Generality.Ge_Cancel"),
        type: "warning",
      })
        .then(() => {
          let arr = [];
          arr.push(id);
          deleteRole(arr).then((data) => {
            this.getData();
          });
        })
        .catch(() => {});
    },
    // 确认编辑角色
    confirmEditRole() {
      this.formObj.validate((valid) => {
        if (valid) {
          editRole(this.formObj.form).then((data) => {
            this.getData();
            this.editDialogVisible = false;
          });
        }
      });
    },
    async getData() {
      // 获取所有角色
      await getAllRole().then((res) => {
        this.roleList = res.Items;
      });
      // 获取所有权限 取第一个角色的权限值
      await getAllKey().then((res) => {
        this.rolePermissionsList = translation(res.Items);
        this.tableObj.setData(this.rolePermissionsList);
        this.RoleId = this.roleList[0].RoleId;
        this.getRoleAuthority(this.RoleId);
      });
    },
    // 每个角色对应的权限
    getRoleAuthority(id) {
      getRoleAuthority({ roleId: id }).then((res) => {
        if (res.Items.length !== 0) {
          this.RolePermissions = res.Items;
          getPermission(this.rolePermissionsList, this.RolePermissions);
        } else {
          getAllKey().then((res) => {
            this.rolePermissionsList = translation(res.Items);
            this.tableObj.setData(this.rolePermissionsList);
          });
        }
      });
    },
    // 保存权限
    addRoleAuthority() {
      const data = JSON.parse(JSON.stringify(this.tableObj.tableData));
      const roleList = {
        RoleId: this.RoleId,
        Permissions: fn(data),
      };
      editRoleAuthority(roleList).then((data) => {
        this.roleClick(this.RoleId);
      });
    },
  },
  components: { editRoleUser, Popover },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
}

.role-management-container {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  .role-management-left {
    margin-right: 15px;
    width: 190px;
    height: calc(100vh - 125px);
    overflow-y: auto;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    ul {
      margin-top: 60px;
    }
    ul > li {
      font-size: 14px;
      padding: 6px 12px;
      line-height: 1.5;
      overflow: hidden;
      border-bottom: none;
      color: #000000d9;

      .role-management-left-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: none;
          font-size: 1rem;
          i {
            margin: 0 3px;
          }
        }
      }
      &:hover {
        background-color: whitesmoke;
        cursor: pointer;
        .role-management-left-item {
          span {
            color: #006fff;
            display: inline;
          }
        }
      }
      &.actived {
        color: #006fff;
        background-color: whitesmoke;
      }
    }
    .addRole {
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
  }
  .role-management-right {
    flex: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 125px);
    width: calc(100% - 190px);
    &-wrapper {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
    }
    .role-management-role {
      border-bottom: 0.57143rem solid#F0F2F5;

      header {
        padding: 1.14286rem;
        border-bottom: 1px solid #f5f5f5;
        font-size: 16px;
        line-height: 1.71429rem;
        color: #000000d9;
        font-weight: 500;
      }
      //.role-management-main {
      //  display: flex;
      //  display: -webkit-flex;
      //  border-bottom: 1px solid #f5f5f5;
      //  align-items: stretch;
      //  font-size: 14px;
      //  color: #000000a6;
      //  &-left {
      //    padding: 1.14286rem;
      //    width: 118px;
      //    display: flex;
      //    align-items: center;
      //
      //    border-right: 1px solid #f5f5f5;
      //  }
      //  &-right {
      //    padding: 1.14286rem;
      //    width: calc(100% - 118px);
      //    align-self: center;
      //  }
      //}
    }
    .addRoleAuthority {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      background: #fff;
      -webkit-box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
      padding: 1.14286rem 0.85714rem;
    }
  }
}
</style>
