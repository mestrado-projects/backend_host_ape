import type { createGuest } from "../interfaces/createGuest.js"
import { Guests } from "../models/index.js"

function insert(newGuest: createGuest & {user_id: number}) {
  return Guests.create(newGuest)
}

function findByUserId(user_id: number) {
  return Guests.findOne({
    where: { user_id },
    include: ["user"],
  })
}

function findById(id: number) {
  return Guests.findOne({
    where: { id },
    include: ["user"],
  })
}

function findAll() {
  return Guests.findAll({
    include: ["user"],
    order: [["id", "ASC"]],
  })
}

function updateById(id: number, newData: Partial<createGuest>) {
  return Guests.update({ ...newData }, { where: { id } })
}

function deleteById(id: number) {
  return Guests.destroy({ where: { id } })
}

export default {
  insert,
  findByUserId,
  findById,
  findAll,
  updateById,
  deleteById,
}
