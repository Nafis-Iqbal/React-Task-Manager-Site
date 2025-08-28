import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { generateFakeTasks } from "../Utilities/FakeData";
import {priority, statusEnum, role} from "../Types&Enums/Enums";
import { useGetTasksByProjectRQ } from "../Services/API/TaskApi";

import ProjectTaskRow from "../Components/ElementComponents/ProjectTaskRow";
import { TableDataBlock } from "../Components/ElementComponents/TableDataBlock";
import { ProjectHeroSection } from "../Components/StructureComponents/ProjectHeroSection";

let isDebugMode: boolean = false;

let initialTasks: Task[] = [];

if(isDebugMode){
  initialTasks = generateFakeTasks(10);
}

// Chart Data
const chartData = [
  { name: "Completed", value: initialTasks.filter((t) => t.status === statusEnum.completed).length },
  { name: "In Progress", value: initialTasks.filter((t) => t.status === statusEnum.active).length },
  { name: "Paused", value: initialTasks.filter((t) => t.status === statusEnum.paused).length },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"]; // Green, Blue, Orange

const priorityOrder: Record<priority, number> = {
  [priority.urgent]: 1,
  [priority.normal]: 2,
};

const ProjectDetailsPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(isDebugMode? initialTasks: []);
  const [tasksFetchMessage, setTasksFetchMessage] = useState<string>("");
  const [isPrioritySortAscending, setIsPrioritySortAscending] = useState(true);
  const [isDateSortAscending, setIsDateSortAscending] = useState(true);
  const navigate = useNavigate();

  const {projectId} = useParams();
  const projectIdNumber = Number(projectId);

  const {data: projectTasks, isLoading: isTasksByProjectLoading, isError: isTasksLoadingError} = useGetTasksByProjectRQ(
    projectIdNumber, 
    (responseData) => {
      if(responseData?.data.status === "failed"){
        navigate("/resource_not_found");
      }
    },
    () => {
      navigate("/resource_not_found");
    }
  );

  useEffect(() => {
    setTasks(projectTasks?.data.data);
    
    if(isTasksLoadingError){
      setTasksFetchMessage("Failed to load Project Tasks.");
    }
    
    if(projectTasks?.data.data.length < 1){
      setTasksFetchMessage("No Tasks to show.");
    }
  }, [projectTasks, isTasksLoadingError]);

  // Sorting Handlers
  const sortByDueDate = () => {
    setTasks([...tasks].sort((a, b) => 
      isDateSortAscending? new Date(a.end_date).getTime() - new Date(b.end_date).getTime() : new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
    ));

    setIsDateSortAscending(!isDateSortAscending);
  };

  const sortByPriority = () => {
    setTasks([...tasks].sort((a, b) => 
      isPrioritySortAscending? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority]
    ));

    setIsPrioritySortAscending(!isPrioritySortAscending);
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-2 md:p-6 text-white bg-gray-200">
      {/* Hero Section */}
      <ProjectHeroSection projectTasks={tasks}/>

      {/* Task Table Section */}
      <div className="mt-6 bg-white text-gray-800 p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-blue-900 md:text-2xl font-bold">Project Tasks</h2>
          <div className="flex space-x-2">
            <button onClick={sortByDueDate} className="text-sm md:text-base bg-blue-500 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-600">
              Sort by Due Date
            </button>
            <button onClick={sortByPriority} className="text-sm md:text-base bg-green-500 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-green-600">
              Sort by Priority
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-fixed w-[100%] text-center border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-1 md:p-3 w-[30%]">Task Name</th>
                <th className="p-1 md:p-3 w-[20%]">Status</th>
                <th className="p-1 md:p-3 w-[20%]">Priority</th>
                <th className="p-1 md:p-3 w-[30%]">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <TableDataBlock
                dataList={tasks}
                dataFetchMessage={tasksFetchMessage}
                isDataLoading={isTasksByProjectLoading}
                noContentColSpan={4}
                onClickNavigate={(id: number) => navigate(`/tasks/${id}`)}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
