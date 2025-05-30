import bookingsRepository from "../../repositories/bookingsRepository.js"
import type { createBooking } from "../../interfaces/createBooking.js"

export default class UpdateBookingUseCase {
  async execute(id: number, newData: Partial<createBooking>) {
    try {
      const booking = await bookingsRepository.findById(id)
      if (!booking) {
        throw new Error(`Booking with id ${id} not found`)
      }

      await bookingsRepository.updateById(id, newData)
      return "Booking updated successfully"
    } catch (error) {
      throw error
    }
  }
}
