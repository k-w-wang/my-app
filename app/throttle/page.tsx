"use client"
import React, { useState } from "react";
import { Button, Card, Input, Space, Table, Typography } from "antd";
import { useThrottle } from "../../utils/useThrottle";

const { Title } = Typography;

const Throttle: React.FC = () => {
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
			explain: "可选项, 间隔时长",
			type: "number",
			default: "1000",
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
			<Title>Throttle</Title>
			<Title level={5}>
				Throttle节流函数，对方法进行加工，使其拥有节流功能。
			</Title>
			<Title level={3}>代码演示</Title>

			<Title level={4}>设置等待时长</Title>
			<SetDelayUsage />

			<Title level={3}>API</Title>

			<pre>
				<Typography.Text code>
					{"function throttle<T>(fn: T & Function, delay?: number): T"}
				</Typography.Text>
			</pre>
			<Title level={3}>Params</Title>
			<Table dataSource={dataSource} columns={columns} pagination={false} />
		</Typography>
	);
};

const SetDelayUsage: React.FC = () => {
	const [count, setCount] = useState(0);
	const [delay, setDelay] = useState(1000);

	// const onClick = useMemo(() => {
	// 	return throttle(
	// 		() =>
	// 			setCount((prevState) => {
	// 				return prevState + 1;
	// 			}),
	// 		delay
	// 	);
	// }, [delay]);
	const onClick = useThrottle(
		() =>
			setCount((prevState) => {
				return prevState + 1;
			}),
		delay
	);

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
						<Button onClick={onClick}>节流 + 1</Button>
					</Space>
				</Space>
			</Space>
		</Card>
	);
};

export default Throttle;
