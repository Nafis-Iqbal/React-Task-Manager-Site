import {priority, statusEnum, role} from "../Types&Enums/Enums";

declare global{
    interface BasicButtonProps<T>
    {
        buttonText: string;
        buttonColor: string;
        textColor?: string;
        onClick: (value?: T | undefined) => void;
        customStyle?: string;
        children?: React.ReactNode;
        value?: T;
    }

    interface ProjectData{
        id: number;
        title: string;
    }

    interface CreateTaskModalProps
    {
        isOpen: boolean;
        projects: ProjectData[];
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: Task) => void;
        onFailure: () => void;
    }

    interface CreateProjectModalProps
    {
        isOpen: boolean;
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: Project) => void;
        onFailure: () => void;
    }

    interface CreateTagModalProps
    {
        isOpen: boolean;
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: Tag) => void;
        onFailure: () => void;
    }

    interface EditUserInfoModalProps
    {
        isOpen: boolean;
        defaultUserInfo: User;
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: User) => void;
        onFailure: () => void;
    }
}