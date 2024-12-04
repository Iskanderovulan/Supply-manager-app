import { useState, useCallback } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = useCallback(() => setIsModalOpen(true), []);
    const hideModal = useCallback(() => setIsModalOpen(false), []);

    return {
        isModalOpen,
        showModal,
        hideModal,
    };
};
