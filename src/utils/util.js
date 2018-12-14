/* 根据y最大值，和需要生成的y值个数，生成y坐标信息 */

export function generateYAxis (maxY, num) {
	const tempStep = maxY / num
	if (tempStep <= 0) {
		return []
	}

	let realStep = 0
	if (tempStep < 1) {
		const arr = tempStep.toString().split('.')
		const base = Math.pow(10, arr[1].length)
		const afterBaseVal = (tempStep * base).toString()
		if (afterBaseVal.length === 1) {
			realStep = tempStep
		} else {
			let subVal = parseInt(afterBaseVal.substr(1, 1))
			let realVal = parseInt(afterBaseVal.substr(0, 1))
			let realSubVal = 0

			if (afterBaseVal.length > 2) {
				subVal += 1
			}
			if (subVal === 0) {
				realSubVal = 0
			} else if (subVal <= 2) {
				realSubVal = 2
			} else if (subVal <= 5) {
				realSubVal = 5
			} else if (subVal <= 10) {
				realVal += 1
				realSubVal = 0
			}
			realStep = (realVal / 10 + realSubVal / 100) / Math.pow(10, (arr[1].length - afterBaseVal.length))
		}
	} else if (tempStep === 1) {
		realStep = 1
	} else if (tempStep < 10) {
		const arr = tempStep.toString().split('.')
		if (arr.length === 2) {
			let t1 = parseInt(arr[0].substr(0, 1))
			let t2 = parseInt(arr[1].substr(0, 1))
			if (arr[1].length > 1) {
				t2 += 1
			}
			let subt = 0
			if (t2 === 0) {
				subt = 0
			} else if (t2 <= 2) {
				subt = 2
			} else if (t2 <= 5) {
				subt = 5
			} else if (t2 <= 10) {
				t1 += 1
				subt = 0
			}
			realStep = t1
			if (subt !== 0) {
				realStep = t1 + subt / 10
			}
		} else {
			realStep = tempStep
		}
	} else {
		const arr = tempStep.toString().split('.')
		const base = arr[0].length - 1
		let first = parseInt(arr[0].substr(0, 1))
		let second = parseInt(arr[0].substr(1, 1))
		if (tempStep - first * Math.pow(10, base)
					 - second * Math.pow(10, base - 1) > 0) {
			second += 1
		}
		if (second === 0) {
			second = 0
		} else if (second <= 2) {
			second = 2
		} else if (second <= 5) {
			second = 5
		} else if (second <= 10) {
			first += 1
			second = 0
		}
		realStep = first * Math.pow(10, base) + second * Math.pow(10, base - 1)
	}

	const generatedArr = []
	for (var i=1;i<=num;i++) {
		// fix bug: 修复精确度的问题，见http://www.jb51.net/article/89420.htm
		const yVal = realStep * 100000000 * i / 100000000
		generatedArr.push(yVal)
	}
	return generatedArr
}
