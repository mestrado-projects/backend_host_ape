import bcrypt from "bcrypt"
import usersRepository from "../../repositories/usersRepository.js"
import type { Users } from "../../models/index.js"
import SessionsRepository from "../../repositories/sessionsRepository.js"
import jwt from "jsonwebtoken"

export default class SignInUserUseCase {
  async execute(logUser: Users) {
    try {
      const user = await usersRepository.findByEmail(logUser.email)

      if (!user) {
        throw new Error(`Not found user with email ${logUser.email}`)
      }

      if (!user.is_active) {
        throw new Error(`User account is deactivated`)
      }

      if (!bcrypt.compareSync(logUser.password, user.password)) {
        throw new Error(`Unauthorized: Wrong Password`)
      }

      const token = await this.verifyOrCreateSession(user)

      // Update last login
      await usersRepository.updateLastLogin(user.id)

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          guest: user.guest
            ? {
                id: user.guest.id,
                phone: user.guest.phone,
                date_of_birth: user.guest.date_of_birth,
                document_number: user.guest.document_number,
                preferences: user.guest.preferences,
              }
            : null,
        },
      }
    } catch (error) {
      throw error
    }
  }

  async verifyOrCreateSession(user: Users) {
    const sessionsRepository = new SessionsRepository()

    const session = await sessionsRepository.findByUserId(user.id)

    const secretKey = process.env.JWT_SECRET || ""
    const config = { expiresIn: "24h" }
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        roles: user.roles,
      },
      secretKey,
      config,
    )

    if (session) {
      await sessionsRepository.update(user.id, token)
      return token
    }

    await sessionsRepository.create({ user_id: user.id, token })
    return token
  }
}
