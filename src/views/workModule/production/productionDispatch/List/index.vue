<!--
 * @Author: your name
 * @Date: 2021-11-09 14:06:15
 * @LastEditTime: 2023-08-23 10:32:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\c-menu.vue
-->
<template>
  <div class="design-page" ref="designPage">
        <div class="left-loadding loadding-bar">
            <el-popover
              placement="right-start"
              width="200"
              trigger="click"
              v-model="showPopover"
              style="position: absolute;top: 40px;left: 12px;"
            >
              <JvForm :form-obj="M_tableObj.formObj">
              </JvForm>
                <el-button size="mini" type="text" @click="formSubmit('reset')">
                    {{ $t('Generality.Ge_Clear') }}
                </el-button>
                <el-button
                        type="primary"
                        @click="formSubmit('search')"
                        size="mini"
                        style="position: absolute; right: 10px;"
                >
                    {{ $t('Generality.Ge_Search') }}
                </el-button>
              <el-button slot="reference" type="info" icon="el-icon-more" size="medium" circle >
              </el-button>
            </el-popover>
<!--          <screenFull style="top: 100px; position:absolute;"></screenFull>-->
          <el-button @click="loadClcik(false)" type="info" icon="el-icon-arrow-left" size="medium" circle></el-button>
        </div>
        <div class="right-loadding loadding-bar">
          <el-button type="info" @click="setScrollTo('up')" icon="el-icon-arrow-up" size="medium" circle style="top: 40px"></el-button>
          <el-button type="info" @click="setScrollTo('down')" icon="el-icon-arrow-down" size="medium" circle style="top: 100px"></el-button>
          <el-button @click="loadClcik(true)" type="info" icon="el-icon-arrow-right" size="medium" circle></el-button>
        </div>
<!--    <div style="padding: 10px 50px 0px 50px">-->
<!--      <TableHeader-->
<!--        @fresh="M_tableObj.getData"-->
<!--        @openSearch="showSearchForm = true"-->
<!--        :tableObj="M_tableObj"-->
<!--      ></TableHeader>-->
<!--    </div>-->
    <div class="staff-list list-box">
      <el-row style="padding-right: 5px">
        <el-col
          :span="4"
          v-for="item in M_tableObj.tableData"
          :key="item.UserId"
        >
          <div class="card-box">
<!--            <MachineCard :cdata="item"></MachineCard>-->
            <NewMachineCard :cdata="item"></NewMachineCard>
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
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="dropVisible"
      v-if= "dropVisible"
      width="30%"
      @confirm="toToggleMachine"
    >
      <JvForm :formObj="toggleMachineObj"> </JvForm>
    </JvDialog>
    <!--   锁定设备   -->
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      v-if= "lockDeviceShow"
      :visible.sync= "lockDeviceShow"
      width="30%"
      @confirm="confirmLock"
    >{{ $t('production.Pr_WhetherLockToTheDevice') }}{{lockData.DeviceNo}}</JvDialog>
    <!-- 表单搜索抽屉 -->
<!--    <SearchForm-->
<!--      v-if="M_tableObj.props.searchBar"-->
<!--      :title="$t('Generality.Ge_SearchForm')"-->
<!--      :visible.sync="showSearchForm"-->
<!--      :form-obj="M_tableObj.formObj"-->
<!--      @search="formSubmit('search')"-->
<!--      @reset="formSubmit('reset')"-->
<!--    />-->
  </div>
</template>

