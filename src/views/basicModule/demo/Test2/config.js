export const config = [ {
  caption: '模具',
    dataField: 'ToolingNo',
    width: 150,
    area: 'row',
},
  {
    caption: '任务编号',
    dataField: 'BillId',
    width: 150,
    area: 'row',
  },{
    caption: '任务类别',
    dataField: 'TaskType',
    width: 150,

    area: 'row',
  },
  {
    caption: '成本类别',
    dataField: 'CostType',
    width: 150,
    area: 'row',
  },
  {
    caption: '数量',
    dataField: 'Quantity',
    width: 150,
  },
  {
    caption: '模具名称',
    dataField: 'ToolingName',
    width: 150,
  },
  {
    caption: '工序',
    dataField: 'Process',
    width: 150,
    area: 'column',
  },
  {
  caption: '金额',
    dataField: 'Amount',
    dataType: 'number',
    summaryType: 'sum',
    area: 'data',
    format: {
      precision: 4
    },
}
]
