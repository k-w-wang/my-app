import { PDFDocumentProxy } from "pdfjs-dist";
import React, { memo, useEffect } from "react";
import { useRenderCanvas } from "../../utils/useLoadPdf";
import imageFallBack from "./catalog-placeholder.png";

interface CatalogItemProps {
	pages: PDFDocumentProxy;
	currentPage: number;
	index: number;
	clickPage: (index: number) => void;
	defaultUrl?: string;
	onInitial: (url: string, index: number) => void;
}
function CatalogItem({
	pages,
	currentPage,
	index,
	clickPage,
	defaultUrl,
	onInitial,
}: CatalogItemProps) {
	const pagedata = useRenderCanvas(pages, index, 0.3, defaultUrl);

	useEffect(() => {
		if (pagedata?.url != null) {
			onInitial(pagedata?.url, index);
		}
	}, [index, onInitial, pagedata]);

	return (
		<>
			<div
				style={{
					...(currentPage === index ? { border: "1px solid #000" } : {}),
					margin: "16px",
				}}
			>
				<img
					width={"100%"}
					src={defaultUrl ?? pagedata?.url ?? imageFallBack}
					onClick={() => {
						clickPage(index);
					}}
				/>
			</div>
			<div style={{ textAlign: "center" }}>{index + 1}</div>
		</>
	);
}
export default memo(CatalogItem) ;
