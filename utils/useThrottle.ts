/**
 * 节流函数，对普通方法进行包装，使其拥有节流功能。
 * @param {function} fn 需要设置节流的方法
 * @param {number} interval 间隔时间
 * @returns {function} 返回一个被防抖包装过的fn
 */

import { useMemo } from "react";
import { throttle } from "./throttle";

// interval 间隔时间，也就是cd的长短

export function useThrottle<T>(fn: T & Function, delay: number = 1000): T {
	if (typeof fn !== "function") {
		throw new TypeError("Expected a function");
	}
	return useMemo(() => {
		return throttle(fn, delay);
	}, [delay]);
}
