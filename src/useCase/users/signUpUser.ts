import bcrypt from "bcrypt"
import usersRepository from "../../repositories/usersRepository.js"
import guestsRepository from "../../repositories/guestsRepository.js"
import type { UserRole } from "../../models/index.js"
import type { createGuest } from "../../interfaces/createGuest.js"

interface SignUpUserData {
  email: string
  password: string
  name: string
  roles: UserRole[]
  guestData?: createGuest
}

export default class SignUpUserUseCase {
  async execute(userData: SignUpUserData) {
    try {
      const existingUser = await usersRepository.findByEmail(userData.email)

      if (existingUser) {
        throw new Error(`Already have a user with email ${userData.email}`)
      }

      const passwordHash = bcrypt.hashSync(userData.password, 10)

      const userObject = {
        ...userData,
        password: passwordHash,
        is_active: true,
      }

      const createdUser = await usersRepository.insert(userObject)

      // If user has ROLE_GUEST, create guest profile
      if (userData.roles.includes("ROLE_GUEST" as UserRole) && userData.guestData) {
        await guestsRepository.insert({
          user_id: createdUser.id,
          ...userData.guestData,
        })
      }

      return {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        roles: createdUser.roles,
      }
    } catch (error) {
      throw error
    }
  }
}
