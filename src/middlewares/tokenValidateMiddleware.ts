import type { NextFunction, Request, Response } from "express"
import SessionsRepository from "../repositories/sessionsRepository.js"
import usersRepository from "../repositories/usersRepository.js"
import jwt from "jsonwebtoken"

export default async function tokenValidateMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers

  const token = authorization?.replace("Bearer ", "")

  if (!token) {
    res.sendStatus(401)
    return
  }

  try {
    const user = await verifyToken(token)
    res.locals.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }
}


export async function verifyToken(token: string) {
  const session = await new SessionsRepository().findByToken(token)

  if (!session) {
    throw new Error("Unauthorized")
  }

  try {
    const secretKey = process.env.JWT_SECRET || ""

    if (!secretKey) {
      throw new Error("Unexpected Error")
    }

    jwt.verify(token, secretKey)
  } catch (err) {
    throw new Error("Unauthorized")
  }

  const user = await usersRepository.findById(session.user_id)

  if (!user || !user.is_active) {
    throw new Error("Unauthorized")
  }

  return user
}
