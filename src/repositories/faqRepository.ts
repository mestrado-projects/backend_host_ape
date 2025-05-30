import type { createFAQ } from "../interfaces/createFAQ.js"
import { FAQ } from "../models/index.js"

function create(newFAQ: createFAQ) {
  return FAQ.create(newFAQ)
}

function findAll() {
  return FAQ.findAll({
    order: [
      ["order_position", "ASC"],
      ["id", "ASC"],
    ],
  })
}

function findActive() {
  return FAQ.findAll({
    where: { is_active: true },
    order: [
      ["order_position", "ASC"],
      ["id", "ASC"],
    ],
  })
}

function findById(id: number) {
  return FAQ.findOne({ where: { id } })
}

function findByCategory(category: string) {
  return FAQ.findAll({
    where: { category, is_active: true },
    order: [
      ["order_position", "ASC"],
      ["id", "ASC"],
    ],
  })
}

function updateById(id: number, newData: Partial<createFAQ>) {
  return FAQ.update({ ...newData }, { where: { id } })
}

function deleteById(id: number) {
  return FAQ.destroy({ where: { id } })
}

export default {
  create,
  findAll,
  findActive,
  findById,
  findByCategory,
  updateById,
  deleteById,
}
