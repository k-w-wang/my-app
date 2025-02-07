"use client"
import React, { useState } from "react";
import { Button, Input, message, Space, Table, Typography } from "antd";
import { nestedToFlat } from "../../utils/treeToFlat";
import CommentInput from "@/components/CommentInput";
const { Title } = Typography;
const initTree = [
	{
		id: 1,
		children: [
			{
				id: 2,
				children: [
					{
						id: 3,
						children: [],
					},
				],
			},
			{
				id: 6,
				children: [],
			},
		],
	},
	{
		id: 4,
		children: [
			{
				id: 5,
				children: [],
			},
		],
	},
];

const TreeToFlat: React.FC = () => {
	const [tree, setTree] = useState(() => {
		return JSON.stringify(initTree, null, 4);
	});

	const [arr, setArr] = useState<string>();

	const textAreaChange: (value: string) => void = (value) => {
		setTree(value);
	};

	const onClick: () => void = () => {
		try {
			const newTree = JSON.parse(tree);
			const newFlat = nestedToFlat(newTree);
			setArr(JSON.stringify(newFlat, null, 4));
		} catch (error) {
			console.log(error);
			void message.error((error as { message: string }).message);
		}
	};

	const dataSource = [
		{
			key: "1",
			params: "arr",
			explain: "必填，需要转化的嵌套树结构数据",
			type: "arr[]  ",
			default: "-",
		},
		{
			key: "2",
			params: "pId",
			explain: "可选项, 第一层节点的父节点ID",
			type: "string ｜ number",
			default: "0",
		},
		{
			key: "3",
			params: "pKey",
			explain: "可选项, 父节点id的key值",
			type: "string",
			default: "id",
		},
		{
			key: "4",
			params: "childKey",
			explain: "可选项, 嵌套的子节点key值",
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

	const onPost = (value: string) => {
		console.log(value);
	};

	return (
		<Typography>
			<CommentInput
				placeholder="add commnt"
				onPost={onPost}
				imgUrl="https://p3-passport.byteimg.com/img/user-avatar/dbe68af40bc02e65b8f1ff4a191c1ad8~100x100.awebp"
			/>
			<Title>TreeToFlat</Title>
			<Title level={5}>
				TreeToFlat是一个把嵌套树结构转化为数组结构的方法。
			</Title>
			<Title level={3}>代码演示</Title>
			<Title level={4}>基础用法</Title>
			<Space>
				<Input.TextArea
					style={{ width: 400 }}
					rows={30}
					onChange={(e) => textAreaChange(e.target.value)}
					value={tree}
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
						"nestedToFlat(arr: any[], pId?: string | number | undefined, pKey?: string | undefined, childKey?: string | undefined): any[]"
					}
				</Typography.Text>
			</pre>
			<Title level={3}>Params</Title>
			<Table dataSource={dataSource} columns={columns} pagination={false} />
		</Typography>
	);
};
export default TreeToFlat;
