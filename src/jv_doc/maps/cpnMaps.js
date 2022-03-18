/*
 * @Author: C.
 * @Date: 2021-09-15 09:13:01
 * @LastEditTime: 2022-01-25 13:10:31
 * @Description: file content
 */
import Link from "../cpn/JvTable/cpn/Link";
import Image from "../cpn/JvTable/cpn/Image";
import BillStateTags from "@/components/WorkModule/BillStateTags";
const cpnMap = new Map();
cpnMap.set("Link", Link);
cpnMap.set("Image", Image);
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
