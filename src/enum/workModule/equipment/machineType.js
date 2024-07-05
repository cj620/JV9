/*
 * @Author: C.
 * @Date: 2024-07-05 14:22:28
 */
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";
export const MachineType = createEnumObject([
  { label: "其他设备", value: "1" },
  { label: "牧野电火花", value: "2" },
  { label: "迪蒙电火花", value: "3" },
  { label: "海克斯康三坐标", value: "4" },
  { label: "RationalDMIS三坐标", value: "5" },
  { label: "沙迪克电火花", value: "6" },
  { label: "沙迪克电火花Q系列", value: "7" },
  { label: "三菱电火花", value: "8" },
  { label: "三菱电火花EA8", value: "9" },
  { label: "三菱电火花EA12", value: "10" },
  { label: "三菱电火花加工条件", value: "11" },
  { label: "温泽CM三坐标", value: "12" },
  { label: "群基火花机", value: "13" },
  { label: "GF阿奇夏米尔EDM", value: "14" },
  { label: "三丰三坐标", value: "15" },
  { label: "汉霸火花机", value: "16" },
  { label: "庆鸿火花机", value: "17" },
  { label: "亿耀火花机", value: "18" },
  { label: "茗亚火花机", value: "19" },
  { label: "蔡司三坐标", value: "20" },
  { label: "温泽Quartis三坐标", value: "21" },
  { label: "OPS电火花", value: "22" },
  { label: "OPS电火花条件", value: "23" },
  { label: "GF阿奇夏米尔旧EDM", value: "24" },
  { label: "GF阿奇夏米尔新EDM", value: "25" },
  { label: "爱德华三坐标", value: "26" },
  { label: "新牧野电火花", value: "27" },
  { label: "GF阿奇夏米尔旧EDM35", value: "28" },
  { label: "GF阿奇夏米尔Vision EDM", value: "29" },
  { label: "大韩火花机", value: "30" },
  { label: "汉霸新火花机", value: "31" },
  { label: "大韩火花机旧款", value: "32" },
]);

export const EquipmenType = createEnumObject([
  {
    label: "加工设备",
    value: "0",
  },
  {
    label: "加工设备",
    value: "1",
  },
]);
