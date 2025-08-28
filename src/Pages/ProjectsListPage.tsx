import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {statusEnum} from "../Types&Enums/Enums";
import { generateFakeProjects } from "../Utilities/FakeData";
import { useGetProjectsRQ, useDeleteProjectRQ } from "../Services/API/ProjectApi";
import { checkIfSubstring } from "../Utilities/Utilities";

import BasicButton from "../Components/ElementComponents/BasicButton";
import CreateProjectModal from "../Components/Modals/CreateProjectModal";
import NotificationPopUp from "../Components/Modals/NotificationPopUpModal";
import LoadingModal from "../Components/Modals/LoadingContentModal";
import { TableDataBlock } from "../Components/ElementComponents/TableDataBlock";
import ScrollToTopButton from "../Components/StructureComponents/ScrollToTopButton";
import { queryClient } from "../Services/API/ApiInstance";

const isDebugMode:boolean = false;

let initialProjects: Project[] = [];

if(isDebugMode){
    initialProjects = generateFakeProjects(10);
}

const ProjectsListPage = () => {
  const location = useLocation();

  const [projects, setProjects] = useState<Project[]>(isDebugMode? initialProjects : []);
  const [projectsFetchMessage, setProjectsFetchMessage] = useState<string>("");
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(location.state?.isCreateProjectOpen);
  const [loadingContentOpen, setLoadingContentOpen] = useState(false);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const {data: projectList, isLoading: isProjectsLoading} = useGetProjectsRQ(
    undefined,
    () => {
      setProjects(projectList?.data.data);
      if(projectList?.data.data.length < 1){
        setProjectsFetchMessage("No projects to show.");
      }
    },
    () => {
      setProjectsFetchMessage("Failed to Load projects.");
    }
  );

  const {mutate: deleteProjectMutate} = useDeleteProjectRQ(
    () => {
      queryClient.invalidateQueries(["projects"]);
      setLoadingContentOpen(false);
    },
    () => {
      setLoadingContentOpen(false);
    }
  );

  useEffect(() => {
    setProjects(projectList?.data.data);
    setLoadingContentOpen(false);
  }, [projectList]);

  const openCreateProjectForm = () => {
    setIsCreateProjectOpen(true);
  };

  const onCreateProjectSubmitRQMode = () => {
    setLoadingContentOpen(true);
  }

  const onCreateProjectSuccess = (formData: Project) => {
    setLoadingContentOpen(false);
    setNotificationPopupOpen(true);
    setNotificationMessage("Project created successfully!");

    if(projects)
    {
      setProjects((prevProjects) => ([
        ...prevProjects,
        {
          id: formData.id,
          title: formData.title,
          description: formData.description,
          progress: 0,
          user_id: formData.user_id,
          status: statusEnum.active,
          end_date: formData.end_date,
        }
      ]));
    }
  }

  const onCreateProjectFailure = () => {
    setLoadingContentOpen(false);
    setNotificationPopupOpen(true);
    setNotificationMessage("Error creating project!");
  }

  const onProjectDelete = (project_id: number) => {
    if(!checkIfSubstring(sessionStorage.getItem('user_name') ?? '', 'Guest')){
      setLoadingContentOpen(true);
      deleteProjectMutate(project_id);
    }
    else if(projects.length < 5){
      setNotificationPopupOpen(true);
      setNotificationMessage("Guest users aren't allowed to delete projects when total projects are less than 5.");
    }
    else{
      setLoadingContentOpen(true);
      deleteProjectMutate(project_id);
    }
  }

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-3 md:p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center bg-gray-200 mt-2 rounded-t-md">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 my-2 ml-3">Projects List</h1>
        <BasicButton
          buttonText="Create New Project"
          buttonColor="green-500"
          textColor="white"
          onClick={openCreateProjectForm}
          customStyle="px-2 py-2 mr-2 text-sm md:text-base"
        />
      </div>

      <CreateProjectModal
        isOpen = {isCreateProjectOpen}
        onClose = {() => setIsCreateProjectOpen(false)}
        onSubmit= {onCreateProjectSubmitRQMode}
        onSuccess={onCreateProjectSuccess}
        onFailure={onCreateProjectFailure}
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
            <tr className="bg-gray-200">
              <th className="w-[20%] py-2 md:py-4 text-center text-sm md:text-base">Project Title</th>
              <th className="w-[50%] p-2 md:p-4 text-center text-sm md:text-base">Description</th>
              <th className="w-[30%] p-2 md:p-4 text-center text-sm md:text-base">Progress</th>
            </tr>
          </thead>
          <tbody>
            <TableDataBlock
              isDataLoading={isProjectsLoading}  
              dataFetchMessage={projectsFetchMessage}
              dataList={projects}
              noContentColSpan={3}
              onDataDelete={(id: number) => onProjectDelete(id)}
            />
          </tbody>
        </table>
      </div>

      <div className="flex justify-end p4 bg-gray-200 rounded-b-md">
      {projects && projects.length > 7 && (<BasicButton
          buttonText="Create New Project"
          buttonColor="green-500"
          textColor="white"
          onClick={openCreateProjectForm}
          customStyle="px-2 py-2 pb-3 m-1"
        />
      )}
      </div>
    </div>
  );
};

export default ProjectsListPage;
