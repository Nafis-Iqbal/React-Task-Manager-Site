import React, { useState, useEffect } from 'react';

import { useGetAuthenticatedUserRQ } from '../Services/API/UserApi';
import { useGetTasksRQ } from '../Services/API/TaskApi';
import { statusEnum } from '../Types&Enums/Enums';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import OpenSidebarButton from '../Components/StructureComponents/OpenSidebarButton';
import { NoContentTableRow } from '../Components/ElementComponents/NoContentDiv';

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatuses, setTaskStatuses] = useState({
    active: 0,
    paused: 0,
    completed: 0,
    cancelled: 0
  });

  const {data: userData} = useGetAuthenticatedUserRQ();

  const navigate = useNavigate();

  const { data: tasksList , isLoading: isTasksLoading} = useGetTasksRQ(
    undefined, 
    () => {
      
    },
    () => {
 
    }
  );

  // Filter tasks by priority
  const filterTasksByPriority = (priority: string) => {
    if(tasks) setFilteredTasks(tasks.filter((task) => task.priority.toString() === priority));
    else setFilteredTasks([]);
  };

  const filterTasksByStatus = (status: string) => {
    if(tasks) setFilteredTasks(tasks.filter((task) => task.status.toString() === status));
    else setFilteredTasks([]);
  };

  // Count completed and overdue tasks
  useEffect(() => {
    setTasks(tasksList?.data.data);
    const taskData = (tasksList?.data.data) as Task[];

    if(taskData)
    {
      const statusCounts = {
        active: taskData.filter(task => task.status === statusEnum.active).length,
        paused: taskData.filter(task => task.status === statusEnum.paused).length,
        completed: taskData.filter(task => task.status === statusEnum.completed).length,
        cancelled: taskData.filter(task => task.status === statusEnum.cancelled).length,
      };
  
      setTaskStatuses(statusCounts);
    }

    setFilteredTasks(taskData);
  }, [tasksList]);

  const onClickCreateManageTags = () => {
    navigate('/profile', {state: {scrollTo: 'tag_section'}});
  }
 
  const onClickCreateNewTask = () => {
    navigate('/tasks', {state: {isCreateTaskOpen: true}});
  }

  const onClickCreateNewProject = () => {
    navigate('/projects', {state: {isCreateProjectOpen: true}});
  }

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col">
      <header className="flex flex-col md:flex-row items-center justify-between bg-gray-300 min-h-[100px] text-blue-900 p-4">
        <h1 className="flex-shrink-0 text-2xl md:text-3xl font-bold ml-1 md:ml-5 mt-3">Dashboard</h1>
        <h1 className="text-xl md:text-3xl font-bold mt-3 mx-auto">Welcome <span className="font-bold drop-shadow-m text-red-400">{userData?.data.data.name}!</span></h1>
      </header>

      <div className="flex flex-1 p-4 space-x-4">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/5 bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold text-lg text-black mb-4">Quick Actions</h2>
          <ul>
            <li>
              <button onClick={onClickCreateNewTask} className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-blue-600 transition">Create New Task</button>
            </li>
            <li>
              <button onClick={onClickCreateNewProject} className="w-full text-left bg-green-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-green-600 transition">Create New Project</button>
            </li>
            <li>
              <button onClick={onClickCreateManageTags} className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-yellow-600 transition">Manage Tags</button>
            </li>
            <li>
              <button disabled className="w-full text-left bg-indigo-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-yellow-600 transition
              disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">Manage Users</button>
            </li>
          </ul>
        </aside>

        {/* Small Screen Sidebar */}
        {!isSidebarOpen && <OpenSidebarButton customStyle="md:hidden fixed top-20 -left-3 p-4" onClick={() => setIsSidebarOpen(true)}/>}

        {isSidebarOpen && (
          <aside className="fixed w-1/2 top-0 -left-4 min-h-screen md:hidden bg-white shadow-md p-3 z-50">
            <div className='flex items-center bg-blue-900 text-white text-2xl mb-2 min-h-[80px] rounded-md'>
              <p className='mt-1 ml-5'>Task Manager</p>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className="font-semibold text-lg text-black">Quick Actions</h2>

              <OpenSidebarButton onClick={() => setIsSidebarOpen(false)} customStyle='p-2'/>
            </div>
            
            <ul>
              <li>
                <button onClick={onClickCreateNewTask} className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-blue-600 transition">Create New Task</button>
              </li>
              <li>
                <button onClick={onClickCreateNewProject} className="w-full text-left bg-green-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-green-600 transition">Create New Project</button>
              </li>
              <li>
                <button onClick={onClickCreateManageTags} className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-yellow-600 transition">Manage Tags</button>
              </li>
              <li>
                <button disabled className="w-full text-left bg-indigo-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-yellow-600 transition
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">Manage Users</button>
              </li>
            </ul>
          </aside>
        )}

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40 backdrop-blur-sm pointer-events-auto"></div>
        )}

        {/* Main Content */}
        <main className="w-full md:w-3/4 flex-col space-y-4">
          {/* Medium Screen Stats */}
          <section className="hidden md:grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-medium">Total Tasks</h3>
                <p className="text-xl md:text-3xl font-bold">{tasks ? tasks.length : 0}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-medium">Completed Tasks</h3>
                <p className="text-xl md:text-3xl font-bold text-green-500">{taskStatuses.completed}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-medium">Paused Tasks</h3>
                <p className="text-xl md:text-3xl font-bold text-red-500">{taskStatuses.paused}</p>
              </div>
            </div>
          </section>

          {/* Small Screen Stats */}
          <section className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 items-center md:hidden">
            <div>
              <h3 className="text-xl font-medium">Total Tasks</h3>
              <p className="text-3xl font-bold text-center border-b border-blue-900">{tasks ? tasks.length : 0}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium">Completed Tasks</h3>
              <p className="text-3xl font-bold text-green-500 text-center border-b border-blue-900">{taskStatuses.completed}</p>
            </div>

            <div>
              <h3 className="text-xl font-medium">Paused Tasks</h3>
              <p className="text-3xl font-bold text-red-500 text-center border-b border-blue-900">{taskStatuses.paused}</p>
            </div>
          </section>

          {/* Task Filters */}
          <section className="bg-white rounded-lg shadow-md p-4 flex-col justify-between items-center">
            <div className="bg-gray-200 text-gray-700 text-lg md:text-xl font-bold w-fit px-3 md:px-4 py-2 md:py-3 mb-3 rounded-md transition">Filters</div>

            <div className='grid grid-cols-2 gap-2 md:flex items-center text-center space-x-1 md:space-y-1'>
              <button onClick={() => filterTasksByPriority('urgent')} className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-red-600 transition">
                Urgent
              </button>
              <button onClick={() => filterTasksByPriority('normal')} className="bg-green-400 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-green-500 transition ml-2">
                Normal
              </button>
              <button onClick={() => filterTasksByStatus('paused')} className="bg-yellow-500 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-yellow-600 transition ml-2">
                Paused
              </button>
              <button onClick={() => filterTasksByStatus('completed')} className="bg-green-700 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-green-800 transition ml-2">
                Completed
              </button>
              <p className="text-green-700 text-sm md:text-base font-semibold">More features to come...</p>
            </div>
          </section>

          {/* Task List */}
          <section className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Filtered Tasks</h2>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredTasks && filteredTasks.length > 0)? (filteredTasks.map((task) => (
                    <tr>
                      <td>
                        <li key={task.id} className="flex justify-between items-center border-b pb-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-medium">{task.title}</h3>
                            <p className="text-xs md:text-sm text-gray-500">Due: {1}</p>
                            <p className="text-xs md:text-sm text-gray-500">Assigned to: {task.user_id}</p>
                          </div>
                          <div>
                            <span className={`px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md text-white ${
                              task.priority.toString() === 'Urgent' ? 'bg-red-500' :
                              task.priority.toString() === 'Normal' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>{task.priority}</span>
                          </div>
                          <div className="ml-4">
                            <span className={`px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md ${
                              task.status.toString() === 'Completed' ? 'bg-green-400' :
                              task.status.toString() === 'Active' ? 'bg-blue-400' : 'bg-yellow-400'
                            } text-white`}>{task.status}</span>
                          </div>
                        </li>
                      </td>
                    </tr>
                  ))) : (
                    <NoContentTableRow tdColSpan={1} displayMessage='Nothing to show.'/>
                  )}
                </tbody>
              </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
