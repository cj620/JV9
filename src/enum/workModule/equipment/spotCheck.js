import i18n from '@/i18n/i18n'

export const planTypeEnum = {
  //   点检
  SpotCheck: {
    name: i18n.t('device.De_SpotCheck'),
    value: "SpotCheck",
  },
  //   巡检
  PatrolInspection: {
    name: i18n.t('device.De_PatrolInspection'),
    value: "PatrolInspection",
  }
}
export const SpotCheckTypeEnum = {
  //   日检
  DayCheck: {
    name: i18n.t('device.De_DayCheck'),
    value: "DayCheck",
  },
  //   周检
  WeekCheck: {
    name: i18n.t('device.De_WeekCheck'),
    value: "WeekCheck",
  },
  //   月检
  MonthCheck: {
    name: i18n.t('device.De_MonthCheck'),
    value: "MonthCheck",
  },
  //   季检
  QuarterlyCheck: {
    name: i18n.t('device.De_QuarterlyCheck'),
    value: "QuarterlyCheck",
  },
  //   年检
  YearCheck: {
    name: i18n.t('device.De_YearCheck'),
    value: "YearCheck",
  },
}
export const spotCheckStateEnum = {
  //   启用
  Using: {
    name: i18n.t('device.De_Using'),
    value: "Using",
  },
  //   停用
  Disable: {
    name: i18n.t('device.De_Disable'),
    value: "Disable",
  }
}

export const afterTimeOutEnum = {
  //   不处理
  NotHandled: {
    name: i18n.t('device.De_NotHandled'),
    value: "NotHandled",
  },
  //   自动完成
  AutoCompletion: {
    name: i18n.t('device.De_AutoCompletion'),
    value: "AutoCompletion",
  }
}

export const spotCheckListStateEnum = {
  // 待检验
  ToBeInspected: {
    name: i18n.t('device.De_ToBeInspected'),
    value: "ToBeInspected",
    color: "#909399",
    fcolor: "#fff",
  },
  // 检验中
  UnderInspection: {
    name: i18n.t('device.De_UnderInspection'),
    value: "UnderInspection",
    color: "#faad14",
    fcolor: "#fff",
  },
  // 已检验
  Verified: {
    name: i18n.t('device.De_Verified'),
    value: "Verified",
    color: "#FE222D",
    fcolor: "#fff",
  },
  // 超期
  Overdue: {
    name: i18n.t('device.De_Overdue'),
    value: "Overdue",
    color: "#000000",
    fcolor: "#fff",
  }
}

// 点检结果
export const spotCheckResultEnum = {
  Normal: {
    name: i18n.t('device.De_Normal'),
    value: "Normal",
  },
  Abnormal: {
    name: i18n.t('device.De_Abnormal'),
    value: "Abnormal",
  }
}
