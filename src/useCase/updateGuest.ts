import { createGuest } from "../interfaces/createGuest.js";
import guestsRepository from "../repositories/guestsRepository.js";
import bcrypt from "bcrypt";

export default class UpdateGuestUseCase {
  async execute(id: number, newData: createGuest) {
    try {
      const guest = await guestsRepository.findById(id);

      if (!guest) {
        throw new Error(`Not found guest with id ${id}`);
      }

      const passwordHash = newData?.password
        ? bcrypt.hashSync(guest?.password, 10)
        : guest.password;

      const guestToUpdate = {
        ...guest,
        ...newData,
        password: passwordHash,
      };

      await guestsRepository.updateById(id, guestToUpdate);
      return "Updated";
    } catch (error) {
      throw error;
    }
  }
}
