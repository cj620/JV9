import { login, logout, getInfo } from "@/api/basicApi/systemSettings/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  userId: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { UserName, Password, Language } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        UserName: UserName.trim(),
        Password: Password,
        Language: 1,
      })
        .then((response) => {
          commit("SET_TOKEN", response.ticket);
          commit("SET_NAME", response.UserName);
          setToken(response.ticket);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          // console.log(response,'用户信息');
          var str = {};

          str.roles = ["admin"];
          str.name = response.UserName;
          if (response.PhotoUrl) {
            str.avatar = response.PhotoUrl;
          }
          str.userId = response.UserId;
          ("https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
          str.introduction = "I am a super administrator";
          const data = str;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { roles, name, avatar, introduction, userId } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_USERID", userId);
          commit("SET_INTRODUCTION", introduction);

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, {
            root: true,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, {
      root: true,
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
