import itineraryRepository from "../../repositories/itineraryRepository.js"
import type { createItinerary } from "../../interfaces/createItinerary.js"

export default class CreateItineraryUseCase {
  async execute(itineraryData: createItinerary) {
    try {
      if (itineraryData.duration_days && itineraryData.duration_days < 1) {
        throw new Error("Duration days must be greater than 0")
      }

      if (itineraryData.estimated_cost && itineraryData.estimated_cost < 0) {
        throw new Error("Estimated cost cannot be negative")
      }

      const itinerary = await itineraryRepository.create(itineraryData)
      return itinerary
    } catch (error) {
      throw error
    }
  }
}
