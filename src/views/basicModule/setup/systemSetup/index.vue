<!--
 * @Author: H.
 * @Date: 2021-11-03 11:24:41
 * @LastEditTime: 2022-01-20 17:13:38
 * @Description:
-->
<!--系统设置-->
<template>
  <PageWrapper :footer="false">
    <el-row class="sys-settings">
      <el-col :span="4"
        ><setting-module
          ref="settingModule"
          :configData="configData"
          @roleClick="roleClick"
      /></el-col>
      <el-col :span="20">
        <settingItem :configData="ConfigList" @update:config="updateConfig" />
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script>
import settingModule from "./components/settingModule.vue";
import settingItem from "./components/settingItem.vue";
import {
  sysConfigUpdate,
  getAllSysConfig,
} from "@/api/basicApi/systemSettings/sysSettings";
import { translation } from "./utils";

export default {
  data() {
    return {
      ConfigList: [],
      configData: [],
    };
  },
  methods: {
    roleClick(row) {
      this.ConfigList = row.ConfigList;
    },
    getData() {
      getAllSysConfig().then((res) => {
        this.configData = translation(res);
      });
    },
    updateConfig(e) {
      sysConfigUpdate(e).then(() => {
        this.getData();
      });
    },
  },
  created() {
    this.getData();
  },
  components: {
    settingModule,
    settingItem,
  },
};
</script>

<style scoped></style>
