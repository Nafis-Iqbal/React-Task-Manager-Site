export {};
//   //Not used with react-query
//   const OnCreateTaskSubmit = (e: React.FormEvent, formData: Task) => {
//     e.preventDefault();

//     const createNewTaskApiCall = async () => {
//       try{
//         setLoadingContentOpen(true);
//         const response = await createTask(formData);
        
//         if(response.data?.status === "success"){
//           setNotificationPopupOpen(true);

//           if(tasks)
//           {
//             setTasks((prevTasks) => [
//               ...prevTasks,
//               {
//                 id: prevTasks.length + 2, // Generate a new task ID
//                 title: formData.title,
//                 description: formData.description,
//                 project_id: formData.project_id,
//                 priority: formData.priority,
//                 status: formData.status, // Default status
//                 progress: 0, // Default progress value
//                 user_id: 1, // Example, assuming you have a static user_id or get it dynamically
//                 start_Date: new Date(), // Default to the current date
//                 end_Date: formData.end_Date, // From the form data
//               }
//             ]);
//           }
//         }
//       }
//       catch(error)
//       {
//         console.log("Error creating new task inside component");
//       }
//       finally{
//         setLoadingContentOpen(false);
//       }
//     }

//     createNewTaskApiCall();

//     setIsCreateTaskOpen(false);
//   };

//   //Not used in react-query mode
//   const onCreateProjectSubmit = (e: React.FormEvent, formData: Project) => {
//     e.preventDefault();

//     //calls api

//     setProjects((prevProjects) => ([
//       ...prevProjects,
//       {
//         id: formData.id,
//         title: formData.title,
//         description: formData.description,
//         progress: 0,
//         user_id: formData.user_id,
//         status: statusEnum.active,
//         end_Date: formData.end_Date,
//       }
//     ]));

//     setIsCreateProjectOpen(false);
//   }