<!--
 * @Author: your name
 * @Date: 2021-11-18 10:45:50
 * @LastEditTime: 2021-11-30 10:51:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\program\programTask\List\c-menu.vue
-->
<!--编程加工任务-->

<script>
import Common from "../../../design/designTask/List";
export default {
  name: "ProgramProducingTask",
  // 继承
  extends: Common,
  data() {
    return {
      // pageDesc: i18n.t("menu.Pa_ProgramTask"),
      pageDesc: i18n.t("menu.Pa_ProgramProducingTask"),
      // recordRouteName: "ProgramTask_Record",
    };
  },
};
</script>
