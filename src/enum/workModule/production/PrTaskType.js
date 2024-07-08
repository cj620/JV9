/*
 * @Author: C.
 * @Date: 2024-07-05 14:22:28
 */
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";

export const PrTaskType = createEnumObject([
  { label: "生产任务", value: "Make" },
  { label: "设计任务", value: "Devise" },
  { label: "项目任务", value: "Others" },
  { label: "编程任务", value: "Program" },
  { label: "试模任务", value: "TryOut" },
]);
