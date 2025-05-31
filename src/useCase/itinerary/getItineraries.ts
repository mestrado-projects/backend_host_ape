import itineraryRepository from "../../repositories/itineraryRepository.js"

export default class GetItinerariesUseCase {
  async execute(activeOnly = false, location?: string) {
    try {
      let itineraries

      if (location) {
        itineraries = await itineraryRepository.findByLocation(location)
      } else if (activeOnly) {
        itineraries = await itineraryRepository.findActive()
      } else {
        itineraries = await itineraryRepository.findAll()
      }

      return itineraries
    } catch (error) {
      throw error
    }
  }
}
