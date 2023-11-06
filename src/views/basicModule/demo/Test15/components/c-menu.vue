<script>
import timeFormat from '@/jv_doc/utils/time/timeFormat';
export default {
  name: "index",
  data() {
    return {
      item: null,
      list: [
        '编辑',
        '详细信息',
        '外协',
        '删除',
        '锁定机床'
      ]
    }
  },
  methods: {
    clickMenuItem(i) {
      if(i === 1) {
        const h = this.$createElement;
        this.$msgbox({
          title: this.item.PartNo,
          message: h('p', null, [
            h('div', null, '生产单号：' + this.item.BillId),
            h('div', null, '零件编号：' + this.item.PartNo),
            h('div', null, '零件名称：' + this.item.PartName),
            h('div', null, '工序名称：' + this.item.ProcessName),
            h('div', null, '计划开始：' + timeFormat(this.item.PlanStart, 'yyyy-MM-dd hh:mm:ss')),
            h('div', null, '计划结束：' + timeFormat(this.item.PlanEnd, 'yyyy-MM-dd hh:mm:ss')),
          ]),
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: '取消',
        })
      }
    }
  }
}
</script>

<template>
  <div style="width: 100%;height: 100%">
    <div class="menu-item" v-for="(tram, i) in list" :key="i"
    @click="clickMenuItem(i)"
    >{{tram}}</div>
  </div>
</template>

<style scoped lang="scss">
.menu-item{
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  user-select: none;
}
.menu-item:hover{
  background: #f5f5f5;
}
</style>
