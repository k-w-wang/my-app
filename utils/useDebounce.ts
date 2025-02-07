/**
 * 防抖函数，对普通方法进行包装，使其拥有防抖功能。
 * @param {function} fn 需要设置防抖的方法
 * @param {number} delay 延时时间
 * @param {boolean} immediately 是否立即触发一次
 * @returns {function} 返回一个被防抖包装过的fn
 */

import { useMemo, useRef } from "react";

export function useDebounce<T>(
	fn: T & Function,
	delay: number = 1000,
	immediately: boolean = false
): T {
	if (typeof fn !== "function") {
		throw new TypeError("Expected a function");
	}
	// 存储定时器
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const flagRef = useRef(false);

	return useMemo(() => {
		return function (this: unknown, ...arg: []) {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
			if (immediately && !flagRef.current) {
				fn.apply(this, arg);

				flagRef.current = true;

				timerRef.current = setTimeout(() => {
					flagRef.current = false;
				}, delay);
			} else {
				timerRef.current = setTimeout(() => {
					fn.apply(this, arg);
					flagRef.current = false;
				}, delay);
			}
		} as T;
	}, [fn, delay, immediately]);
}
