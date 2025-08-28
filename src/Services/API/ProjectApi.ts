import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const getProjects = async (): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<Project[]>>("projects");

        return response;
    }
    catch(error)
    {
        console.log("Error fetching projects data");
        throw error;
    }
}

export const useGetProjectsRQ = (project_id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryFn: getProjects,
        queryKey: project_id? ["projects", project_id] : ["projects"],
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const createProject = async (project: Project): Promise<AxiosResponse> => {
    try{
        const response = api.post<ApiResponse<string>>("projects/create", {
            ...project
        });

        return response;
    }
    catch(error)
    {
        console.log("Error creating Project");
        throw error;
    }
}

export const useCreateProjectRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const deleteProject = async (project_id: number): Promise<AxiosResponse> => {
    try{
        const response = api.delete<ApiResponse<string>>(`projects/delete/${project_id}`);

        return response;
    }
    catch(error){
        console.log("Error deleting project");
        throw error;
    }
}

export const useDeleteProjectRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

