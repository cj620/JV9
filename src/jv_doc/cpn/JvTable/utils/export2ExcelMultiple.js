export function export2ExcelMultiple (exportObj, callBack) {
  let {
    // 文件名
    fileName,
    // 保存类型
    saveType,
    // 数据源
    checkData,
    // 多级表头
    multiHeaders,
    // 表头
    headers,
    // 属性名
    propName,
    // 合并单元格
    merges,
  } = exportObj
  import('@/vendor/Export2Excel').then(excel => {
    let data = extractValues(checkData, propName)
    excel.export_json_to_excel({
      multiHeader: [multiHeaders],
      header: headers,
      data,
      filename: fileName,
      merges: merges,
      autoWidth: true,
      bookType: saveType,
    })
    callBack()
  })
}

function extractValues(items, properties) {
  return items.map(item => properties.map(prop => item[prop]));
}
