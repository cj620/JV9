<script>
// import { repairStateEnum } from "@/enum/workModule";
export default {
  name: "RepairStateTags",
  props: {
    state: {
      type: String,
      default: "Fail",
    },
    enum: {
      type: Object,
      default: null,
    }
  },
  methods: {},
  render(h) {
    const stateMap = this.enum[this.state];
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
  filter:opacity(90%);
  width: 100px;
  padding: 3px;
  border-radius: 5px;
}
</style>
