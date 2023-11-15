<script>
import Common from "../Add/index.vue";
import { assets_device_maintenance_plan_get } from "@/api/workApi/equipment/maintenancePlan"
import closeTag from "@/utils/closeTag";

export default {
  name: "As_MaintenancePlan_Edit",
  extends: Common,
  created() {
    console.log(this.$route.query.BillId)
    this.getData()
  },
  methods: {
    getData() {
      assets_device_maintenance_plan_get({
        BillId: this.$route.query.BillId
      }).then((res) => {
        this.formObj.form = res;

      })
    }
  }
}
</script>
