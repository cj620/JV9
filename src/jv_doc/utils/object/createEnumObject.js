/*
 * @Author: C.
 * @Date: 2023-01-30 10:54:54
 */
export function createEnumObject(enums) {
  return {
    // 获取单个枚举项
    getItem(value, key = null) {
      for (const item of enums) {
        if (item[key || "value"] == value) {
          return item;
        }
      }
    },
    // 获取所需的key值集合
    getColums(key) {
      return enums.map((item) => item[key]);
    },
    // 获取单个值
    getColum(column, key, value) {
      const item = this.getItem(value, key);
      if (item) {
        // h(Tag, { color: item.color},item[column]);
        // return h(Tag, { color: item.color }, item[column]);
        return item[column];
      } else {
        return "--";
      }
    },
    // 获取label集合
    getLabels() {
      return this.getColums("label");
    },
    // 获取值集合
    getValues() {
      return this.getColums("value");
    },
    // 获取单个label
    getLabel(value, key = null) {
      return this.getColum("label", key || "value", value);
    },
    // 获取单个值
    getValue(value, key = null) {
      return this.getColum("value", key || "label", value);
    },
    // 获取原始枚举 如果enums的子项中存在引用类型 回造成无限循环
    getEnums() {
      return enums;
    },
    // 获取首个默认值
    getDefaultValue(key = "value", index = 0) {
      return enums[index][key];
    },
  };
}
