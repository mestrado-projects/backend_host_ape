import bookingsRepository from "../../repositories/bookingsRepository.js"

export default class GetBookingByIdUseCase {
  async execute(id: number) {
    try {
      const booking = await bookingsRepository.findById(id)
      if (!booking) {
        throw new Error(`Booking with id ${id} not found`)
      }
      return booking
    } catch (error) {
      throw error
    }
  }
}
