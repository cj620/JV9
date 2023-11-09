<!--
 * @Author: C.
 * @Date: 2021-10-11 16:46:28
 * @LastEditTime: 2022-06-30 17:32:02
 * @Description: file content
-->
<template>
  <el-drawer v-bind="$attrs" v-on="$listeners">
    <div slot="title" class="title-style" @click="editTitle">
      <!-- {{ nodeItem.Name }} -->

      <span v-if="!inputShow">
        <span class="title-text">{{ nodeItem.Name }}</span>
      </span>
      <el-input
        v-model="nodeItem.Name"
        v-else
        @blur="inputShow = false"
        class="title-input"
        ref="titleInput"
      ></el-input>
    </div>
    <!-- 审核人的设置 -->
    <div class="approver-set">
      <el-radio-group v-model="nodeItem.ApproverType" @change="change">
        <el-row :gutter="20">
          <el-col
            :span="12"
            v-for="typeItem in approverTypeList"
            :key="typeItem.value"
            style="margin-top: 15px;width: 100%"
          >
            <el-radio :key="typeItem.value" :label="typeItem.value">{{
              typeItem.label
            }}</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
      <el-divider></el-divider>
      <div class="approver-action-wrapper">
        <!-- \编辑成员 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="addStaffShow = true"
          v-if="nodeItem.ApproverType == 'Personnel'"
          >{{ $t('setup.EditMembers') }}</el-button
        >
        <!-- 编辑成员 -->
        <div v-show="nodeItem.ApproverType == 'Personnel'">
          <el-tag
            v-for="tag in choosedStaff"
            :key="tag.UserId"
            closable
            style="margin: 5px 7px 0 0"
            @close="delStaffTag(tag.UserId)"
          >
            {{ tag.UserName }}
          </el-tag>
          <el-link
            type="primary"
            @click.native="choosedStaff = []"
            v-show="choosedStaff && choosedStaff.length != 0"
            >{{ $t('Generality.Ge_Clear') }}</el-link
          >
        </div>
      </div>
      <!-- 角色选择 -->
      <div class="role-choose" v-show="nodeItem.ApproverType == 'Role'">
        <el-radio-group v-model="nodeItem.ApproverRole">
          <el-row :gutter="20">
            <el-col
              :span="12"
              v-for="roleItem in roleList"
              :key="roleItem.RoleId"
              style="margin-top: 15px"
            >
              <el-radio :key="roleItem.RoleId" :label="roleItem.RoleName">{{
                roleItem.RoleName
              }}</el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </div>
      <!-- 审核方式模块 -->
      <div
        class="other-action-wrapper"
        v-show="
          (choosedStaff && choosedStaff.length > 1) ||
          nodeItem.ApproverType == 'Role'
        "
        v-for="auditItem in auditMap"
        :key="auditItem.title"
      >
        <el-divider></el-divider>
        <div class="title">{{ auditItem.title }}</div>
        <el-radio-group v-model="nodeItem.ApproveType" @change="change">
          <el-row :gutter="20">
            <el-col
              :span="24"
              v-for="typeItem in auditItem.list"
              :key="typeItem.value"
              style="margin-bottom: 15px"
            >
              <el-radio :key="typeItem.value" :label="typeItem.value"
                >{{ typeItem.label }}{{ typeItem.des }}</el-radio
              >
            </el-col>
          </el-row>
        </el-radio-group>
      </div>
    </div>

    <StaffSelect
      :title="$t('setup.EditMembers')"
      :visible.sync="addStaffShow"
      @complete="complete"
      :defaultStaff="choosedStaff"
    ></StaffSelect>
  </el-drawer>
</template>

<script>
// import ApproverSet from "./cpns/ApproverSet.vue";
import { approverTypeList } from "../../maps/approverMap";
import { auditMap } from "../../maps/auditMap";
import StaffSelect from "@/components/BasicModule/StaffSelect";
import { getAllRole } from "@/api/basicApi/systemSettings/role";
export default {
  components: {
    // ApproverSet,
    StaffSelect,
  },
  data() {
    return {
      approverTypeList,
      roleList: [],
      addStaffShow: false,
      choosedStaff: [],
      auditTypeShow: false,
      auditMap,
      inputShow: false,
    };
  },
  created() {},
  methods: {
    change(e) {
      // if (e == "Personnel" && this.choosedStaff.length == 1) {
      //   this.nodeItem.ApproveType = "JointlySign";
      // }
    },
    complete(e) {
      this.choosedStaff = e;
      // 测试
      // this.nodeData.properties.approver = e;

      this.addStaffShow = false;
    },
    delStaffTag(UserId) {
      let findPos = this.choosedStaff.findIndex(
        (item) => item.UserId == UserId
      );
      if (findPos >= 0) {
        this.choosedStaff.splice(findPos, 1);
      }
    },
    getRoleList() {
      getAllRole().then((res) => {
        this.roleList = res.Items;
      });
    },
    editTitle() {
      this.inputShow = true;
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
  },
  props: {
    nodeItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    "$attrs.visible": {
      handler(n, o) {
        // alert(n);
        if (!n) {
          if (this.nodeItem.ApproverType == "Personnel") {
            this.nodeItem.ApproveNodeUserDefs = this.choosedStaff.slice(0);
            this.nodeItem.ApproverRole = "";
          } else if (this.nodeItem.ApproverType == "Role") {
            this.nodeItem.ApproveNodeUserDefs = [];
          }
        } else {
          this.choosedStaff = this.nodeItem.ApproveNodeUserDefs;
          if (this.roleList.length == 0) {
            this.getRoleList();
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.approver-set {
  font-size: 15px;
  padding-left: 20px;
  .el-divider--horizontal {
    margin: 15px 0;
  }
  .other-action-wrapper {
    .title {
      margin-bottom: 15px;
    }
  }
}

.title-style {
  &:hover {
    .title-text {
      border-bottom: 2px dashed #409eff;
    }

    // border: 1px solid #409eff;
  }
}
</style>
