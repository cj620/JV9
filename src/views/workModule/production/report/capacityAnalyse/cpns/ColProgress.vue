<!--
 * @Author: your name
 * @Date: 2021-11-11 16:06:48
 * @LastEditTime: 2022-01-06 18:30:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\basicModule\demo\ProjectAnalyze\cpns\ColProgress.vue
-->
<script>
export default {
  props: {
    state: {
      type: [String, Number],
      default: "0",
    },
    rowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      baseHeight: 50,
      loadHeight: 20,
    };
  },
  computed: {
    getProceeColor() {
      let type = this.rowData.Flag;
      console.log(type);
      if (type == "0") {
        return "#409EFF";
      } else if (type == "1") {
        return "#E6A23C";
      } else if (type == "2") {
        return "exception";
      }
    },
  },
  created() {},
  render() {
    const isOverLoad = Number(this.state) > 100;

    const base_progress = {
      height: Number(this.state / 100) * this.baseHeight + "px",
      backgroundColor: this.getProceeColor,
    };
    const base_box = {
      height: this.baseHeight + "px",
      border: "1px solid #ccc",
      borderTop: isOverLoad ? "none" : "1px solid #ccc",
    };
    const load_box = {
      height: this.loadHeight + "px",
    };

    let loadCount = Number(this.state / 100 - 1) * this.baseHeight;
    loadCount = loadCount > 0 ? loadCount : 0;
    const load_progress = {
      height:
        loadCount > this.loadHeight ? this.loadHeight + "px" : loadCount + "px",
      backgroundColor: "red",
      border: "1px solid #ccc",
      "border-bottom": "none",
      "border-top": "none",
    };
    const progress = (
      <div>
        <div class="vertical-progress" style={load_box}>
          <div class="current" style={load_progress}></div>
        </div>

        <div class="vertical-progress" style={base_box}>
          <div class="current" style={base_progress}></div>
        </div>
        <div class="progress-desc">{Math.round(Number(this.state))}%</div>
      </div>
    );

    return progress;
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.vertical-progress {
  // height: 72px;
  width: 20px;
  // background-color: pink;

  // border-radius: 3px;
  // flex-flow: column;
  @include flexBox($ff: column, $jc: flex-end);
  // overflow: hidden;
  .current {
    width: 100%;
  }
  .progress-desc {
    font-size: 7px;
    // border-bottom: ;
  }
}
</style>
