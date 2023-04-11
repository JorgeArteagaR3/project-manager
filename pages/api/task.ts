import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function newTask(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME!]);

    await db.task.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            ownerId: user.id,
            projectId: req.body.projectId,
            status: "NOT_STARTED",
        },
    });

    res.json({ data: { message: "Task Succesfully Created" } });
}
