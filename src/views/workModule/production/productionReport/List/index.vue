<!--
 * @Author: H.
 * @Date: 2021-11-09 10:44:15
 * @LastEditTime: 2023-12-05 16:19:25
 * @Description: 生产报工
-->

<template>
  <PageWrapper ref="page" :footer="false">
    <JvBlock class="report-page">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('production.Pr_EnterStation')" name="first">
          <reportContent
            type="PitStop"
            :SiteData="SiteData"
            ref="reportContent"
          >
            <div slot="state">
              {{ $t("production.Pr_AlreadyInStation") }}
            </div>
          </reportContent>
        </el-tab-pane>
        <el-tab-pane :label="$t('production.Pr_UpToMachine')" name="second">
          <onBoardContent
            type="OnBoard"
            :SiteData="SiteData"
            ref="onBoardContent"
          >
            <div slot="state">
              {{ $t("production.Pr_AlreadyInStation") }}
            </div>
          </onBoardContent>
        </el-tab-pane>
        <el-tab-pane :label="$t('production.Pr_DownFromMachine')" name="third">
          <disembark type="Disembark" :SiteData="SiteData" ref="disembark">
            <div slot="state">
              {{ $t("production.Pr_OnMachine") }}
            </div>
          </disembark>
        </el-tab-pane>
      </el-tabs>
      <div class="button-to-task">
        <el-button style="margin:6px 12px 0 0" @click="toTaskManagement">
          {{ $t('production.Pr_TaskManagement') }}
        </el-button>
      </div>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import reportContent from "./components/reportContent";
import onBoardContent from "./components/onBoardContent";
import disembark from "./components/disembark";
import { getUserConfig } from "@/api/basicApi/systemSettings/user";
import { autoCreate } from "./auto";
export default {
  name: "ProductionReport",
  data() {
    return {
      SiteData: [],
      activeName: "first",
    };
  },

  created() {
    this.GetConfig();
  },

  mounted() {},
  computed: {},
  components: {
    reportContent,
    disembark,
    onBoardContent,
  },
  methods: {
    autoCreateBill() {
      autoCreate(this.mbill, this.userId);
    },
    GetConfig() {
      getUserConfig({ ConfigKey: "UserStation" }).then((res) => {
        this.SiteData = JSON.parse(res.ConfigValue);
      });
    },
    handleClick(tab, event) {
      if (this.activeName === "first") {
        this.$nextTick(() => {
          this.$refs.reportContent.$refs.refFocus.$el
            .querySelector("input")
            .focus();
          this.$refs.reportContent.GetData();
        });
      } else if (this.activeName === "second") {
        this.$nextTick(() => {
          this.$refs.onBoardContent.$refs.refFocus.$el
            .querySelector("input")
            .focus();
          this.$refs.onBoardContent.GetData();
        });
      } else if (this.activeName === "third") {
        this.$nextTick(() => {
          this.$refs.disembark.$refs.refFocus.$el
            .querySelector("input")
            .focus();
        });
      }
    },
    // 跳转到任务管理页面
    toTaskManagement() {
      this.$router.push({
        name: "Pr_TaskManagement",
      });
    },
  },
};
</script>

<style lang="scss">
.report-page {
  height: 100%;
  background-color: #ffffff;
  position: relative;
  .el-tabs__item {
    font-size: 26px;
  }
}
.button-to-task {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
