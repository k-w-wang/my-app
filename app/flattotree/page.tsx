'use client'
import React, { useState } from "react";
import { Button, Input, message, Space, Table, Typography } from "antd";
import { flatToTree } from "../../utils/flatToTree";
const { Title } = Typography;
const initFlat = [
	{
		id: 1,
		pId: 0,
	},
	{
		id: 2,
		pId: 1,
	},
	{
		id: 3,
		pId: 2,
	},
	{
		id: 6,
		pId: 1,
	},
	{
		id: 4,
		pId: 0,
	},
	{
		id: 5,
		pId: 4,
	},
];

const FlatToTree: React.FC = () => {
	const [flat, setFlat] = useState(() => {
		return JSON.stringify(initFlat, null, 4);
	});

	const [arr, setArr] = useState<string>();

	const textAreaChange: (value: string) => void = (value) => {
		setFlat(value);
	};

	const onClick: () => void = () => {
		try {
			const newTree = JSON.parse(flat);
			const newFlat = flatToTree(newTree);
			setArr(JSON.stringify(newFlat, null, 4));
		} catch (error) {
			console.log(error);
			void message.error((error as { message: string }).message);
		}
	};

	const dataSource = [
		{
			key: "1",
			params: "arrs",
			explain: "必填，需要转化的数组数据",
			type: "arr[] ",
			default: "-",
		},
		{
			key: "2",
			params: "uniqueKey",
			explain: "可选项, 数组中数据的唯一值的key",
			type: "string",
			default: "id",
		},
		{
			key: "3",
			params: "pId",
			explain: "可选项, 数组中表示所属父节点的key",
			type: "string",
			default: "pId",
		},
		{
			key: "4",
			params: "childKey",
			explain: "可选项, 转化出来存放子节点的key",
			type: "string",
			default: "children",
		},
	];

	const columns = [
		{
			title: "参数",
			dataIndex: "params",
			key: "params",
		},
		{
			title: "说明",
			dataIndex: "explain",
			key: "explain",
		},
		{
			title: "类型",
			dataIndex: "type",
			key: "type",
		},
		{
			title: "默认值",
			dataIndex: "default",
			key: "default",
		},
	];

	return (
		<Typography>
			<Title>FlatToTree</Title>
			<Title level={5}>
				FlatToTree是一个把数组结构转化为嵌套树结构的方法。
			</Title>
			<Title level={3}>代码演示</Title>
			<Title level={4}>基础用法</Title>
			<Space>
				<Input.TextArea
					style={{ width: 400 }}
					rows={30}
					onChange={(e) => textAreaChange(e.target.value)}
					value={flat}
				/>
				<Button type="primary" onClick={onClick}>
					转化
				</Button>
				<Input.TextArea
					style={{ width: 400 }}
					rows={30}
					// onChange={(e) => textAreaChange(e.target.value)}
					value={arr}
				/>
			</Space>
			<Title level={3}>API</Title>

			<pre>
				<Typography.Text code>
					{
						"flatToTree(arrs: any[], uniqueKey?: string, pId?: string, childKey?: string): any[]"
					}
				</Typography.Text>
			</pre>
			<Title level={3}>Params</Title>
			<Table dataSource={dataSource} columns={columns} pagination={false} />
		</Typography>
	);
};
export default FlatToTree;
