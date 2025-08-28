import BasicButton from "./BasicButton";
import LoadingSpinnerBlock from "../LoadingSpinnerBlock";
import { useState } from "react";

export const CommentRow = ({comment_id, commentText, onDelete}:{comment_id: number, commentText: string, onDelete: () => void}) => {
    const [isSpinnerActive, setIsSpinnerActive] = useState(false);

    const handleDelete = () => {
        setIsSpinnerActive(true);
        onDelete();
    }

    const onCommentDetail = () => {

    }

    return (
        <tr className="pb-1">
            <td className="flex justify-between items-center w-[100%] mb-1 bg-gray-100 rounded-lg">
                <p className="w-[75%] md:w-[80%] ml-2 md:ml-4 text-sm md:text-base truncate">{commentText}</p>

                <div className="flex justify-between w-[25%] md:w-[20%]">
                    <BasicButton
                        buttonText="Delete"
                        buttonColor="red-500"
                        textColor="white"
                        onClick={handleDelete}
                        value={comment_id}
                        customStyle="p-1 mr-1 my-1 text-sm md:text-base w-[50%]"
                    />

                    <LoadingSpinnerBlock
                        customStyle="w-8 mr-1 md:mr-4"
                        isOpen={isSpinnerActive}
                    />

                    {!isSpinnerActive && (
                        <BasicButton
                            buttonText="i"
                            customStyle="p-1 mr-1 my-1 w-[50%] text-sm md:text-base disabled:bg-gray-600"
                            buttonColor="blue-600"
                            textColor="white"
                            onClick={() => onCommentDetail()}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
}