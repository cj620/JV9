<!--
 * @Author: your name
 * @Date: 2021-11-18 10:45:50
 * @LastEditTime: 2021-11-30 10:51:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\program\programTask\List\c-menu.vue
-->
<!--编程加工任务-->

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
    <div class="extra">
      <div>
        {{ pageDesc }}
        <Popover
          @confirm="getData"
          @reset="clear"
          style="margin: 0 10px"
        >
          <el-input
            v-model="form.DepartmentName"
            :placeholder="$t('Generality.Ge_DepartmentSearch')"
            size="mini"
          ></el-input>
        </Popover>
        <span>{{ form.DepartmentName }}</span>
      </div>
      <div class="left-bar">
        <div class="btn-list">
          <el-button type="primary" size="mini" @click="toRecord">{{
              $t("project.Pro_TaskRecord")
            }}</el-button>
        </div>
        <div class="state-bar">
          <div class="bar-icon el-icon-refresh-right" @click="getData" />
          <div class="bar-icon el-icon-full-screen" @click="fullScreen" />
        </div>
      </div>
    </div>
    <div class="staff-list list-box">
      <el-row>
        <el-col :span="4" v-for="item in sourceData" :key="item.UserId">
          <div class="card-box">
            <StaffCard :cdata="item"></StaffCard>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="task-list list-box">
      <el-row>
        <el-col :span="4" v-for="item in sourceData" :key="item.UserId">
          <div class="card-box">
            <TaskBox :cdata="item.TaskItems ? item.TaskItems : []"></TaskBox>
          </div>
        </el-col>
      </el-row>
      <JvFooter></JvFooter>
    </div>
  </div>
</template>

<script>
import { fullScreen } from "@/jv_doc/utils/system";
import { design_or_program_task_list } from "@/api/workApi/design/designTask";
import { production_programing_task_list } from "@/api/workApi/project/projectTask";
import Popover from "@/jv_doc/cpn/JvTable/cpn/Popover.vue";
import JvFooter from "@/jv_doc/cpn/JvFooter";
import StaffCard from "./cpns/StaffCard.vue";
import TaskBox from "./cpns/TaskBox.vue";
export default {
  name: "ProgramProducingTask",
  components: {
    StaffCard,
    TaskBox,
    JvFooter,
    Popover,
  },
  data() {
    return {
      count: 10,
      loading: false,
      pageDesc: i18n.t("menu.Pa_ProgramProducingTask"),
      recordRouteName: "Pa_ProgramProducingTaskReportRecord",
      form: {
        DepartmentName: "",
        PageSize: 5,
        CurrentPage: 1,
        SelectType: 0,
      },
      sourceData: [],
      Count: 0,
    };
  },
  created() {
    this.getData();
  },

  computed: {},
  methods: {
    getData() {
      if (this.$route.name === 'ProgramProducingTask'){
        production_programing_task_list(this.form).then((res) => {
          this.sourceData = res.Items;
          this.Count = res.Count;
        });
      }else {
        design_or_program_task_list(this.form).then((res) => {
          this.sourceData = res.Items;
          this.Count = res.Count;
        })
      }
    },
    loadClcik(state = true) {
      let DataCount = this.form.CurrentPage * this.form.PageSize;
      if (state) {
        //  6 9
        if (DataCount >= this.Count) return;
        this.form.CurrentPage++;
        this.getData();
      } else {
        if (this.form.CurrentPage <= 1) return;
        this.form.CurrentPage--;
        this.getData();
      }
    },
    toRecord() {
      this.$router.push({
        name: this.recordRouteName,
      });
    },
    fullScreen() {
      fullScreen(this.$refs.designPage);
    },
    clear(){
      this.form.DepartmentName = ''
      this.getData()
    },
    cardClick(e) {
      console.log(5684848, e);
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
