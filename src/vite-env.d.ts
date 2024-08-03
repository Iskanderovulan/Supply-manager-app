/// <reference types="vite/client" />

declare module "*.(png|jpg|jpeg|gif|svg)" {
    const src: string;
    export default src;
}
declare module "*.svg" {
    import * as React from "react";
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
declare const __IS_DEV__: boolean;
