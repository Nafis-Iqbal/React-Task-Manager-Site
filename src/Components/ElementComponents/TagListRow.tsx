import { useState, useRef, useEffect } from "react";

import BasicButton from "./BasicButton";
import LoadingSpinnerBlock from "../LoadingSpinnerBlock";

export {};

const TagListRow = ({tag, onUpdate, onDelete} : {tag: Tag, onUpdate: (tag: Tag) => void, onDelete: (tag_id:number) => void}) => {
    const [tagTitle, setTagTitle] = useState<string>(tag.title);
    const [isSpinnerActive, setIsSpinnerActive] = useState(false);

    const currentTagTitle = useRef<string>(tag.title);

    useEffect(() => {
        currentTagTitle.current = tagTitle;
        setIsSpinnerActive(false);
    }, [tagTitle]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagTitle(e.target.value);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setTagTitle(currentTagTitle.current);
        }, 500);
    }

    return(
        <tr className="bg-gray-300 p-4 rounded-lg w-1/2 text-center border-b">
            <td className="text-red-900 font-semibold text-sm md:text-base">
                {tag.title}
            </td>
            <td className="">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={tagTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-1 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </td>
            <td>
                <LoadingSpinnerBlock isOpen={isSpinnerActive} customStyle="w-8 ml-6"/>
            </td>
            <td>
                <BasicButton
                    buttonText="Update Tag"
                    buttonColor="green-500"
                    textColor="white"
                    onClick={() => {
                        onUpdate({id: tag.id, title: tagTitle});
                        setIsSpinnerActive(true);
                    }}
                    customStyle="hover:bg-green-600 text-sm md:text-base p-1"
                />
            </td>
            <td>
                <BasicButton
                    buttonText="Delete Tag"
                    buttonColor="red-500"
                    textColor="white"
                    onClick={() => {
                        onDelete(tag.id);
                        setIsSpinnerActive(true);
                    }}
                    customStyle="hover:bg-red-600 text-sm md:text-base p-1"
                />
            </td>
        </tr>
    );
}

export default TagListRow;