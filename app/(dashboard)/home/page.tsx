import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProjects from "@/components/NewProjects";
import { ProjectCard } from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { getUserFromCookies } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
    const user = await getUserFromCookies(cookies());
    const projects = await db.project.findMany({
        where: {
            ownerId: user?.id,
        },
        include: {
            tasks: true,
        },
    });
    return projects;
};

export default async function Page() {
    const projects = await getData();

    return (
        <div className="h-full overflow-y-auto pr-6 w-full">
            <div className=" h-full  items-stretch min-h-[content]">
                <div className="flex-1 grow flex">
                    <Suspense fallback={<GreetingsSkeleton />}>
                        <Greetings />
                    </Suspense>
                </div>
                <div className="flex flex-col md:flex-wrap lg:grid lg:grid-cols-2 2xl:grid-cols-4 lg:auto-rows-[200px] lg:place-items-center items-center mt-3 -m-3">
                    {projects?.map((project) => (
                        <div
                            className="w-full h-full p-3 overflow-hidden"
                            key={project.id}
                        >
                            <Link href={`/project/${project.id}`}>
                                <ProjectCard project={project} />
                            </Link>
                        </div>
                    ))}
                    <div className="w-1/3 p-3">
                        <NewProjects />
                    </div>
                </div>
                <div className="mt-6 flex-2 grow w-full flex">
                    <div className="w-full">
                        <Suspense fallback={<GreetingsSkeleton />}>
                            <TaskCard title={"List of Tasks"} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
