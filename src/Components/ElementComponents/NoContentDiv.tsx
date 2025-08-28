export const NoContentTableRow = ({displayMessage, tdColSpan} : {displayMessage: string, tdColSpan: number}) => {
    let divColor: string = "blue-300";
    
    if(displayMessage && displayMessage.includes("Error")){
        divColor = "bg-red-300";
    }
    else {
        divColor = "bg-blue-100";
    }
    
    return (
        <tr className={`rounded-md text-center ${divColor}`}>
            <td className="h-10 min-h-[50px]" colSpan={tdColSpan}>  {displayMessage}</td>
        </tr>
    )
}