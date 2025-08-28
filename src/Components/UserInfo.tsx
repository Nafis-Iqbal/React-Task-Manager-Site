import {useEffect, useState} from 'react';
import { queryClient } from '../Services/API/ApiInstance';
import { useGetAuthenticatedUserRQ } from '../Services/API/UserApi';
import ProfilePicture from './StructureComponents/ProfilePicture';
import makeFirstLetterUppercase from '../Utilities/Utilities';
import EditUserModal from '../Components/Modals/EditUserInfoModal';
import LoadingModal from '../Components/Modals/LoadingContentModal';
import NotificationPopUp from '../Components/Modals/NotificationPopUpModal';
import { checkIfSubstring } from '../Utilities/Utilities';

const UserInfo = ({profilePicture} : {profilePicture: string}) => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [canEditInfo, setCanEditInfo] = useState(true); 
  const [loadingContentOpen, setLoadingContentOpen] = useState(false);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const {data: userData} = useGetAuthenticatedUserRQ();

  const openEditUserForm = () => {
    setIsEditUserOpen(true);
  }

  const onEditUserSubmit = () => {
    setLoadingContentOpen(true);
  }

  const onEditUserSuccess = (formData: User) => {
    setLoadingContentOpen(false);

    openNotificationPopUpMessage("User info updated successfully!");

    queryClient.invalidateQueries(["user"]);
  }

  const onEditUserFailure = () => {
    setLoadingContentOpen(false);
    openNotificationPopUpMessage("Error updating User info!");
  }

  const openNotificationPopUpMessage = (popUpMessage: string) => {
    setNotificationPopupOpen(true);
    setNotificationMessage(popUpMessage);
  }

  useEffect(() => {
    if(checkIfSubstring(userData?.data.data.name ?? '', "Guest")){
      setCanEditInfo(false);
    }
  },[userData]);

  return (
    <div className="bg-white p-3 md:p-6 rounded-lg space-y-3 shadow-md">
      <h3 className="mb-4 text-2xl font-bold text-blue-900">User Info</h3>
      <ProfilePicture src={profilePicture} customStyle="mb-2"/>

      <EditUserModal
        isOpen={isEditUserOpen}
        defaultUserInfo={userData? userData?.data.data : {name: '', phone_number: ''}}
        onClose={() => setIsEditUserOpen(false)}
        onSubmit={onEditUserSubmit}
        onSuccess={onEditUserSuccess}
        onFailure={onEditUserFailure}
      />

      <NotificationPopUp
        isOpen = {notificationPopupOpen}
        onClose = {() => setNotificationPopupOpen(false)}
        message = {notificationMessage}
      />

      <LoadingModal
        isOpen = {loadingContentOpen}
      />

      <div className=''>
        <table className='w-1/4 border-collapse relative'>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='space-y-3'>
            <tr className='space-x-4'>
              <td className='text-lg md:text-xl text-blue-600'>
              <strong>Name:</strong>
              </td>
              <td className='text-xl font-semibold'>
              {makeFirstLetterUppercase(userData?.data.data.name)}
              </td>
            </tr>

            <tr>
              <td className='text-lg md:text-xl text-blue-600'>
              <strong>Role:</strong>
              </td>
              <td className='text-xl font-semibold bg-blue-200 rounded-md'>
              {makeFirstLetterUppercase(userData?.data.data.role)}
              </td>
            </tr>

            <tr>
              <td className='text-lg md:text-xl text-blue-600'>
              <strong>Phone:</strong>
              </td>
              <td className='text-xl font-semibold'>
              {userData?.data.data.phone_number}
              </td>
            </tr>
          </tbody>

          {canEditInfo && (<button
            className="absolute bottom-0 right-0 translate-x-10 translate-y-1 bg-blue-600 text-white p-1 rounded-lg hover:bg-blue-500"
            onClick={() => openEditUserForm()}
          >
            Edit
          </button>)}
        </table>

        
      </div>

    </div>
  );
};

export default UserInfo;
