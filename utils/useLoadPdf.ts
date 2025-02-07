'use client'
import {
	getDocument,
	PageViewport,
	PDFDocumentProxy,
	PDFPageProxy,
	RenderTask,
} from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

export const useLoadPdf = (
	url: string,
) => {
	const [pages, setPages] = useState<PDFDocumentProxy>();
	useEffect(() => {
		console.log("pdf开始");
		console.time("pdf加载时间");
		const getPages = async () => {
			return await getDocument({
				url,
				cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/cmaps/",
				cMapPacked: true,
			}).promise;
		};
		void getPages().then((res) => {
			setPages(res);
			console.timeEnd("pdf加载时间");
		});
	}, [url]);
	return pages;
};

interface PageData {
	url: string;
	viewport?: PageViewport;
}

export const useRenderCanvas = (
	pages: PDFDocumentProxy,
	index: number,
	scale: number = 1,
	defaultUrl?: string
) => {
	const pageRef = useRef<PDFPageProxy>(undefined);
	const [pageData, setPageData] = useState<PageData>();
	const renderTask = useRef<RenderTask>(undefined);
	useEffect(() => {
		if (defaultUrl != null) {
			setPageData({
				url: defaultUrl,
			});
			return;
		}
		const getPageData = async () => {
			const page = await pages.getPage(index + 1);
			pageRef.current = page;
			const viewport = page.getViewport({ scale });
			const canvas = document.createElement("canvas");
			const canvasContext = canvas.getContext("2d");
			canvas.width = viewport.width;
			canvas.height = viewport.height;
			if (canvasContext != null) {
				renderTask.current = page.render({
					canvasContext,
					viewport,
				});
				await renderTask.current.promise;
				page.cleanup();
			}

			return {
				viewport,
				url: canvas.toDataURL(),
			};
		};
		void getPageData().then((res) => {
			setPageData(res);
		});
		return () => {
			pageRef.current?.cleanup();
			renderTask.current?.cancel();
		};
	}, [defaultUrl, index, pages, scale]);
	return pageData;
};
