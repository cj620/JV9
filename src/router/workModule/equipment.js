const equipment = [
  // 设备
  {
    id: "24",
    parentid: null
  },
  // 设备资源
  {
    id: "25",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/List/index.vue"),
    parentid: "24"
  }
];

export default equipment;
