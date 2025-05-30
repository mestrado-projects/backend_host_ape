import type { createItinerary } from "../interfaces/createItinerary.js"
import { Itinerary } from "../models/index.js"

function create(newItinerary: createItinerary) {
  return Itinerary.create(newItinerary)
}

function findAll() {
  return Itinerary.findAll({
    order: [["id", "DESC"]],
  })
}

function findActive() {
  return Itinerary.findAll({
    where: { is_active: true },
    order: [["id", "DESC"]],
  })
}

function findById(id: number) {
  return Itinerary.findOne({ where: { id } })
}

function findByLocation(location: string) {
  return Itinerary.findAll({
    where: { location, is_active: true },
    order: [["id", "DESC"]],
  })
}

function updateById(id: number, newData: Partial<createItinerary>) {
  return Itinerary.update({ ...newData }, { where: { id } })
}

function deleteById(id: number) {
  return Itinerary.destroy({ where: { id } })
}

export default {
  create,
  findAll,
  findActive,
  findById,
  findByLocation,
  updateById,
  deleteById,
}
