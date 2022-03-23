<!--透视表-->
<template>
  <PageWrapper :footer="false"  style="background-color: #ffffff">
    <DxChart ref="chart">
      <DxTooltip
        :enabled="true"

      />
      <DxAdaptiveLayout :width="450"/>
      <DxSize :height="200"/>
      <DxCommonSeriesSettings type="bar"/>
    </DxChart>

    <DxPivotGrid
      id="pivotgrid"
      ref="grid"
      :data-source="dataSource"
      :allow-sorting-by-summary="true"
      :allow-sorting="true"
      :allow-filtering="true"
      :show-borders="true"
      :show-column-grand-totals="true"
      :show-row-grand-totals="true"
      :show-row-totals="true"
      :show-column-totals="true"
      @exporting="onExporting"
      @cell-click="onCellClick"
    >
      <DxFieldChooser
        :enabled="true"
        :height="400"
        :allow-search="true"
      />
      <DxFieldPanel
        :show-column-fields="true"
        :show-data-fields="true"
        :show-filter-fields="true"
        :show-row-fields="true"
        :allow-field-dragging="true"
        :visible="true"
      />
      <DxExport :enabled="true"/>
    </DxPivotGrid>
      <jv-dialog
      :title="$t('Generality.Ge_Details1')"
      width="75%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
       :visible.sync="popupVisible"
      v-if="popupVisible"
      :IsShowFooterBtn="false"
    >
   <DxDataGrid
        :ref="dataGridRefName"
        :height="300"
        boeder
        :data-source="drillDownDataSource"
      >
              <DxColumn :caption="$t('systemSetupData.Project')" data-field="ToolingNo"  />
              <DxColumn :caption="$t('Generality.Ge_ToolingName')" data-field="ToolingName"  />
              <DxColumn :caption="$t('Generality.Ge_PartNo')" data-field="PartNo"  />
              <DxColumn :caption="$t('Generality.Ge_PartName')" data-field="PartName"  />
              <DxColumn :caption="$t('Generality.Ge_Describe')" data-field="Description"  />
              <DxColumn :caption="$t('Generality.Ge_TaskType')" data-field="TaskType"  />
              <DxColumn :caption="$t('Generality.Ge_CostType')" data-field="CostType"  />
              <DxColumn :caption="$t('Generality.Ge_Quantity')" data-field="Quantity"/>
              <DxColumn :caption="$t('Generality.Ge_Amount')"  data-field="Amount" data-type="number" />
      
      </DxDataGrid> 
  </jv-dialog>
  </PageWrapper>
</template>
<script>

import {
  DxChart,
  DxAdaptiveLayout,
  DxCommonSeriesSettings,
  DxSize,
  DxTooltip,
} from 'devextreme-vue/chart';

import {
  DxPivotGrid,
  DxFieldChooser,
  DxExport,
  DxFieldPanel
} from 'devextreme-vue/pivot-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { project_cost_details_list } from '@/api/workApi/project/dataReport';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source'
import { config } from './config.js';
import zhMessages from 'devextreme/localization/messages/zh.json'
import { locale, loadMessages } from 'devextreme/localization'
import { DxPopup } from 'devextreme-vue/popup';
import { projectTypeEnum,processTypeEnum,taskTypeEnum,taskStateEnum } from "@/enum/workModule";


import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
/*const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});*/

export default {
  components: {
    DxChart,
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxAdaptiveLayout,
    DxCommonSeriesSettings,
    DxSize,
    DxTooltip,
    DxPivotGrid,
    DxFieldChooser,
    DxFieldPanel,
    DxExport,
  },
  data() {
    return {
      dataSource:null,
      dataGridRefName: 'dataGrid',
      drillDownDataSource: null,
      popupTitle: '',
      popupVisible: false,
      customizeTooltip(args) {
        const valueText = currencyFormatter.format(args.originalValue);
        return {
          html: `${args.seriesName} | Total<div class='currency'>${valueText}</div>`,
        };
      },
    };
  },
  async created(){
    await  this.GetData()
    if (localStorage.lang !== 'en') {
      loadMessages(zhMessages)
      locale(navigator.language)
    }

  },
  mounted() {
    const pivotGrid = this.$refs.grid.instance;
    const chart = this.$refs.chart.instance;
    pivotGrid.bindChart(chart, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false,
    });
    const dataSource = pivotGrid.getDataSource();
    setTimeout(() => {
      dataSource.expandHeaderItem('row', ['North America']);
      dataSource.expandHeaderItem('column', [2013]);
    }, 0);


  },
  methods: {
    GetData(){
      project_cost_details_list({
        Project:this.$route.query.ProjectId,
        ToolingNo:'',
      }).then(res=>{
        console.log(res.Items)
        res.Items.forEach(item => {
                  console.log(item.TaskType)
                  item.CostType=projectTypeEnum[item.CostType].name
                  if(taskTypeEnum[item.TaskType]){
                  item.TaskType=taskTypeEnum[item.TaskType].name

                  }
          
        });
        this.dataSource = new PivotGridDataSource( {
          fields: config,
          store: res.Items
        }),
          console.log(this.dataSource.store)
      })
    },
    onCellClick(e){
      console.log(11);
       
            if (e.area === 'data') {
                      this.popupVisible=!this.popupVisible

             const pivotGridDataSource = e.component.getDataSource();
        this.drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(e.cell);
        
      
            }
      
    },
   
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Sales');

      exportPivotGrid({
        component: e.component,
        worksheet,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
        });
      });
      e.cancel = true;
    },
  },
};
</script>
<style>
  #pivotgrid {
    margin-top: 20px;
  }

  .currency {
    text-align: center;
  }
  .long-title h3 {
    font-family:
      "Segoe UI Light",
      "Helvetica Neue Light",
      "Segoe UI",
      "Helvetica Neue",
      "Trebuchet MS",
      Verdana;
    font-weight: 200;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
