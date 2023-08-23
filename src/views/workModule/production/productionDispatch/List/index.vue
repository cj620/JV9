<!--
 * @Author: your name
 * @Date: 2021-11-09 14:06:15
 * @LastEditTime: 2023-08-23 10:32:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\index.vue
-->
<template>
  <div class="design-page" ref="designPage">
    <!-- 左加载 -->
    <div class="left-loadding loadding-bar" @click="loadClcik(false)">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <!-- 右加载 -->
    <div class="right-loadding loadding-bar" @click="loadClcik(true)">
      <i class="el-icon-d-arrow-right"></i>
    </div>
    <div style="padding: 10px 50px 0px 50px">
      <TableHeader
        @fresh="M_tableObj.getData"
        @openSearch="showSearchForm = true"
        :tableObj="M_tableObj"
      ></TableHeader>
    </div>
    <div class="staff-list list-box">
      <el-row>
        <el-col
          :span="4"
          v-for="item in M_tableObj.tableData"
          :key="item.UserId"
        >
          <div class="card-box">
            <MachineCard :cdata="item"></MachineCard>
          </div>
        </el-col>
      </el-row>
    </div>

    <transition name="fade" mode="out-in" appear>
      <div class="task-list list-box" ref="processBox" @scroll="processScroll">
        <el-row>
          <el-col :span="4" v-for="(item, index) in processData" :key="index">
            <div class="card-box">
              <TaskBox :cdata="item" @command="dropCommand"></TaskBox>
            </div>
          </el-col>
        </el-row>
        <JvFooter></JvFooter>
      </div>
    </transition>
    <JvDialog
      :title="$t('production.Pr_SwitchDevice')"
      :visible.sync="dropVisible"
      width="30%"
      @confirm="toToggleMachine"
    >
      <JvForm :formObj="toggleMachineObj"> </JvForm>
    </JvDialog>
    <!-- 表单搜索抽屉 -->
    <SearchForm
      v-if="M_tableObj.props.searchBar"
      :title="$t('Generality.Ge_SearchForm')"
      :visible.sync="showSearchForm"
      :form-obj="M_tableObj.formObj"
      @search="formSubmit('search')"
      @reset="formSubmit('reset')"
    />
  </div>
</template>

