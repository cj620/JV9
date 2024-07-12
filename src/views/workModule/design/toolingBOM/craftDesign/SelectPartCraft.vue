<template>
  <div>
    <jv-dialog
      title="选择零件工艺"
      width="70%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmMaterial"
    >
      <div style="margin: 5px 10px">
        零件号:
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入零件号"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="GetData"
        >
          <el-option
            v-for="item in options"
            :key="item.PartNo"
            :label="item.PartNo"
            :value="item.PartNo"
          >
          </el-option>
        </el-select>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <template #ProcessContent="{ row }">
          <el-select
            v-model="row.customData.value"
            style="width: 100%"
            multiple
            filterable
            allow-create
            default-first-option
            @visible-change="changeValue($event, row)"
          >
            <el-option
              v-for="item in row.ProcessContentList.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #IsCompulsoryInspection="{ row }">
          <el-checkbox v-model="row.IsCompulsoryInspection.value"></el-checkbox>
        </template>
        <!-- <template #ProcessPicture="{ row }">
          <div @click="addProcessPicture(row)">
            {{ $t("Generality.Ge_New") }}
          </div>
        </template> -->
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </jv-dialog>
  </div>
</template>

<script>
import i18n from "@/i18n/i18n";
import { EditTable } from "./editConfig";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import { bomList } from "@/api/workApi/design/toolingBOM";
import {
  getPartProcess,
  savePartProcess,
} from "@/api/workApi/design/toolingBOM";
export default {
  name: "index",
  data() {
    return {
      ItemsDialogFormVisible: true,
      // 表格数据
      eTableObj: {},
      BillItems: {
        Id: 0,
        BillGui: "",
        Process: "",
        PlanTime: 1,
        ProcessContent: "",
        Resource: "",
        ProgramingProcess: "",
        Remarks: "",
        ProgramingPlanTime: 1,
        ProcessPicture: [],
        customData: [],
        ProcessContentList: [],
        IsCompulsoryInspection: false,
      },
      options: [],
      value: [],
      list: [],
      loading: false,
    };
  },
  props: {},
  created() {
    this.eTableObj = new EditTable({ chooseCol: false, height: 400 });
  },

  methods: {
    GetData() {
      getPartProcess({ PartNo: this.value }).then((res) => {
        if (res.ProcessList.length > 0) {
          res.ProcessList.forEach((item) => {
            if (item.ProcessContent !== "") {
              item.customData = item.ProcessContent.split(",");
            }
          });
          this.eTableObj.push(temMerge(this.BillItems, res.ProcessList));
        } else {
          this.eTableObj.reset();
        }
      });
    },
    //选择工序
    addProcess() {
      this.ProcessDialogFormVisible = true;
    },

    //删除工序
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        //   this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
        // this.options
        const data = await bomList({
          Keyword: query,
          PageSize: 20,
          CurrentPage: 1,
          BOMType: "Part",
        });
        this.options = data.Items;
        this.loading = false;
      } else {
        this.options = [];
      }
    },
    confirmMaterial() {
      // console.log(this.eTableObj.getTableData());
      const data = this.eTableObj.getTableData();
      this.$emit("confirm", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
