import guestsRepository from "../../repositories/guestsRepository.js"
import usersRepository from "../../repositories/usersRepository.js"
import type { createGuest } from "../../interfaces/createGuest.js"
import { UserRole } from "../../models/index.js"

export default class CreateGuestProfileUseCase {
  async execute(user_id: number, guestData: Omit<createGuest, "user_id">) {
    try {
      // Verify user exists and has ROLE_GUEST
      const user = await usersRepository.findById(user_id)
      if (!user) {
        throw new Error(`User with id ${user_id} not found`)
      }

      if (!user.roles.includes(UserRole.ROLE_GUEST)) {
        throw new Error(`User must have ROLE_GUEST to create guest profile`)
      }

      // Check if guest profile already exists
      const existingGuest = await guestsRepository.findByUserId(user_id)
      if (existingGuest) {
        throw new Error(`Guest profile already exists for user ${user_id}`)
      }

      const guest = await guestsRepository.insert({
        user_id,
        ...guestData,
      })

      return guest
    } catch (error) {
      throw error
    }
  }
}
