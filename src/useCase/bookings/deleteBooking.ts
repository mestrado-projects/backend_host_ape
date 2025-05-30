import bookingsRepository from "../../repositories/bookingsRepository.js"

export default class DeleteBookingUseCase {
  async execute(id: number) {
    try {
      const booking = await bookingsRepository.findById(id)
      if (!booking) {
        throw new Error(`Booking with id ${id} not found`)
      }

      await bookingsRepository.deleteById(id)
      return "Booking deleted successfully"
    } catch (error) {
      throw error
    }
  }
}
