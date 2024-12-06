import guestsRepository from "../repositories/guestsRepository.js";

export default class DeleteGuestUseCase {
  async execute(id: number) {
    try {
      const user = await guestsRepository.findById(id);

      if (!user) {
        throw new Error(`Not found guest with id ${id}`);
      }

      await guestsRepository.deleteById(id);

      return "Deleted";
    } catch (error) {
      throw error;
    }
  }
}
