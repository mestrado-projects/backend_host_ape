import { Sessions } from "../models/guests/session.js";
export default class SessionsRepository {
    findByUserId(guest_id) {
        return Sessions.findOne({ where: { guest_id } });
    }
    create(token, guest_id) {
        return Sessions.create({
            token,
            guest_id,
        });
    }
    update(guest_id, newToken) {
        return Sessions.update({
            token: newToken,
        }, {
            where: { guest_id },
        });
    }
    findByToken(token) {
        return Sessions.findOne({ where: { token } });
    }
}
