import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/theme/ThemeProvider/index.ts";
import "./shared/config/i18n/i18n";
import { AntdThemeProvider } from "app/providers/theme/AntdThemeProvider/index.ts";
import { CollapseProvider } from "app/providers/layout/CollapseProvider/index.ts";
import { Provider } from "react-redux";
import { store } from "app/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <AntdThemeProvider>
                    <CollapseProvider>
                        <App />
                    </CollapseProvider>
                </AntdThemeProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
);
