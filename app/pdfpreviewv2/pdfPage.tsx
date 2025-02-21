'use client'
import Konva from "konva";
import { isEqual, range } from "lodash";
import { PageViewport, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Layer, Stage, Group } from "react-konva";
import ShowPdfCanvas from "./showPdfCanvas";

export const getPagesHeight = (pageList: PageInfo[]): number => {
	return pageList.reduce((pre, cur) => pre + (cur?.height ?? 0), 0);
};

interface PdfPageProps {
	width: number;
	height: number;
	pages: PDFDocumentProxy;
	currentPage: number;
	activePage: number;
	handleCurrentPage: (index: number) => void;
}
export type PageInfo = Record<string, number>;
const INITIAL_PAGE: PageInfo = {
	width: 0,
	height: 0,
	x: 0,
	y: 0,
};
function PdfPage({
	width,
	height,
	pages,
	currentPage,
	activePage,
	handleCurrentPage,
}: PdfPageProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<Konva.Stage>(null);
	const [scroll, setScroll] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [pageList, setPageList] = useState<PageInfo[]>([]);
	const pageListRef = useRef<PageInfo[]>(
		new Array(pages.numPages).fill(null).map(() => ({ ...INITIAL_PAGE }))
	);
	const handlePageLoad = useCallback(
		(page: PDFPageProxy, viewport: PageViewport,) => {
			// 替换当前 load page 的 Size
			pageListRef.current[page._pageIndex] = {
				...pageListRef.current[page._pageIndex],
				width: viewport.width,
				height: viewport.height,
			};

			// Stage 宽度由最大页面宽度决定
			const contentWidth = Math.max(
				...pageListRef.current.map((item) => item.width)
			);

			pageListRef.current = pageListRef.current.map((item) => {
				return {
					...item,
					width: item.width === 0 ? viewport.width : item.width,
					height: item.height === 0 ? viewport.height : item.height,
				};
			});

			// 第一次页面加载好之后预设所有页面尺寸

			pageListRef.current = pageListRef.current.map((item, index) => ({
				...item,
				x: (contentWidth - item.width) / 2, // 居中显示
				y: getPagesHeight(pageListRef.current.slice(0, index)),
			}));
			
			setPageList((prevState)=>{
				return !isEqual(pageListRef.current, prevState) ? pageListRef.current : prevState;
			});

		},
		[]
	);

	const { contentHeight, contentWidth } = useMemo(() => {
		return {
			contentHeight: pageList.reduce((pre, item) => {
				return pre + item.height;
			}, 0),
			contentWidth: Math.max(...pageList.map((item) => item.width)),
		};
	}, [pageList]);

	const handleScroll = useCallback(() => {
		if (containerRef.current == null || stageRef.current == null) {
			return;
		}

		// 计算并修改 Stage 相关属性
		const { scrollLeft, scrollTop, clientHeight } = containerRef.current;
		const stageX = scrollLeft;
		const stageY = scrollTop;
		const stageWidth = contentWidth - stageX;
		const stageHeight = clientHeight;
		stageRef.current.container().style.transform = `translate(${stageX}px, ${stageY}px)`;
		stageRef.current.container().style.width = `${stageWidth}px`;
		stageRef.current.container().style.height = `${stageHeight}px`;
		stageRef.current.position({ x: -stageX, y: -stageY });
		stageRef.current.setSize({ width: stageWidth, height: stageHeight });
		setScroll({ x: stageX, y: stageY });
	}, [contentWidth]);

	useEffect(() => {
		const scrollTop = scroll.y;
		const index = pageList.reduce((pre, item, index, list) => {
			const yWithIndex = list.slice(0, index + 1).reduce((pre, cur) => {
				return pre + cur.height;
			}, 0);
			if (scrollTop <= yWithIndex) {
				return pre;
			}
			return pre + 1;
		}, 0);

		handleCurrentPage(index);
	}, [scroll, pageList, handleCurrentPage]);

	const handleScrollTo = useCallback(
		(activePage: number) => {
			let top = 0;
			for (let index = 0; index < pageList.length; index++) {
				const data = pageList[index];

				if (index === activePage) {
					containerRef.current?.scrollTo({
						top: top + 5,
					});
					break;
				} else {
					top = top + data.height;
				}
			}
		},
		[pageList]
	);

	useEffect(() => {
		handleScrollTo(activePage);
	}, [activePage, handleScrollTo]);

	return (
		<div
			ref={containerRef}
			style={{ width, height, overflow: "auto" }}
			onScroll={handleScroll}
		>
			<div
				style={{
					margin: "0 auto",
					width: Math.max(...pageList.map((item) => item.width)),
					height: contentHeight,
				}}
			>
				<Stage
					width={width}
					height={height}
					ref={stageRef}
					x={-scroll.x}
					y={-scroll.y}
				>
					<Layer>
						{range(pages.numPages).map((index) => {
							if (Math.abs(index - currentPage) > 3) {
								return null;
							}
							return (
								<Group
									key={index}
									x={pageList[index]?.x ?? 0}
									y={pageList[index]?.y ?? 0}
								>
									<ShowPdfCanvas
										pages={pages}
										pageNumber={index + 1}
										onPageLoad={handlePageLoad}
									/>
								</Group>
							);
						})}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}
export default PdfPage;
