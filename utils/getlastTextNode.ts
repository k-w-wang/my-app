const getlastTextNode = (node: Element): Text | null => {
	if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
		return node as unknown as Text;
	}
	const nodes = node.childNodes;
	for (let i = nodes.length - 1; i >= 0; i--) {
		const result = getlastTextNode(nodes[i] as Element);
		if (result != null) {
			return result;
		}
	}
	return null;
};

export default getlastTextNode;
