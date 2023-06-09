export const fetcher = async ({ url, method, body, json = true }) => {
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("API ERROR");
    }
    if (json) {
        const data = await res.json();
        return data.data;
    }
};

export const register = (user) => {
    return fetcher({ url: "/api/register", body: user, method: "post" });
};

export const signin = (user) => {
    return fetcher({ url: "/api/signin", body: user, method: "post" });
};

export const createNewProject = async (name: string) => {
    fetcher({
        url: "/api/project",
        method: "POST",
        body: { name },
        json: true,
    });
};

export const createNewTask = async ({
    name,
    description,
    projectId,
}: {
    name: string;
    description: string;
    projectId: string;
}) => {
    fetcher({
        url: "/api/task",
        method: "POST",
        body: { name, description, projectId },
        json: true,
    });
};
