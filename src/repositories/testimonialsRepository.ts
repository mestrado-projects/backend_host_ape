import type { createTestimonial } from "../interfaces/createTestimonial.js"
import { Testimonials } from "../models/index.js"

function create(newTestimonial: createTestimonial) {
  return Testimonials.create(newTestimonial)
}

function findAll() {
  return Testimonials.findAll({
    order: [["id", "DESC"]],
    include: ["guest"],
  })
}

function findActive() {
  return Testimonials.findAll({
    where: { is_active: true },
    order: [["id", "DESC"]],
    include: ["guest"],
  })
}

function findFeatured() {
  return Testimonials.findAll({
    where: { is_featured: true, is_active: true },
    order: [["id", "DESC"]],
    include: ["guest"],
  })
}

function findById(id: number) {
  return Testimonials.findOne({
    where: { id },
    include: ["guest"],
  })
}

function updateById(id: number, newData: Partial<createTestimonial>) {
  return Testimonials.update({ ...newData }, { where: { id } })
}

function deleteById(id: number) {
  return Testimonials.destroy({ where: { id } })
}

export default {
  create,
  findAll,
  findActive,
  findFeatured,
  findById,
  updateById,
  deleteById,
}
