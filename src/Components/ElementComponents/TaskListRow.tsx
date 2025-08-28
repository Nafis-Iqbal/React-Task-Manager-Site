import { useNavigate } from "react-router-dom";

const TaskListRow = ({task, onDelete}:{task: Task, onDelete: (task_id: number) => void}) => {
  const navigate = useNavigate();

  return (
    <tr
      className="border-b hover:bg-gray-100 transition cursor-pointer"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <td className="p-1 md:p-2 text-sm md:text-base text-center">{task.title}</td>
      <td className="px-4 md:p-2 text-sm md:text-base truncate">{task.description}</td>
      <td className="p-1 md:p-2 text-sm md:text-base text-center">{task.project_id}</td>
      <td className="flex flex-col md:flex-row items-center p-1 md:p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/projects/${task.project_id}`);
          }}
          className="bg-blue-600 text-white text-xs md:text-base items-center px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-blue-700 md:w-1/2 mb-1 md:mr-2"
        >
          Go To Project
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="bg-red-600 text-white text-xs md:text-base items-center px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-red-700 md:w-1/2 mb-1 md:mr-2"
        >
          Delete Task
        </button>
      </td>
    </tr>
  );
};

export default TaskListRow;
