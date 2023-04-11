import { getUserFromCookies } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task } from "@/types";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./Card";
import NewTask from "./NewTask";
import TaskStatus from "./TaskStatus";
const getData = async () => {
    const user = await getUserFromCookies(cookies());
    const tasks = await db.task.findMany({
        where: {
            ownerId: user?.id,
            NOT: {
                status: TASK_STATUS.COMPLETED,
                deleted: false,
            },
        },
        take: 5,
        orderBy: {
            due: "asc",
        },
    });
    return tasks;
};

const TaskCard = async ({
    tasks,
    title,
}: {
    tasks: Task[] | undefined;
    title: string | undefined;
}) => {
    const data = tasks || (await getData());

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-3xl text-gray-600 font-bold">
                        {title}
                    </span>
                </div>
                <div>
                    <NewTask />
                </div>
            </div>
            <div>
                {data && data.length ? (
                    <div className="flex flex-col gap-6">
                        {data.map((task) => (
                            <Card
                                key={task.id}
                                className="py-2 px-4 rounded-full drop-shadow-none bg-purple-50"
                            >
                                <div>
                                    <span className="text-gray-800 font-bold">
                                        {task.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-purple-400 text-base">
                                        {task.description}
                                    </span>
                                </div>
                                <TaskStatus intent={"COMPLETED"} />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div>No tasks yet</div>
                )}
            </div>
        </Card>
    );
};

export default TaskCard;
