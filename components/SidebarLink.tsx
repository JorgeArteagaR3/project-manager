"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SidebarLinkItem } from "@/types";

const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }: { link: SidebarLinkItem }) => {
    const pathname = usePathname();
    let isActive = false;

    if (pathname === link.link) {
        isActive = true;
    }

    const Icon = icons[link?.icon as keyof typeof icons];
    return (
        <Link
            href={link.link}
            className="w-full flex justify-center items-center"
        >
            <Icon
                className={clsx(
                    "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out md:w-[40px] md:h-[40px]",
                    isActive && "stroke-violet-600"
                )}
            />
        </Link>
    );
};

export default SidebarLink;
