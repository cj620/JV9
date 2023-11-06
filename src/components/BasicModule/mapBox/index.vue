<!--
 * @Author: your name
 * @Date: 2021-11-09 09:22:46
 * @LastEditTime: 2021-12-17 09:39:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\WorkModule\BillState\c-menu.vue
-->
<script>
export default {
  props: {
    state: {
      type: String,
      default: "Fail",
    },
    map: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},

  render(h) {
    if (!this.map?.[this.state]) {
      console.error(this.state + "字段没有检测到对应枚举！请确认！");
      return "";
    }
    const stateMap = this.map[this.state];
    const style = {
      // padding: "2px 7px",
      background: stateMap?.color,
      color: stateMap?.fcolor,
    };
    const tagEl = (
      <span style={style} class="billstatetags-style">
        {stateMap.name}
      </span>
    );

    return tagEl;
  },
};
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.billstatetags-style {
  @include flexBox;
  width: 100px;
  padding: 3px;
  border-radius: 5px;
}
</style>
