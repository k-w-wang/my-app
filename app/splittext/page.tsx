import CroppingText from "@/components/CroppingText";
import CroppingTextWapper from "@/components/CroppingTextWapper";
import React from "react";


const Index: React.FC = () => {
	const [contentList, setContentList] = React.useState([
		"天壤将根据本协议约定向用户提供天壤小白的使用权及相关服务。 用户理解并认可，在天壤小白网站上注册账号时或开始使用天壤小白各功能模块等行为，表明用户同意本协议的全部内容，并将严格按照本协议约定履行协议项下全部义务。若您为未成年人，应在法定监护人监护、指导下阅读本条款，并在取得法定监护人的同意后使用天壤小白。请用户务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款，限制、免责条款将以加粗形式提示用户注意 。如果用户对本协议有任何疑问，可以通过  xiaobai@tianrang-inc.com与我们联系。本协议自用户开始使用天壤小白各功能模块时成立并开始生效。",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
		"这是一段测试文字！",
	]);
	const onSplitChange = (newContent: string[], index: number) => {
		setContentList((prevContentList) => {
			prevContentList.splice(index, 1, ...newContent);
			return [...prevContentList];
		});
	};
	return (
		<>
			<h1>V1版本</h1>
			<CroppingTextWapper
				key={"v1"}
				content="这是一段测试文字！"
				onChange={(value) => {
					console.log(value);
				}}
			/>
			<h1>V2版本</h1>
			<div
				key={"v2"}
				style={{ display: "flex", flexDirection: "column", gap: 4 }}
			>
				{contentList.map((item, index) => {
					return (
						<CroppingText
							key={item + index.toString()}
							content={item}
							onSplitChange={(value: string[]) => onSplitChange(value, index)}
						/>
					);
				})}
			</div>
		</>
	);
};
export default Index;
