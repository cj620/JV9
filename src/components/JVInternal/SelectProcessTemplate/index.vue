<!--选择工艺模板-->
<template>
  <div>
    <jv-dialog
      :title="$t('project.Pro_SelectTemplate')"
      width="80vw"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmProcessTemplate"
    >
      <div class="process-template">
        <div class="process-template-left">
          <div class="process-template-left-data">
            <div class="process-template-left-data-item"
                 :class="[activeIndex === i ? 'active-class' : '']"
                 @click="clickTemplate(item, i)"
                 v-for="(item, i) in templateData" :key="i">
              <div class="template-name">{{ item.Template }}</div>
              <div class="template-check" v-show="activeIndex === i"><i class="el-icon-check"></i></div>
            </div>
          </div>
        </div>
        <div class="process-template-right">
          <div class="process-template-right-title"><span style="font-weight: normal;font-family: 微软雅黑">{{$t('Generality.Ge_TemplateName')}}:</span> {{ templateTitle }}</div>
          <div class="process-template-right-table">
            <JvTable ref="BillTable" :table-obj="tableObj">
              <template #IsCompulsoryInspection="{ record }">
                {{ IsCompulsoryInspectionEnum[record].name }}
              </template>
            </JvTable>
          </div>
        </div>
      </div>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "./config";
import { getAllProcessTemplate } from "@/api/workApi/production/baseData";

export default {
  name: 'index',
  data(){
    return {
      tableObj: {},
      activeIndex: 0,
      templateData:[],
      templateTitle: "",
      IsCompulsoryInspectionEnum: {
        true: {
          name: this.$t("Generality.Ge_Yes"),
        },
        false: {
          name: this.$t("Generality.Ge_No"),
        }
      }
    };
  },
  created() {
    this.getData();
    this.tableObj = new Table();
  },
  methods:{
    confirmProcessTemplate() {
      this.$emit('confirmProcessTemplate', this.tableObj.tableData)
    },
    clickTemplate(item, i) {
      this.activeIndex = i;
      this.templateTitle = item.Template
      this.tableObj.setData(item.BillItems)
    },
    getData() {
      getAllProcessTemplate().then(res =>{
        this.templateData = res.Items;
        this.templateTitle = res.Items[0].Template;
        this.tableObj.setData(this.templateData[0].BillItems);
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.process-template{
  width: 100%;
  height: 50vh;
  display: flex;
  &-right{
    width: calc(100% - 170px);
    height: 100%;
    background: #fff;
    margin-left: 10px;
    &-title{
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      font-family: '黑体';
      text-indent: 10px;
    }
    &-table{
      height: calc(100% - 40px);
    }
  }
  &-left{
    &-data{
      &-item:hover{
        background: #eee;
        color: #1890ff;
        cursor: pointer;
      }
      &-item{
        transition: .2s;
        height: 30px;
        line-height: 30px;
        width: 100%;
        //border-bottom: 1px solid #eee;
        font-size: 14px;
        display: flex;
        overflow: hidden;
        padding-left: 10px;
        .template-name{
          width: calc(100% - 30px);
        }
        .template-check{
          width: 30px;
          height: 30px;
          line-height: 30px;
          color: #1890ff
        }
        .template-edit{
          width: 30px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          margin-right: 6px;
          color: #1890ff
        }
        .template-del{
          width: 30px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          color: #1890ff
        }
      }
      height: calc(100% - 55px);
      width: 100%;
      box-sizing: border-box;
    }
    width: 160px;
    height: 100%;
    border-radius: 4px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #eee;
  }
}
.active-class{
  background: #eee;
  color: #1890ff;
}
</style>

