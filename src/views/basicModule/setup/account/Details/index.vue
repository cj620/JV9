<!--
 * @Author: H.
 * @Date: 2021-11-04 10:35:27
 * @LastEditTime: 2022-10-20 11:33:08
 * @Description:
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_UserDetails')">
      <div class="user-info">
        <div class="user-info-img">
          <img
            :src="imgUrlPlugin(UserInfo.PhotoUrl)"
            :onerror="errorDefaultImg"
            class="materialImage"
            alt=""
          />
        </div>
        <div class="user-info-details">
          <JvDetail :detailObj="detailObj">
            <template #Sex="{ record }">
              <el-tag>
                {{ sex[record] }}
              </el-tag>
            </template>
            <template #Activate="{ record }">
              <el-tag>
                {{ record ? $t("setup.Active") : $t("setup.Deactive") }}
              </el-tag>
            </template>
            <template #Roles="{ record }">
              {{ concatenateRoleNames(record) }}
            </template>
          </JvDetail>
        </div>
        <div>
          <Action
            slot="extra"
            size="mini"
            :primary="[
              {
                label: $t('Generality.Ge_ResetPassword'),

                confirm: resetPwd.bind(null, UserId),
              },
              {
                label: $t('Generality.Ge_Edit'),
                icon: 'el-icon-edit',
                confirm: edit.bind(null, UserId),
              },
            ]"
          ></Action>
        </div>
      </div>
    </JvBlock>
    <JvBlock
      class="user-config"
      :title="$t('Generality.Ge_UserConfig')"
      :contentStyle="{
        padding: 0,
      }"
    >
      <el-row class="sys-settings">
        <el-col :span="4"
          ><setting-module
            ref="settingModule"
            :configData="ConfigData"
            @roleClick="roleClick"
        /></el-col>
        <el-col :span="20">
          <settingItem :configData="ConfigList" @update:config="updateConfig" />
        </el-col>
      </el-row>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import SettingModule from "@/views/basicModule/setup/systemSetup/components1/settingModule.vue";
import SettingItem from "@/views/basicModule/setup/systemSetup/components1/settingItem.vue";
import { getUser } from "@/api/basicApi/systemSettings/user";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { detailConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  getAllUserConfig,
  updateConfig,
  user_data_reset_pwd,
} from "@/api/basicApi/systemSettings/user";
import { translation } from "@/views/basicModule/setup/systemSetup/utils";
export default {
  data() {
    return {
      UserId: this.$route.query.UserId,
      UserInfo: {},
      detailObj: {},
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
      sex: {
        Male: this.$t("setup.Male"),
        Female: this.$t("setup.Female"),
      },

      ConfigList: [],
      ConfigData: [],
    };
  },
  methods: {
    imgUrlPlugin,
    async getUser() {
      await getUser({ UserId: this.UserId }).then((res) => {
        this.UserInfo = res;
        this.detailObj.setData(res);
      });
      await getAllUserConfig({ UserId: this.UserId }).then(
        (res) => {
          this.ConfigData = translation(res);
        }
      );
    },
    // 拼接用户角色
    concatenateRoleNames(arr) {
      if (arr.length !== 0) {
        let roleNames = arr.map(item => item.RoleName);
        return roleNames.join(', ');
      } else {
        return "--";
      }
    },
    edit(id) {
      this.$router.push({
        name: "Se_Users_Edit",
        query: { UserId: id, type: "edit", title: "editUsers" },
      });
    },
    //重置用户密码
    resetPwd(id) {
      console.log(id);
      this.$confirm(
        this.$t("setup.ConfirmPasswordReset"),
        this.$t("Generality.Ge_Remind"),
        {
          confirmButtonText: this.$t("Generality.Ge_OK"),
          cancelButtonText: this.$t("Generality.Ge_Cancel"),
        }
      ).then(() => {
        user_data_reset_pwd([id]).then((res) => {
          console.log(res);
        });
      });
    },
    roleClick(row) {
      this.ConfigList = row.ConfigList;
    },
    updateConfig(e) {
      updateConfig({
        UserName: this.UserInfo.UserName,
        ConfigValue: e.configValue,
        ConfigKey: e.configKey,
      }).then((res) => {
        this.getUser();
      });
    },
  },
  created() {
    if (this.UserId) {
      this.getUser();
    }
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      direction: "left",
    });
  },
  mounted() {},
  computed: {},
  components: {
    SettingModule,
    SettingItem,
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  &-img {
    width: 126px;
    height: 126px;
    margin-top: 20px;
    margin-left: 60px;
    img {
      width: 126px;
      height: 126px;
      border-radius: 5px;
    }
  }
  &-details {
    padding-top: 20px;
    padding-left: 60px;
    padding-right: 60px;
    flex: 1;
  }
}
</style>
