import { useSyncExternalStore } from "react";

const useListenLocal = (key: string) => {
	return useSyncExternalStore(
		(callback) => {
			window.addEventListener("storage", (event) => {
				if (event.key === key) {
					callback();
				}
			});
			return () => {
				window.removeEventListener("storage", callback);
			};
		},
		() => localStorage.getItem(key)
	);
};

export default useListenLocal;
