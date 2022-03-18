<!--
 * @Author: C.
 * @Date: 2021-08-02 10:49:38
 * @LastEditTime: 2021-08-06 16:02:20
 * @Description: file content
-->
<template>
  <div class="print-label"
       :style="contentStyle"
       @click="tdClick">
    [{{cdata.label}}]
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
import { mapMutations } from "vuex"
export default {
  name: 'TableDiv',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(
      'print', ['CHANGE_NODES']
    ),
    tdClick () {
      this.CHANGE_NODES(this.cdata)
      this.$emit('dragstart')
    }
  },
  props: {
    cdata: {
      type: Object,
      default: () => { }
    },
  },
  computed: {
    contentStyle () {
      console.log(handleStyle(this.cdata.style, 'only-style'), 777);
      return handleStyle(this.cdata.style, 'only-style')
    },
  }
}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>