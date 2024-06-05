<template>
  <div class="design-page" ref="designPage">
    <div class="left-loading loading-bar">
      <el-popover
        placement="right-start"
        width="200"
        trigger="click"
        v-model="showPopover"
        style="position: absolute;top: 40px;left: 12px;"
      >
        <el-select
          v-model="form.DepartmentName"
          size="mini"
          filterable
          style="width: 100%; margin-bottom: 10px"
          :placeholder="$t('Generality.Ge_DepartmentSearch')">
          <el-option
            v-for="item in departmentList"
            :key="item.Department"
            :label="item.Department"
            :value="item.Department">
          </el-option>
        </el-select>
        <el-button size="mini" type="text" @click="formSubmit('reset')">
          {{ $t('Generality.Ge_Clear') }}
        </el-button>
        <el-button type="primary" @click="formSubmit('search')" size="mini" style="position: absolute; right: 10px;">
          {{ $t('Generality.Ge_Search') }}
        </el-button>
        <el-button slot="reference" type="info" icon="el-icon-more" size="medium" circle >
        </el-button>
      </el-popover>
      <el-button @click="loadClick(false)" type="info" icon="el-icon-arrow-left" size="medium" circle></el-button>
      <el-tooltip class="item" effect="dark" :content="$t('project.Pro_TaskRecord')" placement="right">
        <el-button @click="toRecord" type="info" icon="el-icon-document" size="medium" style="top: 100px; position:absolute;" circle>
        </el-button>
      </el-tooltip>
    </div>
    <div class="right-loading loading-bar">
      <el-button type="info" @click="setScrollTo('up')" icon="el-icon-arrow-up" size="medium" circle style="top: 40px"></el-button>
      <el-button type="info" @click="setScrollTo('down')" icon="el-icon-arrow-down" size="medium" circle style="top: 100px"></el-button>
      <el-button @click="loadClick(true)" type="info" icon="el-icon-arrow-right" size="medium" circle></el-button>
    </div>
    <div class="staff-list list-box">
      <el-row>
        <el-col :span="4" v-for="item in sourceData" :key="item.UserId">
          <div class="card-box">
            <NewStaffCard :cdata="item"></NewStaffCard>
          </div>
        </el-col>
      </el-row>
    </div>
    <transition name="fade" mode="out-in" appear>
      <div class="task-list list-box" ref="processBox">
        <el-row>
          <el-col :span="4" v-for="item in sourceData" :key="item.UserId">
            <div class="card-box">
              <TaskBox @getData="getData" :cdata="item.TaskItems ? item.TaskItems : []"></TaskBox>
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>
<script>
import { design_or_program_task_list } from "@/api/workApi/design/designTask";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import NewStaffCard from "./cpns/NewStaffCard.vue";
import TaskBox from "./cpns/TaskBox.vue";

export default {
  name: "Tt_TestToolingTask",
  components: {
    TaskBox,
    NewStaffCard,
  },
  data() {
    return {
      departmentList: [],
      sourceData: [],
      Count: 0,
      recordRouteName: "TestToolingTask_Record",
      showPopover: false,
      form: {
        DepartmentName: "",
        PageSize: 5,
        CurrentPage: 1,
        SelectType: 3,
      },
    }
  },
  created() {
    this.getData();
    this.getDepartmentInfo();
  },
  methods: {
    getDepartmentInfo() {
      getDepartmentList().then((res) => {
        this.departmentList = res.Items
      })
    },
    getData() {
      design_or_program_task_list(this.form).then((res) => {
        this.sourceData = res.Items;
        this.Count = res.Count;
        this.setScrollTo("reset");
      })
    },
    formSubmit(type) {
      if (type === "reset") {
        this.form.DepartmentName = "";
      }
      this.form.CurrentPage = 1;
      this.getData();
      this.showPopover = false;
    },
    loadClick(state = true) {
      let DataCount = this.form.CurrentPage * this.form.PageSize;
      if (state) {
        if (DataCount >= this.Count) return;
        this.form.CurrentPage++;
        this.getData();
      } else {
        if (this.form.CurrentPage <= 1) return;
        this.form.CurrentPage--;
        this.getData();
      }
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
            if (!taskListBox.scrollTop) return
            window.requestAnimationFrame(scrollToTop)
            taskListBox.onscroll = null;
            taskListBox.scrollTo(0, c - 15)
          } else {
            this.watchScroll();
          }
        }
        scrollToTop()
      } else if (e === "down") {
        this.scrollNumber = taskListBox.scrollTop;
        this.scrollNumber += 580;
        const scrollToTop = () => {
          let c = taskListBox.scrollTop
          if (c < this.scrollNumber) {
            if (taskListBox.clientHeight + taskListBox.scrollTop + 2 >= taskListBox.scrollHeight) return
            window.requestAnimationFrame(scrollToTop)
            taskListBox.onscroll = null;
            taskListBox.scrollTo(0, c + 15)
          } else {
            this.watchScroll();
          }
        }
        scrollToTop()
      } else if (e === "reset") {
        taskListBox.scrollTop = 0;
        this.watchScroll();
      }
    },
    toRecord() {
      this.$router.push({
        name: this.recordRouteName,
      });
    },
  }
}
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";

.design-page {
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  background-color: #ffffff;

  .loading-bar {
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

  .right-loading {
    right: 0;
    z-index: 1;
  }

  .left-loading {
    left: 0;
  }

  .list-box {
    padding-top: 10px;
    width: calc(100% - 120px);
    margin-left: 60px;
    min-width: 1600px;

    .card-box {
      width: 100%;
      @include flexBox;
    }
  }

  .staff-list {
    height: 130px;
    background-color: #fff;
    padding-right: 5px;
  }

  .task-list {
    height: calc(100% - 150px);
    overflow: auto;

    ::v-deep .task-card {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    }
  }
}

.el-col-4 {
  width: 20%;
}

::-webkit-scrollbar {
  width: 5px;
}
</style>
