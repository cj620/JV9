<!--
 * @Author: C.
 * @Date: 2021-07-27 16:53:31
 * @LastEditTime: 2024-05-22 14:58:53
 * @Description: file content
-->
<template>
  <div class="font-set">
    <el-form label-width="80px" label-position="left">
      <div class="field-detail">
        <el-form-item :label="$t('Generality.Ge_FieldDescription')">
          <el-input v-model="currentNode.label" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_BindField')">
          <el-input
            v-model="currentNode.prop"
            :disabled="currentNode.role == 'label'"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('Generality.Ge_Prefix')"
          v-if="['qrcode'].includes(currentNode.role)"
        >
          <el-input
            v-model="currentNode.options.prefix"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_Format')">
          <el-select
            v-model="currentNode.filter"
            :placeholder="$t('Generality.Ge_ChooseFormatType')"
            :disabled="currentNode.role != 'value'"
            @change="formatSelect"
          >
            <el-option
              v-for="item in filterEnums"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('Generality.Ge_DateFormat')"
          v-if="currentNode.filter == 'date'"
        >
          <el-input
            v-model="currentNode.filterOptions"
            style="width: 80%"
            @change="inputChange"
          ></el-input>
          <el-tooltip
            style="margin-left: 10px; font-size: 16px"
            effect="dark"
            content="yyyy-MM-dd hh:mm:ss （y=年，M=月，d=天，h=小时，m=分，s=秒，q=季度）"
            placement="top-end"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="图片宽度" v-if="currentNode.filter == 'image'">
          <el-input
            v-model="currentNode.filterOptions"
            style="width: 80%"
            @change="inputChange"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="枚举类型" v-if="currentNode.filter == 'bizMap'">
          <el-select v-model="currentNode.filterOptions">
            <el-option
              v-for="item in enumMap"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item :label="$t('Generality.Ge_Font')" class="font-size-style">
        <el-input-number
          v-model="currentNode.style.fontSize"
          controls-position="right"
          :min="12"
          :max="33"
        ></el-input-number>
      </el-form-item>

      <el-form-item :label="$t('Generality.Ge_Alignment')">
        <el-radio-group
          v-model="currentNode.style.textAlign"
          size="mini"
          :disabled="!currentNode.id"
        >
          <el-radio-button
            v-for="alignType in alignArr"
            :label="alignType.value"
            :key="alignType.label"
          >
            {{ alignType.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('setup.Bold')">
        <el-radio-group
          v-model="currentNode.style.fontWeight"
          size="mini"
          :disabled="!currentNode.id"
        >
          <el-radio-button
            v-for="boldType in boldArr"
            :label="boldType.value"
            :key="boldType.label"
          >
            {{ boldType.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alignArr, boldArr, filterEnums } from "../../../../enums";
import { enumMap } from "@/enum/index";
export default {
  data() {
    return {
      alignArr,
      boldArr,
      filterEnums,
      enumMap,
    };
  },
  methods: {
    formatSelect(e) {
      // console.log(e,798764654);
      if (e == "date") {
        if (!this.currentNode.filterOptions) {
          this.currentNode.filterOptions = "yyyy-MM-dd";
        }
      }
    },
    inputChange(e) {
      this.currentNode.filterOptions = e;
    },
  },
  computed: {
    ...mapState({
      currentNode: (state) => state.print.currentNode,
    }),
    fontOpt() {
      return Array.from({ length: 30 }, (x, i) => i + 7);
    },
  },
};
</script>

<style lang="scss">
@import "../../../../style/print-edit.scss";
</style>
