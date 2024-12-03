import bcrypt from "bcrypt";
import guestsRepository from "../repositories/guestsRepository.js";
import { Guests } from "../models/index.js";

export default class SignUpGuestUseCase {
  async execute(newUser: Guests) {
    try {
      const guest = await guestsRepository.findByEmail(newUser.email);

      if (guest) {
        throw new Error(`Already have a guest with email ${newUser.email}`);
      }

      const passwordHash = bcrypt.hashSync(newUser.password, 10);

      const guestObject = { ...newUser, password: passwordHash };

      await guestsRepository.insert(guestObject);
    } catch (error) {
      throw error;
    }
  }
}
