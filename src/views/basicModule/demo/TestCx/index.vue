<template>
  <div>
    <div>{{drag?'拖拽中':'拖拽停止'}}</div>
    <div style="display: flex">
      <div style="height: 600px;overflow-y: auto;border: 1px solid;width: 610px">
        <JvDraggable :isFloat="true" group="aa" v-model="defaultList" @start="onStart" @end="onEnd" animation="10" ref="JvDraggableRef">
          <template slot-scope="item">
            <div style="width: 50%;height: 50px; background: #fff;margin-bottom: 10px">{{item}}</div>
          </template>
        </JvDraggable>
      </div>
      <div style="width: 50px"></div>
      <div style="height: 600px;overflow-y: auto;border: 1px solid;min-width: 300px">
        <JvDraggable group="aa" v-model="list" @start="onStart" @end="onEnd" animation="10" ref="JvDraggableRef">
          <template slot-scope="item">
            <div style="width: 300px;height: 50px; background: #fff;margin-bottom: 10px">{{item}}</div>
          </template>
        </JvDraggable>
      </div>
    </div>
  </div>
</template>

<script>
//导入draggable组件
import JvDraggable from '@/components/JvDraggable/JvDraggable.vue';

export default {
  //注册draggable组件
  components: {
    JvDraggable,
  },
  data() {
    return {
      drag: false,
      //定义要被拖拽对象的数组
      defaultList: [
        {people: 'l1', id: 1, name: 'www.itxst.com'},
        {people: 'l2', id: 2, name: 'www.baidu.com'},
        {people: 'l3', id: 3, name: 'www.taobao.com'},
        {people: 'l4', id: 4, name: 'www.google.com'},
        {people: 'l5', id: 5, name: 'www.google.com'},
        {people: 'l6', id: 6, name: 'www.google.com'},
      ],
      list: [
        {people: 'r1', id: 1, name: 'www.itxst.com'},
        {people: 'r2', id: 2, name: 'www.baidu.com'},
        {people: 'r3', id: 3, name: 'www.taobao.com'},
        {people: 'r4', id: 4, name: 'www.google.com'},
        {people: 'r5', id: 5, name: 'www.google.com'}
      ]
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd(list) {
      this.drag = false;
    },
  },
};
</script>

<style scoped>

</style>
