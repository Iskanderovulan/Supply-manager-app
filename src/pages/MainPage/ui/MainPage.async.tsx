import { lazy } from "react";

export const MainPageAsync = lazy(() => import("./MainPage"));

// import { lazy } from "react";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const MainPageAsync = lazy(async () => {
//     await delay(2000); // Задержка 2 секунды
//     return import("./MainPage");
// });
