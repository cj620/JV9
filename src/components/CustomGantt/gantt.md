### 自定义甘特图说明文档

|          参数          | 说明                    |       类型        | 可选值                          | 默认值                                                 |
|:--------------------:|-----------------------|:---------------:|------------------------------|-----------------------------------------------------|
|       columns        | 表头配置                  |      Array      | [{name:"",width:0,label:""}] | [ ]                                                 |
|  tableHeaderHeight   | 表格头部的高度               |     Number      | --                           | 50                                                  |
|   tableItemHeight    | 表格每一项的高度              |     Number      | --                           | 54                                                  |
|      taskHeight      | 任务条高度                 |     Number      | --                           | 50                                                  |
|   tableItemPadding   | 表格每一项的padding值        |     Number      | --                           | 8                                                   |
|      taskRadius      | 任务条圆角                 | Number / String | --                           | 任务条高度的一半                                            |
|       loading        | 加载状态                  |     Boolean     | --                           | false                                               |
|  defaultUnitOfTime   | 甘特图默认时间单位             |     String      | --                           | hour                                                |
| ganttContainerHeight | 甘特图盒子的高度              |     Number      | --                           | 650                                                 |
|      detailShow      | 是否显示表格每一项的详情展示图标      |     Boolean     | --                           | false                                               |
|    popoverOptions    | 详情popover的配置          |     Object      | --                           | {placement: "right", width: 200, trigger: "click",} |
|       padding        | 甘特图盒子的padding值        |     Number      | --                           | 0                                                   |
|    taskInnerHtml     | 任务条上的文字               |    Function     | --                           | null                                                |
|     isTaskHover      | 任务条是否可以hover          |     Boolean     | --                           | false                                               |
|     isTaskClick      | 任务条是否可以被点击            |     Boolean     | --                           | false                                               |
|    floatingWindow    | 任务条悬浮窗组件              |  组件 && Object   | --                           | null                                                |
|   popoverInnerHtml   | 任务条悬浮窗字符串模板           |    Function     | --                           | null                                                |
|   taskDialogTitle    | 任务条点击弹窗的标题，值是任务条的某个字段 |     String      | --                           | Id                                                  |

```js
// 数据格式
let result = {
  Items: [
    {
      Id: 1,
      Data: [
        {
          PlanStart: "",
          PlanEnd: "",
        },
      ],
    },
  ],
};
```
