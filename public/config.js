/*
 * @Author: your name
 * @Date: 2021-09-10 09:12:58
 * @LastEditTime: 2024-05-23 13:23:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\public\config.js
 */
window.global_config = {
  // Base_Url: "http://localhost:61823//api",
   Base_Url: "http://192.168.1.66:8015/api",
  ImgBase_Url: "http://192.168.1.66:8015/", // 上传图片的地址
  Share_Url: "http://192.168.1.66:8101",
  WebSocket_Url: "ws://192.168.1.66:8021",
  // 税率计算模式  true未国外模式  false为国内模式
  ETaxMode: false,
  DashboardRefreshTime: 60000, // 看板刷新时间
  DashboardQuantity: 14, // 看板数量
  showTestTab: true, // 开启测试菜单
  DataVStep: 100, // 看板翻滚速度
  // IsSaveTableSchema: false, //是否缓存表格布局
  QRCodeFormat: {
    device: "M!_",
    user: "H!_",
    proBillId: "O!_",
  },
};
