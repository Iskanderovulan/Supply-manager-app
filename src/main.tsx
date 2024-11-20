import ReactDOM from "react-dom/client";
import App from "@app/App";
import { BrowserRouter } from "react-router-dom";
import { App as AntApp } from "antd";
import { ThemeProvider } from "@app/providers/theme/ThemeProvider/index.ts";
import { AntdThemeProvider } from "@app/providers/theme/AntdThemeProvider/index.ts";
import { CollapseProvider } from "@app/providers/layout/CollapseProvider/index.ts";
import { Provider } from "react-redux";
import { store } from "@app/store/store.ts";
import "./shared/config/i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <AntdThemeProvider>
                    <AntApp>
                        <CollapseProvider>
                            <App />
                        </CollapseProvider>
                    </AntApp>
                </AntdThemeProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
);
