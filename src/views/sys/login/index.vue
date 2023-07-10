<template>
  <div class="vmy-login">
    <div class="vmy-login-container">
      <transition name="loginLeft">
        <div class="vmy-login-left">
          <div class="jvisoft-logo">
            <img
              src="../../../assets/image/jvlogo.png"
              width="44px "
              height="44px"
              alt=""
            />
            <span class="vmy-login-info1" style="margin-left: 20px"
              >Jvisoft</span
            >
          </div>
          <div class="vmy-login-auto">
            <img
              src="../../../assets/svg/扁平科技电脑后台-01.svg"
              class="vmy-login-img login-left1"
              width="455px"
            />
            <div class="vmy-login-info1 login-left2">
              <span>Welcome to JvMms V9</span>
            </div>
            <!-- <div class="vmy-login-info2 login-left3">
              <span>Jvisoft Technology Project Management System</span>
            </div> -->
          </div>
        </div>
      </transition>
      <transition name="loginRight">
        <div class="vmy-login-right">
          <h1 class="login-right">{{ $t("login.l_LogIn") }}</h1>
          <el-form
            ref="loginForm"
            :model="LoginData"
            style="width: 60%"
            :rules="rules"
          >
            <el-form-item prop="UserName">
              <el-input
                v-model="LoginData.UserName"
                placeholder="账号"
                size="medium"
                class="login-right1"
                @keyup.enter.native="toggleInput(1)"
              />
            </el-form-item>
            <el-form-item prop="Password">
              <el-input
                v-model="LoginData.Password"
                :placeholder="$t('setup.Password')"
                show-password
                class="login-right2"
                @keyup.enter.native="toggleInput(2)"
              />
            </el-form-item>
            <el-form-item>
              <template>
                <div class="vmy-login-form login-right4">
                  <el-select
                    class="c1"
                    v-model="LoginData.Language"
                    style="width: 120px"
                    @change="langChange"
                    placeholder="中文"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-checkbox v-model="LoginData.checked">{{
                    $t("setup.RememberMe")
                  }}</el-checkbox>
                </div>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%"
                class="login-right5"
                @keyup.enter.native="login"
                @click="login"
                >{{ $t("login.l_LogIn") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LoginData: {
        Password: "",
        Language: "",
        UserName: "",
        checked: false,
      },
      options: [
        {
          value: "cn",
          label: "中文",
        },
        {
          value: "en",
          label: "English",
        },
        {
          value: "ja",
          label: "日本語",
        },
      ],
      languageEnum: {
        cn: 1,
        en: 2,
        ja: 4,
      },
      loading: false,
      redirect: undefined,
      otherQuery: {},
      rules: {
        UserName: [
          {
            required: true,
            message: this.$t("setup.PleaseInputAccount"),
            trigger: "blur",
          },
        ],
        Password: [
          {
            required: true,
            message: this.$t("setup.PleaseInputPassword"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.LoginData.Language =
      localStorage.lang === undefined ? "en" : localStorage.lang;
  },
  mounted() {
    this.init();
  },
  methods: {
    toggleInput(index) {
      this.$refs.loginForm.$el[index].focus();
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let Language = JSON.parse(JSON.stringify(this.LoginData));
          Language.Language = this.languageEnum[this.LoginData.Language];
          this.$store
            .dispatch("user/login", Language)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              if (this.LoginData.checked) {
                localStorage.setItem("UserName", this.LoginData.UserName);
                localStorage.setItem("Password", this.LoginData.Password);
              }

              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    init() {
      let UserName = localStorage.getItem("UserName");
      if (UserName) {
        this.LoginData.UserName = UserName;
        this.LoginData.Password = localStorage.getItem("Password");
        this.LoginData.checked = true;
      }
      if (this.LoginData.UserName === "") {
        this.$refs.loginForm.$el[0].focus();
      } else if (this.LoginData.Password === "") {
        this.$refs.loginForm.$el[1].focus();
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    langChange(e) {
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
      localStorage.removeItem("tableConfig");
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.vmy-login {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 200px;
  &-container {
    width: 100%;
    position: relative;
    z-index: 22;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .login-right {
    animation: inputRight 0.3s;
  }
  .login-right1 {
    animation: inputRight 0.5s;
  }
  .login-right2 {
    animation: inputRight 0.7s;
  }
  .login-right3 {
    animation: inputRight 0.9s;
  }
  .login-right4 {
    animation: inputRight 1.1s;
  }
  .login-right5 {
    animation: inputRight 1.3s;
  }
  .login-left1 {
    animation: inputLeft 0.5s;
  }
  .login-left2 {
    animation: inputLeft 0.8s;
  }
  .login-left3 {
    animation: inputLeft 1.1s;
  }

  &-left {
    width: 50%;
    margin-right: 10px;
    position: relative;
    .jvisoft-logo {
      // border: 1px solid red;
      position: absolute;
      top: -150px;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &-right {
    width: 50%;
    padding-left: 130px;
  }
  @keyframes inputRight {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes inputLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  &-img {
    // width: 100%;
    // height: 130px;
  }
  &-info1 {
    font-size: 30px;
    // margin-top: 2em;
    color: rgb(47, 47, 47);
  }
  &-info2 {
    font-size: 20px;
    margin-top: 16px;
    color: #fff;
  }
  &-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.vmy-login::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -48%;
  background-image: url("../../../assets/svg/login-bg.svg");
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  z-index: 1;
}
</style>