<script>
import { M_Table, P_Table } from "./config";
import TableHeader from "@/jv_doc/cpn/JvTable/cpn/TableHeader";
import ScreenFull from "./cpns/roundScreenFull.vue";
import SearchForm from "@/jv_doc/cpn/JvTable/cpn/SearchForm.vue";
import JvFooter from "@/jv_doc/cpn/JvFooter";
import MachineCard from "./cpns/MachineCard.vue";
import NewMachineCard from "@/views/basicModule/demo/TestCyc/components/NewMachineCard.vue";
import TaskBox from "./cpns/TaskBox.vue";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import {
  production_dispatching_topping,
  production_dispatching_change_device,
  production_dispatching_lock_device,
} from "@/api/workApi/production/productionDispatch";
import { getResourceMember } from "@/api/workApi/production/baseData";
export default {
  name: "ProductionDispatch",
  components: {
    NewMachineCard,
    MachineCard,
    TaskBox,
    JvFooter,
    SearchForm,
    TableHeader,
    ScreenFull,
  },
  data() {
    return {
      showPopover: false,
      lockDeviceShow: false,
      scrollNumber: 0,
      // 设备列表对象
      M_tableObj: {},
      // 工序表格对象
      P_tableObj: {},
      lockData: {},
      showSearchForm: false,
      processData: [],
      // 切换机床
      dropVisible: false,
      toggleMachineObj: {},
      isAllproceeList: false,
      currentProcessPage: 1,
      boxWidth: 0,
      currentSize: 1,
    };
  },
  created() {
    this.M_tableObj = new M_Table();
    this.P_tableObj = new P_Table();

    this.M_tableObj.setCallBack((res) => this.getProcessData(res));
    // this.M_tableObj.pager.sizeChange(5);
    this.M_tableObj.formObj.form.ShowInProdSchedule = true;
  },
  mounted() {
    this.getScreenWidth();
    window.addEventListener('resize', this.getScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getScreenWidth);
  },
  computed: {},
  methods: {
    getScreenWidth() {
      this.boxWidth = this.$store.state.app.sidebar.opened ?  (window.innerWidth - 210 - 100) / 320 : (window.innerWidth - 55 - 100) / 320
      this.currentSize = Math.min(Math.floor(this.boxWidth), 5);
      this.M_tableObj.pager.sizeChange(this.currentSize);
    },
    watchScroll() {
        let taskListBox = document.querySelector('.task-list.list-box');
        taskListBox.onscroll = () => {
            this.scrollNumber = taskListBox.scrollTop;
        }
    },
    setScrollTo(e) {
        let taskListBox = document.querySelector('.task-list.list-box')
        if (e === "up") {
            this.scrollNumber = taskListBox.scrollTop;
            this.scrollNumber -= 580;
            const scrollToTop = () => {
                const c = taskListBox.scrollTop
                if (c > this.scrollNumber) {
                    if(!taskListBox.scrollTop) return
                    window.requestAnimationFrame(scrollToTop)
                    taskListBox.onscroll = null;
                    taskListBox.scrollTo(0, c - 15)
                } else {
                    this.watchScroll();
                }
            }
            scrollToTop()
        } else {
            this.scrollNumber = taskListBox.scrollTop;
            this.scrollNumber += 580;
            const scrollToTop = () => {
                let c = taskListBox.scrollTop
                if (c < this.scrollNumber) {
                    if(taskListBox.clientHeight + taskListBox.scrollTop + 2 >= taskListBox.scrollHeight) return
                    window.requestAnimationFrame(scrollToTop)
                    taskListBox.onscroll = null;
                    taskListBox.scrollTo(0, c + 15)
                } else {
                    this.watchScroll();
                }
            }
            scrollToTop()
        }
    },
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
          { PageSize: this.currentSize }
        );
        this.M_tableObj.getData();
      } else {
        this.M_tableObj.getData();
        this.showPopover = false
      }
      this.showSearchForm = false;
    },
    processScroll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (scrollBottom < 100) {
        // if (this.isAllproceeList) return;
        // this.P_tableObj.pager.page
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
      this.P_tableObj.pager.sizeChange(this.currentSize);
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
      if (data.some((item) => item.length === this.currentSize)) {
        this.currentProcessPage += 1;
      }
    },
    cardClick(e, s, r, a) {
      // console.log(5684848, e, s, r, a);
    },
    dropCommand(e) {
      if (e.Type === "toggle") {
        this.dropVisible = true;
        // 编辑任务
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
              // 计划开始
              prop: "PlanStart",
              cpn: "SingleDateTime",
              label: i18n.t("Generality.Ge_PlanStart"),
              rules: [
                {
                  required: true,
                  message: i18n.t("Generality.Ge_PleaseEnter"),
                  trigger: ["change", "blur"],
                },
              ],
            },
            {
              // 计划结束
              prop: "PlanEnd",
              cpn: "SingleDateTime",
              label: i18n.t("Generality.Ge_PlanEnd"),
              rules: [
                {
                  required: true,
                  message: i18n.t("Generality.Ge_PleaseEnter"),
                  trigger: ["change", "blur"],
                },
              ],
            },
          ],
          defaultForm: {
            TaskProcessId: e.TaskProcessId,
            IsModifyDate: true,
            PlanStart: timeFormat(e.PlanStart, "yyyy-MM-dd hh:mm"),
            PlanEnd: timeFormat(e.PlanEnd, "yyyy-MM-dd hh:mm"),
          },
          labelPosition: "top",
        });
      } else if (e.Type === "top") {
        production_dispatching_topping({ TaskProcessId: e.TaskProcessId }).then(
          (res) => {
            this.M_tableObj.pager.sizeChange(this.currentSize);
          }
        );
      } else if (e.Type === "lock") {
          this.lockData.TaskProcessId = e.TaskProcessId
          this.lockData.DeviceNo = e.PlanDevice
          this.lockDeviceShow = true
      }
    },
    confirmLock() {
        production_dispatching_lock_device(this.lockData)
        this.lockDeviceShow = false
    },
    toToggleMachine() {
      // this.M_tableObj.getData();
      this.toggleMachineObj.validate((valid) => {
        if (valid) {
          this.toggleMachineObj.form.PlanStart = timeFormat(this.toggleMachineObj.form.PlanStart,'yyyy-MM-dd hh:mm:ss')
          this.toggleMachineObj.form.PlanEnd = timeFormat(this.toggleMachineObj.form.PlanEnd,'yyyy-MM-dd hh:mm:ss')
          production_dispatching_change_device(this.toggleMachineObj.form).then(
            (res) => {
              this.M_tableObj.pager.sizeChange(this.currentSize);
              this.dropVisible = false;
            }
          );
        }
      })
    },
  },
  watch: {
    "$store.state.app.sidebar.opened": {
      handler(n, o) {
        this.getScreenWidth();
      },
    }
  }
};
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.design-page {
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  background-color: #ffffff;
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
      min-width: 320px;
    }
  }
  .staff-list {
    height: 130px;
    //box-shadow: 0 2px 10px 0 rgb(0, 0, 0, 0.4);
    // border: 1px solid #000;
    background-color: #fff;
    ::v-deep .staff-card {
      background-color: orange;
    }
  }
  .task-list {
    height: calc(100% - 180px);
    // background-color: rgb(235, 235, 235);
    overflow: auto;
      ::v-deep .task-card {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.4);
      }
    }
  .loadding-bar {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 60px;
    background-color: white;
    .el-button {
      position: absolute;
    }
    @include flexBox;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .right-loadding {
    right: 0;
    z-index: 1;
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
.el-col-4 {
  width: 20%;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(68, 68, 68);
}
</style>
