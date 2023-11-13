<template>
  <PageWrapper :footer="false">
    <!-- 顶部操作行 -->
    <div class="part-schedule-header">
      <div class="part-schedule-header-left">
        <div class="part-schedule-header-left-box">
          <el-input
            :placeholder="`${$t('Generality.Ge_PleaseEnter')}...`"
            size="mini"
            clearable
            @change="getPartProcessingNode"
            v-model="searchValue"
          ></el-input>
        </div>
        <div class="part-schedule-header-left-box">
          <el-button size="mini">{{ $t("Generality.Ge_Search") }}</el-button>
        </div>
        <div class="part-schedule-header-left-box">
          <el-button size="mini" @click="setShareShow">{{
            $t("project.Pro_Share")
          }}</el-button>
        </div>
        <div>
          {{$t("Generality.Ge_TaskType")}}：{{$route.query.TaskType}}
        </div>
      </div>
      <div></div>
    </div>
    <!-- 内容 -->
    <div class="part-schedule-content">
      <!-- 每一项 -->
      <div
        class="part-schedule-content-item"
        v-for="(item, i) in List"
        :key="i"
      >
        <!-- 最前面的头部-->
        <div class="part-schedule-content-item-header">
          <!-- 头部的上部分 -->
          <div class="part-schedule-content-item-header-top">
            <!-- 图片 -->
            <div class="part-schedule-content-item-header-top-left">
              <el-image
                :src="imgUrlPlugin(item.PhotoUrl)"
                :preview-src-list="[imgUrlPlugin(item.PhotoUrl)]"
                style="width: 65px; height: 65px; border-radius: 4px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <!-- 信息 -->
            <div class="part-schedule-content-item-header-top-right">
              <div></div>
              <div style="width: 100%">
                <icon-tooltip
                  :tip="$t('Generality.Ge_Process')"
                  :text="item.CurrentStation || '--'"
                ></icon-tooltip>
              </div>
              <div style="width: 100%">
                <icon-tooltip
                  icon="el-icon-user"
                  :tip="$t('project.Pro_Worker')"
                  :text="item.CurrentWorker || '--'"
                ></icon-tooltip>
              </div>
              <div></div>
            </div>
          </div>
          <!-- 头部的下部分 -->
          <div class="part-schedule-content-item-header-bottom">
            <div class="part-schedule-content-item-header-bottom-box">
              <div style="margin-bottom: 4px; width: 100%">
                <icon-tooltip
                  :tip="$t('Generality.Ge_PartNo')"
                  :text="item.PartNo || '--'"
                ></icon-tooltip>
              </div>
              <div style="width: 100%">
                <icon-tooltip
                  :tip="$t('Generality.Ge_PartName')"
                  :text="item.PartName || '--'"
                ></icon-tooltip>
              </div>
            </div>
            <div
              style="width: 100%"
              class="part-schedule-content-item-header-bottom-box"
            >
              <el-progress
                :style="{ width: setProgress(item.Progress) }"
                :percentage="item.Progress"
              ></el-progress>
            </div>
          </div>
        </div>
        <!-- item的内容部分 -->
        <div
          class="part-schedule-content-item-content"
          @mousedown="_mousedown(i, $event)"
        >
          <!-- 进度条的框体 -->
          <div
            class="progress-box"
            :style="{
              backgroundColor:
                j === item.Process.length - 1
                  ? '#fff'
                  : ProcessState[jtem.State] && ProcessState[jtem.State]._color,
              boxShadow:
                j === item.Process.length - 1 ? 'none' : '2px 2px 6px 2px #ccc',
            }"
            v-for="(jtem, j) in item.Process"
            :key="j"
          >
            <!-- 进度条定位的内容 -->
            <div class="progress-box-content">
              <!-- 内容顶部 -->
              <div class="progress-box-content-top">{{ jtem.Process }}</div>
              <!-- 圆圈 -->
              <el-popover placement="bottom" width="400" trigger="hover">
                <div class="circle-content-box">
                  <div
                    class="circle-content-box-item"
                    v-for="(detail, d) in detailEnum"
                    :key="d"
                  >
                    <div style="color: #000; font-weight: 600">
                      {{ detail.label }}
                    </div>
                    <div v-show="detail.value !== 'State'">
                      {{
                        isNaN(jtem[detail.value]) &&
                        !isNaN(Date.parse(jtem[detail.value]))
                          ? timeFormat(
                              jtem[detail.value],
                              "yyyy-MM-dd hh:mm:ss"
                            )
                          : jtem[detail.value] || "--"
                      }}
                    </div>
                    <div v-show="detail.value === 'State'">
                      {{
                        ProcessState[jtem[detail.value]]
                          ? ProcessState[jtem[detail.value]].name
                          : ""
                      }}
                    </div>
                  </div>
                </div>
                <div
                  slot="reference"
                  class="progress-box-content-circle"
                  :style="{
                    backgroundColor:
                      ProcessState[jtem.State] &&
                      ProcessState[jtem.State].c_color,
                  }"
                >
                  <i
                    class="el-icon-check"
                    v-show="
                      j === item.Process.length - 1 &&
                      setCheckShow(item.Process)
                    "
                  ></i>
                </div>
              </el-popover>
              <!-- 内容底部 => 完成状态 和 时间 -->
              <div
                class="progress-box-content-bottom"
                :style="{
                  textAlign: j === 0 ? 'start' : 'center',
                  right: j === 0 ? '-20px' : 0,
                }"
              >
                <span
                  :style="{
                    textIndent: j === 0 ? '1.5em' : 0,
                    marginBottom: '4px',
                  }"
                  >{{
                    ProcessState[jtem.State] && ProcessState[jtem.State].name
                  }}</span
                >
                <span style="font-size: 12px; margin-top: 6px; color: #999">{{
                  timeFormat(jtem.PlanEnd, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <JvDialog :title="$t('project.Pro_Share')" :visible.sync="shareShow"
              :IsShowConfirmFooterBtn="false"
              destroy-on-close
    >
      <div style="padding-bottom: 10px;padding-left: 10px">
        <span style="font-weight: bold">已选择零件：</span>
<!--        <el-tag-->
<!--          style="margin-right: 10px;margin-bottom: 10px"-->
<!--          v-for="tag in PartNos"-->
<!--          :key="tag"-->
<!--          closable-->
<!--          @close="handleClose(tag)"-->
<!--        >-->
<!--          {{tag}}-->
<!--        </el-tag>-->
          <el-tag
            style="margin-right: 10px;margin-bottom: 10px"
            v-for="tag in PartNos"
            :key="tag"
          >
            {{tag}}
          </el-tag>
      </div>
      <JvTable :table-obj="tableObj">
        <template #Progress="{ row }">
          <el-progress
            :style="{ width: setProgress(row['Progress']) }"
            :percentage="row['Progress']"
          ></el-progress>
        </template>
<!--        <template #SelectPart="{ row }">-->
<!--          <div class="select-part" @click="addPartNos(row)">-->
<!--            <i class="el-icon-circle-plus"></i>-->
<!--          </div>-->
<!--        </template>-->
      </JvTable>
      <div class="form-box">
        <JvForm :formObj="formObj" style="padding-left: 10px"> </JvForm>
        <div class="form-box-button">
          <Action
            slot="extra"
            size="mini"
            :primary="[
              {
                label: $t('project.Pro_CreateLink'),
                confirm: createLink,
              },
            ]"
          ></Action>
        </div>
      </div>
      <div style="padding: 0 10px 20px 10px">
        <el-input v-model="link" v-if="link">
          <div slot="append" style="cursor: pointer" @click="copyLink">
            {{ $t("Generality.Ge_Copy") }}
          </div>
        </el-input>
      </div>

    </JvDialog>
  </PageWrapper>
</template>

<script>
import { timeFormat } from "@/jv_doc/utils/time";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import IconTooltip from "@/views/workModule/project/projectManage/process_people/components/icon-tooltip.vue";
import { ProcessState } from "@/enum/workModule";
import {
  part_processing_node,
  create_data_sharing,
} from "@/api/workApi/project/projectInfo";
import { Form } from "@/jv_doc/class/form";
import { Table } from "./config";
import handleClipboard from "@/utils/clipboard";
export default {
  name: "Pm_Project_PartSchedule.vue",
  components: { IconTooltip },
  data() {
    return {
      shareShow: false,
      formObj: {},
      link: "",

      ProcessState,
      searchValue: "",
      detailEnum: [
        { label: i18n.t("Generality.Ge_ProcessName"), value: "Process" },
        { label: i18n.t("Generality.Ge_Worker"), value: "Worker" },
        { label: i18n.t("Generality.Ge_PlanTime"), value: "PlanTime" },
        { label: i18n.t("Generality.Ge_ActualTime"), value: "ActualTime" },
        { label: i18n.t("Generality.Ge_PlanStart"), value: "PlanStart" },
        { label: i18n.t("Generality.Ge_PlanEnd"), value: "PlanEnd" },
        { label: i18n.t("Generality.Ge_ActualStart"), value: "ActualStart" },
        { label: i18n.t("Generality.Ge_ActualEnd"), value: "ActualEnd" },
        { label: i18n.t("production.Pr_PlanningDevices"), value: "PlanDevice" },
        { label: i18n.t("production.Pr_ActualDevice"), value: "ActualDevice" },
        { label: i18n.t("Generality.Ge_State"), value: "State" },
      ],
      index: 0,
      List: [],
      tableObj: {},
      PartNos: [],
    };
  },
  created() {
    this.getPartProcessingNode();
    this.shareInit();
  },
  mounted() {
    document.onmouseup = () => {
      const content = document.querySelectorAll(
        ".part-schedule-content-item-content"
      )[this.index];
      if (content) content.onmousemove = null;
    };
  },
  methods: {
    timeFormat,
    imgUrlPlugin,
    setShareShow() {
      this.shareShow = !this.shareShow;
      this.PartNos = [];
      this.link = "";
    },
    handleClose(tag) {
      this.PartNos.splice(this.PartNos.indexOf(tag), 1);
    },
    addPartNos(row) {
      console.log(row)
      this.PartNos = [...new Set(this.PartNos)]
      this.PartNos.push(row.PartNo);
      this.PartNos = [...new Set(this.PartNos)]
    },
    shareInit() {
      this.tableObj = new Table();

      let dateTime = new Date();
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      dateTime = new Date(dateTime);
      this.formObj = new Form({
        formSchema: [
          {
            prop: "ExpirationTime",
            label: this.$t("project.Pro_ExpirationTime"),
            cpn: "SingleDateTime",
            default: dateTime,
            rules: [
              {
                required: true,
                message: this.$t("Generality.Ge_PleaseEnter"),
                trigger: ["change"],
              },
            ],
          },
          // {
          //   prop: "Project",
          //   label: "",
          //   default: this.$route.query.Project,
          //   hidden: true,
          // },
          {
            prop: "ToolingNo",
            label: "",
            default: this.$route.query.ToolingNo,
            hidden: true,
          },
        ],
        baseColProps: {
          span: 8,
        },
        gutter: 40,
        labelPosition: "top",
      });
    },
    createLink() {
      let obj = {
        PartNos: this.PartNos,
        PmTaskBillId: this.$route.query.BillId,
      }
      Object.assign(obj, this.formObj.form)
      create_data_sharing(obj).then((res) => {
        this.link =
          // window.global_config.ImgBase_Url
          window.global_config.Share_Url +
          "/#/ProjectManage_ProcessPeople_Share?key=" +
          res;
      });
    },
    copyLink(e) {
      // console.log(e);
      handleClipboard(this.link, e);
    },

    _mousedown(index, e) {
      this.index = index;
      const content = document.querySelectorAll(
        ".part-schedule-content-item-content"
      )[index];
      const MaxDistance = content.scrollWidth - content.clientWidth;
      let count = 0;
      content.onmousemove = (ev) => {
        if (ev.clientX > count) {
          // console.log('右');
          if (this.List[index].scrollNum > 0) {
            this.List[index].scrollNum -= 3;
          }
        } else if (ev.clientX < count) {
          // console.log('左')
          if (this.List[index].scrollNum < MaxDistance) {
            this.List[index].scrollNum += 3;
          }
        }
        content.scrollTo({ left: this.List[index].scrollNum, top: 0 });
        count = ev.clientX;
      };
    },
    getPartProcessingNode() {
      part_processing_node({
        ToolingNo: this.$route.query.ToolingNo,
        Keyword: this.searchValue,
        PmTaskBillId: this.$route.query.BillId,
      }).then((res) => {
        this.List = res.Items;
        this.tableObj.setData(res.Items);
        this.List.forEach((item) => {
          item.scrollNum = 0;
        });
      });
    },
    setProgress(num) {
      const _enum = {
        1: "116%",
        2: "111%",
        3: "108%",
        4: "106%",
        5: "100%",
      };
      return _enum[num.toString().length] || "100%";
    },
    // 设置 √ 的显示
    setCheckShow(list) {
      return list.every((item) => {
        return item.State === "Processed";
      });
    },
  },
  watch: {
    'tableObj.selectData': {
      deep: true,
      handler(val) {
        this.PartNos = val.keys;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.part-schedule-header {
  width: 100%;
  height: 40px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    &-box {
      margin-right: 10px;
    }
  }
}
.part-schedule-content {
  background: #fff;
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 10px;
  &-item {
    width: 98%;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    height: 140px;
    display: flex;
    position: relative;
    &-header {
      width: 200px;
      height: 140px;
      position: relative;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #eee;
      &-top {
        display: flex;
        &-left {
          width: 75px;
          height: 75px;
          box-sizing: border-box;
          padding: 5px;
          ::v-deep.image-slot {
            width: 100%;
            height: 100%;
            background: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            transform: scaleX(1.2);
            color: #909399;
          }
        }
        &-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-size: 14px;
          width: 125px;
          div {
            display: flex;
            margin-bottom: 6px;
            align-items: center;
          }
        }
      }
      &-bottom {
        height: 100px;
        padding: 0 5px 0 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 14px;
        &-box {
          margin-bottom: 6px;
          display: flex;
          //align-items: center;
          width: 100%;
          flex-direction: column;
          ::v-deep.el-progress-bar {
            width: 96%;
            //min-width: 90%;
            //width: 96%;
          }
        }
      }
    }
    &-content {
      width: calc(100% - 180px);
      display: flex;
      //align-items: center;
      height: 140px;
      overflow-x: auto;
      padding-left: 40px;
      .progress-box {
        height: 20px;
        min-width: 160px;
        position: relative;
        margin-top: 44px;
        &-content {
          width: 120px;
          left: -60px;
          position: absolute;
          top: -32.5px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
          &-top {
            height: 30px;
            line-height: 30px;
          }
          &-bottom {
            height: 50px;
            display: flex;
            flex-direction: column;
            text-align: center;
            position: relative;
            box-sizing: border-box;
            padding-top: 10px;
          }
          &-circle {
            border: 1px solid #999;
            border-radius: 50%;
            height: 25px;
            width: 25px;
            color: #2ee438;
            font-size: 20px;
            text-align: center;
            line-height: 25px;
          }
        }
      }
    }
  }
}
.part-schedule-content-item:first-child {
  border-top: 1px solid #eee;
}
.part-schedule-content-item-content:active {
  cursor: move;
}
.circle-content-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 10px 0px;
  }
}
.form-box {
  position: relative;
  width: 100%;
  &-button {
    position: absolute;
    right: 10px;
    top: calc(25% + 9px);
  }
}
.select-part{
  font-size: 30px;color: #1890ff; width: 100%;display: flex;justify-content: center;cursor:pointer;
}
</style>
