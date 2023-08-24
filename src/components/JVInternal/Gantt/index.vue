<!--
 * @Author: your name
 * @Date: 2021-08-05 16:51:37
 * @LastEditTime: 2022-01-14 11:00:42
 * @LastEditors: Please set LastEditors
 * @Description: 甘特图
 * @FilePath: \vue-element-admin-master\src\views\clipboard\components\Gantt.vue
-->
<template>
	<div style="height: 100%;">
		<div ref="gantt" style="height: 100%;min-height: calc(100vh - 180px);" />
		<JvDialog :title="dialogTitle" @confirm="confirm" width="35%" :visible.sync="dialogVisible">
			<JvForm :formObj="formObj">
				<!-- 选择人员部门 -->
				<template #Submitter="{ prop }">
					<el-select v-model="formObj.form[prop]" filterable @change="changeSubmitter">
						<el-option v-for="item in SubmitterData" :key="item.UserName" :label="item.UserName"
							:value="item.UserName">
						</el-option>
					</el-select>
				</template>
			</JvForm>
		</JvDialog>
	</div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
// import { gantt } from '@/views/basicModule/demo/dhtmlx-gantt/codebase/sources/dhtmlxgantt'
import { Form } from "@/jv_doc/class/form";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import zoomConfig from './zoomConfig'
import headerColumns from './columns';
// import data from "@/views/basicModule/demo/Test10/data";
import { timeFormat } from "@/jv_doc/utils/time";
export default {
	name: "index",
	props: {
    readonly: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default() {
        return headerColumns
      }
    },
		formSchema: {
			type: Array,
			default() {
				return [];
			},
		},
		api: {
			type: Function,
			default() {
				return () => { }
			}
		},
    _arguments: {
      type: Object,
      default() {
        return {}
      }
    },
		foldoRunfoldFlag: {
			type: Number,
			default: NaN
		},
		dragProgress: {
			type: Boolean,
			default: false
		},
		tooltip: {
			type: Boolean,
			default: false,
		},
		rowHeight: {
			type: Number,
			default: 50,
		},
		barHeight: {
			type: Number,
			default: 36,
		},
    unitValue: {
      type: String,
      default: 'day',
    },
    getData: {
      type: Function,
      default: () => []
    }
	},
	data() {
		return {
      tasks: {data: [],links: []},
			dialogTitle: '标题',
			dialogVisible: false, // 弹窗状态
			currentId: 0, // 当前选中的ID
			timeout: null, // 用来做防抖
			formObj: {},
			SubmitterData: [],
			oldDateList: [], // 原数据的时间列表
			isConfrim: false, // 如果用户刚拖动了任务条，做出了是否更新操作后，阻止再次触发监听
			unitOptions: [{
				value: 'year',
				label: i18n.t('Generality.Ge_Year')
			}, {
				value: 'quarter',
				label: i18n.t('Generality.Ge_Quarter')
			}, {
				value: 'month',
				label: i18n.t('Generality.Ge_Month')
			}, {
				value: 'week',
				label: i18n.t('Generality.Ge_Week')
			}, {
				value: 'day',
				label: i18n.t('Generality.Ge_Day')
			}, {
				value: 'hour',
				label: i18n.t('Generality.Ge__Hour')
			}, {
				value: 'minute',
				label: i18n.t('Generality.Ge_Minute')
			}],
		}
	},
	async created() {
		this.formObj = new Form({
			formSchema: this.formSchema,
			baseColProps: {
				span: 24,
			},
			// gutter: 30,
			labelWidth: "80px",
		});
		const SubmitterFlag = this.formSchema.some(item => {
			return item.prop === 'Submitter'
		})
		if (SubmitterFlag) {
			await this.Configuration();
		}
	},
	mounted() {
		// gantt.setSizes();
		this.GetData();
	},
	watch: {
		tasks: {
			deep: true,
			handler() {
				this.tasks.data.forEach(item => {
					this.oldDateList.push({
						start_date: item.start_date,
						end_date: item.end_date,
						progress: item.progress,
					})
				})
			},
			immediate: true
		}
	},
	methods: {
		GetData() {
			this.onTaskClick(); // 单击事件
			this.onTaskDblClick(); // 双击事件
			// this.onTaskDrag(); // 拖动事件
			// 任务更新前
			gantt.attachEvent("onBeforeTaskUpdate", (id, new_item) => {
        if (this.isConfrim) return
				var task = gantt.getTask(id);
				this.$confirm('您当前修改了数据，是否提交修改?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.setGanttUpdate(true); //甘特图数据更新
				}).catch(() => {
          this.isConfrim = true;
					task.start_date = new Date(this.oldDateList[new_item.$index].start_date);
					task.end_date = new Date(this.oldDateList[new_item.$index].end_date);
					task.progress = this.oldDateList[new_item.$index].progress
					gantt.updateTask(id);
					// this.setLinks();
					let timer = setTimeout(() => {
						this.isConfrim = false;
            clearTimeout(timer)
					},10)
				})
			});
			// // 任务更新后
			gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
				// console.log('id, item::: ', id, item);
			});
			gantt.attachEvent("onLinkCreated", (link) => { // 创建链接
				// console.log('link::: ', link);
				return true;
			})
			gantt.attachEvent("onLinkClick", function (id, e) { // 链接单击
				// console.log('e::: ', e);
				// console.log('id::: ', id);
			});
			// 页面进来可能甘特图还未挂载完毕，定个延时器，延迟设置links
			// let timer = setTimeout(() => {
			// 	this.setLinks();
			// 	clearTimeout(timer);
			// }, 100);
			// 监听浏览器窗口变化，重新设置links
			// window.onresize = () => {
			// 	this.debounce(this.setLinks, 300)
			// }
			gantt.attachEvent("onGanttScroll", (left, top) => {
				this.debounce(this.setPreview, 200)
			});
			this.ganttConfig(); // 甘特图的配置和初始化
		},
		confirm() {
			let that = this;
			var task = gantt.getTask(that.currentId);
			const Maps = {
				IsOpen: (val) => {
					task.open = val
				},
				Title: (val) => {
					task.text = val
				},
				StartDate: (val) => {
					task.start_date = val
				},
				EndDate: (val) => {
					task.cap_plan_end = val
					task.end_date = new Date(val)
				},
				ParentId: (val) => {
					task.parent = val
				},
				Color: (val) => {
					task.color = val
				},
				Duration: (val) => {
					task.duration = val
				},
				ProcessRate: (val) => {
					task.progress = val
				},
			}
			this.formObj.validate((valid) => {
				if (!valid) return;
				// 通过formObj判断表单需要修改的数据
				Object.keys(that.formObj.form).forEach(item => {
					if (Maps[item]) {
						Maps[item](that.formObj.form[item]);
					}
				});
				this.setGanttUpdate(true); //甘特图数据更新

				// 修改完成后刷新数据
				// gantt.ext.quickInfo.hide(that.currentId);
				// gantt.ext.quickInfo.show(that.currentId);
				// // gantt.refreshTask(that.currentId);
				// gantt.updateTask(that.currentId);
				// 关闭表单弹窗
				that.dialogVisible = false;
			})
		},
		reload() {
			// gantt.clearAll();
			// this.addTodayLine();
			// gantt.parse(this.tasks);
			// gantt.render();
		},
		addTodayLine() {
			// 时间线
			//要将 Date 对象转换为字符串
			var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
			var today = new Date();
			gantt.addMarker({
				start_date: today,
				css: "today",
				text: this.$t("Generality.Ge_Today"),
				title: this.$t("Generality.Ge_Today") + ":" + date_to_str(today),
			});
		},
		debounce(func, wait) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(func, wait);
		},
		onTaskClick() {
			let that = this;
			gantt.attachEvent("onTaskClick", function (id, e) {

				that.setQuickInfo(); // 设置信息弹出框

				return true;
			});
		},
		onTaskDblClick() {
			gantt.attachEvent("onTaskDblClick", (id, e) => {
        if(this.readonly) return
				const data = this.tasks.data[id - 1];
				gantt.config.details_on_dblclick = false; // 关闭原生弹窗（灯箱）
				this.currentId = id;
				if (e.target.className.indexOf('gantt_task_content') !== -1) {
					this.dialogVisible = true;
					this.dialogTitle = data.text;
					this.setForm(data)
				}
				return true;
			});
		},
		onTaskDrag() {
			gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
				this.debounce(() => {
					// this.reload();
				}, 500);
			});
		},
		setQuickInfo() { //设置信息弹窗
			gantt.config.quickinfo_buttons = ["icon_edit"];
			gantt.$click.buttons.edit = (id) => {
				const data = this.tasks.data[id - 1]
				this.currentId = id;
				this.dialogVisible = true;
				this.dialogTitle = data.text;
				this.setForm(data)
				return false; //blocks the default behavior
			};
			// gantt.$click.buttons.delete = (id) => {
			// 	this.$confirm('确认是否删除?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		gantt.deleteTask(id);
			// 		this.$message({
			// 			type: 'success',
			// 			message: '删除成功!'
			// 		});
			// 	})
			// 	return false; //blocks the default behavior
			// };
			gantt.templates.quick_info_content = (start, end, task) => {
				return `<strong>${task.details || task.text}</strong>`;
			};
			gantt.templates.quick_info_date = (start, end, task) => {
				// console.log('start, end::: ', start, end, task);
				return `${this.formatDate(start)} - ${task.cap_plan_end}`;
			};
			gantt.templates.quick_info_title = (start, end, task) => {
				return task.text;
			};
		},
		formatDate(d) { // 时间格式转换
			var date = new Date(d);
			var YY = date.getFullYear();
			var MM =
				(date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1);
			var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			var hh =
				(date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
			var mm =
				(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
			var ss =
				date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
		},
		//选择提交人确定部门
		changeSubmitter(e) {
			this.SubmitterData.forEach((item) => {
				if (item.UserName === e) {
					this.formObj.form.Department = item.DepartmentName;
				}
			});
		},
		//获取客户Id
		async Configuration() {
			await getAllUserData({}).then((res) => {
				this.SubmitterData = res.Items;
			});
		},
		setForm(data) {
			const Maps = {
				Id: data.id,
				IsOpen: data.open,
				Title: data.text,
				StartDate: this.formatDate(data.start_date),
				EndDate: data.cap_plan_end,
				ParentId: data.parent,
				Color: data.color,
				Duration: data.duration,
				ProcessRate: data.progress,
			}
			Object.keys(this.formObj.form).forEach(item => {
				if (Maps[item]) {
					this.formObj.form[item] = Maps[item]
				}
			})
		},
		setGanttZoom(unit) { // 设置甘特图缩放级别（年月周 单位）
      gantt.ext.zoom.setLevel(unit);
			// this.setLinks();
		},
		setExpand() { // 设置全屏
			gantt.ext.fullscreen.toggle();
		},
		setGanttUpdate(flag) { // 甘特图数据更新
			this.api(this._arguments).then((res) => {
				if(flag) {
          this.$message({
          	type: 'success',
          	message: '更新成功!'
          });
        }
				let arr = this.getData(res);
        this.tasks = {
          data: [...arr]
        }
        console.log(this.tasks);

        // //加载数据
				gantt.parse(this.tasks);
        console.log(this.tasks);
				// this.setLinks(); // 设置link
			});
		},
		setLinks() { // 设置link  gantt_task_link
			let linkr = document.querySelectorAll('.gantt_task_link');
			// 创建一个tooltip节点
			let span = document.createElement('span')
			span.className = "custom-tooltip";
			// 循环link节点
			linkr.forEach((item, i) => {
				// 循环linewrapper节点
				item.childNodes.forEach((jtem, j) => {
					// 鼠标悬浮事件
					jtem.addEventListener('mouseenter', (e) => {
						// console.log('e::: ', e.offsetX,e.offsetY);
						span.innerHTML = gantt.getLink(i + 1).info;
						span.style.transform = `translateX(${e.offsetX}px)`;
						jtem.appendChild(span);
					})
				})

			})
		},
		// 甘特图配置
		ganttConfig(tasks) {
			// 日期列显示
			// gantt.config.min_column_width = 60
			// var that = this;
			if (localStorage.lang === "cn") {
				gantt.i18n.setLocale("cn");
			} else if (localStorage.lang === "en") {
				gantt.i18n.setLocale("en");
			} else {
				gantt.i18n.setLocale("ja");
			}
			// 时间轴图表中，甘特图的高度
			gantt.config.row_height = this.rowHeight;
			// 时间轴图表中，任务条形图的高度
			gantt.config.bar_height = this.barHeight;
			// 时间轴图表中，甘特图左边的宽度
			// gantt.config.grid_width = 520;

			// duration  计算值默认是1分钟
			// gantt.config.duration_step = 1;
			//按照分钟计算的
			// gantt.config.duration_unit = "minute";

			// 表头配置显示列   //name:绑定数据的名称  align：对其方式  label显示在表头的名称
			gantt.config.columns = this.columns;
			// task 任务条文本
			gantt.templates.task_text = function (start, end, task) {
				if (task.start_date !== undefined) {
					return (
						"<b><!--名称:--></b> " +
						task.text +
						"：" +
						(task.progress * 100).toFixed(2) +
						"%" /*+ ' (' + task.progress * 100 + '%)'*/
					);
				} else {
					return "<b>" + task.text + task.progress + "</b> ";
				}
			};

			// task 任务条鼠标悬浮上去数据
			gantt.templates.tooltip_text = function (start, end, task) {
				if (task.start_date !== undefined) {
					return (
						"名称" +
						"：" +
						task.text +
						"<br/>" +
						"计划开始时间" +
						"：" +
						timeFormat(task.start_date, 'yyyy-MM-dd hh:mm:ss') +
						"<br/>" +
						"计划结束时间" +
						"：" +
						task.cap_plan_end
					);
				} else {
					return "品名" + "：" + task.text;
				}
			};
			gantt.templates.timeline_cell_class = function (item, date) {
				if (date.getDay() === 0 || date.getDay() === 6) {
					return "weekend";
				}
			};
			//gantt自动扩展时间刻度以适应所有显示的任务
			gantt.config.fit_tasks = true;

			// gantt.templates.scale_cell_class = function (date) {
			// 	if (is_selected_column(date))
			// 		return "highlighted-column";
			// };
			//鼠标悬浮提示隐藏之前的时间长度
			// gantt.config.tooltip_hide_timeout = 2000;
			//本地格式化
			//gantt.i18n.setLocale('cn')
			//文件的字符串被转换为符合此模板的日期对象
			gantt.config.xml_date = "%Y-%m-%d %H:%i";
			/*激活指定的扩展,
				  tooltip:鼠标悬停的，
				  marker:标记线
				  */
			gantt.plugins({
				tooltip: this.tooltip, // 鼠标悬浮
				marker: true,
				quick_info: true,
				fullscreen: true, // 允许全屏
				// critical_path: true,
				drag_timeline: true, // 拖动时间线
			});
			// 设置时间刻度的高度和网格的标题
			gantt.config.scale_height = 50;
			// 可以通过标题拖动编辑弹窗
			gantt.config.drag_lightbox = false;
			// 可以通过拖放创建依赖链接
			gantt.config.drag_links = true;
			// 可以通过拖动进度旋钮来更改任务进度
			gantt.config.drag_progress = this.dragProgress;
			// 可以通过拖放移动任务
			gantt.config.drag_move = true;
			// 设置false ，无法拖动任务
			gantt.config.touch_drag = true;
			// 可以通过拖放来调整任务大小
			gantt.config.drag_resize = true;
			// 可读模式，不许编辑
			gantt.config.readonly = this.readonly;

			/* 缩放配置
			 * levels：缩放级别
			 * useKey：使用键盘
			 * trigger ：缩放触发器  wheel 滚轮
			 * */
			// 判断是否已经初始化过zoomConfig
			if (!gantt.ext.zoom.getLevels()) {
				gantt.ext.zoom.init(zoomConfig);
			}

			//切换到指定的缩放级别
			gantt.ext.zoom.setLevel(this.unitValue);
			gantt.init(this.$refs.gantt);
			// this.foldoRunfold(); // 赋值数据
      this.setGanttUpdate();
			gantt.render();
		},
		// 折叠展开
		foldoRunfold() {
			const arr = { data: [], links: this.tasks.links }
			if (this.$props.foldoRunfoldFlag === 1) {
				arr.data = this.tasks.data.map(item => {
					return {
						...item,
						open: true,
					}
				});

			} else if (this.$props.foldoRunfoldFlag === 0) {
				arr.data = this.tasks.data.map(item => {
					return {
						...item,
						open: false,
					}
				});
			} else {
				arr.data = this.tasks.data.map(item => {
					return { ...item }
				});
			}
			gantt.parse(arr);

		},
		// 设置预览事件
		setPreview() {
			this.tasks.data.forEach(item => {
				let preview = document.getElementById('preview' + item.id)
				if (preview) {
					preview.onclick = () => {
						console.count()
					}
				}
			})

		}
	},

};
</script>

<style lang="scss">
// @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

// @import "~dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
@import "./style.css";

.weekend {
	//background:#f4f7f4!important;
	color: red !important;
}

.gantt_selected .weekend {
	background: #f7eb91 !important;
}

.highlighted-column {
	background-color: #fff3a1;
}

// .gantt_cal_quick_info{ // 单击显示的信息弹窗
//   border-radius: 8px;
// }
// .gantt_qi_big_icon.icon_delete{ // 信息弹窗的删除按钮
//   text-shadow: none;
// }
// .gantt_qi_big_icon.icon_edit{ // 信息弹窗的编辑按钮
//   background-color: #2a9bf1!important;
// }
// .gantt_cal_quick_info .gantt_cal_qi_title .gantt_cal_qi_tdate{
//   font-size: 14px;
// }
// .gantt_cal_quick_info .gantt_cal_qi_title .gantt_cal_qi_tcontent { // 信息弹窗的标题
//     display: block;
//     margin-bottom: 10px;
//     font-weight: 600;
//     font-size: large;
// }
</style>
