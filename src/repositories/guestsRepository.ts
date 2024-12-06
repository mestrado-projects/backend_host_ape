import { createGuest } from "../interfaces/createGuest.js";
import { Guests } from "../models/index.js";

function insert(newUser: createGuest) {
  return Guests.create(newUser);
}

function findByEmail(email: string) {
  return Guests.findOne({ where: { email } });
}

function findById(id: number) {
  return Guests.findOne({ where: { id } });
}

function deleteById(id: number) {
  return Guests.destroy({ where: { id } });
}

function updateById(id: number, newData: createGuest) {
  return Guests.update({ ...newData }, { where: { id } });
}

export default { insert, findByEmail, deleteById, updateById, findById };
