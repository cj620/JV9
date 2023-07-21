<!--
 * @Author: your name
 * @Date: 2021-11-26 10:31:43
 * @LastEditTime: 2022-06-01 16:24:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Edit\index.vue
-->
<script>
import Common from "../Add/index.vue";
import { API } from "@/api/workApi/equipment/maintenance";
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
export default {
  name: "As_DeviceEdit",
  extends: Common,
  created() {
    console.log(this.cur_Id, 4444444);
    this.getData();
  },
  methods: {
    getData() {
      API.api_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;
        this.M_TableObj.setData(res.Items);
      });
      console.log(this.cur_Id, 4444444);
    },
    _save() {
      API.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: this.ruleForm.BillId },
        };
        closeTag(this.current, TagName);
      });
    },
  },

  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  watch: {
    $route(to, from) {
      if (to.name !== this.$parent.$options.name) return;

      if (to.query.DeviceNo != this.cur_Id) {
        this.cur_Id = to.query.DeviceNo;
        this.getData();
      }
    },
  },
};
</script>

<style></style>
