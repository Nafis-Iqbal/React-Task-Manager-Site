import api, { queryClient } from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const getComments = async (task_id: number): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<Comment[]>>(`comments/${task_id}`, {timeout: 12 * 1000});
        
        return response;
    }
    catch(error){
        console.log("Error fetching task comments");
        throw error;
    }
}

export const useGetCommentsRQ = (task_id: number, onSuccessFn: () => void, onErrorFn: () => void) => { 
    return useQuery({
        queryFn: () => getComments(task_id),
        queryKey: ["comments", task_id],
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        refetchInterval: 60 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const addComment = async (task_id: number, comment: string): Promise<AxiosResponse> => {
    try{
        const response = await api.post<Comment>("comments/create", {
            task_id, comment
        });

        return response;
    }
    catch(error){
        console.log("Failed to add comments");
        throw error;
    }
}

export const useAddCommentsRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: ({task_id, comment}: {task_id: number, comment: string}) => addComment(task_id, comment),
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const deleteComment = async (comment_id: number): Promise<AxiosResponse> => {
    try{
        const response = api.delete<ApiResponse<string>>(`comments/delete/${comment_id}`);
        
        return response;
    }
    catch(error){
        console.log("Error deleting comment");
        throw error;
    }
}

export const useDeleteCommentsRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}