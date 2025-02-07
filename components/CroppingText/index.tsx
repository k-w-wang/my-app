"use client"
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { debounce } from "@/utils/debounce";

interface CroppingTextProps {
	content: string;
	onSplitChange: (contentList: string[]) => void;
}
// CroppingText
// 截断文本
export default function CroppingText({
	content,
	onSplitChange,
}: CroppingTextProps) {
	const textRef = useRef<HTMLDivElement>(null);
	const positions = useRef<
		Array<{ left: number; right: number; top: number; bottom: number }>
	>([]).current;
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

	const [currentMousePosition, setCurrentMousePosition] = useState({
		x: 0,
		y: 0,
	});

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (textRef.current == null) return;
		const textNode = document.createTextNode(content);
		textRef.current?.appendChild(textNode); // 确保文本节点已经被添加到DOM中
		// 获取文本节点的位置
		const getPosttions = debounce(
			() => {
				// 获取文本节点相对于外层元素textNode的位置
				const textRefRect = textRef.current?.getBoundingClientRect();
				positions.length = 0;
				for (let index = 1; index < textNode.length; index++) {
					const range = document.createRange();
					range.setStart(textNode, index);
					range.setEnd(textNode, index + 1);
					positions.push({
						left: range.getBoundingClientRect().left - (textRefRect?.left ?? 0),
						right:
							range.getBoundingClientRect().right - (textRefRect?.left ?? 0),
						top: range.getBoundingClientRect().top - (textRefRect?.top ?? 0),
						bottom:
							range.getBoundingClientRect().bottom - (textRefRect?.top ?? 0),
					});
				}
			},
			1000,
			true
		);
		// 监听文本节点的大小变化
		const observer = new ResizeObserver(() => {
			getPosttions();
		});
		observer.observe(textRef.current);

		return () => {
			observer.disconnect();
		};
	}, [content, positions]);

	// 监听鼠标移动
	useEffect(() => {
		const textCurrentRef = textRef.current;

		textRef.current?.addEventListener("mousemove", (e) => {
			// 鼠标相当于文本节点的相对位置
			const textRefRect = textRef.current?.getBoundingClientRect();
			// 元素滚动的距离
			const textRefScrollTop = textRef.current?.scrollTop;

			setMousePosition({
				x: e.clientX - (textRefRect?.left ?? 0),
				// 鼠标相对于文本节点的相对位置
				y: e.clientY - (textRefRect?.top ?? 0) + (textRefScrollTop ?? 0),
			});
		});
		textRef.current?.addEventListener("mouseleave", () => {
			setMousePosition({
				x: 0,
				y: 0,
			});
		});
		return () => {
			textCurrentRef?.removeEventListener("mousemove", () => {
				console.log("remove mousemove");
			});
			textCurrentRef?.removeEventListener("mouseleave", () => {
				console.log("remove mousemove");
			});
		};
	}, []);

	// 根据鼠标位置判断当前是哪个文本节点
	useEffect(() => {
		if (mousePosition.x === 0 || mousePosition.y === 0) {
			setCurrentIndex(null);
			setCurrentMousePosition({
				x: 0,
				y: 0,
			});
			return;
		}
		positions.forEach((position, index) => {
			if (
				position.left <= mousePosition.x &&
				position.right >= mousePosition.x &&
				position.top <= mousePosition.y &&
				position.bottom >= mousePosition.y
			) {
				setCurrentMousePosition({
					x: position.left - 2,
					y: position.top,
				});
				setCurrentIndex(index + 1);
			}
		});
	}, [mousePosition, positions]);

	return (
		<div
			ref={textRef}
			title="点击任意位置拆分"
			className="content"
			style={{
				border: "1px dashed #3c85f0",
				padding: 4,
				maxHeight: 50,
				overflowY: "auto",
			}}
			onClick={() => {
				if (currentIndex == null) return;
				const newContent = [
					content.substring(0, currentIndex),
					content.substring(currentIndex),
				];
				onSplitChange(newContent);
			}}
		>
			{currentMousePosition.x !== 0 && currentMousePosition.y !== 0 && (
				<span
					className="content-before"
					style={{ left: currentMousePosition.x, top: currentMousePosition.y }}
				></span>
			)}
		</div>
	);
}
