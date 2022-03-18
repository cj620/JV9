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

/*const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});*/

export default {
  components: {
    DxChart,
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
        Project:'比亚迪汉',
        ToolingNo:'',
      }).then(res=>{
        console.log(res.Items)
        this.dataSource = new PivotGridDataSource( {
          fields: config,
          store: res.Items
        }),
        console.log(this.dataSource.store)
      })
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
