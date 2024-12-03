import { Guests } from "../models/index.js";

interface GuestBody {
  email: string;
  password: string;
  name: string;
  phone: string;
}

function insert(newUser: GuestBody) {
  return Guests.create(newUser);
}

function findByEmail(email: string) {
  return Guests.findOne({ where: { email } });
}

export default { insert, findByEmail };
