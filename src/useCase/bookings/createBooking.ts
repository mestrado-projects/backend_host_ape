import bookingsRepository from "../../repositories/bookingsRepository.js"
import type { createBooking } from "../../interfaces/createBooking.js"
import guestsRepository from "../../repositories/guestsRepository.js"
import GetApartmentsRepository from "../../repositories/getApartmentsRepository.js"

export default class CreateBookingUseCase {
  async execute(bookingData: createBooking) {
    try {
      const guest = await guestsRepository.findById(bookingData.guest_id)
      if (!guest) {
        throw new Error(`Guest with id ${bookingData.guest_id} not found`)
      }

      const apartment = await new GetApartmentsRepository().getApartmentById(bookingData.apartment_id)
      if (!apartment) {
        throw new Error(`Apartment with id ${bookingData.apartment_id} not found`)
      }

      const checkIn = new Date(bookingData.check_in_date)
      const checkOut = new Date(bookingData.check_out_date)

      if (checkIn >= checkOut) {
        throw new Error("Check-out date must be after check-in date")
      }

      if (checkIn < new Date()) {
        throw new Error("Check-in date cannot be in the past")
      }

      const booking = await bookingsRepository.create(bookingData)
      return booking
    } catch (error) {
      throw error
    }
  }
}
