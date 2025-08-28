import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import { generateFakeTasks } from "../Utilities/FakeData";
import {useGetTasksRQ, useDeleteTaskRQ} from "../Services/API/TaskApi";
import { useGetProjectsRQ } from "../Services/API/ProjectApi";
import { queryClient } from "../Services/API/ApiInstance";
import { checkIfSubstring } from "../Utilities/Utilities";

import BasicButton from "../Components/ElementComponents/BasicButton";
import ScrollToTopButton from "../Components/StructureComponents/ScrollToTopButton";
import CreateTaskModal from "../Components/Modals/CreateTaskModal";
import NotificationPopUp from "../Components/Modals/NotificationPopUpModal";
import LoadingModal from "../Components/Modals/LoadingContentModal";
import { TableDataBlock } from "../Components/ElementComponents/TableDataBlock";

const isDebugMode:boolean = false;

let initialTasks: Task[] = [];
let projectData: ProjectData[] = []; 

if(isDebugMode){
  initialTasks = generateFakeTasks(10);
  projectData = [{id: 1, title: "Bichi"}];
}

const TasksListPage = () => {
  const location = useLocation();

  const [tasks, setTasks] = useState<Task[]>(initialTasks ?? []);
  const [tasksFetchMessage, setTasksFetchMessage] = useState<string>("");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(location.state?.isCreateTaskOpen);
  const [loadingContentOpen, setLoadingContentOpen] = useState(false);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const projectsData = useRef<ProjectData[]>([]);
  
  const { data: tasksList , isLoading: isTasksLoading} = useGetTasksRQ(
    undefined, 
    () => {
      setTasks(tasksList?.data.data);
      if(tasksList?.data.data.length < 1){
        setTasksFetchMessage("No tasks to show.");
      }
    },
    () => {
      setTasksFetchMessage("Failed to Load tasks.");
    }
  );

  const {data: projectsDataResult} = useGetProjectsRQ(
    undefined,
    () => {
      projectsData.current = projectsDataResult?.data.data;
    },
    () => {

    }
  );

  const {mutate: deleteTaskMutate} = useDeleteTaskRQ(
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Task deleted successfully.");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Failed to delete task. Try again");
    }
  );

  useEffect(() => {
    setTasks(tasksList?.data.data);
    setLoadingContentOpen(false);
  }, [tasksList]);

  useEffect(() => {
    projectsData.current = projectsDataResult?.data.data;
  }, [projectsDataResult])

  const openCreateTaskForm = () => {
    setIsCreateTaskOpen(true);
  }

  const OnCreateTaskSubmit = () => {
    setLoadingContentOpen(true);
  }

  const onCreateTaskSuccess = (formData: Task) => {
    setLoadingContentOpen(false);

    openNotificationPopUpMessage("Task created successfully!");

    if(tasks)
    {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: formData.id, // Generate a new task ID
          title: formData.title,
          description: formData.description,
          project_id: formData.project_id,
          priority: formData.priority,
          status: formData.status, // Default status
          progress: 0, // Default progress value
          user_id: 1, // Example, assuming you have a static user_id or get it dynamically
          start_date: new Date(), // Default to the current date
          end_date: formData.end_date, // From the form data
        }
      ]);
    }
  }

  const onCreateTaskFailure = () => {
    setLoadingContentOpen(false);
    openNotificationPopUpMessage("Error creating task!");
  }

  const onTaskDelete = (task_id: number) => {
    if(!checkIfSubstring(sessionStorage.getItem('user_name') ?? '', 'Guest')){
      setLoadingContentOpen(true);
      deleteTaskMutate(task_id);
    }
    else if(tasks.length < 5){
      setNotificationPopupOpen(true);
      setNotificationMessage("Guest users aren't allowed to delete tasks when total tasks are less than 5");
    }
    else{
      setLoadingContentOpen(true);
      deleteTaskMutate(task_id);
    }
  }

  const openNotificationPopUpMessage = (popUpMessage: string) => {
    setNotificationPopupOpen(true);
    setNotificationMessage(popUpMessage);
  }
  
  return (
    <div className="max-w-4xl min-h-screen mx-auto p-3 md:p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center rounded-t-md bg-gray-200">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 my-2 ml-3">Tasks List</h1>
        <BasicButton
          buttonText="Create New Task"
          buttonColor="green-500"
          textColor="white"
          onClick={openCreateTaskForm}
          customStyle="px-2 py-2 mr-2 text-sm md:text-base"
        />
      </div>

      <CreateTaskModal
        isOpen = {isCreateTaskOpen}
        projects = {projectsData.current? Object.values(projectsData.current).map(({id, title}) => ({id, title})) : []}
        onClose={() => setIsCreateTaskOpen(false)}
        onSubmit={OnCreateTaskSubmit}
        onSuccess={onCreateTaskSuccess}
        onFailure={onCreateTaskFailure}
      />

      <NotificationPopUp
        isOpen = {notificationPopupOpen}
        onClose = {() => setNotificationPopupOpen(false)}
        message = {notificationMessage}
      />

      <LoadingModal
        isOpen = {loadingContentOpen}
      />

      <ScrollToTopButton/>
      
      <div className="bg-white p-1 md:p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="table-fixed w-[100%] border-collapse">
          <thead>
            <tr className="bg-gray-200 border-color-red">
              <th className="w-[20%] py-2 md:py-4 text-center text-sm md:text-base">Task Title</th>
              <th className="w-[40%] p-2 md:p-4 text-center text-sm md:text-base">Description</th>
              <th className="w-[15%] p-2 md:p-4 text-center text-sm md:text-base">Project ID</th>
              <th className="w-[25%] p-2 md:p-4 text-center text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            <TableDataBlock
              dataList={tasks}
              dataFetchMessage={tasksFetchMessage}
              onDataDelete={(id: number) => onTaskDelete(id)}
              isDataLoading={isTasksLoading}
              noContentColSpan={4}
            />
          </tbody>
        </table>
      </div>

      <div className="flex justify-end p4 bg-gray-200 rounded-b-md">
        {tasks && tasks.length > 5 && (<BasicButton
          buttonText="Create New Task"
          buttonColor="green-500"
          textColor="white"
          onClick={openCreateTaskForm}
          customStyle="px-2 py-2 pt-2 mt-1 mr-2 mb-1 text-sm md:text-base"
        />
        )}
      </div>
    </div>
  );
};

export default TasksListPage;
