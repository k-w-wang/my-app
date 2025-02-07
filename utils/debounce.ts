/**
 * 防抖函数，对普通方法进行包装，使其拥有防抖功能。
 * @param {function} fn 需要设置防抖的方法
 * @param {number} delay 延时时间
 * @param {boolean} immediately 是否立即触发一次
 * @returns {function} 返回一个被防抖包装过的fn
 */

export function debounce<T>(
	fn: T & Function,
	delay: number = 1000,
	immediately: boolean = false
): T {
	if (typeof fn !== "function") {
		throw new TypeError("Expected a function");
	}
	// 存储定时器
	let timer: null | NodeJS.Timeout = null;

	let flag: boolean = false;

	return function (this: unknown, ...arg: []) {
		if (timer !== null) {
			clearTimeout(timer);
		}
		if (immediately && !flag) {
			fn.apply(this, arg);

			flag = true;

			timer = setTimeout(() => {
				flag = false;
			}, delay);
		} else {
			timer = setTimeout(() => {
				fn.apply(this, arg);
				flag = false;
			}, delay);
		}
	} as T;
}
