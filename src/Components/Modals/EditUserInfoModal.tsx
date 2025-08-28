import { useState, useEffect } from 'react';

import { queryClient } from "../../Services/API/ApiInstance";
import { useUpdateUserRQ } from "../../Services/API/UserApi";
import { isNumber } from '../../Utilities/Utilities';

const EditUserModal: React.FC<EditUserInfoModalProps> = ({
    isOpen,
    defaultUserInfo,
    onClose,
    onSubmit,
    onSuccess,
    onFailure
}) => {

    const[formData, setFormData] = useState<User>(defaultUserInfo);

    const {mutate: updateUserInfoMutate} = useUpdateUserRQ(
        (responseData) => {
            if(responseData.data.status === "success"){
                onSuccess(formData);
                queryClient.invalidateQueries(["user"]);

                setFormData(defaultUserInfo);
            }
            else{
                onFailure();
            }
        },
        () => {
            onFailure();
        }
    );

    useEffect(() => {
        setFormData(defaultUserInfo);
    }, [defaultUserInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let{name, value} = e.target;

        if(name === "phone_number" && !isNumber(value)){
            value = formData.phone_number;
        }
       
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name && !formData.phone_number) {
            alert("Please fill at least one field!");
            return;
        }

        onSubmit();
        
        updateUserInfoMutate(formData);
        onClose();
    }

    const handleClose = () => {
        setFormData(defaultUserInfo);

        onClose();
    }

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit User Info</h2>
  
          <form onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
            {/* User Name */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone Number*/}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                maxLength={11}
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Info
              </button>
            </div>
          </form>          
        </div>
      </div>
    );
}

export default EditUserModal;