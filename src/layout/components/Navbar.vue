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
          <el-tooltip :content="$t('systemSetupData.Dashboard')" effect="dark" placement="bottom">
            <div
              class="el-icon-s-platform"
              style="font-size: 25px"
              @click="toMoldProgressKanban"
            ></div>
          </el-tooltip>
        </div>
        <div class="right-menu-item hover-effect" style="padding-top: 2px">
          <el-tooltip :content="$t('dashboard.Da_Workbench')" effect="dark" placement="bottom">
            <div
              class="el-icon-s-order"
              style="font-size: 25px"
              @click="toWorkDesk"
            ></div>
          </el-tooltip>
        </div>
        <div class="right-menu-item hover-effect" style="padding-top: 2px">
          <el-tooltip :content="$t('dashboard.Da_PendingDocuments')" effect="dark" placement="bottom">
            <div
              class="el-icon-s-claim"
              style="font-size: 25px"
              @click="toPendingDoc"
            ></div>
          </el-tooltip>
        </div>
        <!-- el-icon-message-solid -->
        <!-- <el-badge is-dot class="item">数据查询</el-badge> -->
        <span
          class="right-menu-item hover-effect"
          style="padding-top: 9px; line-height: 35px"
        >
          <el-popover
            placement="bottom"
            width="450"
            trigger="click"
            @show="popoverInit"
          >
            <div style="position: relative" class="notify-box">
              <div
                class="notify-box-select"
                style="
                  position: absolute;
                  right: 0;
                  top: 7px;
                  z-index: 99;
                  width: 100px;
                "
              >
                <el-select
                  v-model="notifyType"
                  :placeholder="$t('Generality.Ge_PleaseSelect')"
                  size="mini"
                  @change="notifyTypeChange"
                >
                  <el-option
                    :value="0"
                    :label="$t('Generality.Ge_AllMsg')"
                  ></el-option>
                  <el-option
                    :value="1"
                    :label="$t('Generality.Ge_UnreadMsg')"
                  ></el-option>
                </el-select>
              </div>
              <el-tabs v-model="activeType" @tab-click="tabClick">
                <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
                <el-tab-pane
                  :label="item.label"
                  :name="item.value"
                  v-for="item in notifyObjs"
                  :key="item.value"
                  :lazy="true"
                >
                  <span slot="label">
                    <span style="padding-top: 9px; line-height: 24px">
                      <el-badge :is-dot="item.hasUnreadMsg">
                        {{ item.label }}
                      </el-badge>
                    </span>
                  </span>
                  <div
                    ref="listRef"
                    v-if="item.data.length !== 0"
                    v-infinite-scroll="getData"
                    style="
                      overflow: auto;
                      height: 300px;
                      padding: 0 5px;
                      margin: 0;
                    "
                  >
                    <NotifyItem
                      :cdata="item"
                      v-for="item in item.data"
                      :key="item.Id"
                    ></NotifyItem>
                  </div>
                  <el-empty v-else></el-empty>
                </el-tab-pane>
              </el-tabs>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-top: 1px solid #eee;
                  padding-top: 10px;
                "
              >
                <div style="cursor: pointer" @click="toMarkAll">
                  {{ $t("Generality.Ge_AllRemarkToRead") }}
                </div>
                <div style="cursor: pointer" @click="historyDetail">
                  {{ $t("Generality.Ge_HistoryMsg") }}
                </div>
              </div>
            </div>
            <span slot="reference">
              <el-badge :value="notifysCounts">
                <el-tooltip :content="$t('Generality.Ge_Notice')" effect="dark" placement="bottom">
                  <span
                    class="el-icon-message-solid"
                    style="font-size: 25px"
                  ></span>
                </el-tooltip>
              </el-badge>
            </span>
          </el-popover>
        </span>
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
          <div
            class="socket-state"
            :style="{ background: socket.socket_open ? '#0f0' : '#f00' }"
            @click.stop="reconnect"
          ></div>
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
          <span class="userAllName"> {{ name }}</span>
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
    <JvDialog
      :title="$t('Generality.Ge_HistoryMsg')"
      :visible.sync="notifyVisible"
      width="60%"
      @confirm="notifyVisible = false"
    >
      <div style="position: relative" class="notify-box">
        <div
          class="notify-box-select"
          style="
            position: absolute;
            right: 0;
            top: 7px;
            z-index: 99;
            width: 100px;
          "
        >
          <el-select
            v-model="notifyType"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            size="mini"
            @change="notifyTypeChange"
          >
            <el-option
              :value="0"
              :label="$t('Generality.Ge_AllMsg')"
            ></el-option>
            <el-option
              :value="1"
              :label="$t('Generality.Ge_UnreadMsg')"
            ></el-option>
          </el-select>
        </div>
        <el-tabs v-model="activeType" @tab-click="tabClick">
          <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
          <el-tab-pane
            :label="item.label"
            :name="item.value"
            v-for="item in notifyObjs"
            :key="item.value"
            :lazy="true"
          >
            <span slot="label">
              <span style="padding-top: 9px; line-height: 24px">
                <el-badge :is-dot="item.hasUnreadMsg">
                  {{ item.label }}
                </el-badge>
              </span>
            </span>
            <div
              ref="listRef"
              v-if="item.data.length !== 0"
              v-infinite-scroll="getData"
              style="overflow: auto; height: 300px; padding: 0 5px; margin: 0"
            >
              <NotifyItem
                :cdata="item"
                v-for="item in item.data"
                :key="item.Id"
                @toDetail="notifyVisible = false"
              ></NotifyItem>
            </div>
            <el-empty v-else></el-empty>
          </el-tab-pane>
        </el-tabs>
      </div>
    </JvDialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import { changePassword } from "@/api/basicApi/systemSettings/user";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { msgEnum, MsgTypeEnum } from "@/enum/baseModule/msgEnum";
