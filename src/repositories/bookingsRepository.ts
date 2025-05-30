import type { createBooking } from "../interfaces/createBooking.js"
import { Bookings, BookingStatus } from "../models/index.js"

function create(newBooking: createBooking) {
  return Bookings.create({
    ...newBooking,
    status: BookingStatus.Pending,
    check_in_date: new Date(newBooking.check_in_date),
    check_out_date: new Date(newBooking.check_out_date),
  })
}

function findAll() {
  return Bookings.findAll({
    order: [["id", "DESC"]],
    include: ["guest", "apartment"],
  })
}

function findById(id: number) {
  return Bookings.findOne({
    where: { id },
    include: ["guest", "apartment"],
  })
}

function findByGuestId(guest_id: number) {
  return Bookings.findAll({
    where: { guest_id },
    order: [["id", "DESC"]],
    include: ["apartment"],
  })
}

function updateById(id: number, newData: Partial<createBooking>) {
  return Bookings.update({ ...newData }, { where: { id } })
}

function updateStatus(id: number, status: BookingStatus) {
  return Bookings.update({ status }, { where: { id } })
}

function deleteById(id: number) {
  return Bookings.destroy({ where: { id } })
}

export default {
  create,
  findAll,
  findById,
  findByGuestId,
  updateById,
  updateStatus,
  deleteById,
}
