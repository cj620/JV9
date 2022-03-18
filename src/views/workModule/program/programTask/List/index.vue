<!--
 * @Author: your name
 * @Date: 2021-11-18 10:45:50
 * @LastEditTime: 2021-11-30 10:51:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\program\programTask\List\index.vue
-->
<!--编程任务-->

<script>
// 设计任务页面
import Common from "../../../design/designTask/List";
export default {
  // name: "Pa_ProgramTask",
  // 继承
  extends: Common,
  data() {
    return {
      pageDesc: i18n.t("menu.Pa_ProgramTask"),
      recordRouteName: "ProgramTask_Record",
      form: {
        DepartmentName: "",
        PageSize: 5,
        CurrentPage: 1,
        SelectType: 1,
      },
    };
  },
};
</script>
