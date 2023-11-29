import i18n from '@/i18n/i18n'

export const planTypeEnum = {
  //   点检
  SpotCheck: {
    name: '点检',
    value: "SpotCheck",
  },
  //   点检
  PatrolInspection: {
    name: '巡检',
    value: "PatrolInspection",
  }
}
export const SpotCheckTypeEnum = {
  //   日检
  DayCheck: {
    name: '日检',
    value: "DayCheck",
  },
  //   周检
  WeekCheck: {
    name: '周检',
    value: "WeekCheck",
  },
  //   月检
  MonthCheck: {
    name: '月检',
    value: "MonthCheck",
  },
  //   季检
  QuarterlyCheck: {
    name: '季检',
    value: "QuarterlyCheck",
  },
  //   年检
  YearCheck: {
    name: '年检',
    value: "YearCheck",
  },
}
export const spotCheckStateEnum = {
  //   启用
  Using: {
    name: '启用',
    value: "Using",
  },
  //   停用
  Disable: {
    name: '停用',
    value: "Disable",
  }
}

export const afterTimeOutEnum = {
  //   不处理
  NotHandled: {
    name: '不处理',
    value: "NotHandled",
  },
  //   自动完成
  AutoCompletion: {
    name: '自动完成',
    value: "AutoCompletion",
  }
}

export const spotCheckListStateEnum = {
  // 待检验
  ToBeInspected: {
    name: "待检验",
    value: "ToBeInspected"
  },
  // 检验中
  UnderInspection: {
    name: "检验中",
    value: "UnderInspection"
  },
  // 已检验
  Verified: {
    name: "已检验",
    value: "Verified"
  },
  // 超期
  Overdue: {
    name: "超期",
    value: "Overdue"
  }
}
