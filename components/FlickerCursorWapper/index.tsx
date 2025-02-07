import getlastTextNode from "@/utils/getlastTextNode";
import React, { useEffect, useRef } from "react";
function FlickerCursorWapper({
	children,
	isFlicker,
}: {
	children: React.ReactNode;
	isFlicker: boolean;
}) {
	const markdownRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (markdownRef.current != null && isFlicker) {
			// 监听节点变化
			const observer = new MutationObserver(() => {
				const lastTextNode = getlastTextNode(markdownRef.current as Element);
				console.log(lastTextNode);
				
				if (lastTextNode != null) {
					const range = document.createRange();
					range.setStart(lastTextNode, lastTextNode.length - 1);
					range.setEnd(lastTextNode, lastTextNode.length);
					const textRect = range.getBoundingClientRect();

					const contentRect = (
						markdownRef.current as Element
					).getBoundingClientRect();
					const x = textRect.x - contentRect.x;
					const y = textRect.y - contentRect.y;
					if (cursorRef.current != null) {
						cursorRef.current.style.transform = `translate(${
							x + textRect.width
						}px, ${y}px)`;
						cursorRef.current.style.height = `${textRect.height}px`;
					}
				}
			});
			console.log(markdownRef.current);
			
			observer.observe(markdownRef.current as Node, { attributes: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true });
			return () => {
				observer.disconnect();
			};
		}
	}, [isFlicker]);

	return (
		<div className="relative">
			<div id="markdown" ref={markdownRef}>
				{children}
			</div>
			{isFlicker && (
				<div
					className="absolute top-0 left-0 leading-5 w-0.5 bg-black animate-flicker"
					ref={cursorRef}
				/>
			)}
		</div>
	);
}

export default FlickerCursorWapper;
