import React from 'react';
import { useNavigate } from 'react-router-dom';

import { calculateRemainingDays } from '../../Utilities/Utilities';
import BasicButton from '../ElementComponents/BasicButton';

const TaskDetailHeroSection: React.FC<{
    task_id: number,
    task_title: string,
    project_id: number,
    project_title: string,
    user_id: number,
    userName: string,
    end_date: Date,
    customStyle?: string
}> = ({
    task_id, 
    task_title, 
    project_id, 
    project_title, 
    user_id, 
    userName,
    end_date,
    customStyle
} : {
    task_id: number,
    task_title: string,
    project_id: number,
    project_title: string,
    user_id: number,
    userName: string,
    end_date: Date,
    customStyle?: string
}) => {
    const isGroupProjectTask: boolean = false;
    const navigate = useNavigate();

  return (
    <div className={`bg-blue-900 p-3 md:p-6 rounded-lg shadow-md ${customStyle}`}>
        <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-semibold mb-1 md:mb-3 bg-gray-100 rounded-lg p-2 text-gray-700">{task_title}</h1>

            <h3 className="text-xl md:text-2xl font-semibold text-blue-300"># {task_id}</h3>
            
            <div className="min-h-[100px]"></div>
            
            <div className="flex justify-between w-[100%]">
                <div className="flex flex-col">
                    <p className="text-xl md:text-2xl bg-gray-100 rounded-lg p-1 md:p-2 mb-2">Belongs to project:</p>

                    <BasicButton
                        buttonText={project_title}
                        buttonColor='blue-500'
                        textColor='gray-800'
                        customStyle='p-1 md:p-2 text-xl md:text-2xl font-semibold w-fit hover:bg-blue-400'
                        onClick={() => navigate(`/projects/${project_id}`)}
                    />
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl bg-gray-100 rounded-lg p-1 md:p-2 mb-2">Days till deadline:</h2>
                    <p className="text-center pt-1 md:pt-2 text-xl md:text-2xl font-semibold text-blue-300">{calculateRemainingDays(end_date)} days</p>
                </div>

                {isGroupProjectTask && (<div className="flex flex-col">
                    <h2 className="text-2xl bg-gray-100 rounded-lg p-2">{userName}</h2>
                    <p className="text-center pt-2 text-xl font-semibold text-blue-300">{user_id}</p>
                </div>)}
            </div>
        </div>
    </div>
  );
};

export default TaskDetailHeroSection;
