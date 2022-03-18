<!--
 * @Author: C.
 * @Date: 2021-07-27 14:25:22
 * @LastEditTime: 2021-08-06 11:07:52
 * @Description: file content
-->
 <!-- <PrintLabel :cdata="cdata"></PrintLabel> -->
<template>
  <div :style="{width:cdata.style.width+'px',height:cdata.style.height+'px'}"
       class="item-wrapper"
       @dblclick="dblclick">
    <DragWrapper v-bind="{...commonSet,...$attrs}"
                 @resizing="onResize"
                 :onDragStart="dragstart"
                 :min-width="25"
                 :min-height="10"
                 :w="cdata.style.width"
                 :h="cdata.style.height"
                 :handles="['mr','br','bm']"
                 :draggable="false">
    </DragWrapper>
    <PrintLabel :cdata="cdata"
                ref="PrintLabel"></PrintLabel>
  </div>
</template>

<script>

import { mapMutations } from "vuex"
import DragWrapper from "../../../DragWrapper";
import PrintLabel from "../../PrintLabel";
import { handleStyle } from "../../../../../utils";

export default {
  components: {
    DragWrapper,
    PrintLabel
  },
  data () {
    return {
      commonSet: {
        snap: true,
        grid: [16, 16],
        // parent: true,
      },
      inputShow: false,
    }
  },
  methods: {
    ...mapMutations(
      'print', ['CHANGE_NODES', 'SET_ACTIVE_TOGGLE']
    ),
    onResize (x, y, width, height) {
      // throttle(() => {
      //   this.cdata.style.width = width
      //   this.cdata.style.height = height
      // }, 500, true)
      this.cdata.style.width = width
      this.cdata.style.height = height
    },
    dragstart () {
      // console.log(this.cdata.style.fontSize);
      console.log('dragstart', this.cdata);
      this.CHANGE_NODES(this.cdata)
      this.$emit('dragstart')
    },
    dblclick (e) {
      // this.$refs.PrintLabel.dblclick()
      this.$refs.PrintLabel.inputShow = true

    }
  },
  props: {
    cdata: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    contentStyle () {
      return handleStyle(this.cdata.style, 'only-style')
    },
  }

}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
