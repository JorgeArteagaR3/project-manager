"use client";
import { createNewProject } from "@/lib/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewProjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createNewProject(name);
        closeModal();
    };
    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <Button onClick={() => openModal()}>+ New Project</Button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.7)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-2/3 md:w-[400px] bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6 text-center">Create Project</h1>
                <form
                    className="flex items-center flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <Input
                        className={"text-center"}
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};

export default NewProjects;
