/*
 * @Author: C.
 * @Date: 2024-02-28 10:18:33
 */
import router from "@/router";
const state = {
  dashboards: [
    "/EquipmentSignage",
    "/TaskStatusSignage",
    "/DepartmentSignboard",
    "/SaleSignage",
    "/MoldMachining",
    "/QualitySignage",
    "/EquipmentOperation",
  ],
  currentPath: "/EquipmentSignage",
  timer: null,
};

const mutations = {
  SwitchLeft: (state, log) => {
    console.log(state.currentPath, "left");
    let idx = state.dashboards.findIndex((item) => item == state.currentPath);
    let path = "";
    if (idx == -1) {
      return;
    }
    if (idx !== state.dashboards.length - 1) {
      path = state.dashboards[idx + 1];
    } else {
      path = state.dashboards[0];
    }
    state.currentPath = path;
    router.replace({
      path,
    });
  },
  SwitchRight: (state, log) => {
    console.log(state.currentPath, "right");
    let idx = state.dashboards.findIndex((item) => item == state.currentPath);
    let path = "";
    if (idx == -1) {
      return;
    }
    if (idx !== 0) {
      path = state.dashboards[idx - 1];
    } else {
      path = state.dashboards[state.dashboards.length - 1];
    }
    state.currentPath = path;
    router.replace({
      path,
    });
  },
  setCurrentPath(state, path) {
    console.log(state.currentPath, path);
    state.currentPath = path;
  },
  startTimer(state) {
    if (state.timer) {
      clearInterval(state.timer);
    }
    state.timer = setInterval(() => {
      this.commit("dashboard/SwitchRight");
      // console.log("11111111111111111");
    }, 30000);
  },
  endTimer(state) {
    if (state.timer) {
      clearInterval(state.timer);
    }
  },
};

const actions = {
  SlideLeft({ commit }) {
    commit("SwitchLeft");
  },
  SlideRight({ commit }) {
    commit("SwitchRight");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
