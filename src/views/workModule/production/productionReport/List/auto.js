/*
 * @Author: C.
 * @Date: 2023-12-05 14:54:15
 */
import {
  siteMatchingProcessList,
  currentSiteList,
  inSite,
  get_process,
  upMachineCollection,
  downMachineCollection,
} from "@/api/workApi/production/productionReport";
import { productionTaskList } from "@/api/workApi/production/productionTask";
import {
  processingInspectionInSite,
  listInspectionTobechecked,
  processingInspectionQualified,
} from "@/api/workApi/quality/siteCollection";
import { currentSiteDeviceList } from "@/api/workApi/production/baseData";
import { timeFormat } from "@/jv_doc/utils/time";
// let count = 0;
function getCheckdata(BillId) {
  return new Promise((r) => {
    siteMatchingProcessList({ BillId })
      .then((res) => {
        r(res);
      })
      .catch(() => {
        r(false);
      });
  });
}
export async function autoCreate1(BillId, UserId, Count) {
  return new Promise(async (r) => {
    try {
      // const processes = await siteMatchingProcessList({ BillId });
      const processes = await getCheckdata(BillId);
      if (!processes) {
        r(true);
      }
      // 拿第一道
      const p = processes.Items[0];
      // 进站
      await inSite({
        UserId,
        TaskProcesses: [
          {
            TaskProcessId: p.Id,
            Quantity: p.Quantity,
          },
        ],
      });
      console.log("进站成功··");
      // process 获取工序列表
      const process_list = await currentSiteList({ SelectType: 1 });
      const p2 = process_list.Items[0];
      // 获取当前的设备
      const machine_list = await currentSiteDeviceList({ Process: p2.Process });
      const ms = machine_list.Items[0];
      // 上机
      await upMachineCollection({
        Bills: [
          {
            BillId,
            Quantity: p2.Quantity,
          },
        ],
        DeviceNo: ms.DeviceNo,
        UserId,
      });
      console.log("上机成功··");
      // 下机
      const process3_list = await currentSiteList({ SelectType: 2, UserId });
      const p3 = process3_list.Items[0];
      await setTimeout(() => {}, 1000);
      await downMachineCollection({
        DownMachineCollectionItem: [
          {
            TaskProcessId: p3.Id,
            DeviceNo: ms.DeviceNo,
          },
        ],
        EndDate: timeFormat(
          new Date(new Date().getTime() + 9 * 60 * 1000),
          "yyyy-MM-dd hh:mm:ss"
        ),
        IsSuspend: false,
        UserId,
      });
      console.log("下机成功··");
      // 检验列表
      // const checkList = await listInspectionTobechecked({
      //   CurrentPage: 1,
      //   PageSize: 10,
      //   UserId,
      // });
      // const IdList = checkList.Items.map((item) => item.Id);
      //检验
      // await processingInspectionQualified({ Ids: IdList });
      await processingInspectionInSite({ BillIds: [BillId], UserId });
      console.log("检验成功··", BillId);
      setTimeout(() => {
        autoCreate(BillId, UserId, Count);
      }, 1000);
    } catch (error) {
      r(true);
    }
  });
}
export async function autoCreate(BillId, UserId) {
  const list = await productionTaskList({
    CurrentPage: 1,
    PageSize: 99,
    Keyword: BillId,
    States: ["ToBeProcessed", "Processing"],
  });
  var scheduler = new Scheduler();
  list.Items.forEach((item) => {
    // console.log(item.BillId);
    item.Process.forEach((v) => {
      // ToBeReceived
      if (v.State == "ToBeReceived" || v.State == "Processing") {
        console.log(item.BillId);
        scheduler.add(() => autoCreate2(item.BillId, "mt-001"));
        // console.log(v.Process);
      }
    });
  });
  scheduler.taskStart();
}
export async function autoCreate2(BillId, UserId, Count) {
  return new Promise(async (r) => {
    const processes = await siteMatchingProcessList({ BillId });
    // 拿第一道
    const p = processes.Items[0];
    // 进站
    await inSite({
      UserId,
      TaskProcesses: [
        {
          TaskProcessId: p.Id,
          Quantity: p.Quantity,
        },
      ],
    });
    console.log("进站成功··");
    // process 获取工序列表
    const process_list = await currentSiteList({ SelectType: 1 });
    const p2 = process_list.Items[0];
    // 获取当前的设备
    const machine_list = await currentSiteDeviceList({ Process: p2.Process });
    const ms = machine_list.Items[0];
    // 上机
    await upMachineCollection({
      Bills: [
        {
          BillId,
          Quantity: p2.Quantity,
        },
      ],
      DeviceNo: ms.DeviceNo,
      UserId,
    });
    console.log("上机成功··");
    // 下机
    const process3_list = await currentSiteList({ SelectType: 2, UserId });
    const p3 = process3_list.Items[0];
    await setTimeout(() => {}, 1000);
    await downMachineCollection({
      DownMachineCollectionItem: [
        {
          TaskProcessId: p3.Id,
          DeviceNo: ms.DeviceNo,
        },
      ],
      EndDate: timeFormat(
        new Date(new Date().getTime() + 9 * 60 * 1000),
        "yyyy-MM-dd hh:mm:ss"
      ),
      IsSuspend: false,
      UserId,
    });
    console.log("下机成功··");

    await processingInspectionInSite({ BillIds: [BillId], UserId });
    // 检验列表
    const checkList = await listInspectionTobechecked({
      CurrentPage: 1,
      PageSize: 10,
      UserId,
    });
    const IdList = checkList.Items.map((item) => item.Id);
    //检验
    await processingInspectionQualified({ Ids: IdList[0] });
    console.log("检验成功··", BillId);
    r(true);
  });
}
function Scheduler() {
  this.list = [];
  this.add = function (promiseCreator) {
    this.list.push(promiseCreator);
  };

  this.maxCount = 1;

  var tempRunIndex = 0;

  this.taskStart = function () {
    console.log(this.list);
    // for (var i = 0; i < this.maxCount; i++) {
    //   request.bind(this)();
    // }
    sequencePromise(this.list);
  };

  function sequencePromise(arr) {
    const pro = arr.shift();
    if (pro) {
      pro().then(() => {
        setTimeout(() => {
          sequencePromise(arr);
        }, 500);
      });
    }
  }

  function request() {
    if (!this.list || !this.list.length || tempRunIndex >= this.maxCount) {
      return;
    }

    tempRunIndex++;
    this.list
      .shift()()
      .then(() => {
        tempRunIndex--;
        request.bind(this)();
      });
  }
}
export async function batchCreate11(mBill) {
  const list = await productionTaskList({
    ToolingNo: mBill,
    CurrentPage: 1,
    PageSize: 99,
    States: ["ToBeProcessed", "Processing"],
  });
  var scheduler = new Scheduler();
  list.Items.forEach((item) => {
    scheduler.add(() => autoCreate(item.BillId, "mt-001", 999));
  });
  scheduler.taskStart();
}
export async function batchCreate(mBill) {
  const list = await productionTaskList({
    ToolingNo: mBill,
    CurrentPage: 1,
    PageSize: 99,
    States: ["ToBeProcessed", "Processing"],
  });
  var scheduler = new Scheduler();
  list.Items.forEach((item) => {
    // console.log(item.BillId);
    item.Process.forEach((v) => {
      // ToBeReceived
      if (v.State == "ToBeReceived" || v.State == "Processing") {
        console.log(item.BillId);
        scheduler.add(() => autoCreate2(item.BillId, "mt-001"));
        // console.log(v.Process);
      }
    });
  });
  scheduler.taskStart();
}