<script>
import { M_Table, P_Table } from "./config";
import TableHeader from "@/jv_doc/cpn/JvTable/cpn/TableHeader";
import SearchForm from "@/jv_doc/cpn/JvTable/cpn/SearchForm.vue";
import JvFooter from "@/jv_doc/cpn/JvFooter";
import MachineCard from "./cpns/MachineCard.vue";
import TaskBox from "./cpns/TaskBox.vue";
import { Form } from "@/jv_doc/class/form";
import {
  production_dispatching_topping,
  production_dispatching_change_device,
} from "@/api/workApi/production/productionDispatch";
import { getResourceMember } from "@/api/workApi/production/baseData";
import debounce from "@/jv_doc/utils/optimization/debounce";
export default {
  name: "ProductionDispatch",
  components: {
    MachineCard,
    TaskBox,
    JvFooter,
    SearchForm,
    TableHeader,
  },
  data() {
    return {
      // 设备列表对象
      M_tableObj: {},
      // 工序表格对象
      P_tableObj: {},
      showSearchForm: false,
      processData: [],
      // 切换机床
      dropVisible: false,
      toggleMachineObj: {},
      isAllproceeList: false,
      currentProcessPage: 1,
    };
  },
  created() {
    this.M_tableObj = new M_Table();
    this.P_tableObj = new P_Table();

    this.M_tableObj.setCallBack((res) => this.getProcessData(res));
    this.M_tableObj.pager.sizeChange(5);
    this.M_tableObj.formObj.form.ShowInProdSchedule = true;
    // console.log(this.M_tableObj.formObj.form.ShowInProdSchedule, 4545);
  },

  computed: {},
  methods: {
    loadClcik(state = true) {
      let { Total, page, pageSize } = this.M_tableObj.pager;
      let isLast = page * pageSize >= Total;
      if (state) {
        if (isLast) return;
        this.M_tableObj.pager.currentChange(page + 1);
		  // this.M_tableObj.pager.currentChange(page + 1);
      } else {
        if (page <= 1) return;
        this.M_tableObj.pager.currentChange(page - 1);
		  // this.M_tableObj.pager.currentChange(page + 1);
      }
    },
    formSubmit(type) {
      if (type == "reset") {
        this.M_tableObj.formObj.form = Object.assign(
          JSON.parse(this.M_tableObj.copyForm),
          { PageSize: 6 }
        );
        this.M_tableObj.getData();
      } else {
        this.M_tableObj.getData();
      }
      this.showSearchForm = false;
    },
    processScroll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (scrollBottom < 100) {
        // if (this.isAllproceeList) return;
        // this.P_tableObj.pager.page
        console.log(this.currentProcessPage, this.P_tableObj.pager.page);
        if (this.currentProcessPage - this.P_tableObj.pager.page == 1) {
          this.P_tableObj.pager.currentChange(this.currentProcessPage);
        }
      }
    },
    getProcessData(data, flash) {
      this.P_tableObj.formObj.form.Devices = data.Items.map((item) => {
        return item.DeviceNo;
      });
      this.P_tableObj.pager.page = 1;
      this.P_tableObj.setCallBack((val) => {
        this.setProcessData(val.Items, this.P_tableObj.pager.page == 1);
      });
      this.P_tableObj.pager.sizeChange(5);
    },
    setProcessData(data, flash) {
      if (flash) {
        // this.isAllproceeList = false;
        this.currentProcessPage = 1;
        this.processData = data;
      } else {
        this.processData = this.processData.map((item, index) => {
          return [...item, ...data[index]];
        });
      }
      if (data.some((item) => item.length == 5)) {
        this.currentProcessPage += 1;
      }
    },
    cardClick(e, s, r, a) {
      // console.log(5684848, e, s, r, a);
    },
    dropCommand(e) {
      if (e.Type == "toggle") {
        // console.log(e.Resource, 9999999999);
        this.dropVisible = true;
        // 切换机床表单
        this.toggleMachineObj = new Form({
          formSchema: [
            {
              prop: "DeviceName",
              label: this.$t("production.Pr_Equipment"),
              cpn: "SyncSelect",
              api: getResourceMember,
              default: e.PlanDevice,
              apiOptions: {
                keyName: "DeviceNo",
                valueName: "DeviceNo",
                params: {
                  ResourceId: e.Resource,
                },
                clearCache: true,
              },
            },
            {
              prop: "Topping",
              label: this.$t("production.Pr_Top"),
              cpn: "FormRadio",
              default: true,
              type: "button",
              options: {
                list: [
                  {
                    value: true,
                    label: this.$t("Generality.Ge_Yes"),
                  },
                  {
                    value: false,
                    label: this.$t("Generality.Ge_No"),
                  },
                ],
              },
            },
          ],
          defaultForm: {
            TaskProcessId: e.TaskProcessId,
          },
          labelPosition: "top",
        });
      } else if (e.Type == "top") {
        production_dispatching_topping({ TaskProcessId: e.TaskProcessId }).then(
          (res) => {
            this.M_tableObj.pager.sizeChange(5);
          }
        );
      }
    },
    toToggleMachine() {
      // this.M_tableObj.getData();
      production_dispatching_change_device(this.toggleMachineObj.form).then(
        (res) => {
          this.M_tableObj.pager.sizeChange(5);
          this.dropVisible = false;
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.design-page {
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  background-color: #f0f2f5;
  .extra {
    padding: 5px 60px;
    @include flexBox($jc: space-between);
    width: 100%;
    height: 50px;
    background-color: #fff;
    .bar-icon {
      margin: 3px 5px;
      cursor: pointer;
      font-size: 22px;
    }
    .left-bar {
      @include flexBox($jc: flex-start);
      .state-bar {
        &::before {
          content: "|";
          font-size: 15px;
          margin-left: 10px;
          color: rgb(199, 199, 199);
        }
      }
    }
  }
  .list-box {
    padding-top: 10px;
    width: calc(100% - 100px);
    margin-left: 50px;
    min-width: 1600px;
    .card-box {
      width: 100%;
      @include flexBox;
    }
  }
  .staff-list {
    height: 130px;
    box-shadow: 0 2px 10px 0 rgb(0, 0, 0, 0.4);
    // border: 1px solid #000;
    background-color: #fff;
  }
  .task-list {
    height: calc(100% - 180px);
    // background-color: rgb(235, 235, 235);
    overflow: auto;
  }
  .loadding-bar {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    background-color: rgb(218, 218, 218);
    @include flexBox;
    &:hover {
      background-color: rgb(228, 238, 255);
    }
  }
  .right-loadding {
    right: 0;
    z-index: 99;
  }
  .left-loadding {
    left: 0;
  }
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(68, 68, 68);
}
</style>
