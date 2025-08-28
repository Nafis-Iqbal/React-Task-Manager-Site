import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

import {role, statusEnum, priority} from "../../Types&Enums/Enums";

const getTasks = async (task_id?: number): Promise<AxiosResponse> => {
    try{
        let response;
        
        if(task_id)
        {
            response = await api.get<ApiResponse<Task[]>>(`tasks/${task_id}`);
        }
        else{
            response = await api.get<ApiResponse<Task[]>>("tasks");
        }
        
        return response;
    }
    catch(error){
        console.log("Error fetching tasks");
        throw error;
    }
}

export const useGetTasksRQ = (task_id: number | undefined, onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void,
cacheTimer: number = 8 * 1000, staleTimer: number = 7 * 1000, refetchInterval: number = 60 * 1000) => {
    return useQuery({
        queryKey: task_id? ["tasks", task_id] : ["tasks"],
        queryFn: () => getTasks(task_id),
        cacheTime: cacheTimer,
        staleTime: staleTimer,
        refetchInterval: refetchInterval,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        },
        enabled: true
    });
}

export const getTasksByProject = async (project_id: number): Promise<AxiosResponse> => {
    try{
        const response = api.get<AxiosResponse<Task[]>>(`tasks/project/${project_id}`);

        return response;
    }
    catch(error){
        console.log("Error fetching project tasks");
        throw error;
    }
}

export const useGetTasksByProjectRQ = (project_id: number, onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useQuery({
        queryFn: () => getTasksByProject(project_id),
        queryKey: ["task/projects", project_id],
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const createTask = async (task: Task): Promise<AxiosResponse> => {
    try{
        const response = await api.post<ApiResponse<string>>("tasks/create", {
            ...task
        });

        return response;
    }
    catch(error){
        console.log("error creating new task");
        throw error;
    }
}

export const useCreateTaskRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createTask,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const updateTask = async (task: Task) : Promise<AxiosResponse> => {
    try{
        const response = await api.patch<ApiResponse<Task>>("tasks/update",{
            ...task
        }, {timeout: 15 * 1000});

        return response;
    }
    catch(error)
    {
        console.log("Error updating task.");
        throw error;
    }
}

export const useUpdateTaskRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }   
    });
}

export const deleteTask = async (task_id: number): Promise<AxiosResponse> => {
    try{
        const response = await api.delete<ApiResponse<string>>(`tasks/delete/${task_id}`);

        return response;
    }
    catch(error){
        console.log("Error deleting task");
        throw error;
    }
}

export const useDeleteTaskRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const getTaskTags = async (task_id: number): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<Tag[]>>(`tasks/${task_id}/tags`);
        
        return response;
    }
    catch(error)
    {
        console.log("Error fetching task tags");
        throw error;
    }
}

export const useGetTaskTagsRQ = (task_id: number, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ["tags", task_id],
        queryFn: () => getTaskTags(task_id),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled: true
    });
}

export const addTaskTags = async (task_id: number, task_tags: number[]): Promise<AxiosResponse> => {
    try{
        const response = await api.patch<ApiResponse<string>>(`tasks/update/tags`,{
            task_id, task_tags
        });

        return response;
    }
    catch(error)
    {
        console.log("Unable to update task tags");
        throw error;
    }
}

export const useAddTaskTags = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: ({task_id, task_tags} : {task_id: number, task_tags: number[]}) => addTaskTags(task_id, task_tags),
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const deleteTaskTags = async (task_id: number, task_tags: number[]): Promise<AxiosResponse> => {
    try{
        const response = await api.patch<ApiResponse<string>>(`tasks/delete/tags`,{
            task_id, task_tags
        });

        return response;
    }
    catch(error)
    {
        console.log("Unable to delete task tags");
        throw error;
    }
}

export const useDeleteTaskTags = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: ({task_id, task_tags} : {task_id: number, task_tags: number[]}) => deleteTaskTags(task_id, task_tags),
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export default getTasks;