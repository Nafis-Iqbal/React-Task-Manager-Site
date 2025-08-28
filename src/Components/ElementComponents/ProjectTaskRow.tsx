import React from "react";

type TaskRowProps = {
  task: Task;
  onClick: () => void;
};

const ProjectTaskRow: React.FC<TaskRowProps> = ({ task, onClick }) => {
  
  return (
    <tr
      className="border-b border-gray-200 cursor-pointer hover:bg-blue-100 hover:shadow-md transition duration-200"
      onClick={onClick}
    >
      <td className="p-2 md:p-3 text-center text-sm md:text-base">{task.title}</td>
      <td className="p-2 md:p-3 text-center text-sm md:text-base">{task.status}</td>
      <td className="p-2 md:p-3 text-center text-sm md:text-base">{task.priority}</td>
      <td className="p-2 md:p-3 text-center text-sm md:text-base">{task.end_date ? new Date(task.end_date).toDateString() : "No end date"}</td>
    </tr>
  );
};

export default ProjectTaskRow;
