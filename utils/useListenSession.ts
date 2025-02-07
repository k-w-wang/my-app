import { useSyncExternalStore } from "react";

const useListenSession = (key: string) => {
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
		() => sessionStorage.getItem(key)
	);
};

export default useListenSession;
