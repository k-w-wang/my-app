"use client"
import React, { useState } from "react";
import CroppingText from "../CroppingText";

interface IProps {
	content: string;
	onChange?: (newList: string[]) => void;
	className?: string | undefined;
}

export default function CroppingTextWapper({
	content,
	className,
	onChange,
}: IProps) {
	const [contentList, setContentList] = useState([content]);
	const handleChange = (newList: string[], index: number) => {
		setContentList(() => {
			contentList.splice(index, 1, ...newList);
			return [...contentList];
		});
		onChange?.(contentList);
	};

	return (
		<div
			className={className}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "4px",
			}}
		>
			{contentList.map((item, index) => {
				return (
					<CroppingText
						key={item + index.toString()}
						content={item}
						onSplitChange={(newList) => handleChange(newList, index)}
					/>
				);
			})}
		</div>
	);
}
