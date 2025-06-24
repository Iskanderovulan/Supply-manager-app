import { FC } from "react";
import { Flex } from "antd";

import { useGetUserQuery } from "@entities/profile";

import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useModal } from "@shared/lib/hooks/useModal";

import { ProfileForm } from "../ProfileForm/ProfileForm";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { ProfilePassword } from "../ProfilePassword/ProfilePassword";
import { ProfileCrumb } from "../ProfileCrumb/ProfileCrumb";

import cls from "./Profile.module.scss";

export const Profile: FC = () => {
    const { data: user, isLoading, error } = useGetUserQuery();
    const { isModalOpen, hideModal, showModal } = useModal();

    const profileData = {
        name: user?.name || "",
        email: user?.email || "",
        userId: user?.id || "",
    };

    const { name, email, userId } = profileData;

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <>
            <ProfileCrumb />
            <Flex vertical gap="middle" className={cls.profile}>
                {isModalOpen ? (
                    <ProfileForm
                        initialValues={{ name, email }}
                        onClose={hideModal}
                        userId={userId}
                    />
                ) : (
                    <ProfileInfo name={name} email={email} onEdit={showModal} userId={userId} />
                )}
                <ProfilePassword />
            </Flex>
        </>
    );
};
