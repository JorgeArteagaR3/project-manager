import { SidebarLinkItem } from "@/types";
import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links: SidebarLinkItem[] = [
    { label: "Home", icon: "Grid", link: "/home" },
    {
        label: "Calendar",
        icon: "Calendar",
        link: "/calendar",
    },
    { label: "Profile", icon: "User", link: "/profile" },
    {
        label: "Settings",
        icon: "Settings",
        link: "/settings",
    },
];

const Sidebar = () => {
    return (
        <Card className="h-30 w-full flex items-center justify-between md:w-40 md:flex-col md:h-full md:py-16">
            {links.map((link) => (
                <SidebarLink
                    key={link.label}
                    link={link}
                />
            ))}
        </Card>
    );
};

export default Sidebar;
