'use client'
import React, { useCallback } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import PdfPreview from "../pdfpreviewv2/page";

export default function UploadPdf() {
	const [pdfDataUrl, setPDFDataUrl] = React.useState<string>();
	const props: UploadProps = {
		accept: ".pdf",
		beforeUpload: (file) => {
			const isPDF = file.type === "application/pdf";
			if (!isPDF) {
				void message.error("You can only upload PDF file!");
			}
			// 创建文件的可下载URL
			const fileURL = URL.createObjectURL(file);
			setPDFDataUrl(fileURL);
			return false;
		},
		fileList: [],
	};

	const ShowPdfView = useCallback(() => {
		return <PdfPreview url={pdfDataUrl} />;
	}, [pdfDataUrl]);

	return (
		<>
			<div className="fixed z-10 left-1/2">
				<Upload {...props}>
					<Button icon={<UploadOutlined />}>Click to Upload PDF</Button>
				</Upload>
			</div>
			<ShowPdfView />
		</>
	);
}
