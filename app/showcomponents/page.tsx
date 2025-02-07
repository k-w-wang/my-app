import CommentInput from "@/components/CommentInput";
import Donation from "@/components/Donation";
import Timeline from "@/components/Timeline";
import { Form, Button, Space, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const ShowComponents: React.FC = () => {
	const onPost = (value: string) => {
		console.log(value);
	};

	const onFinish = (values: unknown) => {
		console.log("Success:", values);
	};

	const items = [
		{
			label: "居民",
			date: "2020-12-21 22:22:22",
			children: "Create a services site 2015-09-01",
		},
		{
			label: "居民",
			date: "2020-12-21 22:22:22",
			children:
				"Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01Solve initial network problems 2015-09-01",
		},
		{
			label: "居民",
			date: "2020-12-21 22:22:22",
			children: "Technical testing 2015-09-01",
		},
		{
			label: "居民",
			date: "2020-12-21 22:22:22",
			children: "Network problems being solved 2015-09-01",
		},
	];

	return (
		<Space direction="vertical">
			<Title level={3}>输入框组件</Title>
			<div>
				<CommentInput
					placeholder="add commnt"
					onPost={onPost}
					imgUrl="https://p3-passport.byteimg.com/img/user-avatar/dbe68af40bc02e65b8f1ff4a191c1ad8~100x100.awebp"
				/>
			</div>

			<Title level={3}>表单组件</Title>

			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				// initialValues={{ donation: { price: 12, currency: "$" } }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="Donation"
					name="donation"
					// initialValue={{  price: 0, currency: "$"  }}
					rules={[{ required: true, message: "Please input your Donation!" }]}
				>
					<Donation />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>

			<Title level={3}>时间轴组件</Title>

			<div style={{ width: 500 }}>
				<Timeline items={items} />
			</div>
		</Space>
	);
};

export default ShowComponents;
