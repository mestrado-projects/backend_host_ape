import itineraryRepository from "../../repositories/itineraryRepository.js"

export default class GetItineraryByIdUseCase {
  async execute(id: number) {
    try {
      const itinerary = await itineraryRepository.findById(id)
      if (!itinerary) {
        throw new Error(`Itinerary with id ${id} not found`)
      }
      return itinerary
    } catch (error) {
      throw error
    }
  }
}
