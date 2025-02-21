/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { Layer, Stage, Image } from "react-konva";
import { useLoadPdfData } from "../../utils/useLoadPdfData";
import AutoSizer from "react-virtualized-auto-sizer";
import Konva from "konva";

GlobalWorkerOptions.workerSrc = "pdf.worker.js";
export default function PdfPreview() {
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [clickPage, setClickPage] = React.useState<number>(0);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const pdfdata = useLoadPdfData(
    "./demo3.pdf",
    { scale: 1.5 },
  );

  const { contentHeight, contentWidth } = useMemo(() => {
    return {
      contentHeight: pdfdata.reduce((pre, item) => {
        return pre + item.height;
      }, 0),
      contentWidth: Math.max(...pdfdata.map((item) => item.width)),
    };
  }, [pdfdata]);

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
    const index = pdfdata.reduce((pre, item, index, list) => {
      const yWithIndex = list.slice(0, index + 1).reduce((pre, cur) => {
        return pre + cur.height;
      }, 0);
      if (scrollTop <= yWithIndex) {
        return pre;
      }
      return pre + 1;
    }, 0);
    if (virtuosoRef.current == null) {
      return;
    }
    virtuosoRef.current?.scrollToIndex({
      index,
    });
    setCurrentPage(index);
  }, [scroll, pdfdata]);

  useEffect(() => {
    let top = 0;
    for (let index = 0; index < pdfdata.length; index++) {
      const data = pdfdata[index];

      if (index === clickPage) {
        containerRef.current?.scrollTo({
          top: top + 10,
        });
        break;
      } else {
        top = top + data.height;
      }
    }
  }, [clickPage, pdfdata]);

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
              totalCount={pdfdata.length}
              overscan={{ main: height, reverse: height }} // 上下各多渲染一屏的内容
              itemContent={(index) => (
                <div
                  style={
                    currentPage === index ? { border: "1px solid #000" } : {}
                  }
                >
                  <img
                    width={"100%"}
                    src={pdfdata[index].pdfImgDataUrl}
                    onClick={() => {
                      setCurrentPage(index);
                      setClickPage(index);
                    }}
                  />
                </div>
              )}
            ></Virtuoso>
          )}
        </AutoSizer>
      </div>
      <div style={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
        <AutoSizer>
          {({ width, height }: { width: number; height: number }) => (
            <div
              ref={containerRef}
              style={{ width, height, overflow: "auto" }}
              onScroll={handleScroll}
            >
              <div
                style={{
                  margin: "0 auto",
                  width: Math.max(...pdfdata.map((item) => item.width)),
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
                    {pdfdata.map((item, index, list) => {
                      const visible = Math.abs(index - currentPage) <= 2;
                      if (!visible) {
                        return null;
                      }
                      const image = new window.Image();
                      image.src = item.pdfImgDataUrl;
                      return (
                        <Image
                          y={list
                            .slice(0, index)
                            .reduce((pre, cur) => pre + (cur?.height ?? 0), 0)}
                          x={(contentWidth - item.width) / 2}
                          key={index}
                          image={image}
                        />
                      );
                    })}
                  </Layer>
                </Stage>
              </div>
            </div>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
