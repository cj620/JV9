<script>
import Common from "../Add/index.vue";
// 引入模块API接口
import { assets_device_spot_check_plan_get } from "@/api/workApi/equipment/spotCheckPlan";
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
export default {
  name: "As_DeviceSpotCheckPlan_Edit",
  extends: Common,
  created() {
    console.log(this.cur_Id, 4444444);
    this.getData();
    this.fileBillId = this.cur_Id;
  },
  methods: {
    getData() {
      assets_device_spot_check_plan_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;
        this.itemTableObj.setData(res.BillItems)
        this.memberTableObj.setData(res.BillMembers)
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

      if (to.query.BillId != this.cur_Id) {
        this.cur_Id = to.query.BillId;
        this.getData();
      }
    },
  },
};
</script>

<style></style>
