export const tableConfig = [
  // 生产任务单号
  {
    prop: 'BillId',
    label: i18n.t('production.Pr_TaskBillId'),
  },
  {
    prop: 'ToolingNo',
    label: i18n.t('Generality.Ge_ToolingNo'),
  },
  {
    prop: 'ToolingName',
    label: i18n.t('Generality.Ge_ToolingName'),
  },
  {
    prop: 'BelongingDepartment',
    label: i18n.t('Generality.Ge_Department'),
  },
  {
    prop: 'Worker',
    label: i18n.t('project.Pro_Worker'),
  },
  {
    prop: 'Progress',
    label: i18n.t('Generality.Ge_Schedule'),
    custom: true,
  },
  {
    prop: 'State',
    label: i18n.t('Generality.Ge_State'),
    custom: true,
  },
  {
    prop: 'Completeness',
    label: i18n.t('production.Pr_CompleteState'),
    custom: true,
  },
]
export const detailConfig = [
  {
    prop: 'BillId',
    label: i18n.t('Generality.Ge_BillId'),
  },
  {
    prop: 'ToolingNo',
    label: i18n.t('Generality.Ge_ToolingNo'),
  },
  {
    prop: 'PartNo',
    label: i18n.t('Generality.Ge_PartNo'),
  },
  {
    prop: 'PartName',
    label: i18n.t('Generality.Ge_PartName'),
  },
  {
    prop: 'PartInfo',
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    prop: 'Quantity',
    label: i18n.t('Generality.Ge_Quantity')
  },
  {
    prop: 'Progress',
    label: i18n.t('Generality.Ge_Schedule'),
    custom: true,
  },
  {
    prop: 'Level',
    label: i18n.t('Generality.Ge_Level'),
    custom: true,
  },
  {
    prop: 'State',
    label: i18n.t('Generality.Ge_State'),
    custom: true,
  },
]
