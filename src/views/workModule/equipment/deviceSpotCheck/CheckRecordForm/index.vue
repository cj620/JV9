<template>
  <div class="check-table-wrapper">
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item label="模板名称">
        <el-select
          filterable
          placeholder="请选择"
          @change="temChange"
          v-model="PlanName"
        >
          <el-option
            v-for="item in planList"
            :key="item.BillGui"
            :label="item.PlanName"
            :value="item.BillGui"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称">
        <!-- <el-input
          v-model="formInline.DeviceNo"
          placeholder="设备名称"
        ></el-input> -->
        <el-select
          v-model="formInline.DeviceNo"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.DeviceNo"
            :label="item.DeviceName"
            :value="item.DeviceNo"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点检日期">
        <el-date-picker
          v-model="StartDate"
          type="month"
          placeholder="选择月"
          @change="dateChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <template v-if="isLoaded">
      <table>
        <tr style="background-color: #f2f2f2">
          <td colspan="2">设备名称</td>
          <td colspan="2">
            <span class="tag">{{ Details.DeviceName }}</span>
          </td>
          <td colspan="2">设备编号</td>
          <td colspan="2">
            <span class="tag">{{ Details.DeviceNo }}</span>
          </td>

          <td colspan="2">表单编号</td>
          <td colspan="99" style="text-align: left">
            {{ formInline.PlanName }}
          </td>
        </tr>

        <tr style="background-color: #f2f2f2">
          <td>点检内容</td>
          <td>点检标准</td>
          <td
            v-for="(item, index) in Details.SpotCheckItems[0].DaysCheck"
            :key="index"
          >
            {{ index + 1 }}
          </td>
        </tr>

        <tr v-for="(item, index) in Details.SpotCheckItems" :key="item">
          <td style="text-align: left; min-width: 300px">
            {{ index + 1 }}. {{ item.SpotCheckContent }}
          </td>
          <td style="text-align: left; min-width: 200px"></td>
          <template v-for="col in item.DaysCheck">
            <td>{{ col.SpotCheckResult }}</td>
          </template>
        </tr>

        <tr>
          <td colspan="2">点检人</td>
          <template v-for="item in Details.SpotCheckItems[0].DaysCheck">
            <td>{{ item.RoleName }}</td>
          </template>
        </tr>
        <!-- <tr>
        <td colspan="2">审核人员</td>
        <template v-for="item in Details.SpotCheckItems[0].DaysCheck">
          <td>{{ item.Auditor }}</td>
        </template>
      </tr> -->
      </table>
      <p>
        注："✔":已点检; "⭕":系统生成了点检任务但未点检;
        "✖️":完成点检任务但有异常; "⚪":表示节假日;
      </p>
    </template>
    <el-empty description="描述文字" v-else></el-empty>
  </div>
