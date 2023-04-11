"use client";
import { createNewTask } from "@/lib/api";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

interface Task {
    title: string;
    description: string;
}

const NewTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [task, setTask] = useState<Task>({ title: "", description: "" });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const router = usePathname();
    const id = router?.split("/")[2] || "";

    console.log(id);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputName = e.target.name;
        setTask((prevTask) => ({ ...prevTask, [inputName]: e.target.value }));
        console.log(`${inputName}: ${e.target.value}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createNewTask({
            description: task.description,
            name: task.title,
            projectId: id,
        });
        closeModal();
    };

    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <Button
                intent="text"
                className="text-violet-600"
                onClick={() => openModal()}
            >
                + New Task
            </Button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.7)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-2/3 md:w-[400px] bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6 text-center">Create New Task</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center flex-col gap-4"
                >
                    <Input
                        className={"text-center"}
                        placeholder="Project Task"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                    <Input
                        className={"text-center h-[100px]"}
                        placeholder="Description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};

export default NewTask;
