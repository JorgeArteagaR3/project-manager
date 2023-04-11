import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";
import { FC } from "react";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
    include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
    const completedCount = project.tasks.filter(
        (task) => task.status === TASK_STATUS.COMPLETED
    ).length;
    const progress = project.tasks.length
        ? (completedCount / project.tasks.length) * 100
        : 0;
    const totalTasks = `${completedCount}/${project.tasks.length} completed`;
    return (
        <Card className="transition-all ease-in-out duration-200 hover:bg-pink-500">
            <div>
                <span className="text-sm text-gray-300">
                    {formatDate(project.createdAt)}
                </span>
            </div>
            <div className="mb-3 md:mb-6">
                <p className="text-lg md:text-2xl text-gray-600 overflow-hidden text-ellipsis">
                    {project.name}
                </p>
            </div>
            <div className="mb-1 md:mb-2">
                <span className="text-gray-400">
                    {project.tasks.length ? totalTasks : "No tasks yet"}
                </span>
            </div>
            <div>
                <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
                    <div
                        className={clsx(
                            "h-full text-center text-xs text-white bg-violet-600 rounded-full"
                        )}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-right">
                    <span className="text-sm text-gray-600 font-semibold">
                        {progress}%
                    </span>
                </div>
            </div>
        </Card>
    );
};