</template>
<script>
import { assets_device_spot_check_day_records } from "@/api/workApi/equipment/spotCheck";
import {
  assets_device_spot_check_plan_list,
  assets_device_spot_check_plan_get,
} from "@/api/workApi/equipment/spotCheckPlan";
export default {
  components: {},
  data() {
    return {
      PlanName: "",
      formObj: {},
      StartDate: new Date(),
      formInline: {
        PlanName: "",
        DeviceNo: "",
        StartDate: "",
        EndDate: "",
      },
      planList: [],
      deviceList: [],
      // ✔/
      Details: {
        DeviceNo: "",
        DeviceName: "",
        SpotCheckItems: new Array(1).fill({
          SpotCheckContent: "",
          CheckStandard: "",
          DaysCheck: [],
        }),
      },
      isLoaded: false,
    };
  },
  created() {
    this.dateChange(new Date());
    this.getPlanList();
  },
  methods: {
    onSubmit() {
      const { PlanName, DeviceNo, StartDate } = this.formInline;
      let str = undefined;
      if (!PlanName) {
        str = "请先填写模板名称！";
      }
      if (!DeviceNo) {
        str = "请先填写设备！";
      }
      if (!StartDate) {
        str = "请先填写点检月份！";
      }
      if (str) {
        this.$message({
          type: "warning",
          message: str,
        });
      } else {
        this.getData();
      }
    },
    async getData() {
      const data = await assets_device_spot_check_day_records(this.formInline);
      if (data.length > 0) {
        this.isLoaded = true;
      } else {
        this.isLoaded = false;
        return;
      }

      this.Details = this.transformData(data);

      // console.log(this.transformData(data), "datadatadata");
    },
    transformData(datas) {
      let res = {};
      const piece = datas[0];
      res.DeviceNo = piece.DeviceNo;
      res.DeviceName = piece.DeviceName;
      res.SpotCheckItems = [];
      const SpotCheckMap = {};

      datas.forEach((item) => {
        if (SpotCheckMap[item.SpotCheckContent]) {
          SpotCheckMap[item.SpotCheckContent].push(item);
        } else {
          SpotCheckMap[item.SpotCheckContent] = [item];
        }
      });
      for (const key in SpotCheckMap) {
        res.SpotCheckItems.push({
          SpotCheckContent: key,
          CheckStandard: "",
          // timeFormat
          DaysCheck: this.handleDays(SpotCheckMap[key]),
        });
      }
      return res;
    },
    handleDays(arr) {
      const piece = arr[0];
      const count = this.getDaysInMonth(piece.ShouldBeginTime);
      let datas = arr.map((item) => {
        return {
          ...item,
          day: new Date(item.ShouldBeginTime).getDate(),
          // Verified ToBeInspected State
          SpotCheckResult: this.handleCheckState(item),
        };
      });
      const res = [...datas];
      const dayArr = datas.map((item) => item.day);
      for (let i = 1; i <= count; i++) {
        if (i > Math.max(...dayArr)) {
          res.push({
            ...piece,
            day: i,
            SpotCheckResult: "",
          });
        }
        if (!dayArr.includes(i) && i < Math.max(...dayArr)) {
          res.push({
            ...piece,
            day: i,
            SpotCheckResult: "⚪",
          });
        }
      }
      return res.sort((x, y) => x.day - y.day);
    },
    getDaysInMonth(date) {
      date = new Date(date);
      // date 参数是一个 Date 对象
      // 获取年份和月份
      var year = date.getFullYear();
      var month = date.getMonth();

      // 设置为下个月的第一天，然后减去一天，得到这个月的最后一天
      // 然后使用 getDate() 方法获取这个月的天数
      return new Date(year, month + 1, 0).getDate();
    },
    async getPlanList() {
      const { Items } = await assets_device_spot_check_plan_list({
        PageSize: 99,
        CurrentPage: 1,
      });
      this.planList = Items;
    },
    getFirstAndLastDayOfMonth(givenDate) {
      let date = new Date(givenDate.getTime());

      // 将日期设置为这个月的第一天
      date.setDate(1);
      let firstDayOfMonth = new Date(date.getTime());

      // 计算下个月的第一天
      // 月份加1，日期设置为1
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
      let lastDayOfMonth = date;

      return { firstDayOfMonth, lastDayOfMonth };
    },

    async getDeviceList(BillId) {
      // DCP240416001
      const { BillMembers } = await assets_device_spot_check_plan_get({
        BillId,
      });
      console.log(BillMembers);
      this.deviceList = BillMembers;
    },
    temChange(e) {
      const target = this.planList.find((item) => {
        return item.BillGui == e;
      });
      this.formInline.PlanName = target.PlanName;
      this.formInline.DeviceNo = "";
      this.getDeviceList(target.BillId);
    },
    dateChange(e) {
      const { firstDayOfMonth, lastDayOfMonth } =
        this.getFirstAndLastDayOfMonth(e);
      this.formInline.StartDate = firstDayOfMonth;
      this.formInline.EndDate = lastDayOfMonth;
      console.log(e, "dateChangedateChange");
    },
    handleCheckState(data) {
      // Verified ToBeInspected State
      // item.SpotCheckResult == "Normal" ? "✔" : "⭕"
      const { SpotCheckResult, State } = data;
      if (State == "ToBeInspected") {
        return "⭕";
      }
      return SpotCheckResult == "Normal" ? "✔" : "✖️";
    },
  },
};
</script>
<style lang="scss">
.check-table-wrapper {
  width: 100%;
  overflow: auto;
  padding: 12px;
  background-color: #fff;
  height: calc(100vh - 100px);
  table {
    width: 100%;
    /* height: 100%; */
    border-collapse: collapse;
  }
  table,
  th,
  td {
    border: 1px solid #ddd;
    min-width: 50px;
    font-size: 15px;
  }
  th,
  td {
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .tag {
    display: inline-block;
    margin: 2px;
    padding: 5px;
    background-color: #e1e1e1;
    border-radius: 3px;
  }
}
</style>
