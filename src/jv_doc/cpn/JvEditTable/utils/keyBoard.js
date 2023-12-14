/*
 * @Author: your name
 * @Date: 2021-10-28 09:57:28
 * @LastEditTime: 2023-11-29 14:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvEditTable\utils\keyBoard.js
 */
/**
 * @description:
 * 键盘事件 上 38  右39 9 下40 13   左37
 * @param {*} e
 * @param {*} $el
 * @return {*}
 */
export function keyBoard(e, $el) {
  // console.log(e,5465465456);
  console.log($el.dom_obj.active);
  if (!$el.dom_obj.active) return;
  let _key = window.event.keyCode;
  switch (_key) {
    // tab
    case 9:
      // if(!$el.dom_obj.isFocus) return
      $el.dom_obj.move_tab();
      break;
    //  右
    case 39:
      $el.dom_obj.move_right();
      break;
    //  左
    case 37:
      $el.dom_obj.move_left();
      break;
    //  esc
    case 27:
      $el.dom_obj.editBlur();
      break;
    // 下
    case 40:
      $el.dom_obj.move_down();
      break;
    // enter
    case 13:
      $el.dom_obj.move_down();
      // $el.dom_obj.editFocus(e.key)
      break;
    //  上
    case 38:
      $el.dom_obj.move_up();
      break;
    default:
      // $el.dom_obj.editFocus(e.key)
      break;
  }
}
