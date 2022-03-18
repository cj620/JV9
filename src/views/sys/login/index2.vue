<!--
 * @Author: H.
 * @Date: 2021-12-10 15:20:19
 * @LastEditTime: 2022-01-17 18:18:25
 * @Description:
-->

<template>
  <div class="login-container">
    <vue-particles
      color="#6495ED"
      class="login-bg"
      :particleOpacity="0.8"
      :particlesNumber="70"
      shapeType="circle"
      :particleSize="4"
      linesColor="#6495ED"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <indexbg />
    <transition name="loginRight">
      <div class="vmy-login-right">
        <div class="login-right">
          <div class="login-right-img">
            <img
              src="../../../assets/image/jvlogo.png"
              style="width: 45px; height: 45px"
              alt=""
            />
          </div>
          <div>JvMms V9</div>
        </div>
        <el-form ref="loginForm" :model="LoginData" :rules="rules">
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
              placeholder="密码"
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
                <el-checkbox v-model="LoginData.checked">{{ $t("Generality.Ge_RememberPassword")}}</el-checkbox>
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
</template>

<script>
import Indexbg from "@/components/BasicModule/Indexbg";
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
        UserName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        Password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {
    Indexbg,
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
              } else {
                localStorage.removeItem("UserName");
                localStorage.removeItem("Password");
              }

              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
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
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  .login-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    /*  background: url("../../../assets/svg/login-background.svg");
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;*/
  }

  .vmy-login-right {
    padding: 0px 15px;
    width: 400px;
    position: absolute;
    right: 200px;
    top: 50%;
    z-index: 999;
    transform: translateY(-50%);

    background: rgba(238, 238, 238, 0.7);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0.5px);
    -webkit-backdrop-filter: blur(0.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    .login-right {
      display: flex;
      color: #2e6db6;
      height: 50px;
      line-height: 50px;
      font-size: 32px;
      margin: 15px 0;
      animation: inputRight 0.3s;
      text-align: center;
      .login-right-img {
        margin-left: 25px;
        margin-right: 15px;
      }
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: inputRight 1.1s;
    }
    .login-right5 {
      animation: inputRight 1.3s;
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
  }
}
</style>
