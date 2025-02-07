// 需要在worker中执行的脚本

const workerScript = `onmessage = (msg) =>{
  const textNode  = msg.data
  console.log(textNode);
  
  const result = []
	for (let index = 1; index < textNode.length; index++) {
    const range = document.createRange();
    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);
    result.push(range.getBoundingClientRect());
  }
  postMessage(result);
}`;

// 将字符串转换为Blob URL
const blob = new Blob([workerScript], { type: "application/javascript" });
const blobUrl = URL.createObjectURL(blob);
// 导出生成的Blob URL
export default blobUrl;
