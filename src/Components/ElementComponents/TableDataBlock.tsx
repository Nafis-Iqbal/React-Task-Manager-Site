import { isTaskArray, isProjectArray, isCommentArray, isTagArray } from "../../Types&Enums/CommonTypes";

import LoadingSpinner from "../LoadingAnimationDiv";
import TaskListRow from "./TaskListRow";
import TagListRow from "./TagListRow";
import ProjectTaskRow from "./ProjectTaskRow";
import ProjectListRow from "./ProjectListRow";
import { CommentRow } from "./CommentRow";
import { NoContentTableRow } from "./NoContentDiv";

interface TableBlockProps<T>{
    dataList: T[];
    isDataLoading: boolean;
    dataFetchMessage: string;
    noContentColSpan?: number;
    onDataUpdate?: (data: any) => void;
    onDataDelete?: (id: number) => void;
    onClickNavigate?: (id: number) => void;
}

export const TableDataBlock = <T extends {id: number}>({dataList, dataFetchMessage, noContentColSpan, onDataUpdate, onDataDelete, onClickNavigate, isDataLoading} : TableBlockProps<T>) => {    
    if(isDataLoading){
        return (
            <tr>
                <td colSpan={noContentColSpan? noContentColSpan: 4}>
                  <LoadingSpinner/>
                </td>
            </tr>
        );
    }
    
    if(dataList && dataList.length > 0)
    {
        //Project List
        if(isProjectArray(dataList) && onDataDelete){
            return (
                <>
                    {(dataList as Project[]).map((data) => (
                        <ProjectListRow key={data.id} project={data} onDelete={() => onDataDelete(data.id)}/>
                    ))}
                </>
            );
        }
        //Task List
        else if(isTaskArray(dataList) && (onDataDelete || onClickNavigate))
        {
            if(onDataDelete)
            {
                return (
                    <>
                        {(dataList as Task[]).map((data) => (
                            <TaskListRow key={data.id} task={data} onDelete={() => onDataDelete(data.id)}/>
                        ))}
                    </>
                );
            }
            else if(onClickNavigate){
                return (
                    <>
                        {(dataList as Task[]).map((data) => (
                            <ProjectTaskRow key={data.id} task={data} onClick={() => onClickNavigate(data.id)}/>
                        ))}
                    </>
                );
            }
            else{
                return (
                    <div>{dataFetchMessage}</div>
                );
            }
        }
        else if(isCommentArray(dataList) && onDataDelete)
        {
            return (
                <>
                    {(dataList as Comments[]).map((data) => (
                        <CommentRow key={data.id} comment_id={data.id} commentText={data.comment} onDelete={() => onDataDelete(data.id)}/>
                    ))}
                </>
            );
        }
        else if(isTagArray(dataList) && onDataUpdate && onDataDelete)
        {
            return (
                <>
                    {(dataList as Tag[]).map((data) => (
                        <TagListRow key={data.id} tag={data} onUpdate={(tag: Tag) => onDataUpdate(tag)} onDelete={() => onDataDelete(data.id)}/>
                    ))}
                </>
            );
        }
        else{
            return (
                <div>{dataFetchMessage}</div>
            );
        }
    }
    else
    {
        //Table will be empty, due to network error, or empty list
        return (
            <>
                <NoContentTableRow displayMessage={dataFetchMessage} tdColSpan={noContentColSpan? noContentColSpan: 1}/>
            </>
        );
    }
}