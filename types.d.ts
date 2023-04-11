export interface Task {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    status: string;
    deleted: boolean;
    description: string;
    due: Date | null;
    ownerId: string;
    projectId: string;
}

export interface SidebarLinkItem {
    label: string;
    icon: string;
    link: string;
}
