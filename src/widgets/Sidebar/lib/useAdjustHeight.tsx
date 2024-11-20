import { useEffect, RefObject } from "react";

export const useAdjustHeight = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        function adjustHeight() {
            if (ref.current) {
                const viewportHeight = window.innerHeight;
                ref.current.style.height = `${viewportHeight}px`;
            }
        }

        adjustHeight();

        window.addEventListener("resize", adjustHeight);

        return () => {
            window.removeEventListener("resize", adjustHeight);
        };
    }, [ref]);
};
