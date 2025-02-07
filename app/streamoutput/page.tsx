'use client';
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
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
	}, [string]);

	return (
		<FlickerCursorWapper isFlicker={isrunning}>
			<Markdown
				
			>
				{markdownStr}
			</Markdown>
		</FlickerCursorWapper>
	);
}
