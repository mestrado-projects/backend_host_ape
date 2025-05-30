import type { createUser } from "../../interfaces/createUser.js"
import usersRepository from "../../repositories/usersRepository.js"
import bcrypt from "bcrypt"

export default class UpdateUserUseCase {
  async execute(id: number, newData: Partial<createUser>) {
    try {
      const user = await usersRepository.findById(id)

      if (!user) {
        throw new Error(`Not found user with id ${id}`)
      }

      const passwordHash = newData?.password ? bcrypt.hashSync(newData.password, 10) : user.password

      const userToUpdate = {
        ...newData,
        password: passwordHash,
      }

      await usersRepository.updateById(id, userToUpdate)
      return "Updated"
    } catch (error) {
      throw error
    }
  }
}
