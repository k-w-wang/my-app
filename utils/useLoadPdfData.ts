import { getDocument } from "pdfjs-dist";
import { useEffect, useState } from "react";

export interface PdfData {
	pdfImgDataUrl: string;
	width: number;
	height: number;
}
export const useLoadPdfData = (
	url: string,
	{ scale = 1 }: { scale?: number } = {},
) => {
	const [pdfDataList, setDataList] = useState<PdfData[]>([]);
	useEffect(() => {
		console.log("pdf开始");
		console.time("pdf加载时间");
		const getcanvas = async () => {
			const viewPdfList: PdfData[] = [];
			const pdf = await getDocument({
				url,
				cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/cmaps/",
				cMapPacked: true,
			}).promise;
			for (let i = 0; i < pdf.numPages; i++) {
				const page = await pdf.getPage(i + 1);

				const viewport = page.getViewport({ scale });

				const canvas = document.createElement("canvas");
				const canvasContext = canvas.getContext("2d");
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				// 渲染pdf
				console.time("page.render");
				if(canvas != null && canvasContext != null) {
					(await page.render({
						canvasContext,
						viewport,
					}).promise);
				}
				console.timeEnd("page.render");

				page.cleanup();
				viewPdfList.push({
					width: viewport.width,
					height: viewport.height,
					pdfImgDataUrl: canvas.toDataURL(),
				});
			}
			return viewPdfList;
		};
		void getcanvas().then((res) => {
			setDataList(res);
			console.timeEnd("pdf加载时间");
		});
	}, [scale, url]);
	return pdfDataList;
};

// const useCountDown = ({ leftTime, ms = 1000, onEnd }) => {
// 	const countdownTimer = useRef();
// 	const startTimer = useRef(); // 记录初始时间
// 	const startTimeRef = useRef(performance.now()); // 第一次执行的时间处理，让下一次倒计时时调整为整数
// 	const nextTimeRef = useRef(leftTime % ms);
// 	const [count, setCount] = useState(leftTime);
// 	const clearTimer = () => {
// 		countdownTimer.current && clearTimeout(countdownTimer.current);
// 		startTimer.current && clearTimeout(startTimer.current);
// 	};
// 	const startCountDown = () => {
// 		clearTimer();
// 		const currentTime = performance.now(); // 算出每次实际执行的时间
// 		const executionTime = currentTime - startTimeRef.current; // 实际执行时间大于上一次需要执行的时间，说明执行时间多了，否则需要补上差的时间
// 		const diffTime =
// 			executionTime > nextTimeRef.current
// 				? executionTime - nextTimeRef.current
// 				: nextTimeRef.current - executionTime;
// 		setCount((count) => {
// 			const nextCount = count - (Math.floor(executionTime / ms) || 1) * ms - nt;
// 			return nextCount <= 0 ? 0 : nextCount;
// 		}); // 算出下一次的时间
// 		nextTimeRef.current =
// 			executionTime > nextTimeRef.current ? ms - diffTime : ms + diffTime; // 重置初始时间 startTimeRef.current = performance.now();
// 		countdownTimer.current = setTimeout(() => {
// 			requestAnimationFrame(startCountDown);
// 		}, nextTimeRef.current);
// 	};
// 	useEffect(() => {
// 		setCount(leftTime);
// 		startTimer.current = setTimeout(startCountDown, nextTimeRef.current);
// 		return () => {
// 			clearTimer();
// 		};
// 	}, [leftTime]);
// 	useEffect(() => {
// 		if (count <= 0) {
// 			clearTimer();
// 			(Boolean(onEnd)) && onEnd();
// 		}
// 	}, [count]);
// 	return count;
// };
// export default useCountDown;
