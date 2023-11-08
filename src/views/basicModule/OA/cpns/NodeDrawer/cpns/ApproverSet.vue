<!--
 * @Author: C.
 * @Date: 2021-10-11 17:18:39
 * @LastEditTime: 2022-06-28 15:52:38
 * @Description: file content
-->
<template>
  <div class="approver-set">
    <!-- 审核类型选择 -->
    <el-radio-group v-model="nodeData.properties.auditWay" @change="change">
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="typeItem in nodeSet"
          :key="typeItem.value"
          style="margin-top: 15px"
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
        v-show="typeSet.addStaff"
        @click="addStaffShow = true"
        >{{ $t('setup.EditMembers') }}</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-plus"
        round
        v-show="typeSet.addRole"
        >{{ $t('setup.EditRoles') }}</el-button
      >
      <div>
        <el-tag
          v-for="tag in choosedStaff"
          :key="tag.id"
          closable
          style="margin: 5px 7px 0 0"
          @close="delStaffTag(tag.id)"
        >
          {{ tag.userName }}
        </el-tag>
        <el-link
          type="primary"
          @click.native="choosedStaff = []"
          v-show="choosedStaff.length != 0"
          >{{ $t('Generality.Ge_Clear') }}</el-link
        >
      </div>
      <!-- 选择主管 -->
      <div v-show="typeSet.directorSelect">
        <span style="margin-right: 5px">发起人的</span>
        <el-select v-model="testData" size="mini">
          <el-option
            v-for="optionItem in typeSet.directorList"
            :key="optionItem.value"
            :label="optionItem.label"
            :value="optionItem.value"
          />
        </el-select>
      </div>
    </div>
    <!-- 审核方式模块 -->
    <div
      class="other-action-wrapper"
      v-show="auditTypeShow"
      v-for="auditItem in auditMap"
      :key="auditItem.title"
    >
      <el-divider></el-divider>
      <div class="title">{{ auditItem.title }}</div>
      <el-radio-group v-model="nodeData.properties.auditType" @change="change">
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
    <StaffSelect
      :title="$t('Generality.Ge_DocumentName')"
      :visible.sync="addStaffShow"
      @complete="complete"
      :defaultStaff="choosedStaff"
    ></StaffSelect>
  </div>
</template>

<script>
import { approverMap } from "../../../maps/approverMap";
import { auditMap } from "../../../maps/auditMap";
import StaffSelect from "@/components/BasicModule/StaffSelect";
export default {
  components: {
    StaffSelect,
  },
  props: {
    nodeSet: {
      type: Object,
      default: () => {},
    },
    nodeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 审核类型
      auditMap,
      testData: "",
      addStaffShow: false,
      choosedStaff: [],
      form: {},
    };
  },
  methods: {
    change(e) {},
    complete(e) {
      this.choosedStaff = e;
      // 测试
      this.nodeData.properties.approver = e;
      this.addStaffShow = false;
    },
    delStaffTag(id) {
      let findPos = this.choosedStaff.findIndex((item) => item.id == id);
      if (findPos >= 0) {
        this.choosedStaff.splice(findPos, 1);
      }
    },
  },
  computed: {
    typeSet() {
      this.choosedStaff = [];
      return approverMap[this.nodeData.properties.auditWay].renderSet;
    },
    // 判断出现会签或签的时机
    auditTypeShow() {
      return this.typeSet.multiplayer || this.choosedStaff.length > 1;
    },
  },
};
</script>

<style lang="scss">
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
</style>
