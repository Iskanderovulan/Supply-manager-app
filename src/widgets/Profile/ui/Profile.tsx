import { FC } from "react";
import { Flex } from "antd";
import {
    ProfileForm,
    ProfileInfo,
    ProfilePassword,
    ProfileCrumb,
    useGetUserQuery,
} from "@entities/Profile";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useModal } from "@shared/lib/hooks/useModal";
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
