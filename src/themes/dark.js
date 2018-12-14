import common from './common'

export default {
	...common,
	themeName: 'dark',
	general: {
		...common.general,
		background: '#222'
	},
	title: {
		...common.title,
		color: '#eee',
		subTitleColor: '#aaa'
	},
	legend: {
		...common.legend,
		textColor: "#ddd"
	},
	axis: {
		...common.axis,
		color: '#555',
		fontColor: "#eee"
	},
	box: {
		...common.box,
		opacity: 0.8
	},
	segment: {
		...common.segment,
		opacity: 0.8
	},
	sector: {
		...common.sector,
		opacity: 0.8
	},
	tooltip: {
		...common.tooltip,
		background: "rgba(255, 255, 255, 0.7)",
		color: "black",
		fontSize: 12
	},
	relation: {
		...common.relation,
		node: {
			color: "#5aa5fe",
			size: 10,
			opacity: 0.5
		},
		line: {
			color: "#cecece",
			size: 3,
			opacity: 0.9
		},
		tooltip: {
			color: "#fff",
			background: "#000",
			fontSize: "14px",
			padding: "4px 10px",
			borderRadius: "3px"
		}
	},
	tagCloud: {
		...common.tagCloud,
		textColor: "#ffffff",
		shadowColor: "#ffffff",
	},
	spider: {
		...common.spider,
		ringColor: "#ddd",
		ringOpacity: 1,
		ringOutlineColor: "#222",
		ringOutlineOpacity: 1,
		fontColor: "#ddd",
	}
}