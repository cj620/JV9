/*
 * @Author: C.
 * @Date: 2021-07-23 09:49:50
 * @LastEditTime: 2022-02-19 10:37:33
 * @Description: file content
 */
// import { printConfig } from "@/views/print/printEditor/config.js";
import { paperMap } from "@/views/basicModule/print/enums";
import { printTemConstructor } from "@/views/basicModule/print/utils";
import { unified_qery_bill } from "@/api/basicApi/systemSettings/sysSettings";
import router from "@/router";
import { Message } from "element-ui";
import { printPdf } from "~/utils/system/pdfPrint";
import {
  savePrintTemplate,
  ListByCategory,
} from "@/api/basicApi/systemSettings/print";
// let printTem =
//   JSON.parse(window.localStorage.getItem("printConfig")) || printTemConstructor();
let printTem = printTemConstructor();
const state = {
  ...printTem,
  printData: {},
  // 当前分类
  // curretCategory:'采购申请',
  CurTmp: {
    Category: "",
    Content: "",
    Name: "",
    Id: "",
  },
  // 当前模板列表
  TmpList: [],
  // 当前文字节点
  currentNode: {
    role: "label",
    label: "空",
    style: {
      y: 0,
      x: 0,
      width: 0,
      height: 0,
      fontFamily: "inherit",
      fontSize: 16,
      fontStyle: ["normal", "normal", "none"],
      textAlign: "left",
      fontWeight: "normal",
    },
  },
  toggleBlock: {
    activeNames: ["page"],
  },
};

const mutations = {
  // 改变当前选中的节点
  CHANGE_NODES(state, node) {
    state.currentNode = node;
    this.commit("print/SET_ACTIVE_TOGGLE", "font");
  },
  RESET_NODE(state) {
    state.currentNode = {
      role: "label",
      label: "空",
      style: {
        y: 0,
        x: 0,
        width: 0,
        height: 0,
        fontFamily: "inherit",
        fontSize: 16,
        fontStyle: ["normal", "normal", "none"],
        textAlign: "left",
        fontWeight: "normal",
      },
    };
  },
  DEL_CURRENT_NODE(state) {
    let blockName = state.toggleBlock.activeNames[0];
    if (["header", "body", "footer"].includes(blockName)) {
      state[blockName].nodes.forEach((item, index) => {
        if (item.id == state.currentNode.id) {
          state[blockName].nodes.splice(index, 1);
        }
      });
    } else if (state.toggleBlock.activeNames.includes("table")) {
      state.table.forEach((item) => {
        item.fields.forEach((field, fieldIndex) => {
          if (field[0].id == state.currentNode.id) {
            item.fields.splice(fieldIndex, 1);
          }
        });
      });
    }
  },
  // 删除表格
  DEL_TABLE({ table }, tableId) {
    table.forEach((item, index) => {
      if (item.id == tableId) {
        table.splice(index, 1);
      }
    });
  },
  // 设置侧边栏的显示
  SET_ACTIVE_TOGGLE({ toggleBlock }, activename) {
    toggleBlock.activeNames = [...activename];
  },
  // 保存配置
  HOLD_CONFIG(
    { page, table, header, body, footer, paperStyle, CurTmp },
    callBack = () => {}
  ) {
    // console.log(CurTmp,49889464);
    //  window.localStorage.setItem("printConfig-ttt",JSON.stringify({ page, table, header, body, footer, paperStyle }))
      // JSON.parse(window.localStorage.getItem("printConfig-ttt"))
    savePrintTemplate({
      Name: CurTmp.Name,
      Category: CurTmp.Category,
      Id: CurTmp.Id,
      Content: JSON.stringify({
        page,
        table,
        header,
        body,
        footer,
        paperStyle,
      }),
    }).then((res) => {
      callBack();
    });
  },
  // 重置配置
  RESET_CONFIG(state) {
    let resetConfig = JSON.stringify(printTemConstructor());
    Object.assign(state, JSON.parse(resetConfig));
    this.commit("print/RESET_NODE");
  },
  // 设置当前打印数据源
  SET_PRINT_DATA(state, data) {
    // 平铺 PrintInfo
    state.printData = data.map((item) => {
      return {
        ...item,
        ...item.PrintInfo,
      };
    });
    window.localStorage.setItem("print-c-data", JSON.stringify(data));
    // console.log(window.localStorage.getItem('print-c-data'),'99999');
  },
  // 切换模板
  CHANG_TMP(state, tmp) {
    // console.log(tmp,4654556456);
    state.CurTmp = tmp;
    Object.assign(state, JSON.parse(state.CurTmp.Content));
    this.commit("print/RESET_NODE");
  },
  ADD_NEW_TMP(state, Name) {
    state.CurTmp.Name = Name;
    state.CurTmp.Id = "";
  },
};

const getters = {
  paperSize({ paperStyle }) {
    // return paperStyle
    let { width, height } = paperMap[paperStyle.paperType];
    // // 纵向
    if (paperStyle.direction == "portrait") {
      return {
        width: width + "mm",
        height: height + "mm",
      };
    } else {
      return {
        width: height + "mm",
        height: width + "mm",
      };
    }
  },
};
const actions = {
  // 接口获取打印数据源
  async printInit({ commit }, payload) {
      console.log('555',448898798);
    if (payload.Ids.length == 0) {
      Message({
        type: "error",
        message: "请选择需要打印的单据",
      });
      return;
    }
    // 存储类别
    state.CurTmp.Category = payload.Category;
    window.localStorage.setItem("print-currentCategory", payload.Category);
    // 查询数据
    unified_qery_bill({
      BillIds: payload.Ids,
      BillKey: payload.BillKey,
      // Mode: payload.Mode,
    }).then((res) => {
      if(res.PdfPrint){
        // printPdf(res.Url)
        window.open(res.Url)
      }else if((typeof res=='object')){
             commit("SET_PRINT_DATA", res.Items);
        if (payload.isTag) {
          router.push({
            name: "printTagView",
            query: {
              fast: payload.fast,
            },
          });
          return;
        }
        router.push({
          name: "printView",
          query: {
            fast: payload.fast,
          },
        });
      }
    });
  },

  // 获取模板
  getPirntTemplate({ commit, state }) {
    // 新增模板时 将当前模板作为基础模板
    if (JSON.stringify(state.printData) == "{}") {
      state.printData = JSON.parse(window.localStorage.getItem("print-c-data"));
    }
    // 这里应该判断一下当前模板
    ListByCategory(
      state.CurTmp.Category ||
        window.localStorage.getItem("print-currentCategory")
    ).then((res) => {
      state.TmpList = res.Items;
      // console.log(state.CurTmp.id,789797897987);
      let currentTmpId = state.CurTmp.Id;
      let flag = res.Items.some((item) => {
        if (item.Id == currentTmpId) {
          commit("CHANG_TMP", item);
        }
        return item.Id == currentTmpId;
      });
      if (!flag && res.Items[0]) {
        commit("CHANG_TMP", res.Items[0]);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
