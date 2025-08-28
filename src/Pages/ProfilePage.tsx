import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { queryClient } from '../Services/API/ApiInstance';
import { useGetTagsRQ, useDeleteTagRQ, useUpdateTagRQ } from '../Services/API/TagApi';
import { useGetTasksRQ } from '../Services/API/TaskApi';
import { useGetProjectsRQ } from '../Services/API/ProjectApi';

import UserInfo from '../Components/UserInfo';
import BasicTextDiv from '../Components/CustomDivElements';
import CreateTagModal from '../Components/Modals/CreateTaskTagModal';
import LoadingModal from '../Components/Modals/LoadingContentModal';
import NotificationPopUp from '../Components/Modals/NotificationPopUpModal';
import { TableDataBlock } from '../Components/ElementComponents/TableDataBlock';
import ProfileHeroSection from '../Components/StructureComponents/ProfileHeroSection';
import BasicButton from '../Components/ElementComponents/BasicButton';
import ScrollToTopButton from '../Components/StructureComponents/ScrollToTopButton';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const [tagsData, setTagsData] = useState<Tag[]>([]);
  const [tagsFetchMessage, setTagsFetchMessage] = useState<string>("");
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);

  const [loadingContentOpen, setLoadingContentOpen] = useState(false);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const [profilePicture, setProfilePicture] = useState<string>('images/profile_picture.jpg');

  const { data: tasksDataAll , isLoading: isTasksLoading} = useGetTasksRQ(
    undefined, 
    () => {

    },
    () => {
    }
  );

  const { data: projectsDataAll , isLoading: isProjectsLoading} = useGetProjectsRQ(
    undefined, 
    () => {

    },
    () => {
    }
  );

  const {data: tagsDataAll, isLoading: tagsDataLoading} = useGetTagsRQ(
    () => {
      setTagsData(tagsDataAll?.data.data);

      if(tagsDataAll?.data.data.length < 1){
        setTagsFetchMessage("No projects to show.");
      }
    },
    () => {
      setTagsFetchMessage("Failed to Load tags.");
    }
  );

  const {mutate: updateTagMutate} = useUpdateTagRQ(
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Tag updated successfully.");

      queryClient.invalidateQueries(["tags"]);
    },
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Failed to update tag. Try again");
    }
  );

  const {mutate: deleteTagMutate} = useDeleteTagRQ(
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Tag deleted successfully.");

      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    () => {
      setLoadingContentOpen(false);
      openNotificationPopUpMessage("Failed to delete tag. Try again");
    }
  );

  useEffect(() => {
    setTagsData(tagsDataAll?.data.data);
    setTasksData(tasksDataAll?.data.data);
    setProjectsData(projectsDataAll?.data.data);

    if (location.state?.scrollTo) {
      const targetElement = document.getElementById(location.state.scrollTo);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [tagsDataAll, tasksDataAll, projectsDataAll, location.state]);

  const openCreateTagForm = () => {
    setIsCreateTagOpen(true);
  }

  const onCreateTagSubmit = () => {
    setLoadingContentOpen(true);
  }

  const onCreateTagSuccess = (formData: Tag) => {
    setLoadingContentOpen(false);

    openNotificationPopUpMessage("Tag created successfully!");

    if(tagsData)
    {
      setTagsData((prevTags) => [
        ...prevTags,
        {
          id: formData.id, // Generate a new task ID
          title: formData.title,
        }
      ]);
    }
  }

  const onCreateTagFailure = () => {
    setLoadingContentOpen(false);
    openNotificationPopUpMessage("Error creating task tag!");
  }

  const openNotificationPopUpMessage = (popUpMessage: string) => {
    setNotificationPopupOpen(true);
    setNotificationMessage(popUpMessage);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen space-y-4 bg-gray-200">
      <ProfileHeroSection tasks={tasksData} projects={projectsData}/>

      <UserInfo profilePicture={profilePicture}/>

      <CreateTagModal
        isOpen={isCreateTagOpen}
        onClose={() => setIsCreateTagOpen(false)}
        onSubmit={onCreateTagSubmit}
        onSuccess={onCreateTagSuccess}
        onFailure={onCreateTagFailure}
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

      <div className="flex space-x-2 pt-2">
        <Link to="/projects">
          <BasicTextDiv
            displayText='Show Projects'
            customStyle='rounded-lg bg-green-500 text-white p-2 md:p-3 shadow-md'
          />
        </Link>

        <Link to="/tasks">
          <BasicTextDiv
            displayText='Show Tasks'
            customStyle='rounded-lg bg-green-500 text-white p-2 md:p-3 shadow-md'
          />
        </Link>
      </div >

      <div className='min-h-[50px] pt-3 text-2xl font-bold text-blue-900'>Admin Tasks</div>

      {/* Tag Creation Panel */}
      <div id="tag_section" className="relative flex flex-col justify-left items-center bg-gray-100 rounded-lg pt-4 pb-10">
        <h1 className="text-gray-800 pl-3 pb-2 font-bold text-lg md:text-xl">Tag Manager</h1>
        <table className="w-full border-collapse space-y-1">
          <thead>
            <tr className="bg-gray-400 w-[100%]">
              <th className="px-4 py-2 w-[20%] rounded-tl-md">Tag Title</th>
              <th className="px-4 py-2 w-[30%]">Edit</th>
              <th className="px-4 py-2 w-[10%]"></th>
              <th className="px-4 py-2 w-[20%]">Actions</th>
              <th className="px-4 py-2 w-[20%] rounded-tr-md">
                <BasicButton
                  buttonText="Create New Tag"
                  buttonColor="green-600"
                  textColor="white"
                  onClick={() => openCreateTagForm()}
                  customStyle="hover:bg-green-700 p-2 text-sm md:text-base"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <TableDataBlock
              dataList={tagsData}
              isDataLoading={tagsDataLoading}
              dataFetchMessage={tagsFetchMessage}
              noContentColSpan={5}
              onDataUpdate={(tag: Tag) => updateTagMutate(tag)}
              onDataDelete={(id: number) => deleteTagMutate(id)}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
