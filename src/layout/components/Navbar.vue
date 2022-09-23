<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <div class="right-menu-item hover-effect" style="padding-top: 3px">
          <div
            class="el-icon-s-platform"
            style="font-size: 25px"
            @click="toMoldProgressKanban"
          ></div>
        </div>
        <div class="right-menu-item hover-effect" style="padding-top: 2px">
          <div
            class="el-icon-s-claim"
            style="font-size: 25px"
            @click="toWorkDesk"
          ></div>
        </div>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <div class="userName" v-if="!avatar">
            {{ name.slice(0, 1) }}
          </div>

          <img
            ref="avatarImg"
            v-else
            :onerror="defaultImg"
            :src="imgUrlPlugin(avatar)"
            class="user-avatar"
          />
          <span class="userAllName">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link
            :to="{
              path: '/setup/se_UserInfo_Detail',
              query: { UserId: userId },
            }"
          >
            <el-dropdown-item>{{ $t("setup.Profile") }}</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>{{
              $t("Generality.Ge_Dashboard")
            }}</el-dropdown-item>
          </router-link>

          <el-dropdown-item>
            <span
              style="display: block"
              @click="
                changePasswordDialogVisible = !changePasswordDialogVisible
              "
              >{{ $t("Generality.Ge_ChangePassword") }}</span
            >
          </el-dropdown-item>

          <el-dropdown-item divided @click.native="loginOut">
            <span style="display: block">{{ $t("Generality.Ge_LogOut") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <JvDialog
      :title="$t('Generality.Ge_ChangePassword')"
      :visible.sync="changePasswordDialogVisible"
      v-if="changePasswordDialogVisible"
      width="40%"
      @confirm="confirmChangePassword"
    >
      <el-form :model="form" label-position="top" :rules="rules">
        <el-form-item
          :label="$t('Generality.Ge_OldPassword')"
          prop="OldPassword"
        >
          <el-input v-model="form.OldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('Generality.Ge_NewPassword')"
          prop="NewPassword"
        >
          <el-input v-model="form.NewPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <!-- <JvForm :formObj="formObj"> </JvForm> -->
    </JvDialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { changePassword } from "@/api/basicApi/systemSettings/user";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";

export default {
  data() {
    return {
      formObj: {},
      form: {
        OldPassword: "",
        NewPassword: "",
      },
      defaultImg:
        'this.src="' + require("../../assets/errorImg/error.png") + '"',
      rules: {
        OldPassword: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseEnter"),
            trigger: "blur",
          },
        ],
        NewPassword: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseEnter"),
            trigger: "blur",
          },
        ],
      },
      changePasswordDialogVisible: false,
    };
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "70px",
    });
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
  },
  computed: {
    ...mapGetters(["userId", "sidebar", "avatar", "device", "name"]),
  },
  methods: {
    imgUrlPlugin,
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async loginOut() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    confirmChangePassword() {
      changePassword(this.form).then(() => {
        this.loginOut();
      });
    },
    toWorkDesk() {
      this.$router.push({
        name: "Se_Desk",
      });
    },
    toMoldProgressKanban() {
      this.$router.push({
        name: "Se_MoldProgressKanban",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .userAllName {
          margin: 0 10px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
        .userName {
          width: 40px;
          height: 40px;
          background: #2a9bf1;
          cursor: pointer;
          border-radius: 10px;
          font-size: 30px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .work-desk {
    display: inline-block;
    color: #5a5e66;
    font-size: 25px;
    // margin-bottom: 50px;
    // padding-bottom: 20px;
    // margin-right: 5px;
    // height: 100%;
  }
}
</style>
