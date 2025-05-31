import itineraryRepository from "../../repositories/itineraryRepository.js"
import type { createItinerary } from "../../interfaces/createItinerary.js"

export default class UpdateItineraryUseCase {
  async execute(id: number, newData: Partial<createItinerary>) {
    try {
      const itinerary = await itineraryRepository.findById(id)
      if (!itinerary) {
        throw new Error(`Itinerary with id ${id} not found`)
      }

      if (newData.duration_days && newData.duration_days < 1) {
        throw new Error("Duration days must be greater than 0")
      }

      if (newData.estimated_cost && newData.estimated_cost < 0) {
        throw new Error("Estimated cost cannot be negative")
      }

      await itineraryRepository.updateById(id, newData)
      return "Itinerary updated successfully"
    } catch (error) {
      throw error
    }
  }
}
