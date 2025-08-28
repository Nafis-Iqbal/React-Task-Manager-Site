import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const getTags = async (): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<Tag[]>>("tags");

        return response;
    }
    catch(error)
    {
        console.log("Error fetching tags.");
        throw error;
    }
}

export const useGetTagsRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: getTags,
        cacheTime: 60 * 1000,
        staleTime: 60 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled: true
    });
}

export const createTag = async (tag: Tag): Promise<AxiosResponse> => {
    try{
        const response = await api.post<ApiResponse<string>>("tags/create", {
            ...tag
        });

        return response;
    }
    catch(error)
    {
        console.log("Error creating new tag");
        throw error;
    }
}

export const useCreateTagRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createTag,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const deleteTag = async (tag_id: number) : Promise<AxiosResponse> => {
    try{
        const response = await api.delete<ApiResponse<string>>(`tags/delete/${tag_id}`);

        return response;
    }
    catch(error)
    {
        console.log("Error deleting task tag.");
        throw error;
    }
}

export const useDeleteTagRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteTag,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const updateTag = async (tag: Tag) : Promise<AxiosResponse> => {
    try{
        const response = await api.put<ApiResponse<string>>("tags/update", {
            ...tag
        })

        return response;
    }
    catch(error)
    {
        console.log("Error updating task tag.");
        throw error;
    }
}

export const useUpdateTagRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateTag,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}