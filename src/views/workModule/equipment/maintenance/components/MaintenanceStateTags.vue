<script>
import { maintenanceStateEnum } from "@/enum/workModule";
export default {
  name: "MaintenanceStateTags",
  props: {
    state: {
      type: String,
      default: "Fail",
    },
  },
  methods: {},
  render(h) {
    const stateMap = maintenanceStateEnum[this.state];
    const style = {
      // padding: "2px 7px",
      background: stateMap?.color,
      color: stateMap?.fcolor,
    };
    const tagEl = (
        <span style={style} class="maintenanceStateTags-style">
        {stateMap.name}
      </span>
    );
    return tagEl;
  }
}
</script>
<style scoped lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.maintenanceStateTags-style {
  @include flexBox;
  width: 100px;
  padding: 3px;
  border-radius: 5px;
}
</style>
