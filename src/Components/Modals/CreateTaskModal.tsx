import { priority, statusEnum } from "../../Types&Enums/Enums";
import { useState, useEffect } from 'react';
import { useCreateTaskRQ } from "../../Services/API/TaskApi";
import { queryClient } from "../../Services/API/ApiInstance";

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
    isOpen,
    projects,
    onClose,
    onSubmit,
    onSuccess,
    onFailure
}) => {

  const[formData, setFormData] = useState<Task>({
    title: '',
    description: '',
    project_id: projects[0]?.id || 0,
    id: 0,
    user_id: 1,
    status: statusEnum.active,
    priority: priority.normal,
    end_date: new Date(),
  });

  const {mutate: createTaskMutate} = useCreateTaskRQ(
    (responseData) => {
      if(responseData.data.status === "success")
      {
        onSuccess(responseData.data.data);
        queryClient.invalidateQueries(["tasks"]);
        queryClient.invalidateQueries(["tasks", formData.project_id]);

        setFormData({
          title: '',
          description: '',
          project_id: projects[0]?.id || 0,
          id: 0,
          user_id: 1,
          status: statusEnum.active,
          priority: priority.normal,
          end_date: new Date(),
        });
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
    setFormData((prevData) => ({
      ...prevData,
      project_id: projects[0]?.id | 0, // Set the first available project_id
    }));
  }, [projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const{name, value} = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'end_date' ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit();
    createTaskMutate(formData);
    onClose();
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      project_id: projects[0]?.id || 0,
      id: 0,
      user_id: 1,
      status: statusEnum.active,
      priority: priority.normal,
      end_date: new Date(),
    });

    onClose();
  }

  if (!isOpen) return null;

    return(
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-lg p-3 md:p-6 shadow-lg w-full max-w-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Create Task</h2>
  
          <form onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
            {/* Task Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-xs md:text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            {/* Task Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-xs md:text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            {/* Project Select */}
            <div className="mb-4">
              <label htmlFor="project_id" className="block text-xs md:text-sm font-medium text-gray-700">
                Project
              </label>
              <select
                id="project_id"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Priority Select */}
            <div className="mb-4">
              <label htmlFor="priority" className="block text-xs md:text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={priority.normal}>Normal</option>
                <option value={priority.urgent}>Urgent</option>
              </select>
            </div>
  
            {/* End Date Picker */}
            <div className="mb-4">
              <label htmlFor="end_date" className="block text-xs md:text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date.toISOString().split('T')[0]} // Convert Date to yyyy-mm-dd
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-500 text-sm md:text-base text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-sm md:text-base text-white rounded-lg hover:bg-blue-600"
              >
                Create Task
              </button>
            </div>
          </form>          
        </div>
      </div>
    );
}

export default CreateTaskModal;