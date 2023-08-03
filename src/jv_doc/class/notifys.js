/*
 * @Author: C.
 * @Date: 2023-08-02 11:48:36
 */
import {
  user_notification_list,
  mark_as_read,
} from "@/api/basicApi/systemSettings/notification";
import { msgEnum, MsgTypeEnum } from "@/enum/baseModule/msgEnum";
export class Notifys {
  data = [];
  value = "";
  label = "";
  SelectType = 0;
  PageSize = 10;
  // 当前页
  CurrentPage = 1;
  Total = 0;
  constructor(NotificationType = MsgTypeEnum.NOTICE) {
    this.value = NotificationType;
    this.label = msgEnum.getLabel(NotificationType);
  }
  getData = async () => {
    this.CurrentPage = 1;
    let data = await user_notification_list({
      // 分页参数
      PageSize: this.PageSize,
      // 当前页
      CurrentPage: 1,
      NotificationType: this.value,
      SelectType: this.SelectType,
    });
    this.data = data.Items;
    this.Total = data.Count;
  };
  nextPage = async () => {
    if (this.isLast()) return;
    this.CurrentPage += 1;
    let data = await user_notification_list({
      // 分页参数
      PageSize: this.PageSize,
      // 当前页
      CurrentPage: this.CurrentPage,
      NotificationType: this.value,
      SelectType: this.SelectType,
    });
    this.data = [...this.data, ...data.Items];
    this.Total = data.Count;
  };
  isLast = () => {
    return this.CurrentPage * this.PageSize >= this.Total;
  };
  changeSelectType = (type) => {
    this.SelectType = type;
  };
  // 一键全部已读
  markAllRead = async () => {
    await mark_as_read({
      NotificationType: this.value,
      OneClickRead: true,
    });
    this.getData();
  };
}
