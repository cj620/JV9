<!--
 * @Author: H.
 * @Date: 2021-11-08 16:24:01
 * @LastEditTime: 2022-03-24 11:02:35
 * @Description:
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_BasicInformation')">
      <div class="edit-users-form">
        <div
          class="edit-users-content-header-img"
          @click="dialogFormVisible = true"
        >
          <div
            v-if="
              formObj1.form.PhotoUrl &&
              formObj1.form.PhotoUrl !== '' &&
              formObj1.form.PhotoUrl !== null
            "
          >
            <img
              :src="imgUrlPlugin(formObj1.form.PhotoUrl)"
              :onerror="errorDefaultImg"
              alt=""
              class="avatr"
            />
          </div>
          <div v-else>
            <img
              src="https://static.xinheyun.net/2458972eb1db3e7fcce23c53a27319dd.png"
              alt=""
            />
            <div class="edit-users-content-header-title">
              {{ $t("Generality.Ge_ClickUploadPicture") }}
            </div>
          </div>
        </div>
        <div class="edit-users-form-items">
          <JvForm :formObj="formObj" :autoFocus="true" ref="JvForm">
            <template #UserId="{ prop }">
              <el-input
                :disabled="type === 'edit'"
                v-model="formObj.form[prop]"
              ></el-input>
            </template>
            <template #UserName="{ prop }">
              <el-input
                :disabled="type === 'edit'"
                v-model="formObj.form[prop]"
              ></el-input>
            </template>
          </JvForm>
        </div>
        <div class="edit-users-form-items">
          <JvForm :formObj="formObj1"> </JvForm>
        </div>
      </div>
    </JvBlock>
    <JvBlock
      v-if="type === 'edit'"
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
    <div slot="fixedFooter">
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
    <jv-dialog
      :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="confirmImg"
    >
      <JvUploadList
        v-model="ImgDataList"
        :listType="false"
        @change="changeImg"
      ></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import {
  editUserInfo,
  getUser,
  getAllUserConfig,
  updateConfig,
} from "@/api/basicApi/systemSettings/user";
import SettingModule from "@/views/basicModule/setup/systemSetup/components/settingModule.vue";
import SettingItem from "@/views/basicModule/setup/systemSetup/components/settingItem.vue";
import { Form } from "@/jv_doc/class/form";
import { formSchema, formSchema1 } from "./config";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { translation } from "@/views/basicModule/setup/systemSetup/utils";

export default {
  data() {
    return {
      formObj: {},
      formObj1: {},
      ImgDataList: [],
      dialogFormVisible: false,
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
      UserName: "",
      ConfigList: [],
      ConfigData: [],
    };
  },
  props: {
    type: {
      type: String,
      default: "add",
    },
    UserId: {
      type: String,
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
      labelPosition: "top",
    });
    this.formObj1 = new Form({
      formSchema: formSchema1,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
      labelPosition: "top",
    });
    if (this.type === "edit") {
      this.getUser();
         

    }
    
   

  },
  mounted() {
    // this.$refs.JvForm.$el.children[0][0].focus();
  
  },
  methods: {
    imgUrlPlugin,
    save() {
      this.formObj.submitAll(
        [this.formObj.validate, this.formObj1.validate],
        (valid) => {
          if (valid) {
            let obj = Object.assign({}, this.formObj.form, this.formObj1.form);
            this.type === "edit"
              ? (obj.DataState = "Modify")
              : (obj.DataState = "Add");
            editUserInfo(obj).then((res) => {
              let TagName = {
                name: "Se_Users",
                meta: { cache: true, title: "用户" },
                // query: { UserId: res },
              };
              closeTag(this.current, TagName);
            });
          }
        }
      );
    },
    //图片点击确认事件
    confirmImg() {
      this.dialogFormVisible = false;
      this.formObj1.form.PhotoUrl = this.ImgDataList.toString();
    },
    changeImg(e) {},
    async getUser() {
      await getUser({ UserId: this.UserId }).then((res) => {
        let { UserId, UserName, Sex, DepartmentName, Activate } = res;
        this.UserName = UserName;
        let { Birthday, FamilyAddress, Mail, Phone, PhotoUrl, Tel } = res;
        this.formObj.form = {
          UserId,
          UserName,
          Sex,
          DepartmentName,
          Activate,
        };

        this.formObj1.form = {
          Birthday,
          FamilyAddress,
          Mail,
          Phone,
          PhotoUrl,
          Tel,
        };
      });
      await getAllUserConfig({ UserName: this.UserName }).then((res) => {
        this.ConfigData = translation(res);
      });
    },

    roleClick(row) {
      this.ConfigList = row.ConfigList;
    },
    updateConfig(e) {
      updateConfig({
        UserName: this.UserName,
        ConfigValue: e.configValue,
        ConfigKey: e.configKey,
      }).then((res) => {
        this.getUser();
      });
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  components: {
    JvUploadList,
    SettingModule,
    SettingItem,
  },
};
</script>

<style lang="scss" scoped>
.edit-users-details {
  width: 100%;
  display: flex;
}
.edit-users-content-header-img {
  margin-top: 20px;
  margin-left: 60px;
  position: relative;
  width: 131px;
  height: 131px;
  border: 1px rgba(0, 0, 0, 0.25) dashed;
  background: whitesmoke;
  border-radius: 5px;
  .avatr {
    width: 126px;
    height: 126px;
  }
  .edit-users-content-header-title {
    display: block;
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
  }
}
.edit-users-form {
  display: flex;
  &-items {
    padding: 0 60px;
    flex: 1;
  }
}
</style>
