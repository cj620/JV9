const enterprise = [
  // 企业
  {
    id: "1442330710311571457",
    parentid: null
  },
  // 客户
  {
    id: "1442330997004832770",
    component: () =>
      import("@/views/workModule/enterprise/client/List/index.vue"),
    parentid: "1442330710311571457"
  },
  // 供应商
  {
    id: "1442331293856698370",
    component: () =>
      import("@/views/workModule/enterprise/supplier/List/index.vue"),
    parentid: "1442330710311571457"
  },
  // 客户详情
  {
    id: "1442364599549693953",
    component: () =>
      import("@/views/workModule/enterprise/client/clientDetails/index.vue"),
    parentid: "1442330710311571457"
  },
  // 供应商详情
  {
    id: "1442365043340611586",
    component: () =>
      import(
        "@/views/workModule/enterprise/supplier/supplierDetails/index.vue"
      ),
    parentid: "1442330710311571457"
  },
  // 客户分类
  {
    id: "22",
    component: () =>
      import(
        "@/views/workModule/enterprise/clientClassification/List/index.vue"
      ),
    parentid: "1442330710311571457"
  },
  // 供应商分类
  {
    id: "23",
    component: () =>
      import(
        "@/views/workModule/enterprise/supplierClassification/List/index.vue"
      ),
    parentid: "1442330710311571457"
  }
];

export default enterprise;
