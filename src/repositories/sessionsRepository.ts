import { Sessions } from "../models/guests/session.js";

export default class SessionsRepository {
  findByUserId(guest_id: number) {
    return Sessions.findOne({ where: { guest_id } });
  }

  create(token: string, guest_id: number) {
    return Sessions.create({
      token,
      guest_id,
    });
  }

  update(guest_id: number, newToken: string) {
    return Sessions.update(
      {
        token: newToken,
      },
      {
        where: { guest_id },
      },
    );
  }

  findByToken(token: string) {
    return Sessions.findOne({ where: { token } });
  }
}
