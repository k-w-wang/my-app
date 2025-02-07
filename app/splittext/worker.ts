// 需要在worker中执行的脚本

const workerScript = `onmessage = (msg) =>{
	console.log(msg);
  const [ start, end ] = msg.data;
  let result = 0;
  // 执行一些操作
  for (let index = start; index < end; index++) {
    result = result + index;
  }
  postMessage(result);
}`;

// 将字符串转换为Blob URL
const blob = new Blob([workerScript], { type: "application/javascript" });
const blobUrl = URL.createObjectURL(blob);
// 导出生成的Blob URL
export default blobUrl;
