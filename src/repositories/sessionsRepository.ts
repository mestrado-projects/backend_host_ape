import { Sessions } from "../models/users/sessions.js"

export default class SessionsRepository {
  findByUserId(user_id: number) {
    return Sessions.findOne({ where: { user_id } })
  }

  create({ token, user_id }: { token: string; user_id: number }) {
    return Sessions.create({
      token,
      user_id,
    })
  }

  update(user_id: number, newToken: string) {
    return Sessions.update(
      {
        token: newToken,
      },
      {
        where: { user_id },
      },
    )
  }

  findByToken(token: string) {
    return Sessions.findOne({ where: { token } })
  }
}
