'use client';
import React, { useEffect, useState } from "react";
import Markdown, { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import FlickerCursorWapper from "@/components/FlickerCursorWapper";

export default function StreamOutput() {
	const string = `~~~js
console.log('It works!')
~~~
* Lists
* [ ] todo
* [x] done

~~strikethrough~~

A table:
| name | age |
| - | - |
| John | 20 |
| Jane | 21 |
`;

	const [markdownStr, setMarkdownStr] = useState("");

	const [isrunning, setIsrunning] = useState(false);

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			setIsrunning(true);
			if (index < string.length) {
				setMarkdownStr(string.slice(0, index));
				index++;
			} else {
				setIsrunning(false);
				clearInterval(timer);
			}
		}, 10);
		return () => {
			setIsrunning(false);
			clearInterval(timer);
		};
	}, []);

	return (
		<FlickerCursorWapper isFlicker={isrunning}>
			<Markdown
				// remarkPlugins={[remarkGfm]}
				// components={{
				// 	code(
				// 		props: React.ClassAttributes<HTMLElement> &
				// 			React.HTMLAttributes<HTMLElement> &
				// 			ExtraProps
				// 	) {
				// 		const { children, className, ref, ...rest } = props;
				// 		const match = /language-(\w+)/.exec(className ?? "");
				// 		return match != null ? (
				// 			<SyntaxHighlighter
				// 				{...rest}
				// 				ref={ref as React.Ref<SyntaxHighlighter>}
				// 				PreTag="div"
				// 				language={match[1]}
				// 				style={dark}
				// 			>
				// 				{String(children ?? "").replace(/\n$/, "")}
				// 			</SyntaxHighlighter>
				// 		) : (
				// 			<code {...rest} className={className}>
				// 				{children}
				// 			</code>
				// 		);
				// 	},
				// }}
			>
				{markdownStr}
			</Markdown>
		</FlickerCursorWapper>
	);
}
