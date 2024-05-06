<!--
 * @Author: H.
 * @Date: 2021-11-30 11:06:17
 * @LastEditTime: 2022-01-20 17:15:59
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <div class="process-template">
      <div class="process-template-left">
        <div class="process-template-left-title">
          <div class="process-template-left-title-add" @click="add">
            {{$t('Generality.Ge_NewTemplateAdded')}}
          </div>
        </div>
        <div class="process-template-left-data">
          <div class="process-template-left-data-item"
               :class="[activeIndex === i ? 'active-class' : '']"
               @click="clickTemplate(item, i)"
               v-for="(item, i) in templateData" :key="i">
            <div class="template-name">{{item.Template}}</div>
            <div class="template-edit" @click="edit(item)">{{$t('Generality.Ge_Edit')}}</div>
            <div class="template-del">
              <el-popconfirm
                :title="$t('Generality.Ge_DeleteConfirm')"
                @confirm="del(item)"
              >
                <span slot="reference">{{$t('Generality.Ge_Delete')}}</span>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div class="process-template-right">
        <div class="process-template-right-title"><span style="font-weight: normal;font-family: 微软雅黑">{{$t('Generality.Ge_TemplateName')}}:</span> {{ templateTitle }}</div>
        <div class="process-template-right-table">
          <JvTable ref="BillTable" :table-obj="tableObj">
            <template #IsCompulsoryInspection="{record}">
              {{ IsCompulsoryInspectionEnum[record].name }}
            </template>
          </JvTable>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { getAllProcessTemplate, deleteProcessTemplate } from "@/api/workApi/production/baseData"
export default {
  data() {
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
    }
  },
  created() {
    this.getData();
    this.tableObj = new Table();
  },
  methods: {
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
    add(){
      this.$router.push({
        name: "AddProcessTemplate",
        params: {
          type: 'add'
        }
      });
    },
    edit(row) {
      this.$router.push({
        name: "EditProcessTemplate",
        params: { data: row },
      });
    },
    del(row) {
      deleteProcessTemplate([row.Id]).then((res) => {
        this.getData();
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.process-template{
  &-right{
    width: calc(100% - 230px);
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
        border-bottom: 1px solid #eee;
        font-size: 14px;
        display: flex;
        overflow: hidden;
        padding-left: 10px;
        .template-name{
          width: calc(100% - 70px);
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
    &-title{
      height: 40px;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      &-add:hover{
        border: 1px dashed #1890ff;
        color: #1890ff;
      }
      &-add{
        border: 1px dashed #a1a1a1;
        width: 96%;
        height: 38px;
        color: #707070;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        transition: .2s;
        cursor: pointer;
        margin-left: 2%;
      }
    }
    overflow-y: auto;
    width: 220px;
    height: 100%;
    border-radius: 4px;
    background: #fff;
  }
  width: 100%;
  height: 100%;
  display: flex;
}
.active-class{
  background: #eee;
  color: #1890ff;
}
</style>

