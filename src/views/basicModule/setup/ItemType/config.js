/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-01 17:34:24
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import { itemTypeList } from "@/api/basicApi/systemSettings/ItemType";
// import BillState from '../../../components/Jv_cpn/JvColBillState'

export class api extends TableAPI {
  getData = itemTypeList;
}
export class Table extends BaseTable {
  constructor() {
    super( {
      tableSchema: tableConfig,
      formSchema,
      rowId: 'ItemType',
      title: '',
      api,
      stripe:false,
      border:false,
    })
  }
}

export const tableConfig = [
  {
    id: '665487545',
    prop: 'ItemType',
    label:  i18n.t("Generality.Ge_ItemType"),
    align:"left",
    innerSearch: {
      prop: 'Keyword',
      cpn: 'FormInput',
      label: '分类名称',
    }
  }
]
export const formSchema = [
  {
    prop: 'Keyword',
    label: '分类码',
    cpn: "FormInput",
  }

]
