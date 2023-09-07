<template>
  <div style="height: 100%">
    <div class="status-box">
      <div
        v-for="item in result"
        :key="item.Name"
        :style="{ background: EquipmentStatusEnum[item.Name].color }"
      >
        <span style="font-weight: bold">{{ item.Value }}</span>
        <span style="font-size: 14px">{{
          EquipmentStatusEnum[item.Name].name
        }}</span>
      </div>
    </div>
    <base-chart
      style="height: 80%"
      :options="options"
    ></base-chart>
  </div>
</template>

<script>
import { EquipmentStatusEnum } from '@/enum/baseModule/dataV/EquipmentStatus'
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
export default {
  name: "EquipmentStatus",
  components: { BaseChart },
  props: {
    result: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      EquipmentStatusEnum,
      options: {},
      colors: [],
    }
  },
  created() {
    Object.keys(EquipmentStatusEnum).forEach(item => {
      this.colors.push(EquipmentStatusEnum[item].color);
    })
  },
  watch: {
    result(val) {
      const data = val.map(item => {
        return {
          value: item.Value,
          name: item.Name
        }
      })
      this.options = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: data,
            itemStyle: {
              normal: {
                color: (colors) => {
                  let colorList = this.colors;
                  return colorList[colors.dataIndex];
                }
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
}
</script>

<style scoped lang="scss">
.status-box {
  display: flex;
  width: 100%;
  padding-top: 20px;
  div {
    width: 18%;
    margin-right: 1%;
    margin-left: 1%;
    height: 40px;
    display: flex;
    flex-direction: column;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    justify-content: space-around;
    padding: 4px 0;
  }
}
</style>
