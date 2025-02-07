/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 嵌套树形结构转化为数组结构
 * @param arr 需要转化的树型结构数组
 * @param pId 默认最外层的父级ID
 * @param pKey 数据中的唯一key，如id，
 * @param childKey 树形结构包含子级数据的key，如children
 * @returns 返回一个一维数据
 */
export const nestedToFlat: (
	arr: any[],
	pId?: number | string,
	pKey?: string,
	childKey?: string
) => any[] = (arr, pId = 0, pKey = "id", childKey = "children") => {
	return [].concat(
		...arr.map((item) => {
			const temp = JSON.parse(JSON.stringify(item[childKey]));
			Reflect.deleteProperty(item, childKey);
			return [].concat(
				{ ...item, pId },
				...nestedToFlat(temp, item[pKey], pKey, childKey)
			);
		})
	);
};
