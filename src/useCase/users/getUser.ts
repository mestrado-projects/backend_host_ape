import usersRepository from "../../repositories/usersRepository.js"

export default class GetUserUseCase {
  async execute(id: number) {
    try {
      const user = await usersRepository.findById(id)

      if (!user) {
        throw new Error(`Not found user with id ${id}`)
      }

      const returnedResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
        last_login: user.last_login,
      }
      return returnedResponse
    } catch (error) {
      throw error
    }
  }
}
