<!--
 * @Author: your name
 * @Date: 2021-11-26 10:31:43
 * @LastEditTime: 2022-07-14 20:01:36
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Edit\c-menu.vue
-->
<script>
import Common from "../Add/index.vue";
import { assets_device_get,assets_device_update } from "@/api/workApi/equipment/device";
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
export default {
  name: "As_DeviceEdit",
  extends: Common,
  created() {
    console.log(22);
    this.getData();
  },
  methods: {
    getData() {
      assets_device_get({ DeviceNo: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;
        this.formObj.formSchema[0].cpnProps.disabled=true
                this.formObj.formSchema[1].cpnProps.disabled=true
        console.log(this.formObj.formSchema[0].cpnProps.disabled,555)
      });
      console.log(this.cur_Id,4444444)
    },
    _save() {
      assets_device_update(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { DeviceNo: this.ruleForm.DeviceNo },
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
