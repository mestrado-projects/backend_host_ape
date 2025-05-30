import bookingsRepository from "../../repositories/bookingsRepository.js"

export default class GetBookingsUseCase {
  async execute() {
    try {
      const bookings = await bookingsRepository.findAll()
      return bookings
    } catch (error) {
      throw error
    }
  }
}
