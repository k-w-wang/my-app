'use client'
import React, { useMemo, useState } from "react";
import { Button, Card, Input, Space, Table, Typography } from "antd";
import { debounce } from "../../utils/debounce";
const { Title } = Typography;

const Debounce: React.FC = () => {
	const dataSource = [
		{
			key: "1",
			params: "fn",
			explain: "必填，需要触发的方法",
			type: "Function",
			default: "-",
		},
		{
			key: "2",
			params: "delay",
			explain: "可选项, 等待时长",
			type: "number",
			default: "1000",
		},
		{
			key: "3",
			params: "immediately",
			explain: "第一次点击是否立即触发，不等待",
			type: "boolean",
			default: "false",
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
			<Title>Debounce</Title>
			<Title level={5}>
				Debounce防抖函数，对方法进行加工，使其拥有防抖功能。
			</Title>
			<Title level={3}>代码演示</Title>
			<Title level={4}>基础用法</Title>
			<BasicUsage />

			<Title level={4}>设置等待时长</Title>
			<SetDelayUsage />

			<Title level={4}>第一次点击立即触发</Title>
			<Immediately />

			<Title level={3}>API</Title>

			<pre>
				<Typography.Text code>
					{
						"function debounce<T>(fn: T & Function, delay?: number, immediately?: boolean): T"
					}
				</Typography.Text>
			</pre>
			<Title level={3}>Params</Title>
			<Table dataSource={dataSource} columns={columns} pagination={false} />
		</Typography>
	);
};

const BasicUsage: React.FC = () => {
	const [count, setCount] = useState(0);
	const onClick = () =>
		setCount((prevState) => {
			return prevState + 1;
		});
	return (
		<Space>
			<Card>
				<Space>
					<div>count: {count}</div>
					<Space>
						<Button
							onClick={() => {
								setCount((prevState) => {
									return prevState + 1;
								});
							}}
						>
							正常 + 1
						</Button>
						<Button onClick={debounce(onClick)}>防抖 + 1</Button>
					</Space>
				</Space>
			</Card>
		</Space>
	);
};

const SetDelayUsage: React.FC = () => {
	const [count, setCount] = useState(0);
	const [delay, setDelay] = useState(1000);

	const onClick = () =>
		setCount((prevState) => {
			return prevState + 1;
		});

	return (
		<Card>
			<Space direction="vertical">
				<Input value={delay} onChange={(e) => setDelay(+e.target.value)} />
				<Space>
					<div>count: {count}</div>
					<Space>
						<Button
							onClick={() => {
								setCount((prevState) => {
									return prevState + 1;
								});
							}}
						>
							正常 + 1
						</Button>
						<Button onClick={debounce(onClick, delay)}>防抖 + 1</Button>
					</Space>
				</Space>
			</Space>
		</Card>
	);
};

const Immediately: React.FC = () => {
	const [count, setCount] = useState(0);

	const onClick = useMemo(() => {
		return debounce(
			() =>
				setCount((prevState) => {
					return prevState + 1;
				}),
			1000,
			true
		);
	}, []);

	return (
		<Card>
			<Space direction="vertical">
				<Space>
					<div>count: {count}</div>
					<Space>
						<Button
							onClick={() => {
								setCount((prevState) => {
									return prevState + 1;
								});
							}}
						>
							正常 + 1
						</Button>
						<Button onClick={onClick}>防抖 + 1</Button>
					</Space>
				</Space>
			</Space>
		</Card>
	);
};

export default Debounce;
