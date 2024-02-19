<script>
// 设计任务页面
import Common from "@/views/workModule/design/designTask/List";
export default {
  name: "As_AssyTask",
  // 继承
  extends: Common,
  data() {
    return {
      pageDesc: i18n.t("menu.As_AssyTask"),
      recordRouteName: "AssyTaskRecord",
      form: {
        DepartmentName: "",
        PageSize: 5,
        CurrentPage: 1,
        SelectType: 2,
      },
    };
  },
};
</script>
