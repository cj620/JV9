<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2022-01-17 09:46:44
 * @Description: file content
-->
<template>
  <DragWrapper :w="cdata.style.width"
               :h="cdata.style.height"
               :x="cdata.style.x"
               :y="cdata.style.y"
               @dragging="onDrag"
               :onDragStart="dragstart"
               @resizing="onResize"
               :z="9"
               v-bind="commonSet"
               :lock-aspect-ratio="true">
    <!-- 放置二维码的容器,需要给一个ref -->
    <div class="print-qr">[{{cdata.label}}]{{$t('Generality.Ge_QRCode')}}</div>
  </DragWrapper>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import DragWrapper from "../../../DragWrapper";
export default {
  components: {
    DragWrapper,
  },
  data () {
    return {
      qr: '',
      commonSet: {
        snap: true,
        grid: [16, 16],
      },
    }
  },
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    cdata: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    // this.crateQrcode()
    console.log(this.cdata, '122121212');
  },
  methods: {
    ...mapMutations(
      'print', ['CHANGE_NODES']
    ),
    onDrag (x, y) {
      this.cdata.style.x = x
      this.cdata.style.y = y
    },
    onResize (x, y, width, height) {
      this.cdata.style.x = x
      this.cdata.style.y = y
      this.cdata.style.width = width
      this.cdata.style.height = height
    },
    dragstart () {
      console.log('dragstart');
      this.CHANGE_NODES(this.cdata)
      this.$emit('dragstart')
    },
  },
  computed: {
  },
}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
