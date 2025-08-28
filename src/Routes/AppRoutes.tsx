import {lazy} from "react";
import { RouteObject, Outlet } from "react-router-dom";
import RequireAuth from "./AuthProvider";

import LoginPage from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import TasksListPage from "../Pages/TasksListPage";
import ProjectsListPage from "../Pages/ProjectsListPage";
import ResourceNotFoundPage from "../Pages/ResourceNotFound";

const DashboardPage = lazy(() => import("../Pages/DashboardPage"));
const TaskDetailsPage = lazy(() => import("../Pages/TaskDetailsPage"));
const ProjectDetailsPage = lazy(() => import("../Pages/ProjectDetailsPage")) ;
const SettingsPage = lazy(() => import("../Pages/SettingsPage")) ;
const AdminPage = lazy(() => import("../Pages/AdminPage")) ;

const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/",
        element: <RequireAuth children={<Outlet />} />,
        children:[
            {
                path: "/dashboard",
                element: <DashboardPage/>,
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/tasks",
                element: <TasksListPage/>
            },
            {
                path: "/tasks/:taskId",
                element: <TaskDetailsPage/>,
            },
            {
                path: "/projects",
                element: <ProjectsListPage/>
            },
            {
                path: "/projects/:projectId",
                element: <ProjectDetailsPage/>,
            },
            {
                path: "/settings",
                element: <SettingsPage/>,
            },
            {
                path: "/admin",
                element: <AdminPage/>,
            },
            {
                path: "/resource_not_found",
                element: <ResourceNotFoundPage/>,
            }
        ]
    }
];

export default appRoutes;