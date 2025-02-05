import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@app/store/rootReducer";
import { RootState } from "@app/store/store";

export const StoreDecorator = (initialState?: Partial<RootState>) => {
    const WithStoreDecorator = (Story: () => JSX.Element) => {
        const customStore = configureStore({
            reducer: rootReducer,
            preloadedState: initialState as RootState,
        });

        return (
            <Provider store={customStore}>
                <Story />
            </Provider>
        );
    };

    return WithStoreDecorator;
};
