// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { taskTypeEnum, enumToList } from "@/enum/workModule";
// 单据接口
import { API, trial_tooling_list } from "@/api/workApi/project/projectTask";
import { itemList } from '@/api/basicApi/systemSettings/Item'
let { api_delete } = API;
class api extends TableAPI {
  // 获取列表
  getData = trial_tooling_list;
  // 删除单据
  del = api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super(
        {
          // 表格配置
          tableSchema: tableConfig,
          // 表单配置
          formSchema,
          // 行标识
          rowId: "BillId",
          // 表格标题
          title: i18n.t("menu.Pm_TestTask"),
          // 接口类
          api,
          // 操作列宽度
          operationWidth: 150,
          // 打印模块标识
          printMod: "Pm_TestTask",
        }
    );
  }
}
export const tableConfig = [
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "100px",
    cpnProps: {
      //Image的props与element的el-image一直 按需配置
      // fit:'scale-down'
      // 宽高默认 38px
    },
  },
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Pm_TrialTask_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/project/pm_TrialTask_Detail',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },

  /*项目*/
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    width: "120px",
    innerSearch: {
      prop: "Project",
      cpn: "FormInput",
      label: i18n.t("menu.Pm_Project"),
    },
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    innerSearch: {
      prop: "ToolingNo",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ToolingNo"),
    },
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    custom: true,
    innerSearch: {
      prop: "TaskType",
      cpn: "FormSelect",
      label: i18n.t("Generality.Ge_TaskType"),
      options: {
        list: enumToList(taskTypeEnum),
      },
    },
  },

  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
  },

  /*计划交期*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
    width: "120px",
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },

];
export const formSchema = [
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime"
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime"
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Unsubmitted",
          label: i18n.t("Generality.Ge_UnSubmitted"),
        },
        {
          value: "Submitted",
          label: i18n.t("Generality.Ge_Submitted"),
        },
        {
          value: "Approving",
          label: i18n.t("Generality.Ge_Approving"),
        },
        {
          value: "Approved",
          label: i18n.t("Generality.Ge_Approved"),
        },
        {
          value: "Rejected",
          label: i18n.t("Generality.Ge_Rejected"),
        },
        {
          value: "Completed",
          label: i18n.t("Generality.Ge_Completed"),
        },
        {
          value: "Discarded",
          label: i18n.t("Generality.Ge_Discarded"),
        },
      ],
    },
  },
  {
    prop: "SortType",
    label: i18n.t("Generality.Ge_SortType"),
    cpn: "FormRadio",
    default: "CreationDateOrder",
    options: {
      list: [
        {
          value: "DeliveryDateOrder",
          label: i18n.t("Generality.Ge_SortByDeliveryDate"),
        },
        {
          value: "CreationDateOrder",
          label: i18n.t("Generality.Ge_SortByCreationDate"),
        },
      ],
    },
  },
  {
    prop: "IncludingCompleted",
    label: i18n.t("Generality.Ge_IncludingCompleted"),
    cpn: "FormRadio",
    default: 'False',
    options: {
      list: [
        {
          value: "True",
          label: i18n.t("Generality.Ge_Yes"),
        },
        {
          value: "False",
          label: i18n.t("Generality.Ge_No"),
        },
      ],
    },
  },
];

