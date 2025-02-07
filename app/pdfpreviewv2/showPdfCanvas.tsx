import React, { memo, useCallback, useEffect, useState } from "react";

import { PDFDocumentProxy, PDFPageProxy, PageViewport } from "pdfjs-dist";
import { Image } from "react-konva";

interface Props {
	className?: string;
	pages: PDFDocumentProxy;
	pageNumber: number;
	onPageLoad?: (
		page: PDFPageProxy,
		viewPort: PageViewport,
		current: number
	) => void;
}

function ShowPdfCanvas(props: Props) {
	const { pages, pageNumber, onPageLoad } = props;
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();

	const initPage = useCallback(async () => {
		const page = await pages.getPage(pageNumber);
		const viewport = page.getViewport({ scale: 1.5 });
		const canvas = document.createElement("canvas");
		const canvasContext = canvas.getContext("2d");
		canvas.width = viewport.width;
		canvas.height = viewport.height;
		if (canvasContext != null) {
			const renderTask = page.render({
				canvasContext,
				viewport,
			});
			await renderTask.promise;
			page.cleanup();
		}
		onPageLoad?.(page, viewport, pageNumber);
		setCanvas(canvas);
	}, [pages, onPageLoad, pageNumber]);

	useEffect(() => {
		void initPage();
	}, [pages, initPage, pageNumber]);

	return <Image image={canvas} />;
}

export default memo(ShowPdfCanvas);
