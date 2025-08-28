import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {statusEnum} from "../../Types&Enums/Enums";
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"]; // Green, Blue, Orange

export const ProjectHeroSection = ({projectTasks} : {projectTasks: Task[]}) => {
    let chartData;
    if(projectTasks && projectTasks.length > 0)
    {
        chartData = [
            { name: "Completed", value: projectTasks.filter((t) => t.status === statusEnum.completed).length },
            { name: "In Progress", value: projectTasks.filter((t) => t.status === statusEnum.active).length },
            { name: "Paused", value: projectTasks.filter((t) => t.status === statusEnum.paused).length },
            { name: "Cancelled", value: projectTasks.filter((t) => t.status === statusEnum.cancelled).length },
        ];
    }
    else{
        chartData = [{ name: "No Tasks created", value: 1 }]
    }

    return (
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Project Dashboard</h1>
            <div className="flex justify-center">
                <div className="w-full h-[180px] md:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}