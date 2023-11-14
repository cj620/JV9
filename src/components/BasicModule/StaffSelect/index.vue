<!--
 * @Author: C.
 * @Date: 2021-10-12 09:41:51
 * @LastEditTime: 2022-01-10 15:35:54
 * @Description: 员工选择
-->
<template>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="complete"
    style="z-index: 3333"
    width="50%"
    :append-to-body="true"
    @open="dialogOpen"
  >
    <el-row style="width: 100%" class="staff-select">
      <!-- 选择框 -->
      <el-col :span="12">
        <div class="title">{{ $t('Generality.Ge_Select') }}：</div>
        <div class="select-block">
          <!-- 搜索框 -->
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchParams.Keyword"
            @input="searchChange"
            size="mini"
          >
            <!-- 部门选择 -->
            <el-popover
              placement="bottom-start"
              width="250"
              v-model="deptSelectShow"
              slot="append"
              @show="getDeptShow"
            >
              <el-tree
                :data="deptList"
                :expand-on-click-node="false"
                @node-click="handleTreeClick"
                :props="defaultProps"
                accordion
              >
              </el-tree>
              <el-button slot="reference" icon="el-icon-s-home"></el-button>
            </el-popover>
          </el-input>
          <div class="dept-box">
            {{ $t("menu.Se_Department") }}:
            <!-- <span v-if="currentDept">{{currentDept}}</span> -->
            <el-tag v-if="currentDept" closable @close="delDept">
              {{ currentDept }}
            </el-tag>
            <el-tag v-else>  {{ $t("Generality.Ge_All") }} </el-tag>
          </div>
          <!-- 人员列表 -->
          <div class="fields-box">
            <div class="all-checkbox">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                style="width: 100%"
                >{{ $t("Generality.Ge_SelectAll") }}</el-checkbox
              >
            </div>
            <div class="all-fields">
              <StaffItem
                v-for="chooseItem in staffList"
                :key="chooseItem.UserId"
                :data="chooseItem"
                @click="staffClick"
              ></StaffItem>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title">{{ $t("Generality.Ge_Selected") }}:</div>
        <div class="select-block select-drag-box">
          <StaffItem
            v-for="chooseItem in currentChoose"
            :key="chooseItem.UserId"
            :data="chooseItem"
            type="del"
            @del="delSelect"
            class="drag-item"
          ></StaffItem>
        </div>
      </el-col>
    </el-row>
  </JvDialog>
</template>

<script>
import { getUserInfoList } from "@/api/basicApi/systemSettings/user";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { debounce } from "@/jv_doc/utils/optimization";
import Sortable from "sortablejs";
import StaffItem from "./cpns/StaffItem.vue";
export default {
  components: {
    StaffItem,
  },
  props: {
    defaultStaff: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 搜索参数
      searchParams: {
        Keyword: "",
        PageSize: 99,
        CurrentPage: 1,
        SortColumn: "",
        SortOrder: 0,
      },

      // 用户列表
      staffList: [],
      deptList: [],
      // 当前的选择
      checkedFields: [],
      // 是否全选
      checkAll: false,
      // 全选状态
      isIndeterminate: false,
      deptSelectShow: false,
      defaultProps: {
        children: "Children",
        label: "Department",
      },
      currentDept: "",
      currentChoose: [],
    };
  },
  created() {
    // 获取用户列表
    this.getUserInfoList();
  },
  methods: {
    regDrag() {
      const tbody = document.getElementsByClassName("select-drag-box")[0];
      const _this = this;
      new Sortable(tbody, {
        // handle: ".handle", // handle's class
        draggable: ".drag-item",
        animation: 150,
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.currentChoose.splice(oldIndex, 1)[0];
          _this.currentChoose.splice(newIndex, 0, currRow);
        },
      });
    },
    complete() {
      this.$emit("complete", this.currentChoose);
    },
    // 全选处理
    handleCheckAllChange(val) {
      this.checkedFields = val ? this.staffList : [];
      this.currentChoose = JSON.parse(JSON.stringify(this.checkedFields));
      this.isIndeterminate = false;
    },
    // 获取用户列表
    getUserInfoList() {
      getUserInfoList(this.searchParams).then((res) => {
        this.staffList = res.Items;
      });
    },
    // 监听输入改变
    searchChange() {
      debounce(this.getUserInfoList);
    },
    // 打开部门POP框时
    getDeptShow() {
      if (this.deptList.length !== 0) return;
      getDepartmentList().then((res) => {
        this.deptList = res.Items;
      });
    },
    // 处理树形点击
    handleTreeClick(e) {
      this.currentDept = e.Department;
      this.searchParams.DepartmentName = e.Department;
      this.deptSelectShow = false;
      this.getUserInfoList();
    },
    // 删除部门搜索条件
    delDept() {
      this.currentDept = "";
      this.searchParams.DepartmentName = "";
      this.getUserInfoList();
    },
    delSelect(id) {
      let findPos = this.currentChoose.findIndex((item) => item.UserId == id);
      if (findPos >= 0) {
        this.currentChoose.splice(findPos, 1);
      }
    },
    staffClick(e) {
      if (!this.currentChoose.some((item) => item.UserId == e.UserId)) {
        this.currentChoose.push(e);
      } else {
        return;
      }
    },
    dialogOpen() {
      this.searchParams.Keyword = "";
      this.currentDept = "";
      this.getUserInfoList();
      this.currentChoose = JSON.parse(JSON.stringify(this.defaultStaff));
      this.$nextTick(() => {
        this.regDrag();
      });
    },
  },
};
</script>

<style lang="scss">
.staff-select {
  .title {
    font-size: 17px;
    margin-bottom: 10px;
  }
  .select-block {
    width: 95%;
    height: 400px;
    // background-color: pink;
    background-color: #f4f6f8;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
    .fields-box {
      padding: 7px 0;
      width: 100%;
      .all-checkbox {
        width: 100%;
      }
      .all-fields {
        width: 100%;
        height: 270px;
        overflow: auto;

        .field-item {
          margin-top: 5px;
          display: block;
          width: 100%;
          font-size: 15px;
        }
        .check-line {
          display: block;
          &:hover {
            background-color: #e7eaef;
          }
        }
      }
    }
    .dept-box {
      padding: 10px 0 0 0;
      font-size: 15px;
    }
  }
}
</style>
