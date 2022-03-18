<!--
 * @Author: H.
 * @Date: 2021-11-09 13:02:21
 * @LastEditTime: 2022-01-24 08:54:02
 * @Description: 资源组
-->
<template>
  <PageWrapper :footer="false">
    <div class="Resource-list">
      <div class="add-resources" @click="add">
        <i class="el-icon-plus"></i> {{ $t("Generality.Ge_New") }}
      </div>
      <div
        v-for="(item, index) in ResourceData"
        :key="index"
        class="Resource-list-item"
      >
        <div class="Resource-list-item-content">
          <div class="Resource-list-item-content-info">
            <div class="Resource-list-item-content-info-title">
              <span>{{ item.ResourceId }}</span>
              <span class="ResourceType">{{
                item.ResourceType === "Unlimited"
                  ? $t("production.Pr_Outside")
                  : $t("production.Pr_Inside")
              }}</span>
            </div>
            <div class="DeviceNo" v-if="item.Members.length > 0">
              <span v-for="(Resource, index) in item.Members" :key="Resource.Id"
                >{{ Resource.DeviceNo
                }}{{
                  item.Members.length === 1
                    ? ""
                    : index === item.Members.length - 1
                    ? ""
                    : "，"
                }}</span
              >
            </div>
            <div
              class="DeviceNo"
              style="font-size: 16px; font-weight: bold"
              v-else
            >
              —
            </div>
          </div>
          <div>
            <div class="Resource-list-item-content-operate">
              <div @click="detail(item.ResourceId)">
                {{ $t("Generality.Ge_Details") }}
              </div>
              <div @click="del([item.ResourceId])">
                {{ $t("Generality.Ge_Delete") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <jv-dialog
      :title="$t('Generality.Ge_New')"
      width="35%"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="dialogConfirm"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
    <jv-dialog
      :title="$t('Generality.Ge_ResourceGroupMembers')"
      width="35%"
      :visible.sync="dialogTableVisible"
      @confirm="dialogTableConfirm"
      :autoFocus="true"
      v-if="dialogTableVisible"
    >
      <el-select
        style="margin-bottom: 20px"
        v-model="ResourceType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="DeviceNo"
          :label="$t('production.Pr_DeviceNo')"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Master"
          :label="$t('Generality.Ge_MainEquipment')"
          align="center"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Master"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-button type="text" size="small" @click="addResourceMember">
              {{ $t("Generality.Ge_New") }}
            </el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteResourceMember(scope.row)"
            >
              {{ $t("Generality.Ge_Delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </jv-dialog>
    <jv-dialog
      :title="
        $t('Generality.Ge_New') + $t('Generality.Ge_ResourceGroupMembers')
      "
      width="35%"
      :visible.sync="ResourceMemberVisible"
      @confirm="ResourceMemberConfirm"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj1">
        <template #Master="{ prop }">
          <el-checkbox v-model="formObj1.form[prop]"> </el-checkbox>
        </template> </JvForm
    ></jv-dialog>
  </PageWrapper>
</template>

<script>
import { formSchema, formSchema1 } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  getAllResource,
  editResource,
  deleteResource,
  getResourceMember,
  editResourceMember,
} from "@/api/workApi/production/baseData";
export default {
  data() {
    return {
      ResourceData: [],
      formObj: {},
      formObj1: {},
      tableData: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      ResourceMemberVisible: false,
      radio: 1,
      ResourceId: "",
      ResourceType: "",
      options: [
        {
          value: "Default",
          label: this.$t("production.Pr_Inside"),
        },
        {
          value: "Unlimited",
          label: this.$t("production.Pr_Outside"),
        },
      ],
    };
  },
  methods: {
    getData() {
      getAllResource().then((res) => {
        this.ResourceData = res.Items;
      });
    },
    add() {
      this.dialogFormVisible = true;
    },
    //  查看资源组详情
    detail(id) {
      this.ResourceId = id;
      this.ResourceType = this.ResourceData.find(
        (item) => item.ResourceId === id
      ).ResourceType;
      getResourceMember({ ResourceId: id }).then((res) => {
        this.dialogTableVisible = true;
        this.tableData = res.Items;
      });
    },
    // 删除资源组
    del(ids) {
      this.$confirm("确定删除此资源组?", "", {
        confirmButtonText: this.$t("Generality.Ge_OK"),
        cancelButtonText: this.$t("Generality.Ge_Cancel"),
        type: "warning",
      }).then(() => deleteResource(ids).then(() => this.getData()));
    },
    // 资源组dialog确定
    dialogConfirm() {
      this.formObj.validate((valid) => {
        if (valid) {
          editResource(this.formObj.form).then(() => {
            this.dialogFormVisible = false;
            this.getData();
          });
        }
      });
    },
    // 设备成员dialog确定
    dialogTableConfirm() {
      const array = {
        ResourceId: this.ResourceId,
        Devices: this.tableData,
        ResourceType: this.ResourceType,
      };
      editResourceMember(array).then(() => {
        this.dialogTableVisible = false;
        this.tableData = [];
        this.getData();
      });
    },
    // 添加设备成员
    addResourceMember() {
      this.ResourceMemberVisible = true;
      this.formObj1.form = {
        DeviceNo: "",
        Master: false,
      };
    },
    // 删除资源组成员
    deleteResourceMember(row) {
      const index = this.tableData.indexOf(row);
      this.tableData.splice(index, 1);
    },
    // 新增资源组成员confirm
    ResourceMemberConfirm() {
      if (
        this.tableData.some(
          (item) => item.DeviceNo === this.formObj1.form.DeviceNo
        )
      ) {
        this.$message.warning(this.$t("Generality.Ge_DeviceExists"));
        return;
      }
      this.tableData.push(this.formObj1.form);
      this.ResourceMemberVisible = false;
    },
  },
  created() {
    this.getData();
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.formObj1 = new Form({
      formSchema: formSchema1,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
};
</script>

<style lang="scss" scoped>
.Resource-list {
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  .add-resources {
    width: 15.5%;
    height: 140px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin-top: 0.55%;
    margin-right: 0.55%;
    background: #fff;
    line-height: 140px;
    text-align: center;
    cursor: pointer;
  }
  .Resource-list-item {
    width: 15.5%;
    height: 140px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin: 0.55%;
    background: #fff;

    &:nth-child(6n + 1) {
      margin-left: 0 !important;
    }
    &:hover {
      box-shadow: 2px 2px 5px #e8e8e8;
      cursor: pointer;
    }
    .Resource-list-item-add {
      line-height: 140px;
      text-align: center;
    }
    .Resource-list-item-content {
      .Resource-list-item-content-info {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 20px;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .ResourceType {
            font-size: 14px;
            font-weight: normal;
            color: #525252;
          }
        }
        .DeviceNo {
          // height: 30px;
          width: 100%;
          padding-top: 19px;
          // margin-top: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .Resource-list-item-content-operate {
        display: flex;
        align-items: center;
        height: 40px;
        border-top: 1px solid #e8e8e8;
        background: #f5f5f5;
        div {
          width: 50%;
          text-align: center;
          &:hover {
            color: blue;
          }
        }
      }
    }
  }
}
</style>