import NotifyItem from "./Sidebar/NotifyItem.vue";
export default {
  data() {
    return {
      formObj: {},
      form: {
        OldPassword: "",
        NewPassword: "",
      },
      msgEnum,
      activeType: MsgTypeEnum.NOTICE,
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
      notifyType: 0,
      currentNotifyObj: null,
      notifyVisible: false,
      isFirstVisible: true,
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
    this.connect();
    // this.getNotifys();
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    NotifyItem,
  },
  computed: {
    ...mapGetters(["userId", "sidebar", "avatar", "device", "name"]),
    ...mapState("websocket", ["notifyObjs", "notifysCounts", "socket"]),
  },
  methods: {
    ...mapActions("websocket", [
      "sendNessage",
      "connect",
      "changeSelectType",
      "getAllNotify",
    ]),
    ...mapMutations("websocket", ["SET_COUNTS"]),
    getData() {
      // console.log(this.currentNotifyObj, "444notifyObjs");
      this.currentNotifyObj.nextPage();
    },
    reconnect() {
      this.socket.reconnect();
    },
    tabClick(tab) {
      this.notifyObjs.forEach((item) => {
        if (item.value === tab.name) {
          this.currentNotifyObj = item;
          this.currentNotifyObj.getData();

          if (Array.isArray(this.$refs.listRef)) {
            this.$refs.listRef.forEach((ref) => {
              ref.scrollTop = 0;
            });
          } else {
            this.$refs.listRef && (this.$refs.listRef.scrollTop = 0);
          }
        }
      });
    },
    popoverInit() {
      // notifysCounts = "";
      this.SET_COUNTS("");
      if (this.isFirstVisible) {
        this.getAllNotify();
        this.isFirstVisible = false;
      } else {
        this.tabClick({
          name: this.activeType,
        });
      }
    },
    notifyTypeChange(type) {
      this.changeSelectType(type);
      // this.popoverInit();
      this.tabClick({
        name: this.activeType,
      });
    },
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
    toPendingDoc() {
      this.$router.push({
        name: "Se_PendingDocuments",
      });
    },
    toMoldProgressKanban() {
      this.$router.push({
        name: "Se_MoldProgressKanban",
      });
    },
    toMarkAll() {
      this.$confirm(this.$t('setup.WhetherMarkAllRead'), {
        confirmButtonText: this.$t('Generality.Ge_OK'),
        cancelButtonText: this.$t('Generality.Ge_Cancel'),
        type: "warning",
      }).then(() => {
        this.currentNotifyObj.markAllRead();
      });
    },
    historyDetail() {
      this.notifyVisible = true;
    },
  },
  watch: {
    $route() {
      // console.log("55555");
      this.notifyVisible = false;
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
        position: relative;
        .socket-state {
          position: absolute;
          border-radius: 100%;
          background-color: #0f0;
          width: 10px;
          height: 10px;
          left: 31px;
          bottom: 5px;
          /* border: 5px solid #fff; */
        }
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
