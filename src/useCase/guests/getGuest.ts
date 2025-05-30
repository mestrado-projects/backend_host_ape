import guestsRepository from "../../repositories/guestsRepository.js";

export default class GetGuestUseCase {
  async execute(id: number) {
    try {
      const user = await guestsRepository.findById(id);

      if (!user) {
        throw new Error(`Not found guest with id ${id}`);
      }

      const returnedResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
      return returnedResponse;
    } catch (error) {
      throw error;
    }
  }
}
