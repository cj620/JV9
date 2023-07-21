/*
 * @Author: C.
 * @Date: 2021-09-15 09:13:01
 * @LastEditTime: 2023-07-19 10:50:48
 * @Description: file content
 */
import Link from "../cpn/JvTable/cpn/Link";
import Image from "../cpn/JvTable/cpn/Image";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import ImageList from "../cpn/JvTable/cpn/ImageList";
const cpnMap = new Map();
cpnMap.set("Link", Link);
cpnMap.set("Image", Image);
cpnMap.set("ImageList", ImageList);
cpnMap.set("BillStateTags", BillStateTags);

export function setCpn(compName, component) {
  cpnMap.set(compName, component);
}

export function delCpn(compName) {
  cpnMap.delete(compName);
}
export function getCpn(compName) {
  return cpnMap.get(compName);
}
