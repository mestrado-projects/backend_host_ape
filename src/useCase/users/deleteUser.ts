import usersRepository from "../../repositories/usersRepository.js"

export default class DeleteUserUseCase {
  async execute(id: number) {
    try {
      const user = await usersRepository.findById(id)

      if (!user) {
        throw new Error(`Not found user with id ${id}`)
      }

      await usersRepository.deleteById(id)

      return "Deleted"
    } catch (error) {
      throw error
    }
  }
}
