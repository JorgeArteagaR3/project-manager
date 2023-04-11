import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaRunning, FaHourglassStart } from "react-icons/fa";
const taskStatusClasses = cva(["flex", "gap-2"], {
    variants: {
        intent: {
            COMPLETED: ["text-lime-400"],

            NOT_STARTED: ["text-purple-300"],
            STARTED: ["text-amber-400"],
        },
        size: {
            small: ["text-xs"],
            medium: ["text-lg", "px-6", "py-2"],
            large: ["text-xlg", "px-8", "py-4"],
        },
    },
    defaultVariants: {
        intent: "COMPLETED",
        size: "small",
    },
});

const IconStatus = (status: string) => {
    if (status == "COMPLETED") {
        return AiFillCheckCircle;
    } else if (status == "NOT_STARTED") {
        return FaHourglassStart;
    } else {
        return FaRunning;
    }
};

const statusText = (status: string) => {
    if (status == "COMPLETED") {
        return "Completed";
    } else if (status == "STARTED") {
        return "Task Started";
    } else {
        return "Task not started yet";
    }
};

export interface TasksStatusProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof taskStatusClasses> {}

const TaskStatus: FC<TasksStatusProps> = ({
    intent,
    size,
    className,
    ...props
}) => {
    const Icon = IconStatus(intent!);

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-400 block text-sm">
                {statusText(intent!)}
            </span>
            <div
                className={taskStatusClasses({ intent, size, className })}
                {...props}
            >
                {intent === "NOT_STARTED" ? "" : <Icon size={16} />}
            </div>
        </div>
    );
};
export default TaskStatus;
