<script>
import Common from "../Add/index.vue";
import {
  assets_device_maintenance_plan_get,
  assets_device_maintenance_plan_save
} from "@/api/workApi/equipment/maintenancePlan"
import closeTag from "@/utils/closeTag";

export default {
  name: "As_MaintenancePlan_Edit",
  extends: Common,
  created() {
    this.fileBillId = this.cur_Id;
    this.getData()
  },
  methods: {
    getData() {
      assets_device_maintenance_plan_get({
        BillId: this.$route.query.BillId
      }).then((res) => {
        this.formObj.form = res;
        this.eTableObj1.setData(res.BillMembers)
        this.eTableObj2.setData(res.BillItems)
        this.ruleForm.BillFiles = res.BillFiles
      })
    },
    save(){
      this.formObj.validate((valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          this.ruleForm.BillMembers = this.eTableObj1.getTableData()
          this.ruleForm.BillItems = this.eTableObj2.getTableData()
          assets_device_maintenance_plan_save(this.ruleForm).then((res) => {
            let TagName = {
              name: this.detailRouteName,
              query: { BillId: res },
            };
            closeTag(this.current, TagName);
          })
        }
      });
    }
  }
}
</script>
