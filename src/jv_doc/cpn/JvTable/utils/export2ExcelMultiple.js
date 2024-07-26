import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export function export2ExcelMultiple(exportObj, callBack) {
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
  } = exportObj;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // 设置多级表头
  const multiHeaderRow = worksheet.addRow(multiHeaders);
  // 设置表头
  const headerRow = worksheet.addRow(headers);

  // 设置多级表头和表头的样式
  [multiHeaderRow, headerRow].forEach(row => {
    row.eachCell(cell => {
      cell.alignment = { vertical: 'middle' };
      cell.font = { bold: true }; // 文字加粗
    });
  });

  // 设置多级表头和表头的行高
  multiHeaderRow.height = 30; // 自定义行高，可以根据需要调整
  headerRow.height = 30;

  // 设置合并单元格
  merges.forEach(merge => {
    const [start, end] = merge.split(':');
    worksheet.mergeCells(start, end);
  });

  // 添加数据
  checkData.forEach(item => {
    const row = propName.map(prop => item[prop]);
    worksheet.addRow(row).eachCell(cell => {
      cell.alignment = { vertical: 'middle' };
    });
  });

  // 自适应列宽（除开第一列）
  worksheet.columns.forEach((column, index) => {
    if (index === 0) return; // 跳过第一列
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, cell => {
      const cellValue = cell.value ? cell.value.toString() : '';
      maxLength = Math.max(maxLength, cellValue.length);
    });
    column.width = maxLength + 2; // 添加一些缓冲
  });

  // 设置单元格宽度和行高
  const imageCellWidth = 8; // 单元格宽度，单位为字符宽度
  const imageCellHeight = 25; // 单元格高度，单位为像素
  worksheet.getColumn(1).width = imageCellWidth;

  checkData.forEach((item, index) => {
    const rowIndex = index + 3; // 数据行的索引
    worksheet.getRow(rowIndex).height = imageCellHeight / 0.75; // 行高，单位为磅（1磅 ≈ 0.75像素）

    if (item.PhotoUrl) {
      const imageId = workbook.addImage({
        base64: item.PhotoUrl,
        extension: 'png',
      });

      // 插入图片，适应单元格大小
      worksheet.addImage(imageId, {
        tl: { col: 0, row: rowIndex - 1 }, // 图片插入的位置（注意索引从0开始）
        ext: { width: imageCellWidth * 8, height: imageCellHeight * 1.6 }, // 单元格宽度乘以6，得到像素宽度（1字符宽度 ≈ 6像素）
        editAs: 'oneCell', // 使图片适应单元格大小
      });

      // 清除图片单元格的内容
      worksheet.getCell(rowIndex, 1).value = null;
    }
  });

  // 导出Excel文件
  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.${saveType}`);
    callBack();
  });
}
