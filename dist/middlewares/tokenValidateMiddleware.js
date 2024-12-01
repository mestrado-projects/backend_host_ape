import SessionsRepository from "../repositories/sessionsRepository.js";
import jwt from "jsonwebtoken";
export default async function tokenValideMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    const user = await verifyToken(token);
    res.locals.user = user;
    next();
}
export async function verifyToken(token) {
    const session = await new SessionsRepository().findByToken(token);
    if (!session) {
        throw new Error("Unauthorized");
    }
    try {
        const secretKey = process.env.JWT_SECRET || "";
        if (!secretKey) {
            throw new Error("Unexpected Error");
        }
        jwt.verify(token, secretKey);
    }
    catch (err) {
        throw new Error("Unauthorized");
    }
    return session.guest_id;
}
