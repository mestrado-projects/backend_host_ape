import type { createUser } from "../interfaces/createUser.js"
import { Users, type UserRole } from "../models/index.js"

function insert(newUser: createUser) {
  return Users.create({
    ...newUser,
    is_active: newUser.is_active ?? true,
  })
}

function findByEmail(email: string) {
  return Users.findOne({
    where: { email },
    include: ["guest"],
  })
}

function findById(id: number) {
  return Users.findOne({
    where: { id },
    include: ["guest"],
  })
}

function findByRole(role: UserRole) {
  return Users.findAll({
    where: {
      roles: { [require("sequelize").Op.contains]: [role] },
      is_active: true,
    },
    attributes: { exclude: ["password"] },
    include: ["guest"],
  })
}

function deleteById(id: number) {
  return Users.destroy({ where: { id } })
}

function updateById(id: number, newData: Partial<createUser>) {
  return Users.update({ ...newData }, { where: { id } })
}

function updateLastLogin(id: number) {
  return Users.update({ last_login: new Date() }, { where: { id } })
}

export default {
  insert,
  findByEmail,
  findById,
  findByRole,
  deleteById,
  updateById,
  updateLastLogin,
}
