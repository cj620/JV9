<script>
import { repairStateEnum } from "@/enum/workModule";
export default {
  name: "RepairStateTags",
  props: {
    state: {
      type: String,
      default: "Fail",
    },
  },
  methods: {},
  render(h) {
    const stateMap = repairStateEnum[this.state];
    const style = {
      // padding: "2px 7px",
      background: stateMap?.color,
      color: stateMap?.fcolor,
    };
    const tagEl = (
      <span style={style} class="repairStateTags-style">
        {stateMap.name}
      </span>
    );
    return tagEl;
  }
}
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.repairStateTags-style {
  @include flexBox;
  width: 100px;
  padding: 3px;
  border-radius: 5px;
}
</style>
