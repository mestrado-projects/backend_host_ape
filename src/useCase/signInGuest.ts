import bcrypt from "bcrypt";
import guestsRepository from "../repositories/guestsRepository.js";
import { Guests, Sessions } from "../models/index.js";
import SessionsRepository from "../repositories/sessionsRepository.js";
import jwt from "jsonwebtoken";

export default class SignInGuestUseCase {
  async execute(logUser: Guests) {
    try {
      const user = await guestsRepository.findByEmail(logUser.email);

      if (!user) {
        throw new Error(`Not found guest with email ${logUser.email}`);
      }

      if (!bcrypt.compareSync(logUser.password, user.password)) {
        throw new Error(`Unauthorized: Wrong Password`);
      }

      const token = await this.verifyOrCreateSession(user);

      return token;
    } catch (error) {
      throw error;
    }
  }

  async verifyOrCreateSession(user: Guests) {
    const sessionsRepository = new SessionsRepository();

    const session = await sessionsRepository.findByUserId(user.id);

    const secretKey = process.env.JWT_SECRET || "";
    const config = { expiresIn: "1hr" };
    const token = jwt.sign(
      { email: user.email, id: user.id },
      secretKey,
      config,
    );

    if (session) {
      await sessionsRepository.update(session.id, token);

      return token;
    }

    await sessionsRepository.create({ guest_id: user.id, token });
    return token;
  }
}
