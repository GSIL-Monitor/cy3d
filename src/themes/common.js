import { POSITION, ORIENTATION } from "../const"
/*
general: 通用设置
	colors: 颜色取色板，图表中的颜色从该列表中选取
	background: 图表的背景颜色，和css中background的所有类型设置
	padding: 图表区域距离整个canvas区域的边距

title: 标题组件选项
	text: {string} 显示文字
	color: {string} 文字颜色
	fontSize: {number} 字体大小
	fontFamily: {string} 字体类型
	x: {string} 水平位置，参见POSITION常量
	y: {string} 垂直位置，参见POSITION常量

legend: 图例组件选项
	show: {boolean} 是否显示
	data: {Array} 图例内容数组，数组项为{string}，每一项代表一个serie的name
*/


export default {
	//主题名字
	themeName: 'common',

	//通用选项
	general: {
		colors: [ //颜色列表，绘制的图表颜色从七种选取
			'#5ab1ef',
			'#b6a2de',
			'#2ec7c9',
			'#ffb980',
			'#d87a80',
			'#8d98b3',
			'#e5cf0d',
			'#97b552',
			'#95706d',
			'#dc69aa'
		],
		background: '#fff', //图表背景颜色
		padding: 70, //图表内容padding
		amLightColor: 0xcccccc, //环境光照颜色
		diLightColor: 0xcccccc, //平行光照颜色
		diLightIntensity: 0.2 //平行光照强度
	},

	//标题组件选项
	title: {
		text: '', //标题内容
		color: '#222', //标题颜色
		fontSize: 20, //标题字体大小
		fontFamily: 'Arial', //标题font-family
		x: POSITION.CENTER, //标题水平方向位置
		y: POSITION.TOP, //标题垂直方向位置
		subTitleText: '', //子标题内容
		subTitleColor: '#888', //子标题颜色
		subTitleFontSize: 15 //子标题字体大小
	},

	//图例组件选项
	legend: {
		fontSize: 14, //图例字体大小
		fontFamily: 'Arial', //图例字体family
		x: POSITION.CENTER, //图例水平方向所在位置
		y: POSITION.BOTTOM, //图例垂直方向所在位置
		orient: ORIENTATION.HORIZONTAL, //图例内容排列方向
		textColor: "#444", //图例文字颜色
		itemGap: 10, //图例item之前间隔距离
		items: [] //图例列表
	},

	//坐标轴组件选项
	axis: {
		color: '#e0e0e0', //坐标轴颜色
		yGridNum: 5, //坐标轴y轴格子数量
		fontSize: 12, //坐标轴文字字体大小
		fontFamily: 'Arial', //坐标轴文字字体family
		fontColor: "#333", //坐标轴文字字体颜色
		zLen: 60 //坐标轴上z轴长度
	},

	//柱状图柱体组件选项
	box: {
		highLightColorOffset: 0.1, //鼠标hover透明度变化
		opacity: 0.7 //柱体透明度
	},

	//折线图折线组件选项
	segment: {
		highLightColorOffset: 0.1, //鼠标hover透明度变化
		ptRadius: 10, //折线图上球的半径长度
		opacity: 0.7 //折线组件透明度
	},

	//提示组件选项
	tooltip: {
		background: "rgba(0, 0, 0, 0.6)", //提示窗背景颜色
		color: "white", //提示文字字体颜色
		fontSize: 12 //提示文字字体大小
	},

	//扇形组件选项
	sector: {
		highLightColorOffset: 0.05, //鼠标hover透明度变化
		cylinderHeight: 50, //扇形高度
		opacity: 0.7 //扇形组件透明度
	},

	//关系图组件选项
	relation: {
		node: { //节点选项
			color: "#000", //节点颜色
			size: 10, //节点球体半径
			opacity: 0.3 //节点球体透明度
		},
		line: { //关系选项
			color: "#cecece", //关系颜色值
			size: 3, //
			opacity: 0.9 //关系连线透明度
		},
		tooltip: { //提示信息选项
			color: "#fff", //提示信息文字颜色
			background: "#000", //提示信息背景颜色
			fontSize: "14px", //提示信息字体大小
			padding: "4px 10px", //提示信息padding值
			borderRadius: "3px" //提示信息窗口border radius大小
		}
	},

	//标签云图组件选项
	tagCloud: {
		controlMode: "mouse", //控制方式，拖拽控制 "drag"，或鼠标控制 "mouse"
		shape: "sphere", // 标签云形状 球体"sphere" 水平圆柱体"hcylinder" 垂直圆柱体 "vcylinder" 水平环 "hring" 垂直环 "vring"
		textColor: "#000000", //字体颜色
		shadowColor: "#000", //字体阴影颜色
		shadowEnabled: false, //是否显示字体阴影
		fontRange: [14, 100], //字体大小范围
		weightMode: "sizeAndColor", //权重模式 只显示大小 "size" 只显示颜色 "color" 显示字体和大小 "sizeAndColor"
		weightColors: {0:'#f00', 0.33:'#ff0', 0.66:'#0f0', 1:'#00f'}, //权重颜色变化值
	},

	//雷达图组件选项
	spider: {
		highLightColorOffset: 0.1, //鼠标hover高亮透明度变化值
		ringNums: 4, //雷达图底盘环个数
		ringColor: "#333", //雷达图底盘环颜色
		ringOpacity: 1, //雷达图底盘环透明度
		ringOutlineColor: "#eee", //雷达图底盘环边框颜色
		ringOutlineOpacity: 1, //雷达图底盘环边框透明度
		fontSize: 16, //雷达图字体大小
		fontFamily: 'Arial', //雷达图字体family
		fontColor: "#222", //雷达图字体颜色
		ptRadius: 10, //雷达图上点(球体)半径
		ptOpacity: 0.9, //雷达图上点(球体)颜色透明度
	}
}

