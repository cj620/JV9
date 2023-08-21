/*
 * @Author: your name
 * @Date: 2021-10-28 13:34:11
 * @LastEditTime: 2022-11-30 15:39:28
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\i18n\lang\cn\index.js
 */

import jaLocale from "element-ui/lib/locale/lang/ja";
const ja = {
  menu: {
    De_ProcessTemplate: "工程テンプレート",
    Pu_Supplier: "サプライヤ",
    Sa_Sale: "セールス",
    Sa_SaleQuote: "販売見積もり",
    Sa_SaleOrder: "受注",
    Sa_SaleDelivery: "販売出荷",
    Sa_SaleReturn: "販売返品",
    Sa_Report: "統計レポート",
    Sa_Account: "売上照合",
    Sa_SaleAnalysis: "販売分析",
    Sa_BaseData: "基礎データ",
    Sa_Customer: "お客様",
    Pm_Project: "プロジェクト",
    Pm_Process: "プロジェクトタスク工程",
    Pm_ProjectManagement: "プロジェクト管理",
    Pm_ProjectTask: "プロジェクトタスク",
    Pm_TestTask: "モデル試験タスク",
    Pm_ProjectCost: "プロジェクトコスト",
    Pm_BaseData: "基礎データ",
    Pu_BaseData: "基礎データ",
    Pm_Processes: "プロジェクトタスク工程",
    Pm_BudgetCost: "原価予算表",
    Pm_MakeCalculation: "製造決算表",
    De_Design: "せっけい",
    De_ToolingBOM: "金型BOM",
    De_ItemsDemand: "資材所要量",
    De_ProductionDemand: "生産ニーズ",
    De_DesignTask: "設計タスク",
    Pa_Program: "プログラミング",
    Pa_ProgramTask: "プログラミングタスク",
    Pa_ElectrodeBom: "電極BOM表",
    Pa_ElectrodeDemand: "電極材料の需要",
    Pu_Purchase: "仕入れ",
    Pu_Requisition: "購買依頼",
    Pu_Order: "発注",
    Pu_StockIn: "購買入庫",
    Pu_Return: "購買返品",
    Pu_Account: "購買照合",
    Pu_Outsourcing: "外注加工",
    Pu_Order_PR: "見積書",
    Pu_OutsourcingAccount: "外部から帳消しにする.",
    Pu_OutsourcingRequirement: "外注需要",
    Pr_Production: "せいさん",
    Pr_ProductionTask: "せいさんタスク",
    Pr_ProductionSchedule: "生産スケジュール",
    Pr_ProductionDispatch: "生産スケジューリング",
    Pr_WorkReport: "生産報告",
    Pr_ProductionPlan: "生産計画",

    Pr_Reports: "統計レポート",
    Pr_ProgramTask: "プログラミングタスク",
    Pr_Quality: "品質異常",
    Pr_ProductionReport: "生産レポート",
    Pr_Report: "統計レポート",
    Pr_CapacityAnalyse: "生産能力分析",
    Pr_ProductionLoad: "ふかぶんせき",
    Pr_ProductionChart: "加工計画図",
    Pr_EmployeesChart: "従業員生産レポート",
    Pr_PartChart: "部品生産レポート",
    Qc_Quality: "品質",
    Qc_ProductionCheck: "プロセスチェツク",
    Qc_FinishedProduct: "製品検査",
    Qc_ProcessCheck: "プロセスチェツク",
    Qc_QualityReport: "品質レポート",
    Qc_QualityRecord: "チェツクレコード",
    Qc_QualityError: "品質異常",
    Pr_QualityReport: "品質レポート",
    Pr_ReworkReport: "再加工レポート",
    Pr_BaseData: "基礎データ",
    Pr_Process: "加工工程",
    Pr_Devices: "デバイス情報",
    Pr_Resources: "リソースグループ",
    Pr_Calendar: "工場カレンダー",
    St_Stockroom: "倉庫",
    St_OtherOut: "その他出庫",
    St_OtherIn: "その他の入庫",
    St_Picking: "生産ピック",
    St_ReturnPicking: "生産返品",
    St_ProduceIn: "生産入庫",
    St_StockSummary: "繰越要約",
    St_StockInit: "在庫期首",
    St_StockCheck: "在庫棚卸",
    St_CostChange: "コスト調整",
    St_SplitAssemble: "品目の解体",
    St_StockroomInfo: "倉庫情報",
    St_Dispatch: "ダイヤル",
    St_WasteOut: "損失を報告する",
    St_SurplusIn: "あふれ出る",
    St_Report: "統計レポート",
    St_BaseData: "基礎データ",
    StockroomInfo: "倉庫",
    Se_Setup: "設定",
    Se_Item: "品目",
    Se_ItemType: "品目カテゴリ",
    Se_Unit: "けいりょうたんい",
    Se_Currency: "通貨",
    Se_Users: "ユーザー",
    Se_UserLog: "ユーザーログ",
    Se_Role: "ロール",
    Se_Department: "セクション",
    Se_CompanyInfo: "会社情報",
    Se_SystemSetup: "システム設定",
    Se_AuditFlowSetup: "レビュー",
    Se_CodeRule: "番号付け規則",
    Se_FileManagementSetup: "フォルダ管理権限",
    De_MaterialRequirement: "資材所要量",
    Pr_Task: "せいさんタスク",
    Qc_Error: "品質検査異常",
    Pr_LabelPrint: "ラベル印刷",
    Se_DeleteItemList: "削除された品目",
    As_AssetsManage: "デバイス",
    As_DeviceList: "デバイスリスト",
    As_DeviceMaintain: "設備の保守",
    As_DeviceScrap: "設備廃棄",
    As_DeviceRepair: "設備修理",
    As_MaintenanceTPL: "メンテナンステンプレート",
  },
  login: {
    l_LogIn: "ログイン",
  },
  //项目
  project: {
    Pro_ItemType: "プロジェクトカテゴリ",
    Pro_UpdateDate: "更新日",
    Pro_CalculationMonth: "決済月",
    Pro_Worker: "責任者",
    Pro_ProcessingProgress: "加工の進度",
    Pro_TaskSheetNo: "タスク番号",
    Pro_AddProcedure: "工程の追加",
    Pro_SelectTemplate: "テンプレートの選択",
    Pro_LoadingProcedure: "ロード工程",
    Pro_SettlementItem: "決済項目",
    Pro_TotalQuantity: "合計数量",
    Pro_TotalAmount: "合計金額",
    Pro_SettlementRatio: "決済済比率",
    Pro_SettlementAmount: "決済済金額",
    Pro_SettlementRatioForThisMonth: "今月の決算比率",
    Pro_SettlementAmountForThisMonth: "今月の決済金額",
    Pro_Cost: "コスト",
    Pro_PivotTable: "ピボット・テーブル",
    Pro_TechnicalRequirement: "技術的要件",
    Pro_RelevantPersonnel: "関係者",
    Pro_TaskRecord: "タスクレコード",
    Pro_FromQuotation: "見積書から",
    Pro_CheckWorkSheet: "製造オーダの表示",
    Pro_ProjectSchedule: "プロジェクトの進行状況",
    Pro_ProjectPersonnel: "プロジェクト担当者",
    Pro_ProjectCostAnalysis: "プロジェクト原価分析",
    Pro_PlannedCost: "計画原価",
    Pro_PlannedProportion: "計画の占有率",
    Pro_ActualCost: "実際のコスト",
    Pro_ActualProportion: "実際の占有率",
    Pro_Overspending: "超過支出",
    Pro_ProportionOfOverspending: "超過支出占有率",
    Pro_CheckDetails: "詳細の表示",
    Pro_MoldDetails: "金型詳細",
    Pro_Task: "タスク",
    Pro_FileManagement: "ファイル管理",
    Pro_MoldSpecification: "金型技術要件",
    Pro_ProjectTaskRecord: "プロジェクトタスクレコード",
    Pro_TheSumOfTheCurrentMonthSettlementProportionAndTheSettledProportionCannotBeGreaterThan1:
      "今月の決済比率と決済比率の和は1より大きくすることはできません",
    Pro_ReportToWorkRecord: "労働記録",
    Pro_Production: "製造",
    Pro_Outsource: "外注する",
    Pro_DesignChange: "へんけいを設ける",
    Pro_NewTooling: "ニューダイ",
    Pro_CorrectingTooling: "かながた",
    Pro_NotStarted: "開始していません",
    Pro_Ongoing: "進行中",
    Pro_QuantityShouldBeGreaterThan1: "数量は1未満にすることはできません",
    Pro_QuotationList: "見積書リスト",
    Pro_Month: "月",
    Pro_ChooseMonth: "月を選択",
    Pro_PlanTimeShouldBeGreaterThan0: "予想工数は0より小さくてはならない",
    Pro_ToolingDetails: "金型詳細",
    Pro_RequirementItem: "需要項目",
    Pro_AddNewToolingTask: "新規モデルタスクの追加",
    Pro_AddDesignChangeTask: "新規設定変更タスク",
    Pro_AddTrialMoldTask: "新規モデル試験タスク",
    Pro_ExpirationTime: "有効期限",
    Pro_Share: "分かち合う",
    Pro_CreateLink: "リンクの生成",
    Pro_projectMsgManager: "プロジェクト情報",
  },
  //设置
  setup: {
    Stockroom: "倉庫",
    SafetyStock: "安全在庫",
    MaxStock: "最大在庫",
    UserId: "ユーザー番号",
    UserName: "ユーザー名",
    ActiveState: "アクティブ状態",
    Mail: "メールボックス",
    Sex: "性別",
    Birthday: "誕生日",
    FamilyAddress: "自宅住所",
    Tel: "電話番号",
    Phone: "携帯電話",
    Male: "男",
    Female: "女",
    WithTheAuditor: "レビュー実施者の構成",
    RecordCategory: "レコードカテゴリ",
    Active: "アクティブ化済み",
    Deactive: "非アクティブ",
    PleaseInputNumbers: "数値を入力してください",
    PleaseInputPhoneNumberWithCorrectFormat:
      "正しい携帯番号を入力してください",
    SheetToBeAudited: "保留中の文書",
    ResultOfAuditing: "レビュー結果",
    AuditTime: "レビュー時間",
    ShowRecords: "レコードの表示",
    ReportWork: "の取材を",
    MyAuditingRecords: "マイ監査記録",
    Approve: "レビューパス",
    ReportedAt: "労働時間を報告する.",
    Password: "パスワード",
    Account: "アカウント",
    RememberMe: "私を覚えて",
    PleaseInputAccount: "アカウントを入力してください",
    PleaseInputPassword: "パスワードを入力してください",
    SaveDataFailedAsMissingSomeFiledPleaseCheckTheDataYouSubmitted:
      "フィールドがありません！データの挿入に失敗しました！フィールドが完全であることを確認してください",
    CurrentPageData: "現在のページデータ",
    SelectedDataOfCurrentPage: "現在のページで選択されているデータ",
    ExportTemplate: "テンプレートのエクスポート",
    ThousandSeparatorAndKeepTwoDecimalPlaces: "千分記号+2桁の小数点を保持",
    Time: "時間",
    Percentage: "パーセント",
    Thousands: "千分符",
    Density: "密度みつど",
    FullScreen: "フルスクリーン",
    Medium: "中程度",
    Loose: "ゆとりがある",
    ChooseFile: "ファイルを選択してください",
    FileFormatErrorPleaseCheckAndTryAgain:
      "ファイル形式が間違っています！確認してやり直してください！",
    DataToBeExportedIsEmpty: "エクスポートデータが空です。再確認してください",
    Left: "左揃え",
    Middle: "中",
    Right: "右揃え",
    Bold: "太字",
    IsResetCache: "保存されているレイアウト情報を消去します。続行しますか？",
    Profile: "個人情報",
    DeletedUsers: "削除されたユーザー",
    Recover: "リカバリ",
    FolderName: "フォルダ名",
    SubfolderName: "サブフォルダ名",
    ReadOnlyRights: "読み取り専用アクセス権",
    EditPermissions: "権限の編集",
    PrintPreview: "印刷プレビュー",
    ConfirmPasswordReset: "パスワードのリセットを確認するか",
  },
  //销售
  sale: {
    Sa_CustomerId: "顧客番号",
    Sa_ShortName: "略称",
    Sa_FullName: "フルネーム",
    Sa_Address: "アドレス",
    Sa_Contact: "連絡先",
    Sa_Tax: "税率",
    Sa_Currency: "通貨",
    Sa_Code: "簡略化",
    Sa_CustomerName: "お客様の略称",
    Sa_SalesReps: "営業マン",
    Sa_ProjectId: "プロジェクト番号",
    Sa_RelationId: "関連番号",
    Sa_OutDate: "出荷日",
    Sa_ReturnDate: "返品日",
    Sa_ReceiptNumber: "請求書番号",
    Sa_ValidityPeriodOfQuotationExpiredAt: "見積有効期間",
    Sa_QuotationItems: "見積項目",
    Sa_Specifications: "仕様",
    Sa_MoldQuotation: "金型見積書",
    Sa_AdditionalCharges: "追加料金",
    Sa_Subtotal: "原価合計",
    Sa_MaterialCost: "ざいりょうひよう",
    Sa_ProcessingCostAndProjectCost: "加工費及びプロジェクト費用",
    Sa_TotalQuotation: "見積合計",
    Sa_Scale: "ひれい",
    Sa_UserInformation: "ユーザー情報",
    Sa_Sum: "合計",
  },
  // 采购
  purchase: {
    Pr_SupplierId: "仕入先ID",
    Pr_SupplierName: "仕入先略称",
    Pu_Supplier: "サプライヤ",
    Pr_Unreconciled: "未決済",
    Pu_BaseData: "基礎データ",
    Pu_RequiredCategory: "必須カテゴリ",
    Pu_SupplierInformation: "ベンダー情報",
    Pu_EnterStorage: "入庫",
    Pu_OutStorage: "出庫",
    Pu_PleaseSelectTheOutsourcingRequirements: "外部需要を選択してください",
    Pu_RequirementType: "需要カテゴリ",
    Pu_PleaseChooseTheNeededSheetFirst:
      "追加する文書を先にチェックしてください",
    Pu_Outsourced: "外注済み",
  },
  // 仓库
  stockroom: {
    St_Submitter: "送信者",
    St_PickingType: "ピッキングカテゴリ",
    St_Picking: "に食物を詰め込む",
    St_Supplement: "ほごうざいりょう",
    St_TrialMold: "しけんがた",
    St_StockroomOut: "倉庫-アウト",
    St_StockroomIn: "倉庫-入",
    St_CheckQuantity: "棚卸数量",
    St_Direction: "方向",
    St_Assembly: "くみたて",
    St_Split: "分割ぶんかつ",
  },
  design: {
    De_ShowInProjectManagementPage: "プロジェクト管理ページに表示",
    De_DoesnShowInProjectManagementPage: "プロジェクト管理ページに表示されない",
    De_DownloadTemplate: "インポートテンプレートのダウンロード",
    De_LeadingInBOM: "BOMのインポート",
    De_CheckItem: "対照品目",
    De_SearchItem: "品目の検索",
    De_SubmitDemand: "資材所要量の発行",
    De_InfoLinkage: "部品情報の同期化",
    De_ProcessTemplate: "工程テンプレート",
    De_SetLevel: "レベルの設定",
    De_DesignTaskRecord: "設計タスクレコード",
  },
  //通用
  Generality: {
    Ge_GanttShow: "ガントチャート表示",
    Ge_TabularShow: "表の表示",
    Ge_New: "新規作成",
    Ge_Add: "新規追加",
    Ge_Refresh: "リフレッシュ",
    Ge_Import: "インポート",
    Ge_Export: "エクスポート",
    Ge_Print: "印刷いんさつ",
    Ge_Settings: "設定",
    Ge_Frame: "枠線",
    Ge_DottedLine: "横断歩道",
    Ge_Fit: "てきおう",
    Ge_NumberColumn: "連番列",
    Ge_SelectCol: "列のチェック",
    Ge_Reset: "リセット",
    Ge_OK: "を選択して、",
    Ge_Cancel: "キャンセル",
    Ge_Delete: "削除",
    Ge_Save: "保存",
    Ge_Approve: "レビュー",
    Ge_Withdraw: "撤回",
    Ge_Edit: "編集",
    Ge_Filter: "フィルタリング",
    Ge_Search: "検索けんさく",
    Ge_DeleteData: "データの削除",
    Ge_DeleteConfirm: "このアイテムを削除してもよろしいですか？",
    Ge_Login: "ログイン",
    Ge_Logout: "ログアウト",
    Ge_Operate: "操作",
    Ge_AddChild: "新規部下",
    Ge_CreateDate: "作成日",
    Ge_Details: "詳細",
    Ge_Describe: "説明",
    Ge_ID: "番号付け",
    Ge_ItemId: "品目番号",
    Ge_Unit: "単位",
    Ge_Quantity: "数量",
    Ge_Price: "単価",
    Ge_NoTaxPrice: "未税単価",
    Ge_Amount: "金額",
    Ge_Tax: "税率",
    Ge_SampleDate: "最初のサンプル日",
    Ge_PhotoUrl: "写真",
    Ge_ItemType: "タブ",
    Ge_ItemName: "の名前をあげる",
    Ge_ToolingName: "金型名",
    Ge_LocalCurrency: "ほんか",
    Ge_ExchangeRate: "為替レート",
    Ge_Department: "セクション",
    Ge_BillId: "文書番号",
    Ge_BillGui: "文書GUI",
    Ge_State: "ステータス",
    Ge_DeliveryDate: "計画納期",
    Ge_Currency: "通貨",
    Ge_Creator: "シングルを作る",
    Ge_CreationDate: "請求日",
    Ge_Remarks: "コメント",
    Ge_Disable: "無効化",
    Ge_Enable: "有効化",
    Ge_Copy: "レプリケーション",
    Ge_PleaseEnterkey: "入力キーワード",
    Ge_PleaseEnter: "入力してください",
    Ge_SelectItems: "品目の選択",
    Ge_ItemCategory: "品目カテゴリ",
    Ge_Submit: "送信",
    Ge_BillInfo: "文書情報",
    Ge_CustomerInfo: "顧客情報",
    Ge_ItemsInfo: "品目情報",
    Ge_Annex: "添付ファイル",
    Ge_PleaseAddItems: "詳細を追加してください",
    Ge_FileName: "ファイル名",
    Ge_Submitter: "アップロード者",
    Ge_UploadDate: "アップロード時間",
    Ge_Download: "ダウンロード",
    Ge_ChangePassword: "パスワードの変更",
    Ge_OldPassword: "元のパスワード",
    Ge_NewPassword: "新しいパスワード",
    Ge_Setup: "構成",
    Ge_Upload: "アップロード",
    Ge_RemarksIsNull: "しばらくコメントがありません",
    Ge_UnSubmitted: "コミットされていません",
    Ge_Submitted: "送信済み",
    Ge_Approving: "レビュー中",
    Ge_Approved: "レビュー済み ",
    Ge_Rejected: "拒否されました",
    Ge_Reject: "拒否",
    Ge_Completed: "完了",
    Ge_ApproveProcess: "レビュープロセス",
    Ge_MultipleSetup: "一括設定",
    Ge_SelectAll: "すべて選択",
    Ge_Items: "品目",
    Ge_SaveType: "保存タイプ",
    Ge_SelectData: "データの選択",
    Ge_SelectColumn: "フィールドの選択",
    Ge_StartDate: "開始日",
    Ge_EndDate: "終了日",
    Ge_ToolingNo: "金型番号",
    Ge_NewToolingNo: "ターゲット金型番号",
    Ge_Process: "プロセス",
    Ge_TaskContent: "加工内容",
    Ge_Resource: "計画リソース",
    Ge_PartNo: "部品番号",
    Ge_NewPartNo: "ターゲット部品番号",
    Ge_PartName: "部品名",
    Ge_Worker: "作業員",
    Ge_WorkType: "ジョブ・カテゴリ",
    Ge_ActualStart: "実際の開始",
    Ge_ActualEnd: "実際の終了",
    Ge_ActualTime: "じつようじかん",
    Ge_PlanTime: "予定工数",
    Ge_OverTime: "タイムアウト",
    Ge_PlanStart: "計画の開始",
    Ge_PlanEnd: "計画終了",
    Ge_Level: "レベル",
    Ge_Close: "閉じる",
    Ge_CloseOthers: "その他を閉じる",
    Ge_CloseAll: "すべてを閉じる",
    Ge_TaskType: "タスクカテゴリ",
    Ge_CostType: "原価カテゴリ",
    Ge_LeadTimeOfProcess: "プリタイム / 分",
    Ge_PostTimeOfProcess: "バックタイム / 分",

    Ge_Pending: "処理待ち",
    Ge_Processed: "処理済み",
    Ge_InProcurement: "購入中",
    Ge_Stored: "入庫済",
    Ge_HaveRecipients: "受領済み",
    Ge_Ordinary: "標準",
    Ge_Urgent: "緊急",
    Ge_ExtraUrgent: "特急",
    Ge_ToBeReceived: "インバウンド局",
    Ge_Processing: "加工中",
    Ge_Pausing: "一時停止中",
    Ge_Outsourcing: "外注中",
    Ge_Revoked: "審問を取り消された",
    Ge_TDA: "未課税金額",
    Ge_AuxiliaryQty: "補助数量",
    Ge_AuxiliaryPrice: "補助単価",
    Ge_DeliverGoods: "出荷",
    Ge_ReturnGoods: "返品",
    Ge_DeliveryQuantity: "出荷数量",
    Ge_ReturnQuantity: "返品数量",
    Ge_StockInQuantity: "入庫数量",
    Ge_SaveAndSubmit: "保存して送信",
    Ge_GenerateItems: "金型品目の生成",
    Ge_Dynamic: "動的",
    Ge_Record: "ダイナミックレコード",
    Ge_ProcessInfo: "工程情報",
    Ge_DocumentType: "文書タイプ",
    Ge_Date: "日付",
    Ge_ContinueOrNot: "日付は需要を送信しました。続行しますか？",
    Ge_Insert: "挿入そうにゅう",
    Ge_Paste: "貼り付け",
    Ge_Part: "部品",
    Ge_Electrode: "でんきょく",
    Ge_PleaseSelect: "選択してください",
    Ge_Type: "を選択してオプションを設定します。",
    Ge_Dashboard: "けいきばん",
    Ge_LogOut: "ログアウト",
    Ge_ProcessPicture: "プロセス画像",
    Ge_TakeAwayQuantity: "受取数量",
    Ge_DemandDate: "需要日",
    Ge_PleaseAddData: "データを追加してください",
    Ge_SelectTask: "タスクの選択",
    Ge_PleaseSelectTask: "タスクを選択してください",
    Ge_NoSupportPaste:
      "ローカル貼り付けは現在のブラウザではサポートされていません",
    Ge_NeedPicture: "画像以外の内容を貼り付け",
    Ge_Week: "周",
    Ge_Today: "今日",
    Ge_Year: "年",
    Ge_Month: "月",
    Ge_Selected: "選択済み",
    Ge_RememberPassword: "パスワードを記憶する",
    Ge_All: "すべて",
    Ge_AddNewPicture: "新しい画像",
    Ge_ClickUploadPicture: "クリックして画像をアップロード",
    Ge_UploadPicture:
      "画像をここにドラッグするか、をクリックしてアップロードします",
    Ge_ClickPaste: "クリックして貼り付け",
    Ge_InventoryInfo: "在庫情報",
    Ge_SearchUnitName: "検索単位名",
    Ge_WhetherToActivate: "アクティブ化するかどうか",
    Ge_UserDetails: "ユーザーの詳細",
    Ge_UserConfig: "ユーザー構成",
    Ge_RelatedDocumentNo: "関連付けられた番号",
    Ge_MessageLog: "ログインの有効期限が切れました。再ログインしてください",
    Ge_ConfigurationValue: "設定値",
    Ge_TimeRange: "時間範囲は0～24でなければなりません",
    Ge_Purchased: "購入済み",
    Ge_NotPurchased: "未購入",
    Ge_IncludePurchased: "購買済を含む",
    Ge_IncludeProcessed: "処理済を含む",
    Ge_MarkAsProcessed: "処理済みとしてマーク",
    Ge_MarkAsPending: "処理対象としてマーク",
    Ge_IsDisabled: "無効にしますか？",
    Ge_Remind: "ヒント",
    Ge_PleaseFillIn: "記入してください",
    Ge_Yes: "はい",
    Ge_No: "いいえ",
    Ge_Menu: "メニュー",
    Ge_Authority: "アクセス権",
    Ge_NoAuthority: "権限がない",
    Ge_Readable: "読み取り可能",
    Ge_ReadWrite: "読み書き可能",
    Ge_RoleName: "ロール名",
    Ge_Auditor: "レビュー実施者",
    Ge_DocumentName: "文書名",
    Ge_SelectPersonal: "ユーザの選択",
    Ge_PrefixCharacter: "接頭辞文字",
    Ge_FirstSpacer: "最初のスペーサ",
    Ge_DateFormat: "日付書式",

    Ge_SecondSpacer: "第2スペーサ",
    Ge_SelfIncreasing: "じこぞうかんすう",
    Ge_AccountingDate: "記帳日",
    Ge_AccountingCategory: "記帳カテゴリ",
    Ge_DebitsQuantity: "借方数量",
    Ge_DebitAmount: "借方金額",
    Ge_CreditsQuantity: "貸方数量",
    Ge_CreditsAmount: "貸方金額",
    Ge_DocumentDetailNo: "文書詳細番号",
    Ge_Summary: "サマリー",
    Ge_ItemsSource: "品目ソース",
    Ge_SearchForm: "フォーム検索",
    Ge_PickingDetails: "ピッキング明細",
    Ge_BasicUnit: "基本単位",
    Ge_ItemsCategory: "品目区分",
    Ge_ItemsAttribute: "品目属性",
    Ge_ItemsName: "品目名",
    Ge_1Month: "この1ヶ月",
    Ge_2Month: "この2ヶ月",
    Ge_3Month: "この3ヶ月",
    Ge_6Month: "6ヶ月近く",
    Ge_12Month: "12ヶ月近く",
    Ge_To: "まで",
    Ge_More: "その他",
    Ge_SelectTimeRange: "時間範囲の選択",
    Ge_DateComparison: "計画終了日に計画開始日より大きい日付は指定できません",
    Ge_TemplateInfo: "テンプレート情報",
    Ge_TaskStatus: "タスクステータス",
    Ge_MoldId: "ダイスばんごう",
    Ge_MyTask: "マイタスク",
    Ge_Default: "デフォルト",
    Ge_ResourceGroupMembers: "リソースグループメンバー",
    Ge_MainEquipment: "マスタデバイス",
    Ge_DeviceExists: "現在のデバイスはすでに存在します",
    Ge_EquipmentPicture: "デバイス画像",
    Ge_ZoomOut: "縮小",
    Ge_ZoomIn: "拡大",
    Ge_ProcessSearch: "工程サーチ",
    Ge_Category: "カテゴリ",
    Ge_ProcessList: "工程リスト",
    Ge_ReworkRate: "さいこうりつ",
    Ge_AbnormalRate: "異常率",
    Ge_QualifiedRate: "合格率",
    Ge_UnqualifiedRate: "検出不良率",
    Ge_ProcessId: "工程番号",
    Ge_ProcessName: "プロジェクト名",
    Ge_SelectInboundProcess: "入力する工程を選択してください",
    Ge_ResultDescription: "結果の説明",
    Ge_FinishSchedule: "終了スケジュール",
    Ge_CheckDetails: "詳細をチェックしてください",
    Ge_EditDeliveryDate: "納期の変更",
    Ge_WhetherReleaseSchedulingResults: "スケジュール結果を発表するかどうか",
    Ge_CheckSameMoldDetails: "同じ金型の詳細をチェックしてください",
    Ge_SelectNextOne: "部品が選択されているので、次を選択してください",
    Ge_SheetIsAlreadyCreated:
      "すでに作成されている加工オーダ、作成を続行するかどうか",

    Ge_Schedule: "進行状況",
    Ge_WhetherInvalid: "無効にしますか？",
    Ge_Discarded: "無効",
    Ge_Discard: "無効にする",
    Ge_Back: "リターンマッチ",
    Ge_SelectTheDetails: "詳細の選択",
    Ge_BasicInformation: "基礎情報",
    Ge_DetailedInformation: "詳細",
    Ge_TemplateName: "テンプレート名",
    Ge_StartTime: "開始時間",
    Ge_EndTime: "終了時間",
    Ge_WorkHours: "労働時間",
    Ge_DepartmentSearch: "部門検索",
    Ge_Finished: "完了",
    Ge_Start: "スタート",
    Ge_End: "終了",
    Ge_SearchByNumber: "番号による検索",
    Ge_FileType: "ファイルの種類",
    Ge_SelectFile: "ファイルを選択",
    Ge_FileSize: "ファイルサイズ",
    Ge_KeyWords: "キーワード",
    Ge_PleaseCompleteTheFormAsRequired: "要求通りにフォームを完成してください",
    Ge_WhetherToStartUsing: "有効にしますか？",
    Ge_PrintEditor: "印刷エディタ",
    Ge_EditingMode: "編集モード",
    Ge_QRCode: "2次元コード",
    Ge_EditorMode: "エディタモード",
    Ge_PaperSettings: "用紙設定",
    Ge_FontStyle: "フォントスタイル",
    Ge_Header: "ヘッダー",
    Ge_Table: "テーブル",
    Ge_Footer: "ページの最後",
    Ge_Direction: "方向",
    Ge_Horizontal: "横方向",
    Ge_Paper: "に紙を張る",
    Ge_NewText: "テキストを追加",
    Ge_AddField: "フィールドの追加",
    Ge_RemoveElement: "要素の削除",
    Ge_InsertPicture: "画像を挿入",
    Ge_ChooseType: "タイプを選択してください",
    Ge_DataField: "データフィールド",
    Ge_Prefix: "接頭辞",
    Ge_Format: "書式設定",
    Ge_ChooseFormatType: "書式設定タイプを選択してください",
    Ge_BindField: "結合フィールド",
    Ge_FieldDescription: "フィールドの説明",
    Ge_PleaseInputFieldsToBeBound: "バインドするフィールドを入力してください",
    Ge_PleaseInputFieldDescription: "フィールドの説明を入力してください",
    Ge_InsertImg: "さしえ",
    Ge_Day: "日",
    Ge_Hour: "時間",
    Ge__Hour: "時間",
    Ge_Minute: "分",
    Ge_Second: "秒",
    Ge_Quarter: "四半期",
    Ge_Font: "フォント",
    Ge_Alignment: "配置",
    Ge_AddNewTable: "新規テーブル",
    Ge_TableTitle: "表のタイトル",
    Ge_TableField: "表フィールド",
    Ge_PleaseInputTableTitle: "表のタイトルを入力してください",
    Ge_PleaseInputTableField: "テーブルフィールドを入力してください",
    Ge_AddTableColumn: "リストの追加",
    Ge_DelTableColumn: "リストの削除",
    Ge_HideTableTitle: "タイトルを隠す",
    Ge_ShowTableTitle: "タイトルを表示",
    Ge_HideSum: "合計を閉じる",
    Ge_ShowSum: "オープン合計",
    Ge_ChangeBoundField: "バインドの変更",
    Ge_NoPrintData: "印刷データなし",
    Ge_PrintTemplate: "テンプレートの印刷",
    Ge_PrintPreView: "印刷プレビュー",
    Ge_AddNewTemplate: "新規テンプレート",
    Ge_TemplateCannotBeEmpty: "テンプレート名を空白にすることはできません",
    Ge_NewField: "新しいフィールド",
    Ge_ResourceType: "リソースカテゴリ",
    Ge_UsageStatus: "使用状況",
    Ge_ChooseProcess: "工程の選択",
    Ge_ChoosePart: "部品を選択してください",
    Ge_AddProcess: "工程を追加してください",
    Ge_TimeFormat: "期間フォーマットは、8:00-20:00、24:00-7:00",
    Ge_QuantityShouldBeGreaterThan: "数量は0未満にすることはできません",
    Ge_Hide: "非表示",
    Ge_Show: "プレゼンテーション",
    Ge_ImportBOM: "BOMテンプレートのインポート",
    Ge_ChooseAtLeastOneItem: "詳細を選択してください",
    Ge_AuditingRemarks: "承認コメント",
    Ge_PleaseInputEmailAddressWithCorrectFormat:
      "正しいメールアドレスを記入してください",
    Ge_IsDuplicate: "詳細",
    Ge_ToolingProgressDashboard: "金型進捗カンバン",
    Ge_FileSizeCannotBeGreaterThan100MB:
      "ファイルサイズは100 MBを超えてはならない",
    Ge_CostDetails: "原価詳細",
    Ge_Optional: "オプション",
    Ge_WorkingHoursRecord: "労働時間記録",
    Ge_Standard: "標準",
    Ge_Tooling: "かながた",
    Ge_Details1: "詳細",
    Ge_SortType: "ソート方法",
    Ge_SortByDeliveryDate: "金型納期によるソート",
    Ge_SortByCreationDate: "金型作成日順にソート",
    Ge_IncludingCompleted: "完了したプロジェクトタスクは含まれていますか？",
    Ge_ItemLabel: "タブ",
    Ge_BelongTo: "所属プロジェクト",
    Ge_ShowInProdSchedule: "「本番スケジュール」ページに表示するかどうか",
    Ge_Terms: "会計期間",
    Ge_MaterialRequirementState: "資材所要量ステータス",
    Ge_ResetPassword: "パスワードをリセット",
    Ge_PrTaskBillId: "加工リスト番号です",
    Ge_AssociatedNo: "関連番号",
    Ge_NoData: "データが一時的にありません",
    Ge_DeliveryCompleted: "出荷が完了しました。続行しますか？",
    Ge_StockInCompleted: "入庫が完了しました。続行しますか？",
    Ge_MeasuringTool: "ゲージ台",
    Ge_Fixture: "つかみ具",
  },
  //生产
  production: {
    Pr_DeletedData: "削除されたデータ",
    Pr_StaleWorkOrder: "期限切れ製造オーダ",
    Pr_OverdueWorkOrder: "タイムアウト製造オーダ",
    Pr_PleaseEnterPartNumber: "部品番号を入力してください...",
    Pr_Unlabeled: "マークなし",
    Pr_Tagged: "マーク済み",
    Pr_OldWorkOrderMark: "古い製造オーダタグ",
    Pr_DaysOverdue: "納期超過日数",
    Pr_DaysNotReported: "労働日数未報告",
    Pr_LastReportedDate: "最終報告日",
    Pr_ProcessInformation: "加工情報",
    Pr_WorkOrderNumber: "製造オーダ番号",
    Pr_LifeSetting: "寿命設定",
    Pr_IntervalDays: "間隔日数",
    Pr_CreationDate: "作成日",
    Pr_CumulativeTime: "積算時間",
    Pr_AcquisitionDate: "購入日",
    Pr_LastMaintenanceDate: "最終保守日",
    Pr_MaintenanceMode: "メンテナンス方式",
    Pr_Manufacture: "デバイスメーカー",
    Pr_DeviceNo: "デバイス番号",
    Pr_DeviceName: "デバイス名",
    Pr_TimeSpan: "有効時間範囲",
    Pr_CostRate: "標準レート",
    Pr_ProcessCode: "工程コード",
    Pr_SortOrder: "シーケンス番号",
    Pr_StartScale: "開始スケール",
    Pr_EndScale: "終了スケール",
    Pr_ProcessType: "工程カテゴリ",
    Pr_Other: "その他",
    Pr_ProcessTemplate: "工程テンプレート",
    Pr_TaskProcess: "製造オーダー工程",
    Pr_ActualDevice: "実際の設備",
    Pr_SchedulingResults: "スケジュール結果",
    Pr_PartOutsourcing: "部品外注",
    Pr_ProcessOutsourcing: "工程外",
    Pr_Calculate: "計算",
    Pr_StartScheduleTime: "スケジュール開始時間",
    Pr_PleaseSelectStartScheduleTime: "スケジュール開始時間を選択してください",
    Pr_UpToMachine: "オン",
    Pr_DownFromMachine: "ダウン",
    Pr_EnterStation: "インバウンド",
    Pr_AlreadyInStation: "インバウンド済み",
    Pr_OnMachine: "在機",
    Pr_GetOffTime: "ダウンタイム",
    Pr_PleaseEnterEmployeeNoAndWorkSheetNo:
      "製造番号と製造オーダ番号を入力してください",
    Pr_DevicesList: "デバイスリスト",
    Pr_Use: "使用",
    Pr_StopUse: "非アクティブ化",
    Pr_RepeatWeekly: "週単位で繰り返す",
    Pr_NoRepetition: "繰り返しなし",
    Pr_RepetitionType: "繰り返しタイプ",
    Pr_Monday: "月曜日",
    Pr_Tuesday: "火曜日",
    Pr_Wednesday: "水曜日",
    Pr_Thursday: "木曜日",
    Pr_Friday: "金曜日",
    Pr_Saturday: "土曜日",
    Pr_Sunday: "日曜日",
    Pr_Overload: "オーバロード",
    Pr_OverDeliveryDate: "納期超過",
    Pr_Automatic: "じどうはいち",
    Pr_ManualScheduling: "じんこうはいち",
    Pr_Normal: "正常です",
    Pr_Error: "エラー",
    Pr_PleaseEnterEmployeeInfo: "従業員情報を入力してください",
    Pr_PleaseSelectDevice: "デバイスを選択してください",
    Pr_PleaseEnterWorkSheetInfo: "製造オーダ情報を入力してください",
    Pr_WorkSheetNo: "プロセス番号",
    Pr_EditDeliveryDate: "納期の編集",
    Pr_PlanningDevices: "計画デバイス",
    Pr_MaximumNumberOfWorkSheet: "最大アップセル数",
    Pr_EquipmentLoad: "設備負荷",
    Pr_AvailableHours: "使用可能な労働時間",
    Pr_PartDetail: "部品詳細",
    Pr_Equipment: "デバイス",
    Pr_SelectPart: "部品の選択",
    Pr_LoadOn: "ロード",
    Pr_CheckLoad: "荷重の表示",
    Pr_Release: "リリース",
    Pr_CheckSchedule: "進捗の表示",
    Pr_ScheduledResources: "予定リソース",
    Pr_PlanSource: "計画ソース",
    Pr_DetailedLoad: "パーツロードぱーついちらんふか",
    Pr_SelectDate: "日付の選択",
    Pr_Processed: "加工済み",
    Pr_ToBeProcessed: "加工待ち",
    Pr_Inside: "工場内",
    Pr_Outside: "工場外",
    Pr_Top: "の頂部をおおう",
    Pr_SwitchDevice: "スイッチングデバイス",
    Pr_PrintByTooling: "型番号で印刷",
    Pr_SimulatedCalculate: "アナログ計算",
    Pr_SimulatedAPS: "シミュレーションスケジュール",
    Pr_SchedulingAlgorithmSelection: "スケジューリングアルゴリズムの選択",
    Pr_ClassicalAlgorithm: "一般的なアルゴリズム",
    Pr_CR: "CR値スケジューリング",
    Pr_MinimumWorkingPeriod: "最短工期アルゴリズム",
    Pr_EarliestDeliveryDate: "最早納期アルゴリズム",
    Pr_DoAPS: "計算スケジュール",
    Pr_APSLog: "スケジュールログ",
    Pr_OneClickProcessing: "ワンクリック処理",
    Pr_Algorithms: "アルゴリズム",
    Pr_MarkAsNormal: "標準としてマーク",
    Pr_MarkAsCompleted:"完了としてマーク",
    Pr_Version: "バージョン",
    Pr_ModifyPlanEndTime: "計画終了時刻の変更",
    Pr_Total: "合計",
    Pr_SelectUnit: "単位を選択してください",
    Pr_WhetherToPublish: "生産スケジュールが完了しました。リリースしますか？",
    Pr_WorkSheetInfo: "製造オーダ情報",
    Pr_NormalWorkSheet: "通常のシート",
    Pr_OverdueWorkSheet: "期限切れのシート",
    Pr_OverloadWorkSheet: "過負荷製造オーダ",
    Pr_ComputingTime: "計算時間",
  },
  quality: {
    Qc_CheckResult: "検査結果",
    Qc_CheckDetailList: "検査明細",
    Qc_Operator: "検査人",
    Qc_CheckDate: "検査日",
    Qc_EstimatedLoss: "よさんそんしつ",
    Qc_ProportionOfAbnormalQualityOfDepartment: "部門品質異常占有率",
    Qc_ProcessReworkRatio: "工程再加工の割合",
    Qc_ReworkProcess: "リワーク工程",
    Qc_ReworkDetailList: "再加工明細",
    Qc_Ge_QualityAbnormal: "品質異常",
    Qc_ThereAreNoManufacturedProcesses: "加工された工程はありません",
    Qc_PleaseSelectADocument: "文書を選択してください",
    Qc_CreatFromManufacturingTaskList: "製造オーダーから作成",
    Qc_Qualified: "合格",
    Qc_Unqualified: "不合格",
    Qc_AbnormalCause: "不合格の理由",
    Qc_AbnormalCauseAnalyst: "不適合原因分析者",
    Qc_ToBeTested: "検査待ち",
    Qc_PleaseChooseTheUnqualifiedProcess: "不合格工程の選択",
    Qc_Rework: "やり直し",
    Qc_Scrapped: "廃棄",
    Qc_AcceptOnDeviation: "偏差時に受け入れる",
    Qc_NormalRework: "プロセス再加工",
    Qc_SubmittedForInspectionQty: "コミットされた検査数",
    Qc_InspectionQty: "検査数量",
    Qc_UnqualifiedQty: "不合格数量",
    Qc_TheoreticalValue: "りろんち",
    Qc_UpperTolerance: "上公差",
    Qc_LowerTolerance: "下公差",
    Qc_MeasuredValue: "じっそくち",
    Qc_SelfCheckProcess: "セルフテスト工程",
    Qc_ProcessCheckType: "検査タイプ",
    Qc_ProcessCheckChart: "けんさ図",
    Qc_SelfCheck: "セルフテスト",
    Qc_NormalCheck: "巡回検査",
    Qc_FirstInspection: "最初のチェック",
    Qc_InspectionExemption: "検査免除",
    Qc_UnReturn: "未返却",
    Qc_Return: "リターンマッチ",
  },
  device: {
    De_Repair: "しゅうりょう",
    De_Maintenance: "メンテナンス",
    De_MaintenanceInfo: "メンテナンス情報",
    De_MaintenanceDate: "メンテナンス日付",
    De_MaintenanceMode: "メンテナンス方式",
    De_LastMaintenanceDate: "最終保守日",
    De_CumulativeTime: "積算時間",
    De_MaintenanceContent: "メンテナンス内容",
    De_MaintenanceResults: "メンテナンス結果",
    De_ScrapDate: "廃棄日",
    De_Repairer: "修理メーカー",
    De_RepairApplicant: "修理請求人",
    De_RepairDate: "修理請求日",
    De_CompletionDate: "完了日",
    De_AcquisitionDate: "購入日",
    De_UserDepartment: "使用部門",
    De_LifeSetting: "寿命設定",
    De_MaintenanceTemplate: "メンテナンステンプレート",
    De_Manufacturer: "ベンダー",
    De_Interval: "間隔日数/累積時間/累積回数",
    De_StorageStatus: "入出庫ステータス",
    De_Handlers: "オペレータ",
    De_ToBeMaintained: "メンテナンス待ち",
    De_DataToBeMaintained: "保守対象データの表示",
    De_RegularMaintenance: "タイミングメンテナンス",
    De_QuantitativeMaintenance: "ていりょうほしゅ",
    De_FaultRepair: "こしょうほしゅ",
    De_PrecisionRepair: "せいどちょうせい",
    De_Type1: "カテゴリ1",
    De_Type2: "カテゴリ2",
	  De_CheckScrap: "除・売却作業指示の表示",
	  De_UsageRecord: "レコードの使用方法",
	  De_StockOpsRecord: "入出庫記録",
	  De_AddUsageRecord: "使用履歴の追加",
	  De_AddStockOpsRecord: "入出庫レコードの追加",
	  De_StockOpsInfo: "宛先/ソース",
  },
  // 后端提示
  backendMessage: {
    P10001: "自動スケジュールにエラーが発生しました！!",
    P10002: "当サイトではこの工程をオンラインにすることはできません",
    P10003: "通貨を空にすることはできません！",
    P10004: "通貨名を空白にすることはできません！",
    P10005: "通貨名は重複できません！",
    P10006: "番号はすでに存在します",
    P10007: "番号は同期済みで削除できません",
    P10008: "番号が重複しています",
    P10009: "部門名を空白にすることはできません！",
    P10010: "部門名は重複できません！",
    P10011: "倉庫を空にすることはできません！",
    P10012: "倉庫名を空白にすることはできません！",
    P10013: "倉庫名は重複できません！",
    P10014: "クエリデバイスを空にすることはできません！",
    P10015: "コストタイプが間違っている！",
    P10016: "出荷日を空にすることはできません！",
    P10017:
      "この工程では、同じデバイス上で繰り返しアップロードすることはできません",
    P10018: "この工程コードは既に存在します。再入力してください！",
    P10019: "この工程はすでに存在します。再入力してください。",
    P10020:
      "このシーケンス番号は下になっているので、下に移動することはできません！",
    P10021:
      "このシーケンス番号は最上位になっており、上に移動することはできません！",
    P10022: "文書が存在しません",
    P10023: "文書はレビュー済みで拒否できません！",
    P10024: "文書を編集している人がいます！",
    P10025: "文書の状態が異常で、撤回できません！",
    P10026: "単位は空にできません！",
    P10027: "単位名を空白にすることはできません！",
    P10028: "単位名は重複できません！",
    P10029:
      "現在の製造オーダステータスはレビュー済みではなく、完了できません！",
    P10030: "現在の工程ステータスではインバウンドは許可されていません",
    P10031: "現在のページ番号は0にできません",
    P10032: "現在の状態を取り消すことはできません！",
    P10033: "現在の状態を無効にすることはできません！",
    P10034: "工程明細を空にすることはできません！",
    P10035:
      "工程連番デバイスリソースグループにこのデバイスが含まれていません。デバイスを再選択してオンラインにしてください",
    P10036: "工程がダウンしていないので、先にダウンしてください",
    P10037: "工程予定工数は0にできません！",
    P10038: "工程ステータスはインバウンドではなく、削除できません",
    P10039: "工程状態は受入待ちではなく、外注できない",
    P10040: "工程ステータスが一時停止中ですので、先に完了してください",
    P10041: "工程生産資源グループを空にすることはできません：",
    P10042: "会社の略称は重複してはいけません！",
    P10043: "会社のフルネームは重複できません！",
    P10044: "仕入先番号を空にすることはできません！",
    P10045: "ベンダーの略称を空白にすることはできません！",
    P10046: "計画納期を空白にすることはできません！",
    P10047: "計画終了を空にすることはできません！",
    P10048: "計画開始を空にすることはできません！",
    P10049: "加工工程は存在しません！",
    P10050: "略称は修正できません！",
    P10051: "略称を空にすることはできません！",
    P10052: "略称は重複してはいけません！",
    P10053: "役割はすでに存在します。再入力してください！",
    P10054: "終了日を空白にすることはできません！",
    P10055: "進捗は0以上100以上ではいけません!",
    P10056: "古いパスワードの入力ミスです!",
    P10057: "開始日が終了日より大きくなってはいけません!",
    P10058: "開始日を空にしてはいけません!",
    P10059: "お客様番号を空にしてはいけません!",
    P10060: "お客様番号の重複は不可です!",
    P10061: "お客様略称は修正できません!",
    P10062: "お客様略称を空にしてはいけません!",
    P10063: "お客様略称は繰り返してはいけません!",
    P10064: "在庫は0より小さくてはいけません。",
    P10065: "部品番号を空にしてはいけません!",
    P10066: "部品番号はあります",
    P10067: "部品名を空白にすることはできません！",
    P10068: "部品詳細を空にすることはできません！",
    P10069: "ピックカテゴリを空にすることはできません！",
    P10070: "名前を空白にすることはできません！",
    P10071: "詳細計画の終了を空にすることはできません！",
    P10072: "詳細計画の開始を空にすることはできません！",
    P10073: "テンプレートプロセスの内容を空にすることはできません！",
    P10074: "テンプレート名を空白にすることはできません！",
    P10075: "モデル番号が正しくありません！",
    P10076: "金型番号を空白にすることはできません！",
    P10077: "この文書を取り消す権限はありません！",
    P10078: "この文書を破棄する権限はありません！",
    P10079: "この文書を拒否する権限はありません！",
    P10080: "この文書を削除する権限がありません！",
    P10081: "この文書をレビューする権限がありません！",
    P10082: "この文書を発行する権限がありません！",
    P10083: "この文書を無効にする権限はありません！",
    P10084: "インベントリ番号が使用されています",
    P10085: "インベントリ番号が使用されています",
    P10086: "インベントリ番号が重複しています",
    P10087: "加工順に入力してください!",
    P10088: "画像フォーマットをアップロードしてください!",
    P10089: "正しい実際の終了時間を入力してください!",
    P10090: "加工する工程を選択してください!",
    P10091: "変更する情報を選択してください",
    P10092: "権限が不足しています!",
    P10093: "タスクは存在しません",
    P10094: "製造オーダー工程は空にできません!",
    P10095: "オンラインで取得された文書番号は空にすることはできません！",
    P10096: "アップタイム従業員とダウンタイム従業員は一致しません！",
    P10097: "監査データを空にすることはできません",
    P10098: "製造オーダー計画終了日を空白にすることはできません！",
    P10099: "製造オーダー計画開始日を空白にすることはできません！",
    P10100: "実際の終了時間は実際の開始時間より小さくすることはできません!",
    P10101: "最初のサンプル日を空白にすることはできません!",
    P10102: "送信者を空にすることはできません!",
    P10103: "呼び出し倉庫を空にすることはできません!",
    P10104: "転入倉庫を空にすることはできません!",
    P10105: "返品日を空白にすることはできません!",
    P10106: "現在のサイトに入っていません",
    P10107: "購買仕入先情報が見つかりません!",
    P10108: "この工程のアップロードレコードが見つかりません!",
    P10109: "工程が見つかりません!",
    P10110: "工程情報が見つかりません!",
    P10111: "オフライン可能な工程情報が見つかりません!",
    P10112: "モールド情報が見つかりません!",
    P10113: "モールド情報が見つかりません!",
    P10114: "製造オーダー工程情報が見つかりません!",
    P10115: "デバイス情報が見つかりません!",
    P10116: "デバイス情報が見つかりません!",
    P10117: "製造オーダー情報が見つかりません!",
    P10118: "品目情報が見つかりません!",
    P10119: "プロジェクト情報が見つかりません!",
    P10120: "販売顧客情報が見つかりません!",
    P10121: "完了工程情報が見つかりません!",
    P10122: "ユーザー情報が見つかりません!",
    P10123: "サイト照合工程が見つかりません!",
    P10124: "ファイルサイズは8M以内!",
    P10125: "新規モデルタスクを削除できません",
    P10126: "新しいモデルタスクを追加できません",
    P10127: "品目番号を空白にすることはできません!",
    P10128: "品目番号はすでに存在します。再入力してください!",
    P10129: "品目カテゴリ名を空白にすることはできません!",
    P10130: "品目カテゴリ名は重複できません!",
    P10131: "品目に在庫情報がありません",
    P10132: "資材所要量は処理されており削除できません",
    P10133: "資材所要量ステータスエラー",
    P10134:
      "資材所要量ステータスが間違っています。処理する資材所要量を選択してください!",
    P10135: "システムがビジーなので、後で再試行してください！",
    P10136: "ダウンマシン収集明細データを空にすることはできません!",
    P10137: "プロジェクト番号を空にすることはできません!",
    P10138: "プロジェクト工程はすでに存在します。再入力してください!",
    P10139: "プロジェクト工程はすでに存在します。再入力してください!",
    P10140: "プロジェクト番号とモデル番号を同時に空にすることはできません！",
    P10141: "プロジェクト名は重複できません!",
    P10142: "新規モデル製造オーダーの請求または未監査!",
    P10143: "ページサイズは0にできません",
    P10144:
      "デバイスの最大同時加工数に達しており、アップロードを続行できません！",
    P10145: "インバウンドしました。繰り返しインバウンドしないでください!",
    P10146: "ユーザー番号が存在しません",
    P10147: "ユーザー番号はすでに存在します。再入力してください！",
    P10148: "ユーザー名を空白にすることはできません！",
    P10149: "ユーザー名はすでに存在します。再入力してください！",
    P10150: "ユーザー名はすでに存在します。再入力してください！",
    P10151: "ユーザーとパスワードが一致しません。再入力してください！",
    P10152: "同じ金型加工セットの部品しか選択できません",
    P10153:
      "繰り返しダウンまたは工程状態が間違っている、またはダウンデバイスが間違っている",
    P10154: "リソースグループを空にすることはできません!",
    P10155: "リソースグループは重複できません!",
    P10156: "合計比率は100%を超えてはならない!",
    P10157: "公開に成功しました!",
    P10158: "変更に成功しました!",
    P10159: "新規成功!",
    P10160: "削除に成功しました!",
    P10161: "保存に成功しました!",
    P10162: "コミット成功!",
    P10163: "レビュー成功!",
    P10164: "撤回成功!",
    P10165: "無効化成功!",
    P10166: "拒否成功!",
    P10167: "ログアウトに成功しました!",
    P10168: "インバウンド成功!",
    P10169: "ダウンマシン成功!",
    P10170: "オンライン成功!",
    P10171: "検査完了!",
    P10172: "仕事が成功したことを報告する!",
    P10173: "更新に成功しました!",
    P10174: "有効",
    P10175: "非アクティブ",
    P10176: "アップロードに成功しました!",
    P10177: "数量は0より大きい必要があります",
    P10178: "同期成功!",
    P10179: "BOMは関連付けられており削除できません",
    P10180: "このデバイスは既に存在します。再入力してください!",
    P10181: "このデバイス名は既に存在します。再入力してください!",
    P10182: "文書状態異常、編集できません!",
    P10183: "重複して提出しないでください！",
    P10184: "共有鍵は存在しません！",
    P10185: "共有鍵の有効期限が切れました！",
    P10186: "削除できません!",
    P10187: "単位が存在しません!",
    P10188: "現在の工程のスキップ禁止!",
    P10189: "操作に失敗しました",
    P10190: "製造オーダステータスが完了していません",
    P10191: "関連番号を空にすることはできません!",
    P10192: "データの一部が削除されていません",
    P10193: "テンプレート名は既に存在します。再入力してください!",
    P10194: "入庫可能数量が現在の数量より小さい",
    P10195: "出荷可能数量が現在の数量より小さい",
    P10196: "返品可能数量が現在の数量より小さい",
  },
  program: {
    Pr_ProcessPlanning: "プロセス設計",
    Pr_CAMTaskRecord: "プログラミングタスクレコード",
  },
  dashboard: {
    Da_ECNThisMonth: "今月中に変更する",
    Da_NewMoldThisMonth: "今月の新規モデル",
    Da_MoldCorrectionThisMonth: "今月の修型",
    Da_MoldTrialThisMonth: "今月のモデル試験",
    Da_WorkingLoadThisMonth: "今月の生産能力",
    Da_WorkingLoadLastMonth: "先月負荷",
    Da_AbnormalOfTheDepartmentQualityLast90Days: "部門品質異常（直近90日間）",
    Da_ProcessReworkLast90Days: "工程再加工（過去90日間）",
    Da_MonthlyQualityTrendChart: "月品質トレンド図",
    Da_Workbench: "ワークベンチ",
  },

  systemSetupData: {
    JV_APS: "じどうはいち",
    Basics: "基礎知識",
    Design: "せっけい",
    Project: "プロジェクト",
    Production: "せいさん",
    Auto_create_pr_on_NSM_name:
      "非標準品目の購買依頼を自動的に作成できるかどうか",
    Auto_create_pr_on_NSM_desc:
      "非標準品目の購買依頼を自動的に作成できるかどうか",
    Auto_create_pr_on_SM_name: "標準品目の購買依頼を自動的に作成できますか",
    Auto_create_pr_on_SM_desc: "標準品目の購買依頼を自動的に作成できますか",
    Bom_default_unit_name: "BOMのデフォルト単位のインポート",
    Default_display_level_of_BOM: "デフォルトの展示レベル",
    Auto_Create_Trial_Tooling_Task: "モデリングタスクの自動作成",
    Bom_default_unit_desc: "BOMインポート時のデフォルト単位",
    Can_skip_station_name: "ジャンプ可能かどうか",
    Can_skip_station_desc: "労働時間中にジャンプできるかどうかを報告する",
    Design_users_name: "設計ユーザー",
    Design_users_desc: "タスクプレゼンテーションの設計者",
    Open_confirmation_of_production_quantity_name: "生産数量の確認が必要",
    Open_confirmation_of_production_quantity_desc:
      "インバウンド時とインバウンド時に部品数を入力する必要がある",
    Program_users_name: "プログラミングユーザ",
    Program_users_desc: "プログラミングタスクプレゼンテーションの担当者",
    Standard_employee_work_time_name: "従業員標準勤務時間",
    Standard_employee_work_time_desc: "従業員の1日の勤務時間（時間単位）",
    User_station_name: "ユーザーサイト",
    User_station_desc: "ユーザーサイトの構成",
    Ftp_file_management_admin_name: "プロジェクトファイル管理者ロールの設定",
    Ftp_file_management_admin_desc:
      "この役割は、プロジェクトファイルのルートディレクトリに読み書きアクセス権を持つことができます ",
    Ftp_file_management_backup_path_name:
      "プロジェクトファイルのバックアップパス",
    Ftp_file_management_backup_path_desc:
      "プロジェクトファイルはこのパスにバックアップされます",
    Ftp_file_management_path_name: "プロジェクトファイルパス",
    Ftp_file_management_path_desc:
      "プロジェクトファイルはこのパスに保存されます",
    Prohibit_skip_station_processes: "スキップ禁止プロセス",
    Create_purchase_request_below_safety_stock: "安全在庫下の購買要求の作成",
    User_web_socket: "ユーザメッセージプッシュ構成",
    User_web_socket_desc: "ユーザーがメッセージを受け入れるかどうか",
    Aps_ordinary_bill_process_post_time_coefficient: "Aps普通手形処理後時間係数",
    Aps_urgent_bill_process_post_time_coefficient: "Aps緊急手形処理後時間係数",
    Aps_extra_urgent_bill_process_post_time_coefficient: "Aps超急手形処理後時間係数",
    Aps_ordinary_bill_process_lead_time_coefficient: "Aps普通手形処理リードタイム係数",
    Aps_urgent_bill_process_lead_time_coefficient: "Aps緊急手形処理リードタイム係数",
    Aps_extra_urgent_bill_process_lead_time_coefficient: "Aps超緊急手形処理リードタイム係数",
  },

  ...jaLocale,
};
export default ja;
