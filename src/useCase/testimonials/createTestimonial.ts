import testimonialsRepository from "../../repositories/testimonialsRepository.js"
import type { createTestimonial } from "../../interfaces/createTestimonial.js"
import guestsRepository from "../../repositories/guestsRepository.js"

export default class CreateTestimonialUseCase {
  async execute(testimonialData: createTestimonial) {
    try {
      if (testimonialData.guest_id) {
        const guest = await guestsRepository.findById(testimonialData.guest_id)
        if (!guest) {
          throw new Error(`Guest with id ${testimonialData.guest_id} not found`)
        }
      }

      if (testimonialData.rating < 1 || testimonialData.rating > 5) {
        throw new Error("Rating must be between 1 and 5")
      }

      const testimonial = await testimonialsRepository.create(testimonialData)
      return testimonial
    } catch (error) {
      throw error
    }
  }
}
