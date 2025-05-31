import itineraryRepository from "../../repositories/itineraryRepository.js"

export default class DeleteItineraryUseCase {
  async execute(id: number) {
    try {
      const itinerary = await itineraryRepository.findById(id)
      if (!itinerary) {
        throw new Error(`Itinerary with id ${id} not found`)
      }

      await itineraryRepository.deleteById(id)
      return "Itinerary deleted successfully"
    } catch (error) {
      throw error
    }
  }
}
