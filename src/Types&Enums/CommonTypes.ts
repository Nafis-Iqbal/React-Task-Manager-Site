import {priority, statusEnum, role} from "../Types&Enums/Enums";

declare global{
    interface User{
        id?: number;
        name: string;
        email?: string;
        phone_number: string;
        role?: role;
    }
    
    interface Project{
        id: number;
        title: string;
        description: string;
        user_id: number;
        status: statusEnum;
        progress: number;
        start_date?: Date;
        end_date: Date;
    }

    interface Task{
        id: number;
        title: string;
        description: string;
        user_id: number;
        project_id: number;
        project_title?: string;
        priority: priority;
        status: statusEnum;
        start_date?: Date;
        end_date: Date;
    }

    interface Tag{
        id: number;
        title: string;
    }

    export interface Comments{
        id: number;
        comment: string;
    }

    interface ApiResponse<T>{
        status: string;
        message: string;
        data: T;
    }

    interface Auth{
        auth_token: string;
        user_id: number; 
    }
}

export function isTaskArray(data: any[]): data is Task[] {
    return Array.isArray(data) && data.every((item) => 'project_id' in item && 'priority' in item);
}

export function isProjectArray(data: any[]): data is Project[] {
    return Array.isArray(data) && data.every((item) => 'progress' in item);
}

export function isCommentArray(data: any[]): data is Comments[] {
    return Array.isArray(data) && data.every((item) => 'comment' in item);
}

export function isTagArray(data: any[]): data is Tag[] {
    return Array.isArray(data) && data.every((item) => !('comment' in item) && !('progress' in item) && !('project_id' in item && 'priority' in item));
}
