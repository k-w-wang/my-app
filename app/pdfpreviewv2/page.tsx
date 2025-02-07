'use client'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import AutoSizer from "react-virtualized-auto-sizer";
import { useLoadPdf } from "../../utils/useLoadPdf";
import CatalogItem from "./catalogItem";
import PdfPage from "./pdfPage";

GlobalWorkerOptions.workerSrc = "pdf.worker.js";
export default function PdfPreview() {
	const pages = useLoadPdf("./demo3.pdf");

	const [urlList, setUrlList] = useState<string[]>([]);

	const [currentPage, setCurrentPage] = React.useState<number>(0);
	const [activePage, setActivePage] = React.useState<number>(0);

	const virtuosoRef = useRef<VirtuosoHandle>(null);
	const catalogContainerRef = useRef<HTMLDivElement>(null);

	const handleClickPage = (index: number) => {
		setActivePage(index);
		setCurrentPage(index);
	};

	const handleCurrentPage = (index: number) => {
		setCurrentPage(index);
	};

	const onInitial = useCallback((url: string, index: number) => {
		setUrlList((prevState) => {
			const newState = [...prevState];
			newState[index] = url;
			return newState;
		});
	}, []);

	useEffect(() => {
		virtuosoRef.current?.scrollIntoView({
			index: currentPage,
		});
	}, [currentPage]);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				ref={catalogContainerRef}
				style={{
					flexBasis: 200,
					flexShrink: 0,
					height: "100%",
					overflow: "auto",
				}}
			>
				<AutoSizer>
					{({ width, height }: { width: number; height: number }) => (
						<Virtuoso
							ref={virtuosoRef}
							style={{ height, width }}
							totalCount={pages?.numPages}
							customScrollParent={catalogContainerRef.current ?? undefined}
							overscan={{ main: height, reverse: height }} // 上下各多渲染一屏的内容
							itemContent={(index) =>
								pages != null ? (
									<CatalogItem
										key={index}
										index={index}
										pages={pages}
										currentPage={currentPage}
										clickPage={handleClickPage}
										defaultUrl={urlList[index]}
										onInitial={onInitial}
									/>
								) : null
							}
						></Virtuoso>
					)}
				</AutoSizer>
			</div>
			<div style={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
				<AutoSizer>
					{({ width, height }: { width: number; height: number }) =>
						pages != null ? (
							<PdfPage
								width={width}
								height={height}
								pages={pages}
								currentPage={currentPage + 1}
								activePage={activePage}
								handleCurrentPage={handleCurrentPage}
							/>
						) : null
					}
				</AutoSizer>
				<div className="rounded-md bg-black bg-opacity-60 text-white px-2 py-1 absolute right-4 bottom-4">{`${
					currentPage + 1
				} / ${pages?.numPages ?? 1}`}</div>
			</div>
		</div>
	);
}
