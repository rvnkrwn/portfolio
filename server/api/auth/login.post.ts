import { H3Event, readBody } from "h3";
import { prisma } from "~/server/utils/prisma";
import bcrypt from "bcryptjs";

const safePassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export default defineEventHandler(async (event: H3Event) => {
    try {
        const { password, ...data } = await readBody(event);
        const hashedPassword = await safePassword(password);
        const payload = { password: hashedPassword, ...data };
        await prisma.users.create({ data: payload });
        return {
            message: "successfully created"
        };
    } catch (e) {
        return {
            error: "An error occurred while creating user"
        };
    }
});
