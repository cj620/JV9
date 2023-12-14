import { find_right_col, find_left_col } from "../utils/editTableHelp";
class CellDom {
  col = 0;
  row = 0;
  tableId;
  prop = "";
  offSet = 0;
  // 数据条数
  dataCount = 0;
  type = "s";
  propsArr = [];
  tableData = [];
  disabledArr = [];
  disabledPropsArr = [];
  // 对前一个移动位置进行缓存
  o_col = null;
  o_row = null;
  // 当前状态
  isFocus = false;
  // 组件激活状态
  active = false;
  cursorPosStart = 0;
  cursorPosEnd = 0.1;
  currentInputDom = null;
  inputSelected = false;
  // 向左移动
  move_left = () => {
    this.getPosition();
    if (this.inputSelected) {
      this.inputSelected = false;
      return;
    }
    if (this.cursorPosStart !== 1 && this.cursorPosEnd > 1) return;
    // if(this.cursorPosStart==0){

    // }

    // console.log(this.offSet,444444444);
    // 如果到边界 则停止移动
    if (this.col - this.offSet <= 0) return;
    // 失去焦点
    this.editBlur();
    // 找到可编辑的下一列
    let nextCol = find_left_col(this.disabledArr, this.col);
    if (nextCol < 0) {
      // if(this.col-this.offSet<=0)
      return;
    }
    this.col = nextCol;
    // 给上一个兄弟节点添加聚焦效果
    this.editFocus();
  };
  move_tab = () => {
    // 7 7
    // if(this.col-this.offSet>this.propsArr.length-1) return
    this.editBlur();
    // [0,1,2,4,8] 7
    let nextCol = find_right_col(this.disabledArr, this.col);
    if (nextCol - this.offSet >= this.propsArr.length) {
      if (this.row >= this.dataCount - 1) return;
      this.row += 1;
      nextCol = find_right_col(this.disabledArr, -1);
    }

    this.col = nextCol;
    this.editFocus();
  };
  // 向右移动
  move_right = () => {
    this.getPosition();
    if (this.cursorPosStart < this.cursorPosEnd) return;
    let nextCol = find_right_col(this.disabledArr, this.col);
    if (nextCol - this.offSet >= this.propsArr.length) return;
    this.editBlur();
    this.col = nextCol;
    this.editFocus();
  };
  // 向上移动
  move_up = () => {
    if (this.row <= 0) return;
    this.editBlur();
    this.row -= 1;
    this.editFocus();
  };
  // 向下移动
  move_down = () => {
    if (this.row >= this.dataCount - 1) return;
    this.editBlur();
    this.row += 1;
    this.editFocus();
  };
  editFocus = () => {
    // 校验前面的单元格 是否已经关闭编辑框
    this.o_editBlur();
    setTimeout(() => {
      let propName = this.propsArr[this.col - this.offSet];
      this.tableData[this.row][propName].edit = true;
      this.isFocus = true;
      setTimeout(() => {
        this.currentInputDom = document.getElementById("edit-form-item");
        this.currentInputDom?.focus();
        this.currentInputDom?.select();
        this.inputSelected = true;
        this.o_col = this.col;
        this.o_row = this.row;
      });
    });
    // console.log(this,777);
  };
  editBlur = () => {
    this.borderBlur();
    let propName = this.propsArr[this.col - this.offSet];
    if (this.tableData[this.row][propName].edit) {
      this.tableData[this.row][propName].edit = false;
      this.isFocus = false;
    }
  };
  borderBlur = () => {
    // console.log(this.tableId);
    let cell = document
      .getElementById(this.tableId)
      ?.getElementsByClassName("el-table__row")?.[this.row]?.children?.[
      this.col
    ];
    if (cell && cell.style) {
      cell.style = "";
    }
  };
  // 校验前面的单元格 是否已经关闭编辑框 否则关闭
  o_editBlur = () => {
    if (this.o_row == this.row && this.o_col == this.col) return;
    let propName = this.propsArr[this.o_col - this.offSet];
    if (this.tableData?.[this.o_row]?.[propName]?.edit) {
      this.tableData[this.o_row][propName].edit = false;
    }
  };
  // 光标位置
  getPosition = () => {
    let cursorPos1 = 0;
    let cursorPos2 = 10;
    const element = this.currentInputDom;

    if (document.selection) {
      //IE
      var selectRange = document.selection.createRange();
      selectRange.moveStart("character", -element.value.length);
      cursorPos1 = selectRange.text.length;
    } else if (element.selectionStart || element.selectionStart == "0") {
      cursorPos1 = element.selectionStart;
      cursorPos2 = element.value.length;
    }
    this.cursorPosStart = cursorPos1 + 1;
    this.cursorPosEnd = cursorPos2 + 1;
    console.log(cursorPos1, cursorPos2, this.active, "element");
  };
}
export default CellDom;
